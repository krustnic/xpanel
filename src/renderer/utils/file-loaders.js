import peg from 'pegjs'
import fs from 'fs'
import path from 'path'
import {spawn} from 'child_process'

const httpdParser = peg.generate(fs.readFileSync(path.join(__static, 'httpd-config-grammar.pegjs'), 'utf8'))
const HOSTS_TEMP_FILE = 'hosts-temp-file.tmp'
const HOSTS_TEMP_PATH = path.join(__static, HOSTS_TEMP_FILE)
const RUNAS_TEMPLATE = fs.readFileSync(path.join(__static, 'run-as.bat'), 'utf-8')
const RUNAS_TEMP_PATH = path.join(__static, 'run-as-temp.bat')

export const HttpdLoader = {
  load (filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) return reject(err)
        try {
          resolve({content, config: httpdParser.parse(content)})
        } catch (e) {
          reject(e)
        }
      })
    })
  },

  validate (content) {
    return new Promise((resolve, reject) => {
      try {
        const config = httpdParser.parse(content)
        resolve(config)
      } catch (e) {
        reject(e)
      }
    })
  },

  save (filePath, content) {
    return new Promise((resolve, reject) => {
      this.validate(content).then(() => {
        fs.writeFile(filePath, content, 'utf8', (err) => {
          if (err) return reject(err)
          resolve()
        })
      }).catch(e => {
        reject(e)
      })
    })
  }
}

export const HostsLoader = {
  load (filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) return reject(err)
        try {
          resolve({content})
        } catch (e) {
          reject(e)
        }
      })
    })
  },

  save (filePath, content) {
    return new Promise((resolve, reject) => {
      fs.writeFile(HOSTS_TEMP_PATH, content, 'utf8', (err) => {
        if (err) return reject(err)

        // Add line ' type path1 > path2' to the and of run-as script
        const customCommand = ' ' + RUNAS_TEMPLATE + 'type ' + HOSTS_TEMP_PATH + ' > ' + filePath
        fs.writeFile(RUNAS_TEMP_PATH, customCommand, 'utf8', (err) => {
          if (err) return reject(err)

          // Run script
          const process = spawn(RUNAS_TEMP_PATH, [], {
            detached: true
          })
          process.unref()
          process.on('exit', (code) => {
            resolve()
          })
        })
      })
    })
  }
}
