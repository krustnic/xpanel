<template>
    <div class="menu">
        <navigation-button to="/apache" name="Services"></navigation-button>
        <navigation-button to="/vhosts-page" name="Virtual Hosts"></navigation-button>
        <navigation-button to="/hosts" name="Hosts"></navigation-button>
        <navigation-button to="/settings" name="Settings"></navigation-button>
        <navigation-button to="/test" name="Test"></navigation-button>
    </div>
</template>

<script>
  import NavigationButton from './NavigationMenu/NavigationButton'

  export default {
    components: {NavigationButton},
    data () {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
    .menu {
        width: 200px;
        height: 100%;
        position: fixed;
        padding: 4px;
        box-sizing: border-box;
        border-right: 1px solid #4c4c4c;
    }
</style>