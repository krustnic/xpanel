<template>
  <div id="app">
    <div class="content">
      <navigation-menu></navigation-menu>
      <div class="views">
        <div class="main-view">
          <router-view></router-view>
        </div>
        <div class="helper-view">

        </div>
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
      console.log('created')
      this.initializeState().then(() => {
        console.log('init state')
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

  .content {
    display: flex;
    height: 100%;
  }

  .main-view {
    width: 50%;
    border-right: 1px solid #4c4c4c;
    padding-left: 5px;
    padding-right: 5px;
    min-width: 450px;
  }

  .helper-view {
    width: 50%;
  }

  .views {
    margin-left: 200px;
    width: 100%;
  }
</style>
