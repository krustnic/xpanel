import Message from './message'

export default {
  install (Vue) {
    const MessageConstructor = Vue.extend(Message)

    Vue.prototype.$message = (options) => {
      const instance = new MessageConstructor({
        data: options || {}
      })
      instance.vm = instance.$mount()
      document.body.appendChild(instance.vm.$el)
      return instance.vm
    }
  }
}
