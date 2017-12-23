import {spawn} from 'child_process'
import moment from 'moment'
import {LOG_MESSAGE_TYPE} from '@/utils/types'

export class Log {
  constructor (type, message, timestamp) {
    this.type = type
    this.message = message
    this.timestamp = timestamp || moment().format('DD.MM.YYYY H:m:s')
  }
}

export class Runner {
  constructor (cmdPath, cmdParams) {
    this.cmdPath = cmdPath
    this.cmdParams = cmdParams || []
  }

  onLog (callback) {
    this.onLogCallback = callback
  }

  onStdout (callback) {
    this.onStdoutCallback = callback
  }

  onStderr (callback) {
    this.onStderrCallback = callback
  }

  onExit (callback) {
    this.onExitCallback = callback
  }

  run () {
    const process = spawn(this.cmdPath, this.cmdParams, {
      detached: true
    })

    process.unref()

    process.stdout.on('data', (data) => {
      if (this.onStdoutCallback) this.onStdoutCallback(data.toString())
      if (this.onLogCallback) this.onLogCallback(new Log(LOG_MESSAGE_TYPE.INFO, data.toString()))
    })

    process.stderr.on('data', (data) => {
      if (this.onStderrCallback) this.onStderrCallback(data.toString())
      if (this.onLogCallback) this.onLogCallback(new Log(LOG_MESSAGE_TYPE.ERROR, data.toString()))
    })

    process.on('exit', (code) => {
      if (this.onExitCallback) this.onExitCallback(code)
    })
  }
}
