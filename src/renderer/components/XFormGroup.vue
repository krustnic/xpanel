<template>
    <div class="grid x-form-group">
        <div v-if="label" class="label">{{ label }}</div>
        <slot></slot>
    </div>
</template>

<script>
  export default {
    props: {
      label: {
        type: String,
        default: null
      }
    },
    data () {
      return {}
    }
  }
</script>

<style scoped>
    .grid {

    }

    .x-form-group {
        margin-top: 5px;
    }
</style>