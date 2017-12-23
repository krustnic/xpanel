import processesUtils from '../../utils/processes'
import {APACHE_STATE_TYPE, GETTER_TYPE, MUTATION_TYPE, ACTION_TYPE} from '../../utils/types'

const state = {
  apacheState: APACHE_STATE_TYPE.STOPPED,
  apacheLog: []
}

const mutations = {
  [MUTATION_TYPE.State.setApacheState] (state, apacheState) {
    state.apacheState = apacheState
  },

  [MUTATION_TYPE.State.pushApacheLog] (state, log) {
    state.apacheLog.push(log)
  }
}

const getters = {
  [GETTER_TYPE.State.apacheState]: state => {
    return state.apacheState
  },

  [GETTER_TYPE.State.apacheLog]: state => {
    return state.apacheLog
  }
}

const actions = {
  [ACTION_TYPE.State.updateApacheState] ({ commit, rootGetters }) {
    const xamppBase = rootGetters[`Settings/${GETTER_TYPE.Settings.xamppBase}`]

    return new Promise((resolve, reject) => {
      processesUtils.checkIsApacheStarted(xamppBase('apache\\logs\\httpd.pid')).then(isStarted => {
        commit(MUTATION_TYPE.State.setApacheState, isStarted ? APACHE_STATE_TYPE.STARTED : APACHE_STATE_TYPE.STOPPED)
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
