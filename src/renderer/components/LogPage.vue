<template>
    <div class="grid log-page">
        <div class="controls">
            <x-file-path>{{ currentLogPath }}</x-file-path>
            <x-button @click="reload" type="success">
                <i class="fa fa-refresh" aria-hidden="true"></i> Reload
            </x-button>
        </div>

        <div>
            <hr>
        </div>

        <div class="content">
            <div v-if="currentLogListReversed.length !== 0">
                <div v-for="(line, index) in currentLogListReversed" :key="index" class="log-line">
                    {{line}}
                </div>
            </div>
            <div v-else class="empty">
                The file is empty
            </div>
        </div>
    </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import {GETTER_TYPE, ACTION_TYPE} from '@/utils/types'
  import XFilePath from '@/components/XFilePath'
  import XButton from '@/components/XButton'

  export default {
    components: {XFilePath, XButton},
    data () {
      return {}
    },
    computed: {
      ...mapGetters('Files', [
        GETTER_TYPE.Files.currentLogPath,
        GETTER_TYPE.Files.currentLogListReversed
      ]),
      ...mapGetters('Settings', [
        GETTER_TYPE.Settings.xamppBase
      ])
    },
    methods: {
      ...mapActions('Files', [
        ACTION_TYPE.Files.loadLogFile
      ]),
      reload () {
        console.log('reload')
        this.loadLogFile({path: this.currentLogPath}).then(() => {
          console.log('log file loaded')
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

        padding: 4px;

        & .controls {
            display: grid;
            grid-template-columns: 1fr auto;
            grid-template-rows: auto 1fr;
        }

        & .content {
            overflow: auto;
        }
    }

    .log-page {
        & .log-line {
            margin-bottom: 10px;
        }

        & .empty {
            text-align: center;
            margin-top: 10px;
        }
    }
</style>