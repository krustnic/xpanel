<template>
    <div class="grid vhost-page">
        <config-editor :views="views" :currentView="currentView" @on-raw="onRawButton"></config-editor>
        <content-editor :currentFile="currentFile" :currentFileContent="currentFileContent" :selection="selection"></content-editor>
    </div>
</template>

<script>
  import {GETTER_TYPE, ACTION_TYPE} from '@/utils/types'
  import { mapGetters, mapActions } from 'vuex'
  import ConfigEditor from './HttpdConfigViewer/ConfigEditor'
  import ContentEditor from './HttpdConfigViewer/ContentEditor'

  export default {
    components: {ConfigEditor, ContentEditor},
    data () {
      return {
        selection: null
      }
    },
    created () {
      this.loadHttpdFile(this.xamppVirtualHostsFilePath).then(({content, config}) => {
        console.log(config)
      }).catch(error => {
        console.log(error)
      })
    },
    methods: {
      ...mapActions('Files', [
        ACTION_TYPE.Files.loadHttpdFile
      ]),
      onRawButton (view) {
        this.selection = view.location
      }
    },
    computed: {
      ...mapGetters('Files', [
        GETTER_TYPE.Files.getCurrentFileConfig,
        GETTER_TYPE.Files.currentView,
        GETTER_TYPE.Files.currentFileContent,
        GETTER_TYPE.Files.currentFile,
        GETTER_TYPE.Files.views
      ]),
      ...mapGetters('Settings', [
        GETTER_TYPE.Settings.xamppVirtualHostsFilePath
      ])
    }
  }
</script>

<style lang="scss" scoped>
    .grid {
        display: grid;
        grid-template-columns: 450px 1fr;
        grid-template-rows: 100vh;
    }
</style>