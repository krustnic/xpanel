import Vue from 'vue'
import Router from 'vue-router'

import ServicesPage from '@/components/ServicesPage'
import VhostsPage from '@/components/VhostsPage'
import HostsPage from '@/components/HostsPage'
import SettingsPage from '@/components/SettingsPage'

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
      path: '/vhosts',
      name: 'vhosts',
      component: VhostsPage
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsPage
    },
    {
      path: '*',
      redirect: '/services'
    }
  ]
})
