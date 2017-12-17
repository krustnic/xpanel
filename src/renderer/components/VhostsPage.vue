<template>
    <div style="display: flex;width:100%;overflow: hidden">
        <div class="config-editor" style="padding-top: 7px;">
            <!--<button @click="open">Open Vhosts</button>-->
            <!--<button @click="view">Print</button>-->
            <div style="height: 24px;">
                <breadcrumbs style="float: left" :items="views" @on-select="selectCurrentView"></breadcrumbs>
                <div style="float: right">
                    <x-button @on-click="addVhost" type="success">
                        <i class="fa fa-plus" aria-hidden="true"></i> VH
                    </x-button>
                </div>
            </div>

            <hr>
            <httpd-config-viewer :config="currentView" @on-raw="onRawButton"></httpd-config-viewer>
        </div>

        <div style="width: 100%; height:100%;padding-top: 7px;">
            <div style="height: 100%;width:100%;">
                <div style="padding-left: 5px; padding-right: 5px; display: flex">
                    <div class="file-path">
                        {{ currentFile }}
                    </div>
                    <x-button type="success">Save</x-button>
                </div>
                <hr>
                <x-ace :content="currentFileContent" :selection="selection"></x-ace>
            </div>
        </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import HttpdConfigViewer from '@/components/HttpdConfigViewer'
  import Breadcrumbs from '@/components/Breadcrumbs'
  import XButton from '@/components/XButton'
  import XAce from '@/components/XAce'

  export default {
    components: {HttpdConfigViewer, Breadcrumbs, XButton, XAce},
    data () {
      return {
        selection: {
          start: {line: 0, column: 0},
          end: {line: 0, column: 0}
        }
      }
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
      },
      onRawButton (view) {
        this.selection = view.location
        console.log('selection', this.selection)
      }
    },
    computed: {
      ...mapGetters('Files', [
        'getCurrentFileConfig',
        'currentView',
        'currentFileContent',
        'currentFile',
        'views'
      ])
    }
  }
</script>

<style lang="scss" scoped>
    .config-editor {
        width: 50%;
        border-right: 1px solid #4c4c4c;
        padding-left: 5px;
        padding-right: 5px;
        min-width: 450px;
    }

    .file-path {
        border: 1px solid #545454;
        font-size: 12px;
        padding: 3px;
        color: gray;
        overflow: hidden;
        width: 100%;
    }
</style>