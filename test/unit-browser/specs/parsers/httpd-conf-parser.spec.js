import peg from 'pegjs'
import fs from 'fs'

const httpdConfigGrammar = fs.readFileSync('src/renderer/utils/parsers/httpd-config-grammar.pegjs')
const vhostConfigRaw = fs.readFileSync('test/unit/specs/parsers/vhosts.conf')
const parser = peg.generate(httpdConfigGrammar)
const r = parser.parse(vhostConfigRaw)

console.log(r)
