<template>
    <div @click="selectView" class="directive">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    props: {
      directive: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {}
    },
    methods: {
      selectView () {
        this.$emit('on-select-view', this.directive)
      }
    }
  }
</script>

<style lang="scss" scoped>
    .directive {
        background-color: $main-bg-color;
        border: 1px solid $main-border-color;
        padding: 5px;
        margin-bottom: 5px;

        &:hover {
            background-color: lighten($main-bg-color, 7%);
            cursor: pointer;
        }
    }
</style>