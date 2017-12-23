const state = {
  xamppRoot: 'C:\\xampp',
  hostsPath: 'C:\\Windows\\System32\\drivers\\etc\\hosts',
  virtualHostsRelativePath: 'apache\\conf\\extra\\httpd-vhosts.conf'
}

const mutations = {
  SET_XAMPP_ROOT (state, path) {
    state.xamppRoot = path
  },

  SET_HOSTS_PATH (state, path) {
    state.hostsPath = path
  }
}

const getters = {
  xamppBase: state => (path) => {
    return state.xamppRoot + '\\' + path
  },

  hostsPath: state => {
    return state.hostsPath
  },

  xamppRoot: state => {
    return state.xamppRoot
  },

  xamppVirtualHostsFilePath: (state, getters) => {
    return getters.xamppBase(state.virtualHostsRelativePath)
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    // commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
