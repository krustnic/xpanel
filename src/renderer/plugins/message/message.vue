<template>
    <transition name="fade" @after-leave="destroyElement">
        <div v-show="visible" class="message">
            <div class="box" :class="classes">
                <div class="icon">
                    <i :class="'fa ' + icon" aria-hidden="true"></i>
                </div>
                <div>{{ title }}</div>
            </div>
        </div>
    </transition>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        type: 'success',
        title: '',
        icon: 'fa-exclamation-circle', // 'fa-floppy-o'
        timeout: 600
      }
    },
    computed: {
      classes () {
        return {
          'success': this.type === 'success',
          'error': this.type === 'error'
        }
      }
    },
    methods: {
      destroyElement () {
        this.$destroy()
        this.$el.parentNode.removeChild(this.$el)
      },
      close () {
        this.visible = false
      },
      startTimer () {
        setTimeout(() => {
          this.close()
        }, this.timeout)
      }
    },
    mounted () {
      this.visible = true
      this.startTimer()
    }
  }
</script>

<style lang="scss" scoped>
    .message {
        display: flex;
        align-items: center;
        justify-content: center;

        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 150;

        & .box {
            text-align: center;
            min-width: 100px;
            height: 100px;
            border-radius: 2px;
            background-color: #3c4049;
            border: 1px solid #4c4c4c;
            padding: 0 4px 0 4px;

            &.success {

            }

            &.error {
                color: $color-red
            }
        }

        & .icon {
            font-size: 32px;
            margin-top: 22px;
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>