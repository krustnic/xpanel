<template>
    <div class="grid vhost-page">
        <config-editor :views="views" :currentView="currentView" @on-raw="onRawButton"></config-editor>
        <content-editor :currentFile="currentFile" :currentFileContent="currentFileContent" :selection="selection"></content-editor>
    </div>
</template>

<script>
  import {GETTER_TYPE} from '@/utils/types'
  import { mapGetters } from 'vuex'
  import ConfigEditor from './HttpdConfigViewer/ConfigEditor'
  import ContentEditor from './HttpdConfigViewer/ContentEditor'

  export default {
    name: 'vhosts-page',
    components: {ConfigEditor, ContentEditor},
    data () {
      return {
        selection: null
      }
    },
    methods: {
      onRawButton (view) {
        this.selection = view.location
      }
    },
    computed: {
      ...mapGetters('Files', [
        GETTER_TYPE.Files.currentView,
        GETTER_TYPE.Files.currentFileContent,
        GETTER_TYPE.Files.currentFile,
        GETTER_TYPE.Files.views
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