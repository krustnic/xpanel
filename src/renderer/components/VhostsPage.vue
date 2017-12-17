<template>
    <div class="vhost-page">
        <div class="config-editor">
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

            <div style="overflow-y: scroll">
                <hr>
                <httpd-config-viewer :config="currentView" @on-raw="onRawButton"></httpd-config-viewer>
            </div>
        </div>

        <div class="content-editor">
            <div class="control-panel">
                <div class="file-path">
                    {{ currentFile }}
                </div>
                <x-button type="success">Save</x-button>
                <hr>
            </div>
            <div>
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
    .vhost-page {
        display: grid;
        grid-template-columns: 450px 1fr;
        grid-template-rows: 100vh;
    }

    .config-editor {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr;

        border-right: 1px solid #4c4c4c;
        padding-top: 7px;
        padding-left: 5px;
        padding-right: 5px;
    }

    .content-editor {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr;

        padding-top: 7px;

        .control-panel {
            display: grid;
            grid-template-columns: 1fr auto;
            grid-template-rows: 1fr;

            padding-left: 5px;
            padding-right: 5px
        }
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