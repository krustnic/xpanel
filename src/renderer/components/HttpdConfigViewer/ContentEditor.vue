<template>
    <div class="grid content-editor">
        <div class="control-panel">
            <div class="file-path">{{ currentFile }}</div>
            <x-button type="success">Save</x-button>
        </div>

        <div>
            <hr>
        </div>

        <div>
            <x-ace :content="currentFileContent" :selection="selection"></x-ace>
        </div>
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
      return {}
    }
  }
</script>

<style lang="scss" scoped>
    .grid {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto 1fr;
    }

    .content-editor {
        padding: 7px 5px 5px 5px;

        .control-panel {
            display: grid;
            grid-template-columns: 1fr auto;
            grid-template-rows: 1fr;

            padding-left: 5px;
            padding-right: 5px
        }

        .file-path {
            border: 1px solid #545454;
            font-size: 12px;
            padding: 3px;
            color: gray;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
</style>