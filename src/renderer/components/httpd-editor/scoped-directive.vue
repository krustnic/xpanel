<template>
    <div>
        <div class="default-scope__scope">{{ scope.name }} <span>{{ area }}</span></div>
        <div class="default-scope__directives">
            <slot></slot>
        </div>
    </div>
</template>

<script>
  export default {
    props: {
      scope: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {}
    },
    computed: {
      area () {
        return this.scope.area
      }
    }
  }
</script>

<style lang="scss">
    .default-scope__scope {
        color: $color-blue;
    }
</style>