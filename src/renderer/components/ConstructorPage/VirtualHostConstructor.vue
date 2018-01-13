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
            <select></select>
        </x-form-group>

        <hr>

        <x-button type="success">Copy</x-button>
    </div>
</template>

<script>
  import XFormGroup from '@/components/XFormGroup'
  import XInput from '@/components/XInput'
  import XPathInput from '@/components/XPathInput'
  import XButton from '@/components/XButton'

  export default {
    components: {XFormGroup, XInput, XPathInput, XButton},
    data () {
      return {
        settings: {
          port: '80',
          directory: '',
          serverName: '',
          accessLog: '',
          errorLog: ''
        }
      }
    }
  }
</script>

<style scoped>
    .virtual-host-constructor {
        padding: 4px;
    }
</style>