<template>
    <div class="grid settings-page">
        <div style="text-align: right">
            <x-button @click="save" icon="fa-save" type="success">Save</x-button>
        </div>
        <hr>
        <x-form-group label="XAMPP path:">
            <x-input-path v-model="settings.xamppRoot"></x-input-path>
        </x-form-group>

        <x-form-group label="Hosts file path:">
            <x-input v-model="settings.hostsPath"></x-input>
        </x-form-group>

        <hr>

        <x-form-group label="">
            <x-checkbox v-model="settings.isFastCGI">
                <span>Enable FastCGI (allow to use multiple php versions)</span>
            </x-checkbox>
        </x-form-group>

        <x-disable-content :disabled="!settings.isFastCGI">
            <php-versions :folders="settings.phpFolders"></php-versions>
        </x-disable-content>

        <hr>

        <div class="additional">
            <x-button @click="installFCGI">Install FastCGI</x-button>
        </div>

        <fast-cgi-modal :show="isShowFCGIModal" @on-cancel="isShowFCGIModal = false"></fast-cgi-modal>
    </div>
</template>

<script>
  import {MUTATION_TYPE, GETTER_TYPE, ACTION_TYPE} from '@/utils/types'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import XFormGroup from '@/components/XFormGroup'
  import XInput from '@/components/XInput'
  import XInputPath from '@/components/XInputPath'
  import XButton from '@/components/XButton'
  import XDisableContent from '@/components/XDisableContent'
  import XCheckbox from '@/components/XCheckbox'
  import PhpVersions from './SettingsPage/PhpVersions'
  import FastCgiModal from './SettingsPage/FastCgiModal'

  export default {
    components: {XFormGroup, XInput, XInputPath, XButton, XDisableContent, PhpVersions, FastCgiModal, XCheckbox},
    data () {
      return {
        settings: {
          xamppRoot: '',
          hostsPath: '',
          phpFolders: [],
          isFastCGI: false
        },
        isShowFCGIModal: false
      }
    },
    created () {
      this.settings.xamppRoot = this.xamppRoot
      this.settings.hostsPath = this.hostsPath
      this.settings.phpFolders = this.phpFolders.slice()
      this.settings.isFastCGI = this.isFastCGI
    },
    computed: {
      ...mapGetters('Settings', [
        GETTER_TYPE.Settings.xamppRoot,
        GETTER_TYPE.Settings.hostsPath,
        GETTER_TYPE.Settings.phpFolders,
        GETTER_TYPE.Settings.isFastCGI
      ])
    },
    methods: {
      ...mapMutations('Settings', [
        MUTATION_TYPE.Settings.setXamppRoot,
        MUTATION_TYPE.Settings.setHostsPath,
        MUTATION_TYPE.Settings.setPhpFolders,
        MUTATION_TYPE.Settings.setFastCGIFlag
      ]),
      ...mapActions('Settings', [
        ACTION_TYPE.Settings.saveState
      ]),
      save () {
        // TODO: Validation
        this.setXamppRoot(this.settings.xamppRoot)
        this.setHostsPath(this.settings.hostsPath)
        this.setPhpFolders(this.settings.phpFolders)
        this.setFastCGIFlag(this.settings.isFastCGI)
        this.saveState()
        this.$message({
          title: 'Saved',
          icon: 'fa-floppy-o'
        })
      },
      installFCGI () {
        this.isShowFCGIModal = true
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

    .additional {
        text-align: right;
    }
</style>