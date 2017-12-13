import peg from 'pegjs'
import fs from 'fs'
import expect from 'expect'

const validConfigurationFiles = [
  'test/unit/parsers/vhosts.conf',
  'test/unit/parsers/httpd.conf',
  'test/unit/parsers/httpd-xampp.conf'
  // 'test/unit/parsers/httpd-ssl.conf' // Line '\'
]

const httpdConfigGrammar = fs.readFileSync('src/renderer/parsers/httpd-config-grammar.pegjs', 'utf8')
const parser = peg.generate(httpdConfigGrammar)

describe('httpd configuration parser', () => {
  validConfigurationFiles.map(configPath => {
    it('should not throw error on valid vhost file: ' + configPath, () => {
      const content = fs.readFileSync(configPath, 'utf8')
      expect(() => {
        parser.parse(content)
      }).not.toThrow()
    })
  })
})
