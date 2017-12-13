import processesUtils from '../../utils/processes'
import {APACHE_STATE_TYPE} from '../../utils/types'

const state = {
  apacheState: APACHE_STATE_TYPE.STOPPED
}

const mutations = {
  SET_APACHE_STATE (state, apacheState) {
    state.apacheState = apacheState
  }
}

const getters = {
  apacheState: state => {
    return state.apacheState
  }
}

const actions = {
  initializeState ({ commit, rootGetters }) {
    const xamppBase = rootGetters['Settings/xamppBase']

    return new Promise((resolve, reject) => {
      processesUtils.checkIsApacheStarted(xamppBase('apache\\logs\\httpd.pid')).then(isStarted => {
        commit('SET_APACHE_STATE', isStarted ? APACHE_STATE_TYPE.STARTED : APACHE_STATE_TYPE.STOPPED)
        resolve()
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
