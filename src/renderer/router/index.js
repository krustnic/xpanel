import Vue from 'vue'
import Router from 'vue-router'

import ServicesPage from '@/components/ServicesPage'
import VhostsPage from '@/components/VhostsPage'
import AceTestPage from '@/components/AceTestPage'
import HostsPage from '@/components/HostsPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/services'
    },
    {
      path: '/services',
      name: 'service',
      component: ServicesPage
    },
    {
      path: '/hosts',
      name: 'hosts',
      component: HostsPage
    },
    {
      path: '/vhosts-page',
      name: 'vhosts-page',
      component: VhostsPage
    },
    {
      path: '/test',
      name: 'test',
      component: AceTestPage
    },
    {
      path: '*',
      redirect: '/services'
    }
  ]
})
