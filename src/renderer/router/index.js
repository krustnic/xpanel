import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/TestHosts').default
      // component: require('@/components/LandingPage').default
    },
    {
      path: '/',
      name: 'hosts-page',
      component: require('@/components/TestHosts').default
    },
    {
      path: '/apache',
      name: 'apache-page',
      component: require('@/components/TheApachePage').default
    },
    {
      path: '/httpd-editor',
      name: 'httpd-editor',
      component: require('@/components/TheHttpdEditorPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
