<template>
    <div class="grid x-path-input">
        <x-file-path>{{ value }}</x-file-path>
        <x-button @click="selectFolder">
            <i class="fa fa-folder-open-o" aria-hidden="true"></i>
        </x-button>
    </div>
</template>

<script>
  import XFilePath from '@/components/XFilePath'
  import XButton from '@/components/XButton'
  import {remote} from 'electron'
  const dialog = remote.dialog

  export default {
    components: {XFilePath, XButton},
    props: {
      value: {
        type: String,
        default: ''
      },
      defaultPathBase: {
        type: String,
        default: null
      }
    },
    data () {
      return {}
    },
    methods: {
      selectFolder () {
        dialog.showOpenDialog({
          defaultPath: this.defaultPathBase,
          properties: ['openDirectory']
        }, (fileNames) => {
          if (!fileNames) return
          const filePath = fileNames[0]

          this.$emit('input', filePath)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
    .grid {
        display: grid;
        grid-template-columns: 1fr auto;
        grid-template-rows: auto;
    }
</style>