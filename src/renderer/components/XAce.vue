<template>
    <div id="httpd-ace-editor"></div>
</template>

<script>
  import * as ace from 'brace'
  import 'brace/mode/apache_conf'
  import 'brace/mode/powershell'
  import 'brace/theme/tomorrow_night'
  import 'brace/theme/tomorrow_night_eighties'

  const Range = ace.acequire('ace/range').Range

  export default {
    props: {
      content: {
        type: String,
        default: ''
      },
      selection: {
        type: Object,
        default: null
      },
      mode: {
        type: String,
        default: 'powershell'
      }
    },
    data () {
      return {
        editor: null
      }
    },
    mounted () {
      this.editor = ace.edit('httpd-ace-editor')
      this.editor.getSession().setMode(`ace/mode/${this.mode}`)
      this.editor.setTheme('ace/theme/tomorrow_night')
      this.setValue(this.content)

      // In case full reactivity:
      // this.editor.getSession().on('change', () => {
      //   this.$emit('on-change', this.editor.getSession().getValue())
      // })
    },
    methods: {
      getValue () {
        return this.editor.getSession().getValue()
      },
      setValue (value) {
        this.editor.setValue(value, -1)
      }
    },
    watch: {
      content () {
        this.setValue(this.content)
      },
      selection () {
        if (!this.selection) return
        this.editor.gotoLine(this.selection.start.line - 1, 0, true)
        this.editor.selection.setSelectionRange(new Range(
          this.selection.start.line - 1,
          this.selection.start.column - 1,
          this.selection.end.line - 1,
          this.selection.end.column - 1
        ))
        this.editor.focus()
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