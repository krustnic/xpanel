<template>
    <div ref="log" class="x-log">
        <div v-for="(line, index) in log" class="log-item" :class="{error : line.type === LOG_MESSAGE_TYPE.ERROR}" :key="index">
            {{ line.timestamp }}: {{ line.message }}
        </div>
    </div>
</template>

<script>
  import {LOG_MESSAGE_TYPE} from '@/utils/types'

  export default {
    props: {
      log: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data () {
      return {
        LOG_MESSAGE_TYPE
      }
    },
    methods: {
      scrollBottom () {
        const el = this.$refs.log
        el.scrollTop = el.scrollHeight
      }
    },
    mounted () {
      this.scrollBottom()
    },
    watch: {
      log () {
        this.$nextTick(() => {
          this.scrollBottom()
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
    .x-log {
        background-color: #1d1f21;
        padding: 4px;
        max-height: 150px;
        overflow-y: scroll;

        .log-item {
            margin-bottom: 7px;
            border-bottom: 1px solid #545454;
            padding-bottom: 4px;

            &.error {
                color: $color-red;
            }
        }
    }
</style>