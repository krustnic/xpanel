<template>
    <div id="httpd-ace-editor"></div>
</template>

<script>
  import * as ace from 'brace'
  import 'brace/mode/apache_conf'
  // import 'brace/theme/merbivore_soft'
  import 'brace/theme/tomorrow_night'
  import 'brace/theme/tomorrow_night_eighties'

  const Range = ace.acequire('ace/range').Range

  export default {
    props: {
      content: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        editor: null
      }
    },
    mounted () {
      this.editor = ace.edit('httpd-ace-editor')
      this.editor.getSession().setMode('ace/mode/apache_conf')
      this.editor.setTheme('ace/theme/tomorrow_night')
      this.editor.setValue(this.content)
      this.editor.selection.setSelectionRange(new Range(0, 0, 0, 5))
    },
    watch: {
      text () {
        this.editor.setValue(this.content)
      }
    },
    beforeDestroy () {
      this.editor.destroy()
    }
  }
</script>

<style lang="scss" scoped>
    #httpd-ace-editor {
        height: 100%;
    }
</style>