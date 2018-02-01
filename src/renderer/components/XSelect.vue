<template>
    <select v-model="localValue" @change="change" class="select">
        <option v-for="(item, index) in options" :key="index" :value="item[valueField]">{{ item[labelField] }}</option>
    </select>
</template>

<script>
  export default {
    props: {
      options: {
        type: Array,
        default () {
          return []
        }
      },
      labelField: {
        type: String,
        default: 'label'
      },
      valueField: {
        type: String,
        default: 'value'
      },
      value: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        localValue: ''
      }
    },
    created () {
      this.localValue = this.value
    },
    watch: {
      value () {
        this.localValue = this.value
      }
    },
    methods: {
      change () {
        this.$emit('input', this.localValue)
      }
    }
  }
</script>

<style lang="scss" scoped>
    .select {
        width: 100%;
        height: 24px;
        background-color: #262a33;
        border: 1px solid #3c4049;
        color: #d7dae0;
        box-sizing: border-box;
    }
</style>