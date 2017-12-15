<template>
    <div class="app-breadcrumbs">
        <div v-for="(item, index) in items"
             class="item"
             :class="{'first-item' : index === 0, 'last-item' : index === items.length - 1}"
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

<style lang="scss" scoped>
    $breadcrumb-height: 24px;
    $breadcrumb-height-half: $breadcrumb-height / 2;
    $breadcrumb-arrow-angle: 8px;
    $breadcrumb-bg-color: #353b45;
    $breadcrumb-text-color: #d7dae0;
    $breadcrumb-last-bg-color: #41b883;
    $breadcrumb-last-text-color: #FFFFFF;

    .app-breadcrumbs {
        height: $breadcrumb-height;
    }

    .item {
        height: $breadcrumb-height;
        position: relative;
        background: $breadcrumb-bg-color;
        float:left;
        margin-left: 4px;
        padding-left: 15px;
        padding-right: 10px;
        line-height: 24px;
        color: $breadcrumb-text-color;

        -webkit-box-shadow: 3px 0px 8px 0px rgba(0,0,0,0.43);
        -moz-box-shadow: 3px 0px 8px 0px rgba(0,0,0,0.43);
        box-shadow: 3px 0px 8px 0px rgba(0,0,0,0.43);

        &:not(.last-item):hover {
            background-color: lighten($breadcrumb-bg-color, 7%);
            cursor: pointer;

            &:before {
                border-left: $breadcrumb-arrow-angle solid lighten($breadcrumb-bg-color, 7%);
            }
        }

        &:after, &:before {
            content: "";
            position: absolute;
            bottom: 0;
            width: 0;
            height: 0;
            border-top: $breadcrumb-height-half solid transparent;
            border-bottom: $breadcrumb-height-half solid transparent;
        }

        &:after {
            left: 0;
            border-left: $breadcrumb-arrow-angle solid $body-color;
        }

        &:before {
            right: -$breadcrumb-arrow-angle;
            border-left: $breadcrumb-arrow-angle solid $breadcrumb-bg-color;
        }
    }

    .first-item {
        padding-left: 10px;
        margin-left: 0px;

        &:after {
            border: none;
        }
    }

    .last-item {
        background-color: $breadcrumb-last-bg-color;
        color: $breadcrumb-last-text-color;

        &:hover {
            cursor: pointer;
        }

        &:before {
            border-left: $breadcrumb-arrow-angle solid $breadcrumb-last-bg-color;
        }
    }

</style>