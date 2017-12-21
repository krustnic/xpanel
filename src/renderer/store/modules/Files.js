import Vue from 'vue'
import {HttpdLoader, HostsLoader} from '../../utils/file-loaders'

const state = {
  // etc/hosts
  hostsFileContent: '',

  currentView: null,
  currentFileContent: '',
  views: [],
  currentFile: null,
  openedFiles: {}
}

const mutations = {
  SET_CURRENT_HTTPD_CONFIG (state, { path, config }) {
    state.currentFile = path
    state.views = [config]
    state.currentView = config
    Vue.set(state.openedFiles, path, config)
  },

  SET_CURRENT_HTTPD_CONTENT (state, { content }) {
    state.currentFileContent = content
  },

  SET_CURRENT_VIEW (state, {view}) {
    if (state.currentView === view) return
    state.currentView = view

    const newViewsHistory = []
    for (let i in state.views) {
      newViewsHistory.push(state.views[i])
      if (state.views[i] === view) break
    }

    state.views = newViewsHistory
  },

  PUSH_VIEW (state, { view }) {
    state.views.push(view)
    state.currentView = view
  },

  SET_VIEW_HISTORY (state, { history }) {
    state.views = history
  },

  SET_HOSTS_FILE_CONTENT (state, { content }) {
    state.hostsFileContent = content
  }
}

const getters = {
  getCurrentFileConfig: state => {
    return state.openedFiles[state.currentFile]
  },
  currentView: state => {
    if (!state.currentView) return {}
    return state.currentView
  },
  currentFileContent: state => {
    return state.currentFileContent
  },
  currentFile: state => {
    return state.currentFile
  },
  views: state => {
    return state.views
  },
  hostsFileContent: state => {
    return state.hostsFileContent
  }
}

const actions = {
  loadHttpdFile ({ commit }, path) {
    return new Promise((resolve, reject) => {
      HttpdLoader.load(path).then(({content, config}) => {
        commit('SET_CURRENT_HTTPD_CONFIG', { path, config })
        commit('SET_CURRENT_HTTPD_CONTENT', { content })
        resolve({content, config})
      }).catch((error) => {
        reject(error)
      })
    })
  },

  saveHttpdFile ({ commit }, {path, content}) {
    return new Promise((resolve, reject) => {
      HttpdLoader.save(path, content).then(() => {
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  },

  loadHostsFile ({ commit }, path) {
    return new Promise((resolve, reject) => {
      HostsLoader.load(path).then(({content}) => {
        commit('SET_HOSTS_FILE_CONTENT', {content})
        resolve({content})
      }).catch((error) => {
        reject(error)
      })
    })
  },

  saveHostsFile ({ commit }, {path, content}) {
    return new Promise((resolve, reject) => {
      HostsLoader.save(path, content).then(() => {
        resolve()
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
