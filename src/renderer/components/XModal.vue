<template>
    <div v-show="value" class="background">
        <div class="grid modal">
            <div class="header">
                {{ title }}
            </div>
            <div class="content">
                <slot name="content"></slot>
            </div>
            <div class="footer">
                <slot name="footer">
                    <x-button @click="confirm">OK</x-button>
                    <x-button @click="cancel">Cancel</x-button>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
  import XButton from '@/components/XButton'

  export default {
    components: {XButton},
    props: {
      value: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      }
    },
    data () {
      return {}
    },
    methods: {
      confirm () {
        this.$emit('on-confirm')
      },
      cancel () {
        this.$emit('on-cancel')
      }
    }
  }
</script>

<style lang="scss" scoped>
    .grid {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr auto;
    }

    .background {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 300;
        background-color: transparentize($main-bg-color, .5);
        top: 0;
        left: 0;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal {
        width: 400px;
        min-height: 200px;
        background-color: $main-bg-color;
        border: 1px solid $main-border-color;
    }

    .header {
        padding: 4px;
        background-color: $active-color;
        color: white;
        margin-bottom: 8px;
    }

    .content {
        padding: 4px;
    }

    .footer {
        text-align: right;
        padding: 4px;
    }
</style>