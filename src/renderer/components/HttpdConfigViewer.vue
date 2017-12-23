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
            <div v-for="({directive, name, value, type, postfix}, index) in formattedDirectives" :key="index">
                <directive :directive="directive"
                                :name="name"
                                :value="value"
                                :type="type"
                                :postfix="postfix"
                                @on-click="selectView"
                ></directive>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    import {DIRECTIVE_TYPE, MUTATION_TYPE} from '@/utils/types'
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

        formatDirective (directive) {
          const format = {
            directive,
            name: directive.name,
            value: this.getDirectivePropertiesString(directive),
            type: directive.type
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
        }
      }
    }
</script>