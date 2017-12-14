<template>
  <div id="app">
    <div>
      <router-link to="/apache">Apache</router-link>
      <router-link to="/hosts">Hosts</router-link>
      <router-link to="/httpd-editor">Editor</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: 'xpanel',
    methods: {
      ...mapActions('State', [
        'initializeState'
      ])
    },
    created () {
      console.log('created')
      this.initializeState().then(() => {
        console.log('init state')
      })
    }
  }
</script>

<style lang="scss">
  body {
    background-color: $body-color;
    color: $main-text-color;
    font-family: $main-font-family;
    font-size: 14px;
  }

  input {
    font-family: $main-font-family
  }
</style>
