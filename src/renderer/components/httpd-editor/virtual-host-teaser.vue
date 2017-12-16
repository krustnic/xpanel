<template>
    <div class="virtual-host-teaser">
        <div class="server-name">{{ serverName }}</div>
        <div class="document-root">{{ documentRoot }}</div>
    </div>
</template>

<script>
  import {DIRECTIVE_TYPES} from '@/utils/types'

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
      // Return only PLAIN directives from scope
      directives () {
        const directives = {}
        this.directive.body.forEach(item => {
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

<style lang="scss" scoped>
    .virtual-host-teaser {
        margin-left: 10px;

        .server-name {
            color: $color-green;
        }

        .document-root {
            color: $color-green;
        }
    }
</style>