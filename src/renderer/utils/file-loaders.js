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
  }
}
