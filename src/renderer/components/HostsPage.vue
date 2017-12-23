<template>
    <div class="grid hosts-page">
        <div class="controls">
            <x-file-path>{{ hostsPath }}</x-file-path>
            <x-button icon="fa-save" type="success" @click="save">Save</x-button>
        </div>
        <div>
            <hr>
        </div>
        <x-ace ref="editor" class="editor" :content="hostsFileContent"></x-ace>
    </div>
</template>

<script>
  import {GETTER_TYPE} from '@/utils/types'
  import {mapGetters, mapActions} from 'vuex'
  import XFilePath from '@/components/XFilePath'
  import XButton from '@/components/XButton'
  import XAce from '@/components/XAce'

  export default {
    components: {XFilePath, XButton, XAce},
    data () {
      return {}
    },
    created () {
      this.loadHostsFile(this.hostsPath)
    },
    methods: {
      ...mapActions('Files', [
        'loadHostsFile',
        'saveHostsFile'
      ]),
      save () {
        const content = this.$refs.editor.getValue()
        this.saveHostsFile({
          path: this.hostsPath,
          content: content
        }).then(() => {
          this.loadHostsFile(this.hostsPath)
        }).catch(e => {
          console.error(e)
        })
      }
    },
    computed: {
      ...mapGetters('Files', [
        GETTER_TYPE.Files.hostsFileContent
      ]),
      ...mapGetters('Settings', [
        GETTER_TYPE.Settings.hostsPath
      ])
    }
  }
</script>

<style lang="scss" scoped>
    .grid {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto 1fr;
    }

    .hosts-page {
        padding: 4px;

        .controls {
            display: grid;
            grid-template-columns: 1fr auto;
            grid-template-rows: auto;
        }
    }
</style>