<template>
    <select class="select">
        <option v-for="(item, index) in options" :key="index" :value="item[value]">{{ item[label] }}</option>
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
      label: {
        type: String,
        default: 'label'
      },
      value: {
        type: String,
        default: 'value'
      }
    },
    data () {
      return {}
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