<template>
    <div class="directive-scope">
        <div class="scope">{{ directive.name }} <span>{{ properties }}</span></div>
        <div class="teaser">
            <slot></slot>
        </div>
    </div>
</template>

<script>
  import directiveMixin from './directive-mixin'

  export default {
    mixins: [directiveMixin]
  }
</script>

<style lang="scss" scoped>
    .directive-scope {
        .scope {
            color: $color-blue;
        }
    }
</style>