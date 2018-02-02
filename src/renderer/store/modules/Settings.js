import {MUTATION_TYPE, GETTER_TYPE, ACTION_TYPE} from '@/utils/types'
import fs from 'fs'
import _path from 'path'

const state = {
  xamppRoot: 'C:\\xampp',
  hostsPath: 'C:\\Windows\\System32\\drivers\\etc\\hosts',
  virtualHostsRelativePath: 'apache\\conf\\extra\\httpd-vhosts.conf',
  phpFolders: [],
  isFastCGI: false
}

const mutations = {
  [MUTATION_TYPE.Settings.setXamppRoot] (state, path) {
    state.xamppRoot = path
  },

  [MUTATION_TYPE.Settings.setHostsPath] (state, path) {
    state.hostsPath = path
  },

  [MUTATION_TYPE.Settings.setPhpFolders] (state, folders) {
    state.phpFolders = folders
  },

  [MUTATION_TYPE.Settings.setFastCGIFlag] (state, isFastCGI) {
    state.isFastCGI = isFastCGI
  },

  [MUTATION_TYPE.Settings.loadState] (state, newState) {
    for (let key in newState) {
      state[key] = newState[key]
    }
  }
}

const getters = {
  [GETTER_TYPE.Settings.xamppBase]: state => (...path) => {
    return _path.join(state.xamppRoot, ...path)
  },

  [GETTER_TYPE.Settings.hostsPath]: state => {
    return state.hostsPath
  },

  [GETTER_TYPE.Settings.xamppRoot]: state => {
    return state.xamppRoot
  },

  [GETTER_TYPE.Settings.phpFolders]: state => {
    return state.phpFolders
  },

  [GETTER_TYPE.Settings.getPhpVersionByPath]: state => (phpPath) => {
    for (let i in state.phpFolders) {
      console.log(state.phpFolders[i].path, phpPath)
      if (state.phpFolders[i].path === phpPath) {
        return state.phpFolders[i].label
      }
    }
    return null
  },

  [GETTER_TYPE.Settings.isFastCGI]: state => {
    return state.isFastCGI
  },

  [GETTER_TYPE.Settings.xamppVirtualHostsFilePath]: (state, getters) => {
    return getters[GETTER_TYPE.Settings.xamppBase](state.virtualHostsRelativePath)
  }
}

const actions = {
  [ACTION_TYPE.Settings.saveState] ({ commit, state }) {
    return new Promise((resolve, reject) => {
      fs.writeFile(_path.join(__static, 'state.json'), JSON.stringify(state), (err) => {
        if (err) return reject(err)
        resolve()
      })
    })
  },

  [ACTION_TYPE.Settings.loadState] ({ commit, state }) {
    return new Promise((resolve, reject) => {
      fs.readFile(_path.join(__static, 'state.json'), 'utf8', (err, content) => {
        if (err) return reject(err)

        try {
          const newState = JSON.parse(content)
          commit(MUTATION_TYPE.Settings.loadState, newState)
          resolve()
        } catch (e) {
          reject(e)
        }
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
