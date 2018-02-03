<template>
    <div class="virtual-host-constructor">
        <x-form-group label="Port">
            <x-input v-model="settings.port"></x-input>
        </x-form-group>

        <x-form-group label="ServerName">
            <x-input v-model="settings.serverName"></x-input>
        </x-form-group>

        <x-form-group label="Directory">
            <x-input-path v-model="settings.directory"></x-input-path>
        </x-form-group>

        <x-form-group label="AccessLog directory">
            <x-input-path v-model="settings.accessLog"></x-input-path>
        </x-form-group>

        <x-form-group label="ErrorLog directory">
            <x-input-path v-model="settings.errorLog"></x-input-path>
        </x-form-group>

        <x-form-group label="PHP version (FastCGI)">
            <x-select v-model="settings.phpPath" :options="phpOptions" label-field="label" value-field="path"></x-select>
        </x-form-group>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {GETTER_TYPE} from '@/utils/types'
  import XFormGroup from '@/components/XFormGroup'
  import XInput from '@/components/XInput'
  import XInputPath from '@/components/XInputPath'
  import XButton from '@/components/XButton'
  import XSelect from '@/components/XSelect'
  import {template} from 'lodash'
  import path from 'path'
  import fs from 'fs'

  export default {
    components: {XFormGroup, XInput, XInputPath, XButton, XSelect},
    data () {
      return {
        settings: {
          port: '80',
          directory: '',
          serverName: 'local.example.com',
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
      ]),
      phpOptions () {
        const arr = this.phpFolders.slice()
        arr.unshift({
          label: ' ',
          path: ''
        })

        return arr
      }
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
          phpPath: this.settings.phpPath.replace(/\\/g, '/')
        }).replace(/^\s*\n/gm, '') // Remove blank lines
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