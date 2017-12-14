<template>
    <div>
        <span v-for="view in views" @click="selectView(view)">{{ view.name || 'File' }} > </span>
    </div>
</template>

<script>
  export default {
    props: {
      views: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {}
    },
    methods: {
      selectView (view) {
        this.$emit('on-select-view', view)
      }
    }
  }
</script>

<style>

</style>