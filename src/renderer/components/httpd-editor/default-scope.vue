<template>
    <div style="background-color: #04afff;color:white;">
        <div>{{ scope.name }}</div>
        <div>
            <input :value="area" disabled type="text">
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

<style>

</style>