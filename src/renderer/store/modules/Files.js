import Vue from 'vue'
import {MUTATION_TYPE, GETTER_TYPE, ACTION_TYPE} from '@/utils/types'
import {HttpdLoader, HostsLoader, LogLoader} from '../../utils/FileLoaders'

const state = {
  // etc/hosts
  hostsFileContent: '',

  // VirtualHosts
  currentView: null,
  currentFileContent: '',
  views: [],
  currentFile: null,
  openedFiles: {},

  // Logs
  currentLogPath: '',
  currentLogContent: '',
  currentLogList: []
}

const mutations = {
  [MUTATION_TYPE.Files.setCurrentHttpdConfig] (state, { path, config }) {
    state.currentFile = path
    state.views = [config]
    state.currentView = config
    Vue.set(state.openedFiles, path, config)
  },

  [MUTATION_TYPE.Files.setCurrentHttpdContent] (state, { content }) {
    state.currentFileContent = content
  },

  [MUTATION_TYPE.Files.setCurrentView] (state, {view}) {
    if (state.currentView === view) return
    state.currentView = view

    const newViewsHistory = []
    for (let i in state.views) {
      newViewsHistory.push(state.views[i])
      if (state.views[i] === view) break
    }

    state.views = newViewsHistory
  },

  [MUTATION_TYPE.Files.pushView] (state, { view }) {
    state.views.push(view)
    state.currentView = view
  },

  [MUTATION_TYPE.Files.setViewHistory] (state, { history }) {
    state.views = history
  },

  [MUTATION_TYPE.Files.setHostsFileContent] (state, { content }) {
    state.hostsFileContent = content
  },

  [MUTATION_TYPE.Files.setCurrentLogPath] (state, {path}) {
    state.currentLogPath = path
  },

  [MUTATION_TYPE.Files.setCurrentLogContent] (state, {content}) {
    state.currentLogContent = content
  },

  [MUTATION_TYPE.Files.setCurrentLogList] (state, {list}) {
    state.currentLogList = list
  }
}

const getters = {
  [GETTER_TYPE.Files.getCurrentFileConfig]: state => {
    return state.openedFiles[state.currentFile]
  },

  [GETTER_TYPE.Files.currentView]: state => {
    if (!state.currentView) return {}
    return state.currentView
  },

  [GETTER_TYPE.Files.currentFileContent]: state => {
    return state.currentFileContent
  },

  [GETTER_TYPE.Files.currentFile]: state => {
    return state.currentFile
  },

  [GETTER_TYPE.Files.views]: state => {
    return state.views
  },

  [GETTER_TYPE.Files.hostsFileContent]: state => {
    return state.hostsFileContent
  },

  [GETTER_TYPE.Files.currentLogPath]: state => {
    return state.currentLogPath
  },

  [GETTER_TYPE.Files.currentLogListReversed]: state => {
    return state.currentLogList.slice().reverse()
  }
}

const actions = {
  [ACTION_TYPE.Files.loadHttpdFile] ({ commit, rootGetters }) {
    const path = rootGetters[`Settings/${GETTER_TYPE.Settings.xamppVirtualHostsFilePath}`]

    return new Promise((resolve, reject) => {
      HttpdLoader.load(path).then(({content, config}) => {
        commit(MUTATION_TYPE.Files.setCurrentHttpdConfig, { path, config })
        commit(MUTATION_TYPE.Files.setCurrentHttpdContent, { content })
        resolve({content, config})
      }).catch((error) => {
        reject(error)
      })
    })
  },

  [ACTION_TYPE.Files.saveHttpdFile] ({ commit, dispatch }, {path, content}) {
    return new Promise((resolve, reject) => {
      HttpdLoader.save(path, content).then(() => {
        dispatch(ACTION_TYPE.Files.loadHttpdFile, path).then(() => {
          resolve()
        }).catch((e) => {
          reject(e)
        })
      }).catch((error) => {
        reject(error)
      })
    })
  },

  [ACTION_TYPE.Files.loadHostsFile] ({ commit }, {path}) {
    return new Promise((resolve, reject) => {
      HostsLoader.load(path).then(({content}) => {
        commit(MUTATION_TYPE.Files.setHostsFileContent, {content})
        resolve({content})
      }).catch((error) => {
        commit(MUTATION_TYPE.Files.setHostsFileContent, {content: ''})
        reject(error)
      })
    })
  },

  [ACTION_TYPE.Files.saveHostsFile] ({ commit }, {path, content}) {
    return new Promise((resolve, reject) => {
      HostsLoader.save(path, content).then(() => {
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  },

  [ACTION_TYPE.Files.loadLogFile] ({ commit }, {path}) {
    return new Promise((resolve, reject) => {
      LogLoader.load(path).then(({content, list}) => {
        commit(MUTATION_TYPE.Files.setCurrentLogPath, {path})
        commit(MUTATION_TYPE.Files.setCurrentLogContent, {content})
        commit(MUTATION_TYPE.Files.setCurrentLogList, {list})
        resolve({path, content, list})
      }).catch(e => {
        reject(e)
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
