<template>
    <div ref="log" class="x-log">
        <div v-for="(line, index) in log" class="log-item" :class="{error : line.type === 'error'}" :key="index">
            {{ line.timestamp }}: {{ line.message }}
        </div>
    </div>
</template>

<script>
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
      return {}
    },
    methods: {
      scrollBottom () {
        const el = this.$refs.log
        console.log(el)
        el.scrollTop = el.scrollHeight
      }
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

            &.error {
                color: $color-red;
            }
        }
    }
</style>