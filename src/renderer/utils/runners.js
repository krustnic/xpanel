import {spawn} from 'child_process'

export const Runner = (cmdPath, cmdParams) => {
  this.cmdPath = cmdPath
  this.cmdParams = cmdParams || []
}

Runner.prototype.onStdout = (callback) => {
  this.onStdoutCallback = callback
}

Runner.prototype.onStderr = (callback) => {
  this.onStderrCallback = callback
}

Runner.prototype.onExit = (callback) => {
  this.onExitCallback = callback
}

Runner.prototype.run = () => {
  const process = spawn(this.cmdPath, this.cmdParams, {
    detached: true
  })

  process.unref()

  process.stdout.on('data', (data) => {
    if (this.onStdoutCallback) this.onStdoutCallback(data.toString())
  })

  process.stderr.on('data', (data) => {
    if (this.onStderrCallback) this.onStderrCallback(data.toString())
  })

  process.on('exit', (code) => {
    if (this.onExitCallback) this.onStdoutCallback(code)
  })
}

// const APACHE_START_SCRIPT = 'apache_start.bat'
// const APACHE_STOP_SCRIPT = 'apache_stop.bat'
//
// const xamppBase = store.getters['Settings/xamppBase']
//
// const startProcess = (cmdPath) => {
//   const process = spawn(cmdPath, [], {
//     detached: true
//   })
//   process.unref()
//
//   process.stdout.on('data', (data) => {
//     console.log('START STDOUT', data.toString())
//   })
//
//   process.stderr.on('data', (data) => {
//     console.log('START STDERR', data.toString())
//   })
//
//   process.on('exit', (code) => {
//     console.log(`START Child exited with code ${code}`)
//   })
// }
//
// const Runner = (startScript, stopScript) => {
//   this.startScript = startScript
//   this.stopScript = stopScript
// }
//
// Runner.prototype.start = () => {
//   console.log('start', this.startScript)
//   startProcess(this.startScript)
// }
//
// Runner.prototype.stop = () => {
//   console.log('stop', this.stopScript)
//   startProcess(this.stopScript)
// }
//
// export const ApacheRunner = new Runner(xamppBase(APACHE_START_SCRIPT), xamppBase(APACHE_STOP_SCRIPT))
