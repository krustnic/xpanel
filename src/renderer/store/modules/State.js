import processesUtils from '../../utils/processes'
import {APACHE_STATE_TYPE} from '../../utils/types'

const state = {
  apacheState: APACHE_STATE_TYPE.STOPPED,
  apacheLog: []
}

const mutations = {
  SET_APACHE_STATE (state, apacheState) {
    state.apacheState = apacheState
  },

  PUSH_APACHE_LOG (state, log) {
    state.apacheLog.push(log)
  }
}

const getters = {
  apacheState: state => {
    return state.apacheState
  },

  apacheLog: state => {
    return state.apacheLog
  }
}

const actions = {
  initializeState ({ commit, dispatch, rootGetters }) {
    return dispatch('updateApacheState')
  },

  updateApacheState ({ commit, rootGetters }) {
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
