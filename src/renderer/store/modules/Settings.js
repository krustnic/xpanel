const state = {
  xamppRoot: 'C:\\xampp',
  hostsPath: 'C:\\Windows\\System32\\drivers\\etc\\hosts',
  httpdVhostsPath: 'apache\\conf\\extra\\httpd-vhosts.conf'
}

const mutations = {
  SET_XAMPP_ROOT (state, rootPath) {
    state.xamppRoot = rootPath
  }
}

const getters = {
  xamppBase: state => (path) => {
    return state.xamppRoot + '\\' + path
  },

  hostsPath: state => {
    return state.hostsPath
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
