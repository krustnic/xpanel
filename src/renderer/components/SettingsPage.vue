<template>
    <div class="grid settings-page">
        <div style="text-align: right">
            <x-button @click="save" icon="fa-save" type="success">Save</x-button>
        </div>
        <hr>
        <x-form-group label="XAMPP path:">
            <x-input v-model="settings.xamppRoot"></x-input>
        </x-form-group>

        <x-form-group label="Hosts file path:">
            <x-input v-model="settings.hostsPath"></x-input>
        </x-form-group>
    </div>
</template>

<script>
  import {MUTATION_TYPE, GETTER_TYPE} from '@/utils/types'
  import {mapGetters, mapMutations} from 'vuex'
  import XFormGroup from '@/components/XFormGroup'
  import XInput from '@/components/XInput'
  import XButton from '@/components/XButton'

  export default {
    components: {XFormGroup, XInput, XButton},
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
        GETTER_TYPE.Settings.xamppRoot,
        GETTER_TYPE.Settings.hostsPath
      ])
    },
    methods: {
      ...mapMutations('Settings', [
        MUTATION_TYPE.Settings.setXamppRoot,
        MUTATION_TYPE.Settings.setHostsPath
      ]),
      save () {
        // TODO: Validation
        this.setXamppRoot(this.settings.xamppRoot)
        this.setHostsPath(this.settings.hostsPath)
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