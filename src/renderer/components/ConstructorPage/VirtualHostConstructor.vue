<template>
    <div class="virtual-host-constructor">
        <x-form-group label="Port">
            <x-input v-model="settings.port"></x-input>
        </x-form-group>

        <x-form-group label="ServerName">
            <x-input v-model="settings.serverName"></x-input>
        </x-form-group>

        <x-form-group label="Directory">
            <x-path-input v-model="settings.directory"></x-path-input>
        </x-form-group>

        <x-form-group label="AccessLog">
            <x-path-input v-model="settings.accessLog"></x-path-input>
        </x-form-group>

        <x-form-group label="ErrorLog">
            <x-path-input v-model="settings.errorLog"></x-path-input>
        </x-form-group>

        <x-form-group label="PHP version (FastCGI)">
            <x-select :options="phpFolders" label="label" value="path"></x-select>
        </x-form-group>

        <hr>

        <x-button type="success">Copy {{settings.phpPath}}</x-button>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {GETTER_TYPE} from '@/utils/types'
  import XFormGroup from '@/components/XFormGroup'
  import XInput from '@/components/XInput'
  import XPathInput from '@/components/XPathInput'
  import XButton from '@/components/XButton'
  import XSelect from '@/components/XSelect'
  import {template} from 'lodash'
  import path from 'path'
  import fs from 'fs'

  export default {
    components: {XFormGroup, XInput, XPathInput, XButton, XSelect},
    data () {
      return {
        settings: {
          port: '80',
          directory: '',
          serverName: '',
          accessLog: '',
          errorLog: '',
          customLog: '',
          phpPath: ''
        },
        compiledTemplate: null
      }
    },
    computed: {
      ...mapGetters('Settings', [
        GETTER_TYPE.Settings.phpFolders
      ])
    },
    created () {
      this.compiledTemplate = template(fs.readFileSync(path.join(__static, 'apache\\vhost-template.conf')))
      this.generate()
    },
    methods: {
      generate () {
        const content = this.compiledTemplate({
          port: this.settings.port,
          directory: this.settings.directory,
          serverName: this.settings.serverName,
          accessLog: this.settings.accessLog,
          errorLog: this.settings.errorLog,
          customLog: this.settings.customLog,
          phpPath: this.settings.phpPath
        })
        this.$emit('on-generate', content)
      }
    },
    watch: {
      settings: {
        handler () {
          this.generate()
        },
        deep: true
      }
    }
  }
</script>

<style scoped>
    .virtual-host-constructor {
        padding: 4px;
    }
</style>