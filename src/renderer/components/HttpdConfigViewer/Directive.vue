<template>
    <div @click="onClick" class="directive" :class="typesClasses">
        <div class="name">{{ name }} {{ postfix }}</div>
        <div class="controls">
            <x-input :value="value" disabled></x-input>
            <x-button v-if="isLogFile" type="success" @click="onOpenLog">
                <i class="fa fa-search" aria-hidden="true"></i>
            </x-button>
        </div>
    </div>
</template>

<script>
  import {DIRECTIVE_TYPE} from '@/utils/types'
  import XInput from '@/components/XInput'
  import XButton from '@/components/XButton'

  export default {
    components: {XInput, XButton},
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
      },
      isLogFile () {
        return ['errorlog', 'customlog', 'accesslog'].indexOf(this.name.toLowerCase()) !== -1
      }
    },
    methods: {
      onClick () {
        this.$emit('on-click', this.directive)
      },
      onOpenLog () {
        this.$emit('on-open-log', this.directive)
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

        & .controls {
            display: grid;
            grid-template-columns: 1fr auto;
            grid-template-rows: 1fr;

            margin-top: 5px;
        }

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