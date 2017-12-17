<template>
    <div class="add-virtual-host">
        <div style="margin-bottom: 5px;">
            <div>ServerName</div>
            <x-input v-model="config.serverName" type="text"></x-input>
        </div>
        <div>
            <div>DocumentRoot</div>
            <x-input v-model="config.documentRoot" type="text"></x-input>
        </div>
        <div style="margin-top: 10px; text-align: right">
            <x-button type="success">Create</x-button>
        </div>
    </div>
</template>

<script>
  import XInput from '@/components/XInput'
  import XButton from '@/components/XButton'

  export default {
    components: {XInput, XButton},
    data () {
      return {
        config: {
          serverName: '',
          documentRoot: ''
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
    .add-virtual-host {
        padding: 5px;
    }
</style>