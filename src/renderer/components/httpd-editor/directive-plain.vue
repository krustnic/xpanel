<template>
    <div>
        <div class="directive-plain">
            <div class="name">{{ directive.name }}</div>
            <div class="properties">
                <input class="properties-input" :value="properties" disabled type="text">
            </div>
        </div>
    </div>
</template>

<script>
  import directiveMixin from './directive-mixin'

  export default {
    mixins: [directiveMixin]
  }
</script>

<style lang="scss" scoped>
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
        }
    }
</style>