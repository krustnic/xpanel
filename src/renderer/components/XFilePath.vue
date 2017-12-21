<template>
    <div class="x-file-path">
        <slot></slot>
    </div>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
    .x-file-path {
        border: 1px solid #545454;
        font-size: 12px;
        padding: 3px;
        color: gray;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>