<template>
    <div class="grid virtual-host-preview">
        <x-ace ref="editor"
               class="editor"
               mode="apache_conf"
               :content="content"
               disabled
        ></x-ace>
    </div>
</template>

<script>
  import XAce from '@/components/XAce'

  export default {
    components: {XAce},
    data () {
      return {
        content: '123'
      }
    }
  }
</script>

<style lang="scss" scoped>
    .grid {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
    }

    .virtual-host-preview {
        padding-top: 4px;
    }
</style>