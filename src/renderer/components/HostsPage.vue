<template>
    <div class="grid hosts-page">
        <div class="controls">
            <x-button icon="fa-save" type="success" @click="save">Save</x-button>
            <hr>
        </div>
        <x-ace ref="editor" class="editor" :content="hostsFileContent"></x-ace>
    </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import XButton from '@/components/XButton'
  import XAce from '@/components/XAce'

  export default {
    components: {XButton, XAce},
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
        'hostsFileContent'
      ]),
      ...mapGetters('Settings', [
        'hostsPath'
      ])
    }
  }
</script>

<style lang="scss" scoped>
    .grid {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr;
    }

    .hosts-page {
        padding: 4px;

        .controls {
            text-align: right;
        }
    }
</style>