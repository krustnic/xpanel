import Vue from 'vue'
import {HttpdLoader} from '../../utils/file-loaders'

const state = {
  // state
  currentFile: null,
  openedFiles: {}
}

const mutations = {
  SET_CURRENT_HTTPD_CONFIG (state, { path, config }) {
    state.currentFile = path
    Vue.set(state.openedFiles, path, config)
  }
}

const getters = {
  getCurrentFileConfig: state => {
    return state.openedFiles[state.currentFile]
  }
}

const actions = {
  loadHttpdFile ({ commit }, path) {
    return new Promise((resolve, reject) => {
      HttpdLoader.load(path).then((config) => {
        commit('SET_CURRENT_HTTPD_CONFIG', { path, config })
        resolve(config)
      }).catch((error) => {
        reject(error)
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
