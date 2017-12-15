<template>
    <div>
        <div class="plain-directive">
            <div class="plain-directive__name">{{ directive.name }}</div>
            <div class="plain-directive__value">
                <input class="plain-directive__value__input" :value="properties" disabled type="text">
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    props: {
      directive: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {}
    },
    computed: {
      properties () {
        return this.directive.parameters.map(param => {
          return param.value
        }).join(', ')
      }
    }
  }
</script>

<style lang="scss">
    .plain-directive__value {
        margin-top: 5px;
    }

    .plain-directive__value__input {
        width: 100%;
        padding: 5px;
        background-color: #262a33;
        border: 1px solid #545454;
        color: #d7dae0;
        box-sizing: border-box;
    }
</style>