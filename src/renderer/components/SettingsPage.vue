<template>
    <div class="grid settings-page">
        <div style="text-align: right">
            <x-button @click="save" icon="fa-save" type="success">Save</x-button>
        </div>
        <hr>
        <div>XAMPP path:</div>
        <x-input v-model="settings.xamppRoot"></x-input>
        <div>Hosts file path:</div>
        <x-input v-model="settings.hostsPath"></x-input>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import XInput from '@/components/XInput'
  import XButton from '@/components/XButton'

  export default {
    components: {XInput, XButton},
    data () {
      return {
        settings: {
          xamppRoot: '',
          hostsPath: ''
        }
      }
    },
    created () {
      this.settings.xamppRoot = this.xamppRoot
      this.settings.hostsPath = this.hostsPath
    },
    computed: {
      ...mapGetters('Settings', [
        'xamppRoot',
        'hostsPath'
      ])
    },
    methods: {
      save () {
        // TODO: Validation
        this.$store.commit('Settings/SET_XAMPP_ROOT', this.settings.xamppRoot)
        this.$store.commit('Settings/SET_HOSTS_PATH', this.settings.hostsPath)
      }
    }
  }
</script>

<style lang="scss" scoped>
    .grid {
        /*display: grid;*/
    }

    .settings-page {
        padding: 4px;
    }
</style>