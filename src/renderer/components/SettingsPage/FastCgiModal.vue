<template>
    <x-modal v-model="show" @on-confirm="install" @on-cancel="cancel" title="Do you want to enable FastCGI?">
        <template slot="content">
            <x-checkbox v-model="jobs.backup">
                Create backup of httpd-xampp.conf
            </x-checkbox>
            <x-checkbox v-model="jobs.update">
                Update httpd-xampp.conf
            </x-checkbox>
            <x-checkbox v-model="jobs.copy">
                Copy FastCGI libraries
            </x-checkbox>
        </template>
    </x-modal>
</template>

<script>
  import XModal from '@/components/XModal'
  import XCheckbox from '@/components/XCheckbox'
  import {mapGetters} from 'vuex'
  import {GETTER_TYPE} from '@/utils/types'
  import FastCGI from '@/utils/FastCGI'

  export default {
    components: {XModal, XCheckbox},
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        jobs: {
          backup: true,
          update: true,
          copy: true
        }
      }
    },
    computed: {
      ...mapGetters('Settings', [
        GETTER_TYPE.Settings.xamppRoot
      ])
    },
    methods: {
      install () {
        this.runJobs().then(() => {
          this.$message({
            type: 'success',
            title: 'Complite'
          })
          this.cancel()
        }).catch(e => {
          console.log(e)
          this.$message({
            type: 'error',
            title: 'Error'
          })
        })
      },

      async runJobs () {
        const fastCGI = new FastCGI(this.xamppRoot)
        if (this.jobs.backup) {
          if (!fastCGI.isBackupExist()) {
            await fastCGI.createBackup()
          }
        }

        if (this.jobs.update) {
          await fastCGI.updateXamppConfig()
        }

        if (this.jobs.copy) {
          await fastCGI.copyFastCGIModule()
        }
      },

      cancel () {
        this.$emit('on-cancel')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>