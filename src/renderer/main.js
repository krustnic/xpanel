import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import {ACTION_TYPE} from '@/utils/types'
import Message from '@/plugins/message'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(Message)

function initializeApp () {
  // Load and parse virtual host file
  store.dispatch(`Files/${ACTION_TYPE.Files.loadHttpdFile}`).finally(() => {
    /* eslint-disable no-new */
    new Vue({
      components: {App},
      router,
      store,
      template: '<App/>'
    }).$mount('#app')
  })
}

store.dispatch(`Settings/${ACTION_TYPE.Settings.loadState}`).then(() => {
  initializeApp()
})
