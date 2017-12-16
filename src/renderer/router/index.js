import Vue from 'vue'
import Router from 'vue-router'

import VhostsPage from '@/components/VhostsPage'

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
      path: '/vhosts-page',
      name: 'vhosts-page',
      component: VhostsPage
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
