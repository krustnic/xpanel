import { shallow } from 'vue-test-utils'
import ConfigEditor from '@/components/httpd-editor/config-viewer.vue'
import {DIRECTIVE_TYPES} from '@/utils/types'
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
    it('Should return only directives with specific types', () => {
      const filterdDirectives = wrapper.vm.filteredDirectives
      filterdDirectives.map(directive => {
        expect([
          DIRECTIVE_TYPES.SCOPED
        ].indexOf(directive.type)).not.toEqual(-1)
      })
    })
  })
})
