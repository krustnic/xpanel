<template>
    <div>
        <button @click="open">Open Vhosts</button>
        <button @click="view">Print</button>

        <hr>
        <app-breadcrumbs :items="views"></app-breadcrumbs>
        <hr>
        <breadcrumbs :views="views" @on-select-view="selectCurrentView"></breadcrumbs>
        <hr>
        <vhosts-component :config="currentViewList"></vhosts-component>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import VhostsComponent from './vhosts'
  import Breadcrumbs from './breadcrumbs'
  import AppBreadcrumbs from '@/components/app-breadcrumbs/main'

  export default {
    components: {VhostsComponent, Breadcrumbs, AppBreadcrumbs},
    data () {
      return {}
    },
    methods: {
      open () {
        this.$store.dispatch('Files/loadHttpdFile', 'C:\\xampp\\apache\\conf\\extra\\httpd-vhosts.conf').then(config => {
          console.log(config)
        }).catch(error => {
          console.log(error)
        })
      },
      view () {
        console.log('Config', this.currentViewList)
      },
      selectCurrentView (view) {
        this.$store.commit('Files/SET_CURRENT_VIEW', { view })
      }
    },
    computed: {
      ...mapGetters('Files', [
        'getCurrentFileConfig',
        'currentViewList',
        'views'
      ])
    }
  }
</script>