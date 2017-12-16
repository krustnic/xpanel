<template>
    <div @click="onClick" class="directive">
        <div class="directive-plain">
            <div class="name">{{ name }} {{ postfix }}</div>
            <div class="properties">
                <input class="properties-input" :value="value" disabled type="text">
            </div>
        </div>
    </div>
</template>

<script>
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
    }

    .directive-plain {
        .properties {
            margin-top: 5px;
        }

        .properties-input {
            width: 100%;
            padding: 5px;
            background-color: #262a33;
            border: 1px solid #545454;
            color: #d7dae0;
            box-sizing: border-box;
            cursor: pointer;
        }
    }
</style>