import fs from 'fs'
import _path from 'path'
import {Runner} from '@/utils/runners'

export default {
  validate (path) {
    return new Promise((resolve, reject) => {
      // 1. Folder should exist
      if (!fs.existsSync(path)) return reject(new Error('Folder doesn\'t exist'))
      // 2. php.exe should exist
      if (!fs.existsSync(_path.join(path, 'php.exe'))) return reject(new Error('php.exe doesn\'t exist'))
      // 3. php-cgi.exe should exist
      if (!fs.existsSync(_path.join(path, 'php-cgi.exe'))) return reject(new Error('php-cgi.exe doesn\'t exist'))

      const runner = new Runner(_path.join(path, 'php.exe'), ['-r', 'echo phpversion();'])
      const logs = []
      runner.onLog(log => {
        logs.push(log)
      })

      runner.onExit((code) => {
        if (code !== 0 || logs.length === 0) return reject(new Error('Can\'t run php.exe'))
        resolve(logs[0].message)
      })

      runner.run()
    })
  }
}
