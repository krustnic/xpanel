import peg from 'pegjs'
import fs from 'fs'
import expect from 'expect'
import {DIRECTIVE_TYPE} from '@/utils/types'
import path from 'path'

const validConfigurationFiles = [
  'test/unit/parsers/vhosts.conf',
  'test/unit/parsers/httpd.conf',
  'test/unit/parsers/httpd-xampp.conf'
  // 'test/unit/parsers/httpd-ssl.conf' // Line '\'
]

const httpdConfigGrammar = fs.readFileSync(path.join(__static, 'httpd-config-grammar.pegjs'), 'utf8')
const parser = peg.generate(httpdConfigGrammar)

const iterateAll = (configArray, callback) => {
  configArray.forEach(item => {
    if (callback) callback(item)
    if (item.type === DIRECTIVE_TYPE.SCOPED) iterateAll(item.body)
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

    it('first configuration level should have fake type "ROOT" and "body" property', () => {
      const parsedConfig = parser.parse(content)

      expect(parsedConfig.type).toBeDefined()
      expect(parsedConfig.type).toEqual(DIRECTIVE_TYPE.ROOT)
      expect(parsedConfig.body).toBeDefined()
    })

    it('every item has "type" property with allowable value', () => {
      const parsedConfig = parser.parse(content)

      iterateAll(parsedConfig.body, (item) => {
        expect(item.type).not.toBeUndefined()
        expect(DIRECTIVE_TYPE).toHaveProperty(item.type)
      })
    })

    it('every scoped directive has "body" property of "Array" type', () => {
      const parsedConfig = parser.parse(content)

      iterateAll(parsedConfig.body, (item) => {
        if (item.type === DIRECTIVE_TYPE.SCOPED) {
          expect(item.body).toBeDefined()
          expect(item.body).toBeInstanceOf(Array)
        }
      })
    })

    it('every directive has "location" property', () => {
      const parsedConfig = parser.parse(content)

      iterateAll(parsedConfig.body, (item) => {
        expect(item.location).toBeDefined()
      })
    })

    it('every directive has "parameters" property as Array', () => {
      const parsedConfig = parser.parse(content)

      iterateAll(parsedConfig.body, (item) => {
        expect(item.parameters).toBeDefined()
        expect(item.parameters).toBeInstanceOf(Array)
      })
    })
  })
})
