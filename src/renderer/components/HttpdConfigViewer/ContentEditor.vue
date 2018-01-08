<template>
    <div class="grid content-editor">
        <x-file-path>{{ currentFile }}</x-file-path>
        <x-button @click="saveFile"
                  class="controls"
                  type="success"
                  icon="fa-floppy-o"
                  :loading="isSaving"
        >Save</x-button>

        <div class="divider">
            <hr>
        </div>

        <x-ace ref="editor" class="editor" mode="apache_conf" :content="currentFileContent" :selection="selection"></x-ace>
    </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import {ACTION_TYPE} from '@/utils/types'
  import XFilePath from '@/components/XFilePath'
  import XButton from '@/components/XButton'
  import XAce from '@/components/XAce'

  export default {
    components: {XFilePath, XButton, XAce},
    props: {
      currentFile: {
        type: String,
        default: ''
      },
      currentFileContent: {
        type: String,
        default: ''
      },
      selection: {
        type: Object
      }
    },
    data () {
      return {
        isSaving: false
      }
    },
    methods: {
      ...mapActions('Files', [
        ACTION_TYPE.Files.saveHttpdFile
      ]),
      saveFile () {
        this.isSaving = true
        const content = this.$refs.editor.getValue()
        this.saveHttpdFile({
          path: this.currentFile,
          content
        }).then(() => {
          this.isSaving = false
          this.$message({
            title: 'Saved',
            icon: 'fa-floppy-o'
          })
        }).catch(() => {
          this.isSaving = false
          this.$message({
            type: 'error',
            title: 'Error',
            icon: 'fa-floppy-o'
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
    .grid {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto 1fr;
        grid-template-areas:
                "file-path controls"
                "divider divider"
                "editor editor"
    }

    .content-editor {
        padding: 4px 5px 5px 5px;

        .controls {
            grid-area: controls;
        }

        .divider {
            grid-area: divider;
        }

        .editor {
            grid-area: editor;
        }
    }
</style>