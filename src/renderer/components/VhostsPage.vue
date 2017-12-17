<template>
    <div>
        <div style="padding-top: 7px;">
            <!--<button @click="open">Open Vhosts</button>-->
            <!--<button @click="view">Print</button>-->
            <div class="file-path">
                C:\xampp\apache\conf\extra\httpd-vhosts.conf
            </div>
            <hr>
            <div style="height: 24px;">
                <breadcrumbs style="float: left" :items="views" @on-select="selectCurrentView"></breadcrumbs>
                <div style="float: right">
                    <x-button @on-click="addVhost" type="success">
                        <i class="fa fa-plus" aria-hidden="true"></i> VH
                    </x-button>
                </div>
            </div>

            <hr>
            <httpd-config-viewer :config="currentView"></httpd-config-viewer>
        </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import HttpdConfigViewer from '@/components/HttpdConfigViewer'
  import Breadcrumbs from '@/components/Breadcrumbs'
  import XButton from '@/components/XButton'

  export default {
    components: {HttpdConfigViewer, Breadcrumbs, XButton},
    data () {
      return {}
    },
    created () {
      this.$store.dispatch('Files/loadHttpdFile', 'C:\\xampp\\apache\\conf\\extra\\httpd-vhosts.conf').then(({content, config}) => {
        console.log(config)
      }).catch(error => {
        console.log(error)
      })
    },
    methods: {
      open () {
        // this.$store.dispatch('Files/loadHttpdFile', 'C:\\xampp\\apache\\conf\\extra\\httpd-xampp.conf').then(config => {
        this.$store.dispatch('Files/loadHttpdFile', 'C:\\xampp\\apache\\conf\\extra\\httpd-vhosts.conf').then(({content, config}) => {
          console.log(config)
        }).catch(error => {
          console.log(error)
        })
      },
      view () {
        console.log('Config', this.currentView)
      },
      selectCurrentView (view) {
        this.$store.commit('Files/SET_CURRENT_VIEW', { view })
      },
      addVhost () {
        this.$router.push('add-virtual-host-page')
      }
    },
    computed: {
      ...mapGetters('Files', [
        'getCurrentFileConfig',
        'currentView',
        'views'
      ])
    }
  }
</script>

<style lang="scss" scoped>
    .file-path {
        border: 1px solid #545454;
        font-size: 12px;
        padding: 3px;
        color: gray;
        overflow: hidden;
    }
</style>