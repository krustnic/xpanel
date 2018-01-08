<template>
    <div class="x-input">
        <input class="input" :class="classes" :value="value" @input="onChange" :disabled="disabled" type="text">
    </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      classes () {
        return {
          'disabled': this.disabled
        }
      }
    },
    data () {
      return {}
    },
    methods: {
      onChange (e) {
        this.$emit('input', e.target.value)
      }
    }
  }
</script>

<style lang="scss" scoped>
    .x-input {
        .input {
            width: 100%;
            padding: 5px;
            background-color: #262a33;
            border: 1px solid #3c4049;
            color: #d7dae0;
            box-sizing: border-box;

            &.disabled {
                cursor: pointer;
            }
        }
    }
</style>