import peg from 'pegjs'
import fs from 'fs'

const httpdParser = peg.generate(fs.readFileSync('src/renderer/parsers/httpd-config-grammar.pegjs', 'utf8'))

export const HttpdLoader = {
  load (path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf8', (err, content) => {
        if (err) reject(err)
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
  save (path, content) {
    return new Promise((resolve, reject) => {
      this.validate(content).then(() => {
        fs.writeFile(path, content, 'utf8', (err) => {
          if (err) reject(err)
          resolve()
        })
      }).catch(e => {
        reject(e)
      })
    })
  }
}
