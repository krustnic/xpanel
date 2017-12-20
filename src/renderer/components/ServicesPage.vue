<template>
    <div class="grid services-page">
        <div class="service">
            <div>Apache: {{ apacheState }}</div>
            <hr>
            <div style="margin-top: 5px;">
                <x-button v-if="apacheState !== APACHE_STATE_TYPE.STARTED" @click="start" icon="fa-play" type="success">Start</x-button>
                <x-button v-if="apacheState !== APACHE_STATE_TYPE.STOPPED" @click="stop" icon="fa-stop" type="success">Stop</x-button>
            </div>
        </div>
    </div>
</template>

<script>
  import {APACHE_STATE_TYPE} from '@/utils/types'
  import { mapGetters } from 'vuex'
  // import {spawn} from 'child_process'
  import {ApacheRunner} from '../utils/runners'
  import XButton from '@/components/XButton'

  export default {
    components: {XButton},
    data () {
      return {
        APACHE_STATE_TYPE: APACHE_STATE_TYPE
      }
    },
    created () {
      this.$store.dispatch('State/updateApacheState')
    },
    methods: {
      start () {
        console.log('start apache', ApacheRunner)
        ApacheRunner.start()

        /*
        const apacheProcess = spawn(this.xamppBase('apache\\bin\\httpd.exe'), [], {
          detached: true
        })
        apacheProcess.unref()

        apacheProcess.stdout.on('data', (data) => {
          console.log('START STDOUT', data.toString())
        })

        apacheProcess.stderr.on('data', (data) => {
          console.log('START STDERR', data.toString())
        })

        apacheProcess.on('exit', (code) => {
          console.log(`START Child exited with code ${code}`)
        })
        */
      },
      stop () {
        console.log('stop apache')

        ApacheRunner.stop()
        /*
        const stopApacheProcess = spawn(this.xamppBase('apache\\bin\\pv'), ['-f', '-k', 'httpd.exe', '-q'])

        stopApacheProcess.stdout.on('data', (data) => {
          console.log('EXIT STDOUT', data.toString())
        })

        stopApacheProcess.stderr.on('data', (data) => {
          console.log('EXIT STDERR', data.toString())
        })

        stopApacheProcess.on('exit', (code) => {
          console.log(`EXIT Child exited with code ${code}`)
        })
        */
      }
    },
    computed: {
      ...mapGetters('Settings', [
        'xamppBase'
      ]),
      ...mapGetters('State', [
        'apacheState'
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
        }
    }
</style>