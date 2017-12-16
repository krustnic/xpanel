<template>
    <div>
        <div>
            <div v-if="scope.name">
                <directive :directive="scope" @on-select-view="selectView">
                    <directive-plain :directive="scope"></directive-plain>
                </directive>
            </div>
            <div v-for="({directive, name, value, type}, index) in formattedDirectives" :key="index">
                <directive-base :directive="directive"
                                :name="name"
                                :value="value"
                                :type="type"
                                @on-click="selectView"
                ></directive-base>
            </div>
            <!--<div v-for="(directive, index) in filteredDirectives" :key="index">                -->
                <!--<directive :directive="directive" @on-select-view="selectView">-->
                    <!--<template v-if="directive.type === DIRECTIVE_TYPES.SCOPED">-->
                        <!--<directive-scoped :directive="directive">-->
                            <!--<virtual-host-teaser v-if="directive.name.toLowerCase() === 'virtualhost'"-->
                                                 <!--:directive="directive"-->
                            <!--&gt;</virtual-host-teaser>-->
                        <!--</directive-scoped>-->
                    <!--</template>-->

                    <!--<template v-if="directive.type === DIRECTIVE_TYPES.PLAIN">-->
                        <!--<directive-plain :directive="directive"></directive-plain>-->
                    <!--</template>-->
                <!--</directive>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    import DirectiveBase from './directive-base'
    import DirectivePlain from './directive-plain'
    import DirectiveScoped from './directive-scoped'
    import VirtualHostTeaser from './virtual-host-teaser'
    import Directive from './directive'
    import {DIRECTIVE_TYPES} from '@/utils/types'

    export default {
      components: {DirectiveBase, DirectivePlain, DirectiveScoped, VirtualHostTeaser, Directive},
      props: {
        config: {
          type: Object,
          default () {
            return {}
          }
        }
      },
      data () {
        return {DIRECTIVE_TYPES}
      },
      computed: {
        scope () {
          return this.config
        },
        filteredDirectives () {
          if (!this.config.body) return []
          return this.config.body.filter(item => {
            return [
              DIRECTIVE_TYPES.SCOPED,
              DIRECTIVE_TYPES.PLAIN
            ].indexOf(item.type) !== -1
          })
        },
        formattedDirectives () {
          const dires = this.filteredDirectives.map(directive => {
            if (directive.type === DIRECTIVE_TYPES.SCOPED) {
              return {
                directive,
                name: directive.name,
                value: directive.parameters[0].value,
                type: directive.type
              }
            } else {
              return {
                directive,
                name: directive.name,
                value: directive.parameters[0].value,
                type: directive.type
              }
            }
          })
          console.log(dires)
          return dires
        }
      },
      methods: {
        selectView (view) {
          if (view.type !== DIRECTIVE_TYPES.SCOPED || view === this.config) return
          this.$store.commit('Files/PUSH_VIEW', { view })
        }
      }
    }
</script>