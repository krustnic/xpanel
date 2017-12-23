import { shallow } from 'vue-test-utils'
import ConfigEditor from '@/components/httpd-editor/config-viewer.vue'
import {DIRECTIVE_TYPE} from '@/utils/types'
import peg from 'pegjs'
import fs from 'fs'

const configFileContent = fs.readFileSync('test/unit/parsers/vhosts.conf', 'utf8')
const httpdConfigGrammar = fs.readFileSync('src/renderer/parsers/httpd-config-grammar.pegjs', 'utf8')
const parser = peg.generate(httpdConfigGrammar)
const config = parser.parse(configFileContent)

let wrapper = shallow(ConfigEditor, {
  propsData: {
    config: config
  }
})

describe('config-editor.vue', () => {
  describe('filteredDirectives', () => {
    let filterdDirectives = null

    beforeEach(() => {
      filterdDirectives = wrapper.vm.filteredDirectives
    })

    it('Should return only directives with specific types', () => {
      filterdDirectives.map(directive => {
        expect([
          DIRECTIVE_TYPE.SCOPED,
          DIRECTIVE_TYPE.PLAIN
        ].indexOf(directive.type)).not.toEqual(-1)
      })
    })
  })

  describe('formattedDirectives', () => {
    it('Should return array of specific objects for all directives', () => {
      const formattedDirectives = wrapper.vm.formattedDirectives
      expect(formattedDirectives.length).toEqual(config.body.length)
      formattedDirectives.map(directive => {
        expect(directive).toBeInstanceOf(Object)
        expect(directive.type).toBeDefined()
        expect(directive.directive).toBeDefined()
        expect(directive.name).toBeDefined()
        expect(directive.value).toBeDefined()
      })
    })
  })
})
