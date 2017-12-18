<template>
    <div class="grid config-editor">
        <breadcrumbs class="navigation" :items="views" @on-select="selectCurrentView"></breadcrumbs>
        <x-button class="controls" @on-click="addVhost" type="success">
            <i class="fa fa-plus" aria-hidden="true"></i> VH
        </x-button>

        <div class="divider">
            <hr>
        </div>

        <httpd-config-viewer class="directives" :config="currentView" @on-raw="onRaw"></httpd-config-viewer>
    </div>
</template>

<script>
  import HttpdConfigViewer from '@/components/HttpdConfigViewer'
  import Breadcrumbs from '@/components/Breadcrumbs'
  import XButton from '@/components/XButton'

  export default {
    components: {HttpdConfigViewer, Breadcrumbs, XButton},
    props: {
      views: {
        type: Array,
        default () {
          return []
        }
      },
      currentView: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {}
    },
    methods: {
      selectCurrentView (view) {
        this.$store.commit('Files/SET_CURRENT_VIEW', { view })
      },
      addVhost () {
        console.log('add vhost')
      },
      onRaw (view) {
        this.$emit('on-raw', view)
      }
    }
  }
</script>

<style lang="scss" scoped>
    .grid {
        display: grid;
        grid-template-columns: 1fr auto;
        grid-template-rows: auto auto 1fr;
        grid-template-areas:
            "navigation controls"
            "divider divider"
            "directives directives"
    }

    .config-editor {
        border-right: 1px solid #4c4c4c;
        padding-top: 7px;
        padding-left: 5px;
        padding-right: 5px;

        .navigation {
            grid-area: navigation;
        }

        .controls {
            grid-area: controls;
        }

        .divider {
            grid-area: divider;
        }

        .directives {
            grid-area: directives;

            padding-right: 5px;
            overflow: auto;
        }
    }
</style>