<template>
    <div>
        <div>
            <div v-for="(directive, index) in config" :key="index">
                <template v-if="directive.type === 'scope'">
                    <template v-if="directive.name.toLowerCase() === 'virtualhost'">
                        <virtual-host-scope @on-select-view="selectView"
                                            :scope="directive"
                        ></virtual-host-scope>
                    </template>
                    <default-scope v-else :scope="directive"></default-scope>
                </template>

                <template v-if="directive.type === 'directive'">
                    <default-directive :directive="directive"></default-directive>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import DefaultDirective from './default-directive'
    import DefaultScope from './default-scope'
    import VirtualHostScope from './virtualhost-scope'

    export default {
      components: {DefaultDirective, DefaultScope, VirtualHostScope},
      props: {
        config: {
          type: Array,
          default () {
            return []
          }
        }
      },
      data () {
        return {}
      },
      methods: {
        selectView (view) {
          this.$store.commit('Files/PUSH_VIEW', { view })
        }
      }
    }
</script>

<style>

</style>