<template>
  <div id="app">
    <div class="container">
      <navigation-menu></navigation-menu>
      <router-view class="content"></router-view>
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
  @import './sass/app.scss';

  .container {
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-template-rows: 100vh;
  }

  .content {
    padding: 4px;
  }
</style>
