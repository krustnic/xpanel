import {spawn} from 'child_process'

export default {
  _runCmd () {
    return new Promise((resolve, reject) => {
      const cmd = spawn('tasklist', ['/fo', 'csv'])
      let output = ''
      cmd.stdout.on('data', (data) => {
        output += data.toString()
      })

      cmd.on('exit', (code) => {
        resolve(output)
      })
    })
  },
  _parseOutput (output) {
    const pidTable = {}
    const lines = output.split('\n')
    // Remove first and list line
    lines.shift()
    lines.pop()
    lines.map(line => {
      const cols = line.split(',')
      // Remove first and last character '"'
      const name = cols[0].substr(1).slice(0, -1)
      const pid = cols[1].substr(1).slice(0, -1)
      pidTable[pid] = {
        name
      }
    })
    return pidTable
  },
  get () {
    return new Promise((resolve, reject) => {
      this._runCmd().then(output => {
        resolve(this._parseOutput(output))
      })
    })
  }
}
