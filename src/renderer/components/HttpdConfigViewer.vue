<template>
    <div>
        <div>
            <div v-if="scope">
                <directive :directive="scope"
                                :name="scope.name"
                                :value="getDirectivePropertiesString(scope)"
                                :type="DIRECTIVE_TYPE.FAKE_SCOPE_PARAMETER"
                                :postfix="''"
                                @on-click="selectView"
                ></directive>
            </div>
            <div v-for="({directive, name, value, type, postfix, badge}, index) in formattedDirectives" :key="index">
                <directive :directive="directive"
                                :name="name"
                                :value="value"
                                :type="type"
                                :postfix="postfix"
                                :badge="badge"
                                @on-click="selectView"
                                @on-open-log="openLog"
                ></directive>
            </div>
        </div>
    </div>
</template>

<script>
  import {mapMutations, mapActions, mapGetters} from 'vuex'
  import {DIRECTIVE_TYPE, MUTATION_TYPE, ACTION_TYPE, GETTER_TYPE} from '@/utils/types'
  import Directive from '@/components/HttpdConfigViewer/Directive'

  export default {
    components: {Directive},
    props: {
      config: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {DIRECTIVE_TYPE}
    },
    computed: {
      ...mapGetters('Settings', [
        GETTER_TYPE.Settings.xamppBase,
        GETTER_TYPE.Settings.getPhpVersionByPath
      ]),
      scope () {
        return this.config.type && this.config.type !== DIRECTIVE_TYPE.ROOT ? this.config : null
      },
      filteredDirectives () {
        if (!this.config.body) return []
        return this.config.body.filter(item => {
          return [
            DIRECTIVE_TYPE.SCOPED,
            DIRECTIVE_TYPE.PLAIN
          ].indexOf(item.type) !== -1
        })
      },
      formattedDirectives () {
        return this.filteredDirectives.map(directive => {
          return this.formatDirective(directive)
        })
      }
    },
    methods: {
      ...mapMutations('Files', [
        MUTATION_TYPE.Files.pushView
      ]),
      ...mapActions('Files', [
        ACTION_TYPE.Files.loadLogFile
      ]),
      formatDirective (directive) {
        const format = {
          directive,
          name: directive.name,
          value: this.getDirectivePropertiesString(directive),
          type: directive.type,
          badge: this.getBadgeText(directive)
        }
        if (directive.type === DIRECTIVE_TYPE.SCOPED) {
          if (directive.name.toLowerCase() === 'virtualhost') {
            Object.assign(format, {
              value: this.getChildDirectives(directive)['ServerName'],
              postfix: directive.parameters[0].value
            })
          }
        }
        return format
      },
      getBadgeText (directive) {
        if (directive.name.toLowerCase() !== 'virtualhost') return ''
        for (let i in directive.body) {
          if (directive.body[i].name === 'FcgidInitialEnv') {
            if (directive.body[i].parameters.length === 2) {
              let phpPath = directive.body[i].parameters[1].value
              phpPath = this.removeExtraSymbols(phpPath)
              return this.getPhpVersionByPath(phpPath)
            }
          }
        }
        return ''
      },
      selectView (view) {
        this.$emit('on-raw', view)
        if (view.type !== DIRECTIVE_TYPE.SCOPED || view === this.config) return
        this.pushView({ view })
      },
      getChildDirectives (directive) {
        const directives = {}
        directive.body.forEach(item => {
          if (item.type !== DIRECTIVE_TYPE.PLAIN || item.parameters.length === 0) return true
          directives[item.name] = item.parameters[0].value
        })
        return directives
      },
      getDirectivePropertiesString (directive) {
        return directive.parameters.map(param => {
          return param.value
        }).join(', ')
      },
      openLog (directive) {
        let relativeLogPath = directive.parameters[0].value
        relativeLogPath = this.removeExtraSymbols(relativeLogPath)
        this.loadLogFile({path: this.xamppBase('apache', relativeLogPath)}).then(() => {
          this.$router.push('log')
        }).catch(e => {
          this.$message({
            type: 'error',
            title: 'Can\'t open file'
          })
        })
      },
      removeExtraSymbols (s) {
        s = s.replace(/"/g, '')
        s = s.replace(/\r/g, '')
        s = s.replace(/\n/g, '')
        return s
      }
    }
  }
</script>