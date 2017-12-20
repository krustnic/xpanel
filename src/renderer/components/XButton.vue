<template>
    <button class="x-button" @click="onClick" :class="classes" :disabled="loading">
        <i v-if="icon && !loading" :class="'fa ' + icon" aria-hidden="true"></i>
        <i v-if="loading" class="fa fa-circle-o-notch rotation" aria-hidden="true"></i>
        <slot></slot>
    </button>
</template>

<script>
    export default {
      props: {
        type: {
          type: String,
          default: 'default'
        },
        icon: {
          type: String,
          default: null
        },
        loading: {
          type: Boolean,
          default: false
        }
      },
      computed: {
        classes () {
          return {
            'success': this.type === 'success',
            'danger': this.type === 'danger'
          }
        }
      },
      data () {
        return {}
      },
      methods: {
        onClick () {
          this.$emit('click')
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
        box-shadow: 4px 1px 8px 1px rgba(0, 0, 0, 0.43);

        &.success {
            border: 1px solid $active-color;
            background-color: $active-color;
            color: white;
        }

        &.danger {
            border: 1px solid $danger-color;
            background-color: $danger-color;
            color: white;
        }

        .rotation {
            -webkit-animation: rotation 2s infinite linear;
        }
    }
</style>