<template>
    <router-link class="navigation-button" :to="to">{{ name }}</router-link>
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        default: ''
      },
      to: {
        type: String,
        default: '/'
      }
    },
    data () {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
    .navigation-button {
        color: white;
        text-decoration: none;
        width: 100%;
        height: 40px;
        text-align: center;
        display: flex;
        justify-content: center;
        flex-direction: column;
        border: 1px solid #181a1f;
        background-color: #353b45;
        background-image: linear-gradient(#3a3f4b, #353b45);
        border-radius: 5px;
        box-sizing: border-box;

        &:hover {
            background-image: linear-gradient(#3e4451, #3a3f4b);
        }

        &.router-link-active {
            border-left: 4px solid $active-color;
        }
    }
</style>