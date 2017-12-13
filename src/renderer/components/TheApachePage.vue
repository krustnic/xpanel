<template>
    <div>
        <button @click="start">Start</button>
        <button @click="stop">Stop</button>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  // import {spawn} from 'child_process'
  import {ApacheRunner} from '../utils/runners'

  export default {
    data () {
      return {}
    },
    created () {
      // TODO: remove (debug purpose)
      window.ApachePage = this
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