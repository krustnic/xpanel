<template>
    <div class="grid content-editor">
        <div class="file-path">{{ currentFile }}</div>
        <x-button @click="saveFile" class="controls" type="success" icon="fa-floppy-o" :loading="isSaving">Save</x-button>

        <div class="divider">
            <hr>
        </div>

        <x-ace ref="editor" class="editor" :content="currentFileContent" :selection="selection"></x-ace>
    </div>
</template>

<script>
  import XButton from '@/components/XButton'
  import XAce from '@/components/XAce'

  export default {
    components: {XButton, XAce},
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
      saveFile () {
        this.isSaving = true
        const content = this.$refs.editor.getValue()
        this.$store.dispatch('Files/saveHttpdFile', {
          path: this.$store.getters['Files/currentFile'],
          content
        }).then(() => {
          this.isSaving = false
        }).catch(() => {
          this.isSaving = false
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

        .file-path {
            grid-area: file-path;

            border: 1px solid #545454;
            font-size: 12px;
            padding: 3px;
            color: gray;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .controls {
            grid-area: controls;
        }

        .divider {
            grid-area: divider;
        }

        .editor {
            grid-area: editor;
        }

        /*.control-panel {*/
            /*display: grid;*/
            /*grid-template-columns: 1fr auto;*/
            /*grid-template-rows: 1fr;*/

            /*padding-left: 5px;*/
            /*padding-right: 5px*/
        /*}*/
    }
</style>