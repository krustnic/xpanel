<template>
    <button class="x-button" @click="onClick" :class="classes">
        <slot></slot>
    </button>
</template>

<script>
    export default {
      props: {
        type: {
          type: String,
          default: 'default'
        }
      },
      computed: {
        classes () {
          return {
            'success': this.type === 'success'
          }
        }
      },
      data () {
        return {}
      },
      methods: {
        onClick () {
          this.$emit('on-click')
        }
      }
    }
</script>

<style lang="scss" scoped>
    .x-button {
        color: white;
        text-decoration: none;
        height: 24px;
        text-align: center;
        border: 1px solid #181a1f;
        background-color: #353b45;
        /*background-image: linear-gradient(#3a3f4b, #353b45);*/
        border-radius: 0px;
        box-sizing: border-box;
        padding-left: 6px;
        padding-right: 6px;
        font-size: 14px;

        &.success {
            border: 1px solid $active-color;
            background-color: $active-color;
            color: white;
        }
    }
</style>