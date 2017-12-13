import fs from 'fs'
import tasklistCmd from './tasklist'

export default {
  checkIsApacheStarted (pidFile) {
    const self = this
    return new Promise((resolve, reject) => {
      fs.readFile(pidFile, (err, data) => {
        // No pid file - apache not started
        if (err) resolve(false)
        const pid = parseInt(data)
        // Check that there is a httpd process with pid as in pid-file
        self.isProcessExist(pid, 'httpd.exe').then(isExist => {
          if (isExist) resolve(true)
          resolve(false)
        })
      })
    })
  },
  isProcessExist (pid, name) {
    const self = this
    return new Promise((resolve, reject) => {
      self.tasklist().then(data => {
        if (data[pid] && data[pid].name === name) resolve(true)
        resolve(false)
      })
    })
  },
  tasklist () {
    return new Promise((resolve, reject) => {
      tasklistCmd.get().then(data => {
        resolve(data)
      })
    })
  }
}
