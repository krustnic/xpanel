<template>
    <div @click="onClick" class="directive" :class="typesClasses">
        <div class="name">{{ name }} {{ postfix }}</div>
        <x-input :value="value" disabled></x-input>
    </div>
</template>

<script>
  import {DIRECTIVE_TYPE} from '@/utils/types'
  import XInput from '@/components/XInput'

  export default {
    components: {XInput},
    props: {
      directive: {
        type: Object,
        default () {
          return {}
        },
        required: true
      },
      type: {
        type: String,
        default: null,
        required: true
      },
      name: {
        type: String,
        default: '',
        required: true
      },
      postfix: {
        type: String,
        default: ''
      },
      value: {
        type: String,
        default: ''
      }
    },
    data () {
      return {}
    },
    computed: {
      typesClasses () {
        return {
          'directive-scoped': this.type === DIRECTIVE_TYPE.SCOPED,
          'directive-scope-parameter': this.type === DIRECTIVE_TYPE.FAKE_SCOPE_PARAMETER
        }
      }
    },
    methods: {
      onClick () {
        this.$emit('on-click', this.directive)
      }
    }
  }
</script>

<style lang="scss" scoped>
    .directive {
        background-color: $main-bg-color;
        border: 1px solid $main-border-color;
        padding: 5px;
        margin-bottom: 5px;

        &:hover {
            background-color: lighten($main-bg-color, 7%);
            cursor: pointer;
        }

        .name {
            position: relative;
            padding-left: 15px;
        }

        .name:before {
            content: "\f044";
            font-family: FontAwesome;
            font-style: normal;
            font-weight: normal;
            text-decoration: inherit;
            font-size: 12px;
            position: absolute;
            top: 3px;
            left: 0;
        }
    }
    
    .directive-scoped {
        color: $color-blue;

        .name:before {
            content: "\f196";
        }
    }

    .directive-scope-parameter {
        color: $color-orange;

        .name:before {
            content: "\f044";
        }
    }
</style>