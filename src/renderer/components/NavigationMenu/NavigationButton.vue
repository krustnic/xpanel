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
    $height: 40px;
    $angle: 10px;

    .navigation-button {
        color: white;
        text-decoration: none;
        width: 100%;
        height: $height;
        text-align: center;
        display: flex;
        justify-content: center;
        flex-direction: column;
        background-color: #353b45;
        background-image: linear-gradient(#3a3f4b, #353b45);
        border-radius: 0px;
        box-sizing: border-box;
        position: relative;
        margin-bottom: 2px;
        outline: none;

        &:hover {
            background-image: linear-gradient(#3e4451, #3a3f4b);
        }

        &.router-link-active:after {
            content: "";
            position: absolute;
            bottom: 0;
            width: 0;
            height: 0;
            border-top: $height / 2 solid transparent;
            border-bottom: $height / 2 solid transparent;
        }

        &.router-link-active:after {
            left: 0;
            border-left: $angle solid $active-color;
        }

    }
</style>