<template>
    <div class="grid constructor-page">
        <virtual-host-constructor @on-generate="onGenerate"></virtual-host-constructor>
        <virtual-host-preview :content="content"></virtual-host-preview>
    </div>
</template>

<script>
  import VirtualHostConstructor from '@/components/ConstructorPage/VirtualHostConstructor'
  import VirtualHostPreview from '@/components/ConstructorPage/VirtualHostPreview'

  export default {
    name: 'constructor-page',
    components: {VirtualHostConstructor, VirtualHostPreview},
    data () {
      return {
        content: ''
      }
    },
    methods: {
      onGenerate (content) {
        this.content = content
      }
    }
  }
</script>

<style lang="scss" scoped>
    .grid {
        display: grid;
        grid-template-columns: 450px 1fr;
        grid-template-rows: 100vh;
    }
</style>