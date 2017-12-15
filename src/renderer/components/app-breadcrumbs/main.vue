<template>
    <div class="app-breadcrumbs">
        <div v-for="(item, index) in items"
             class="app-breadcrumbs__item"
             :style="{'z-index' : items.length - index}"
             @click="selectItem(item)">
            <span>{{ item.name || 'File' }}</span>
        </div>

    </div>
</template>

<script>
  export default {
    props: {
      items: {
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
      selectItem (item) {
        this.$emit('on-select', item)
      }
    }
  }
</script>

<style lang="scss">
    $breadcrumb-height: 24px;
    $breadcrumb-height-half: $breadcrumb-height / 2;
    $breadcrumb-arrow-angle: 8px;
    $breadcrumb-bg-color: #353b45;
    $breadcrumb-text-color: #d7dae0;

    .app-breadcrumbs {
        height: 50px;
    }

    .app-breadcrumbs__item {
        /*width: 200px;*/
        height: $breadcrumb-height;
        position: relative;
        background: $breadcrumb-bg-color;
        float:left;
        margin-left: 4px;
        padding-left: 20px;
        padding-right: 10px;
        line-height: 24px;
        color: $breadcrumb-text-color;

        -webkit-box-shadow: 3px 0px 8px 0px rgba(0,0,0,0.43);
        -moz-box-shadow: 3px 0px 8px 0px rgba(0,0,0,0.43);
        box-shadow: 3px 0px 8px 0px rgba(0,0,0,0.43);
    }

    .app-breadcrumbs__item:hover {
        background-color: lighten($breadcrumb-bg-color, 7%);
        cursor: pointer;
    }

    .app-breadcrumbs__item:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 0;
        height: 0;
        border-left: $breadcrumb-arrow-angle solid $body-color;
        border-top: $breadcrumb-height-half solid transparent;
        border-bottom: $breadcrumb-height-half solid transparent;
    }
    .app-breadcrumbs__item:before {
        content: "";
        position: absolute;
        right: -$breadcrumb-arrow-angle;
        bottom: 0;
        width: 0;
        height: 0;
        border-left: $breadcrumb-arrow-angle solid $breadcrumb-bg-color;
        border-top: $breadcrumb-height-half solid transparent;
        border-bottom: $breadcrumb-height-half solid transparent;
    }

    .app-breadcrumbs__item:hover:before {
        border-left: $breadcrumb-arrow-angle solid lighten($breadcrumb-bg-color, 7%);
    }
</style>