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
    components: {ConfigEditor, ContentEditor},
    data () {
      return {
        selection: null
      }
    },
    created () {
      this.$store.dispatch('Files/loadHttpdFile', this.xamppVirtualHostsFilePath).then(({content, config}) => {
        console.log(config)
      }).catch(error => {
        console.log(error)
      })
    },
    methods: {
      onRawButton (view) {
        this.selection = view.location
      }
    },
    computed: {
      ...mapGetters('Files', [
        'getCurrentFileConfig',
        'currentView',
        'currentFileContent',
        'currentFile',
        'views'
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