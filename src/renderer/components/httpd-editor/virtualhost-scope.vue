<template>
    <div @click="selectView" class="virtualhost-scope">
        <div class="virtualhost-scope__scope">{{ scope.name }} <span>{{ area }}</span></div>
        <div class="virtualhost-scope__directives">
            <div class="virtualhost-scope__server-name">{{ serverName }}</div>
            <div class="virtualhost-scope__document-root">{{ documentRoot }}</div>
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
    },
    methods: {
      selectView () {
        this.$emit('on-select-view', this.scope)
      }
    }
  }
</script>

<style lang="scss">
    .virtualhost-scope {
        background-color: $main-bg-color;
        border: 1px solid $main-border-color;
        padding: 5px;
        margin-bottom: 5px;
    }

    .virtualhost-scope:hover {
        background-color: lighten($main-bg-color, 7%);
        cursor: pointer;
    }

    .virtualhost-scope__directives {
        margin-left: 10px;
    }

    .virtualhost-scope__scope {
        color: $color-blue;
    }

    .virtualhost-scope__server-name {
        color: $color-green;
    }

    .virtualhost-scope__document-root {
        color: $color-green;
    }
</style>