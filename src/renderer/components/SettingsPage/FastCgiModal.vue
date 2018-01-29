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
    methods: {
      install () {
        console.log('install')
      },
      cancel () {
        this.$emit('on-cancel')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>