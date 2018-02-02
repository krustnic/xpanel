import fs from 'fs'
import fse from 'fs-extra'
import path from 'path'
import {template} from 'lodash'

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

  getXamppTemplateFilePath () {
    return path.join(__static, 'apache\\httpd-xampp.conf')
  }

  getFastCGIModulePath () {
    return path.join(__static, 'apache\\modules\\win32\\mod_fcgid.so')
  }

  getDestinationModulePath () {
    return path.join(this.xamppRoot, 'apache\\modules\\mod_fcgid.so')
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
    return new Promise((resolve, reject) => {
      fs.readFile(this.getXamppTemplateFilePath(), (err, content) => {
        if (err) return reject(err)
        const compiled = template(content)
        const generatedContent = compiled({
          xamppRoot: this.xamppRoot.replace(/\\/g, '/')
        })

        fs.writeFile(this.getXamppFilePath(), generatedContent, (err) => {
          if (err) return reject(err)
          resolve()
        })
      })
    })
  }

  copyFastCGIModule () {
    return fse.copy(this.getFastCGIModulePath(), this.getDestinationModulePath())
  }
}
