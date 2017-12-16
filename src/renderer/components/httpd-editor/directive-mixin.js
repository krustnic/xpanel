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
