<template>
    <div class="virtualhost-teaser">
        <div class="virtualhost-teaser__server-name">{{ serverName }}</div>
        <div class="virtualhost-teaser__document-root">{{ documentRoot }}</div>
    </div>
</template>

<script>
  import {DIRECTIVE_TYPES} from '@/utils/types'

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
      // Return only PLAIN directives from scope
      directives () {
        const directives = {}
        this.scope.body.forEach(item => {
          if (item.type !== DIRECTIVE_TYPES.PLAIN || item.parameters.length === 0) return true
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
    .virtualhost-teaser {
        margin-left: 10px;
    }

    .virtualhost-teaser__server-name {
        color: $color-green;
    }

    .virtualhost-teaser__document-root {
        color: $color-green;
    }
</style>