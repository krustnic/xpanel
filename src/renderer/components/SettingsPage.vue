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

        <hr>

        <x-form-group label="">
            <label>
                <input type="checkbox" v-model="settings.isFastCGI"><span>Enable FastCGI (allow to use multiple php versions)</span>
            </label>
        </x-form-group>

        <x-disable-content :disabled="!settings.isFastCGI">
            <php-versions :folders="settings.phpFolders"></php-versions>
        </x-disable-content>
    </div>
</template>

<script>
  import {MUTATION_TYPE, GETTER_TYPE, ACTION_TYPE} from '@/utils/types'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import XFormGroup from '@/components/XFormGroup'
  import XInput from '@/components/XInput'
  import XButton from '@/components/XButton'
  import XDisableContent from '@/components/XDisableContent'
  import PhpVersions from './SettingsPage/PhpVersions'

  export default {
    components: {XFormGroup, XInput, XButton, XDisableContent, PhpVersions},
    data () {
      return {
        settings: {
          xamppRoot: '',
          hostsPath: '',
          phpFolders: [],
          isFastCGI: false
        }
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
        console.log(JSON.stringify(this.$store.state.Settings))
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