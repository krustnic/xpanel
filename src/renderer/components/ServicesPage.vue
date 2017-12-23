<template>
    <div class="grid services-page">
        <div class="service">
            <div>Apache: {{ apacheState }}</div>
            <hr>
            <div style="margin-top: 5px;">
                <x-button v-if="apacheState !== APACHE_STATE_TYPE.STARTED" @click="start" icon="fa-play" type="success" :loading="isApacheInProcess">Start</x-button>
                <x-button v-if="apacheState !== APACHE_STATE_TYPE.STOPPED" @click="stop" icon="fa-stop" type="danger" :loading="isApacheInProcess">Stop</x-button>
            </div>
            <hr>
            <log v-if="apacheLog.length !== 0" :log="apacheLog"></log>
        </div>
    </div>
</template>

<script>
  import {APACHE_STATE_TYPE} from '@/utils/types'
  import { mapGetters } from 'vuex'
  import {Runner} from '../utils/runners'
  import XButton from '@/components/XButton'
  import Log from './ServicesPage/Log'

  export default {
    components: {XButton, Log},
    data () {
      return {
        APACHE_STATE_TYPE: APACHE_STATE_TYPE,
        isApacheInProcess: false
      }
    },
    created () {
      this.$store.dispatch('State/updateApacheState')
    },
    methods: {
      updateApache () {
        return this.$store.dispatch('State/updateApacheState').then(() => {
          this.isApacheInProcess = false
        })
      },
      start () {
        this.isApacheInProcess = true
        const runner = new Runner(this.xamppBase('apache\\bin\\httpd.exe'), [])

        runner.onLog(log => {
          this.$store.commit('State/PUSH_APACHE_LOG', log)
        })

        runner.onExit((code) => {
          this.updateApache()
        })

        setTimeout(() => {
          this.updateApache()
        }, 1500)

        runner.run()
      },
      stop () {
        this.isApacheInProcess = true
        const runner = new Runner(this.xamppBase('apache\\bin\\pv'), ['-f', '-k', 'httpd.exe', '-q'])

        runner.onLog(log => {
          this.$store.commit('State/PUSH_APACHE_LOG', log)
        })

        runner.onExit((code) => {
          this.updateApache()
        })

        setTimeout(() => {
          this.updateApache()
        }, 1500)

        runner.run()
      }
    },
    computed: {
      ...mapGetters('Settings', [
        'xamppBase'
      ]),
      ...mapGetters('State', [
        'apacheState',
        'apacheLog'
      ])
    }
  }
</script>

<style lang="scss" scoped>
    .grid {
        /*display: grid;*/
    }

    .services-page {
        padding: 4px;

        .service {
            border: 1px solid $main-border-color;
            padding: 6px;

            .log {
                background-color: #1d1f21;
                padding: 4px;
                max-height: 100px;
                overflow-y: scroll;
            }
        }
    }
</style>