<template>
    <div class="menu">
        <navigation-button to="/services" name="Services"></navigation-button>
        <navigation-button to="/vhosts" name="Virtual Hosts"></navigation-button>
        <navigation-button to="/hosts" name="Hosts"></navigation-button>
        <navigation-button to="/settings" name="Settings"></navigation-button>
        <navigation-button to="/log" name="Logs"></navigation-button>
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
        padding: 4px;
        box-sizing: border-box;
        border-right: 1px solid #4c4c4c;
        z-index: 100;
        background-color: $body-color;
    }
</style>