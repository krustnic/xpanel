<template>
  <div id="app">
    <div class="container">
      <div class="menu">
        <navigation-menu></navigation-menu>
      </div>
      <div class="views">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import NavigationMenu from '@/components/NavigrationMenu'
  import {mapActions} from 'vuex'

  export default {
    components: {NavigationMenu},
    name: 'xpanel',
    methods: {
      ...mapActions('State', [
        'initializeState'
      ])
    },
    created () {
      this.initializeState().then(() => {
        // console.log('init state')
      })
    }
  }
</script>

<style lang="scss">
  @import '../../node_modules/font-awesome/css/font-awesome.min.css';

  html {
    height: 100%;
  }

  body {
    background-color: $body-color;
    color: $main-text-color;
    font-family: $main-font-family;
    font-size: 14px;
    margin: 0;
    height: 100%;
  }

  #app {
    height: 100%;
  }

  input {
    font-family: $main-font-family
  }

  hr {
    border-color: #3e3e3e;
  }

  .container {
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-template-rows: 1fr;
  }

  .views {
    height: 100%;
  }
</style>
