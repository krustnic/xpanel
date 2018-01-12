<template>
    <div class="x-disable-content">
        <div v-show="disabled" ref="shadow" class="shadow"></div>
        <slot></slot>
    </div>
</template>

<script>
  export default {
    props: {
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {}
    },
    mounted () {
      this.updateSize()
    },
    watch: {
      disabled () {
        this.updateSize()
      }
    },
    methods: {
      updateSize () {
        this.$refs.shadow.style.width = `${this.$el.offsetWidth}px`
        this.$refs.shadow.style.height = `${this.$el.offsetHeight}px`
      }
    }
  }
</script>

<style lang="scss" scoped>
    .x-disable-content {
        position: relative;

        & .shadow {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 200;
            background-color: rgba(38, 42, 51, 0.89);
            cursor: not-allowed;
        }
    }
</style>