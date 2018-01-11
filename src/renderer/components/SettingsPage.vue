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

        <php-versions :folders="settings.folders"></php-versions>
    </div>
</template>

<script>
  import {MUTATION_TYPE, GETTER_TYPE, ACTION_TYPE} from '@/utils/types'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import XFormGroup from '@/components/XFormGroup'
  import XInput from '@/components/XInput'
  import XButton from '@/components/XButton'
  import PhpVersions from './SettingsPage/PhpVersions'

  export default {
    components: {XFormGroup, XInput, XButton, PhpVersions},
    data () {
      return {
        settings: {
          xamppRoot: '',
          hostsPath: '',
          folders: [
            {
              path: '123',
              label: '5.4'
            },
            {
              path: '321',
              label: '5.5'
            }
          ]
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
      ...mapActions('Settings', [
        ACTION_TYPE.Settings.saveState
      ]),
      save () {
        console.log(JSON.stringify(this.$store.state.Settings))
        // TODO: Validation
        this.setXamppRoot(this.settings.xamppRoot)
        this.setHostsPath(this.settings.hostsPath)
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