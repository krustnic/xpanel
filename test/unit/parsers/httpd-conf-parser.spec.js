import peg from 'pegjs'
import fs from 'fs'
import expect from 'expect'
import {DIRECTIVE_TYPES} from '@/utils/types'

const validConfigurationFiles = [
  'test/unit/parsers/vhosts.conf',
  'test/unit/parsers/httpd.conf',
  'test/unit/parsers/httpd-xampp.conf'
  // 'test/unit/parsers/httpd-ssl.conf' // Line '\'
]

const httpdConfigGrammar = fs.readFileSync('src/renderer/parsers/httpd-config-grammar.pegjs', 'utf8')
const parser = peg.generate(httpdConfigGrammar)

const iterateAll = (configArray, callback) => {
  configArray.forEach(item => {
    if (callback) callback(item)
    if (item.type === DIRECTIVE_TYPES.SCOPED) iterateAll(item.body)
  })
}

describe('httpd configuration parser', () => {
  validConfigurationFiles.map(configPath => {
    const content = fs.readFileSync(configPath, 'utf8')
    it('should not throw error on valid vhost file: ' + configPath, () => {
      expect(() => {
        parser.parse(content)
      }).not.toThrow()
    })

    it('every item has "type" property with allowable value', () => {
      const parsedConfig = parser.parse(content)

      iterateAll(parsedConfig, (item) => {
        expect(item.type).not.toBeUndefined()
        expect(DIRECTIVE_TYPES).toHaveProperty(item.type)
      })
    })

    it('every scoped directive has "body" property of "Array" type', () => {
      const parsedConfig = parser.parse(content)

      iterateAll(parsedConfig, (item) => {
        if (item.type === DIRECTIVE_TYPES.SCOPED) {
          expect(item.body).toBeDefined()
          expect(item.body).toBeInstanceOf(Array)
        }
      })
    })
  })
})
