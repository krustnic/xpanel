import {MUTATION_TYPE, GETTER_TYPE} from '@/utils/types'

const state = {
  xamppRoot: 'C:\\xampp',
  hostsPath: 'C:\\Windows\\System32\\drivers\\etc\\hosts',
  virtualHostsRelativePath: 'apache\\conf\\extra\\httpd-vhosts.conf'
}

const mutations = {
  [MUTATION_TYPE.Settings.setXamppRoot] (state, path) {
    state.xamppRoot = path
  },

  [MUTATION_TYPE.Settings.setHostsPath] (state, path) {
    state.hostsPath = path
  }
}

const getters = {
  [GETTER_TYPE.Settings.xamppBase]: state => (path) => {
    return state.xamppRoot + '\\' + path
  },

  [GETTER_TYPE.Settings.hostsPath]: state => {
    return state.hostsPath
  },

  [GETTER_TYPE.Settings.xamppRoot]: state => {
    return state.xamppRoot
  },

  [GETTER_TYPE.Settings.xamppVirtualHostsFilePath]: (state, getters) => {
    return getters[GETTER_TYPE.Settings.xamppBase](state.virtualHostsRelativePath)
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
