import store from '../store'
import {spawn} from 'child_process'

const APACHE_START_SCRIPT = 'apache_start.bat'
const APACHE_STOP_SCRIPT = 'apache_stop.bat'

const xamppBase = store.getters['Settings/xamppBase']

const startProcess = (cmdPath) => {
  const process = spawn(cmdPath, [], {
    detached: true
  })
  process.unref()

  process.stdout.on('data', (data) => {
    console.log('START STDOUT', data.toString())
  })

  process.stderr.on('data', (data) => {
    console.log('START STDERR', data.toString())
  })

  process.on('exit', (code) => {
    console.log(`START Child exited with code ${code}`)
  })
}

const Runner = (startScript, stopScript) => {
  this.startScript = startScript
  this.stopScript = stopScript
}

Runner.prototype.start = () => {
  console.log('start', this.startScript)
  startProcess(this.startScript)
}

Runner.prototype.stop = () => {
  console.log('stop', this.stopScript)
  startProcess(this.stopScript)
}

export const ApacheRunner = new Runner(xamppBase(APACHE_START_SCRIPT), xamppBase(APACHE_STOP_SCRIPT))
