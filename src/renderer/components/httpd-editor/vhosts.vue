<template>
    <div>
        <div>
            <div v-if="scope.name">
                <directive :directive="scope" @on-select-view="selectView">
                    <plain-directive :directive="scope"></plain-directive>
                </directive>
            </div>
            <div v-for="(directive, index) in filteredDirectives" :key="index">
                <directive :directive="directive" @on-select-view="selectView">
                    <template v-if="directive.type === DIRECTIVE_TYPES.SCOPED">
                        <scoped-directive :scope="directive">
                            <virtual-host-teaser v-if="directive.name.toLowerCase() === 'virtualhost'"
                                                 :scope="directive"
                            ></virtual-host-teaser>
                        </scoped-directive>
                    </template>

                    <template v-if="directive.type === DIRECTIVE_TYPES.PLAIN">
                        <plain-directive :directive="directive"></plain-directive>
                    </template>
                </directive>
            </div>
        </div>
    </div>
</template>

<script>
    import PlainDirective from './plain-directive'
    import ScopedDirective from './scoped-directive'
    import VirtualHostTeaser from './virtual-host-teaser'
    import Directive from './directive'
    import {DIRECTIVE_TYPES} from '@/utils/types'

    export default {
      components: {PlainDirective, ScopedDirective, VirtualHostTeaser, Directive},
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
          if (view.type !== DIRECTIVE_TYPES.SCOPED) return
          this.$store.commit('Files/PUSH_VIEW', { view })
        }
      }
    }
</script>

<style>

</style>