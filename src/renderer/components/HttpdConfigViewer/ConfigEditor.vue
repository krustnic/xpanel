<template>
    <div class="grid config-editor">
        <div class="navigation">
            <breadcrumbs :items="views" @on-select="selectCurrentView"></breadcrumbs>
            <x-button @on-click="addVhost" type="success">
                <i class="fa fa-plus" aria-hidden="true"></i> VH
            </x-button>
        </div>

        <div>
            <hr>
        </div>

        <div class="directives">
            <httpd-config-viewer :config="currentView" @on-raw="onRaw"></httpd-config-viewer>
        </div>
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
        grid-template-columns: 1fr;
        grid-template-rows: auto auto 1fr;
    }

    .config-editor {
        border-right: 1px solid #4c4c4c;
        padding-top: 7px;
        padding-left: 5px;
        padding-right: 5px;

        .navigation {
            display: grid;
            grid-template-columns: 1fr auto;
            grid-template-rows: 1fr;
        }

        .directives {
            padding-right: 5px;
            overflow: auto;
        }
    }
</style>