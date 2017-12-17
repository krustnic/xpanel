<template>
    <div style="height: 100%;">
        <x-ace :content="content"></x-ace>
    </div>
</template>

<script>
  import XAce from '@/components/XAce'

  export default {
    components: {XAce},
    data () {
      return {
        content: ''
      }
    },
    created () {
      this.content = this.$store.getters['Files/currentFileContent']
    }
  }
</script>

<style lang="scss" scoped>

</style>