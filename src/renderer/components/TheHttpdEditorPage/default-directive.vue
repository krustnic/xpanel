<template>
    <div>
        {{ directive.name }}
        <div>
            <input :value="properties" disabled type="text">
        </div>
    </div>
</template>

<script>
  export default {
    props: {
      directive: {
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
      properties () {
        return this.directive.parameters.map(param => {
          return param.value
        }).join(', ')
      }
    }
  }
</script>

<style>

</style>