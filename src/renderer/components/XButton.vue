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
        onClick (e) {
          this.$emit('click', e)
        }
      }
    }
</script>

<style lang="scss" scoped>
    $default-color: #353b45;

    .x-button {
        color: white;
        text-decoration: none;
        min-height: 24px;
        text-align: center;
        border: 0px solid $default-color;
        background-color: $default-color;
        border-radius: 0px;
        box-sizing: border-box;
        padding-left: 6px;
        padding-right: 6px;
        font-size: 14px;
        /*box-shadow: 4px 1px 8px 1px rgba(0, 0, 0, 0.43);*/

        &:hover {
            background-color: lighten($default-color, 7%);
        }

        &.success {
            border: 1px solid $active-color;
            background-color: $active-color;
            color: white;

            &:hover {
                background-color: lighten($active-color, 7%);
            }
        }

        &.danger {
            border: 1px solid $danger-color;
            background-color: $danger-color;
            color: white;

            &:hover {
                background-color: lighten($danger-color, 7%);
            }
        }

        .rotation {
            -webkit-animation: rotation 2s infinite linear;
        }
    }
</style>