<template>
    <div style="background-color: #ffc100;color:white;">
        <div>{{ scope.name }}</div>
        <div>
            <input :value="area" disabled type="text">
        </div>
        <div>
            <input :value="serverName" disabled type="text">
        </div>
        <div>
            <input :value="documentRoot" disabled type="text">
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
      },
      directives () {
        const directives = {}
        this.scope.body.forEach(item => {
          if (item.type !== 'directive' || item.parameters.length === 0) return true
          directives[item.name] = item.parameters[0].value
        })
        return directives
      },
      serverName () {
        return this.directives['ServerName'] || ''
      },
      documentRoot () {
        return this.directives['DocumentRoot'] || ''
      }
    }
  }
</script>

<style lang="scss">

</style>