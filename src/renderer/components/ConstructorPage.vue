<template>
    <div class="grid constructor-page">
        <virtual-host-constructor></virtual-host-constructor>
        <virtual-host-preview></virtual-host-preview>
    </div>
</template>

<script>
  import VirtualHostConstructor from '@/components/ConstructorPage/VirtualHostConstructor'
  import VirtualHostPreview from '@/components/ConstructorPage/VirtualHostPreview'

  export default {
    components: {VirtualHostConstructor, VirtualHostPreview},
    data () {
      return {}
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