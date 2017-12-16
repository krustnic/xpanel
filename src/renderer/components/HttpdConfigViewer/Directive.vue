<template>
    <div @click="onClick" class="directive" :class="typesClasses">
        <div class="name">{{ name }} {{ postfix }}</div>
        <div class="parameters">
            <input class="parameters-input" :value="value" disabled type="text">
        </div>
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
          'directive-scoped': this.type === DIRECTIVE_TYPES.SCOPED,
          'directive-scope-parameter': this.type === DIRECTIVE_TYPES.FAKE_SCOPE_PARAMETER
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

        .parameters {
            margin-top: 5px;
        }

        .parameters-input {
            width: 100%;
            padding: 5px;
            background-color: #262a33;
            border: 1px solid #3c4049;
            color: #d7dae0;
            box-sizing: border-box;
            cursor: pointer;
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