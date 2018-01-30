import fs from 'fs'
import path from 'path'

export default class FastCGI {
  constructor (xamppRoot) {
    this.xamppRoot = xamppRoot
  }

  getBackupFilePath () {
    return path.join(this.xamppRoot, 'apache\\conf\\extra\\httpd-xampp.conf.xpanel.backup')
  }

  getXamppFilePath () {
    return path.join(this.xamppRoot, 'apache\\conf\\extra\\httpd-xampp.conf')
  }

  isBackupExist () {
    return fs.existsSync(this.getBackupFilePath())
  }

  createBackup () {
    return new Promise((resolve, reject) => {
      fs.readFile(this.getXamppFilePath(), (err, content) => {
        if (err) return reject(err)
        fs.writeFile(this.getBackupFilePath(), content, err => {
          if (err) return reject(err)
          resolve()
        })
      })
    })
  }

  updateXamppConfig () {
    // generate file
    // write file
  }
}
