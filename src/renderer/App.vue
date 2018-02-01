<template>
  <div id="app">
    <div class="container">
      <navigation-menu></navigation-menu>
      <keep-alive :include="cachedComponents">
        <router-view class="content"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import NavigationMenu from '@/components/NavigrationMenu'
  import {mapActions} from 'vuex'
  import {ACTION_TYPE} from '@/utils/types'

  export default {
    components: {NavigationMenu},
    name: 'xpanel',
    data () {
      return {
        cachedComponents: [
          'vhosts-page',
          'log-page',
          'constructor-page'
        ]
      }
    },
    methods: {
      ...mapActions('State', [
        ACTION_TYPE.State.updateApacheState
      ])
    },
    created () {
      this.updateApacheState()
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

  }
</style>
