const state = {
  xamppRoot: 'C:\\xampp',
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
