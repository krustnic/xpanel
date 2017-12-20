import Vue from 'vue'
import Router from 'vue-router'

import Services from '@/components/ServicesPage'
import VhostsPage from '@/components/VhostsPage'
import AddVirtualHostPage from '@/components/AddVirtualHostPage'
import AceTestPage from '@/components/AceTestPage'

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
      path: '/services',
      name: 'service',
      component: Services
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
      path: '/add-virtual-host-page',
      name: 'add-virtual-host-page',
      components: {
        default: VhostsPage,
        right: AddVirtualHostPage
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
