<template>
    <label :class="classes">
        <input v-model="localValue" @change="change" type="checkbox">
        <span class="text">
            <slot></slot>
        </span>
    </label>
</template>

<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      },
      block: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        localValue: this.value
      }
    },
    computed: {
      classes () {
        return {
          'block': this.block
        }
      }
    },
    methods: {
      change () {
        this.$emit('input', this.localValue)
      }
    },
    watch: {
      value () {
        this.localValue = this.value
      }
    }
  }
</script>

<style lang="scss" scoped>
    .text {
        position: relative;
        top: -2px;
    }

    .block {
        display: block;
    }
</style>