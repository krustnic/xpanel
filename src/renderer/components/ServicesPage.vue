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
  import {spawn} from 'child_process'
  // import {ApacheRunner} from '../utils/runners'
  import XButton from '@/components/XButton'
  import Log from './ServicesPage/Log'
  import moment from 'moment'

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
      start () {
        // console.log('start apache', ApacheRunner)
        // ApacheRunner.start()
        this.isApacheInProcess = true

        const apacheProcess = spawn(this.xamppBase('apache\\bin\\httpd.exe'), [], {
          detached: true
        })
        apacheProcess.unref()

        apacheProcess.stdout.on('data', (data) => {
          console.log('START STDOUT', data.toString())
          this.$store.commit('State/PUSH_APACHE_LOG', {
            type: 'info',
            message: data.toString(),
            timestamp: moment().format('DD.MM.YYYY H:m:s')
          })
        })

        apacheProcess.stderr.on('data', (data) => {
          console.log('START STDERR', data.toString())
          this.$store.commit('State/PUSH_APACHE_LOG', {
            type: 'error',
            message: data.toString(),
            timestamp: moment().format('DD.MM.YYYY H:m:s')
          })
        })

        apacheProcess.on('exit', (code) => {
          this.$store.dispatch('State/updateApacheState')
        })

        setTimeout(() => {
          this.$store.dispatch('State/updateApacheState').then(() => {
            this.isApacheInProcess = false
          })
        }, 1500)
      },
      stop () {
        // console.log('stop apache')
        // ApacheRunner.stop()
        this.isApacheInProcess = true

        const stopApacheProcess = spawn(this.xamppBase('apache\\bin\\pv'), ['-f', '-k', 'httpd.exe', '-q'])

        stopApacheProcess.stdout.on('data', (data) => {
          console.log('EXIT STDOUT', data.toString())
          this.$store.commit('State/PUSH_APACHE_LOG', {
            type: 'info',
            message: data.toString(),
            timestamp: moment().format('DD.MM.YYYY H:m:s')
          })
        })

        stopApacheProcess.stderr.on('data', (data) => {
          console.log('EXIT STDERR', data.toString())
          this.$store.commit('State/PUSH_APACHE_LOG', {
            type: 'error',
            message: data.toString(),
            timestamp: moment().format('DD.MM.YYYY H:m:s')
          })
        })

        stopApacheProcess.on('exit', (code) => {
          this.$store.dispatch('State/updateApacheState')
        })

        setTimeout(() => {
          this.$store.dispatch('State/updateApacheState').then(() => {
            this.isApacheInProcess = false
          })
        }, 1500)
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