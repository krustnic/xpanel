<template>
    <div>
        <div>
            <div v-if="scope.name">
                <directive :directive="scope" @on-select-view="selectView">
                    <directive-plain :directive="scope"></directive-plain>
                </directive>
            </div>
            <div v-for="(directive, index) in filteredDirectives" :key="index">
                <directive :directive="directive" @on-select-view="selectView">
                    <template v-if="directive.type === DIRECTIVE_TYPES.SCOPED">
                        <directive-scoped :directive="directive">
                            <virtual-host-teaser v-if="directive.name.toLowerCase() === 'virtualhost'"
                                                 :directive="directive"
                            ></virtual-host-teaser>
                        </directive-scoped>
                    </template>

                    <template v-if="directive.type === DIRECTIVE_TYPES.PLAIN">
                        <directive-plain :directive="directive"></directive-plain>
                    </template>
                </directive>
            </div>
        </div>
    </div>
</template>

<script>
    import DirectivePlain from './directive-plain'
    import DirectiveScoped from './directive-scoped'
    import VirtualHostTeaser from './virtual-host-teaser'
    import Directive from './directive'
    import {DIRECTIVE_TYPES} from '@/utils/types'

    export default {
      components: {DirectivePlain, DirectiveScoped, VirtualHostTeaser, Directive},
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