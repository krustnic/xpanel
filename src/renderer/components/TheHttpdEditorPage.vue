<template>
    <div>
        <button @click="open">Open Vhosts</button>
        <button @click="view">Print</button>

        <hr>

        <vhosts-component :config="getCurrentFileConfig"></vhosts-component>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import VhostsComponent from './TheHttpdEditorPage/vhosts'

  export default {
    components: {VhostsComponent},
    data () {
      return {}
    },
    methods: {
      open () {
        this.$store.dispatch('Files/loadHttpdFile', 'C:\\xampp\\apache\\conf\\extra\\httpd-vhosts.conf').then(config => {
          console.log(config)
        }).catch(error => {
          console.log(error)
        })
      },
      view () {
        console.log('Config', this.getCurrentFileConfig)
      }
    },
    computed: {
      ...mapGetters('Files', [
        'getCurrentFileConfig'
      ])
    }
  }
</script>