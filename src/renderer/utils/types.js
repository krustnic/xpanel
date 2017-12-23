export const APACHE_STATE_TYPE = {
  STOPPED: 'STOPPED',
  STARTED: 'STARTED'
}

export const DIRECTIVE_TYPE = {
  ROOT: 'ROOT',
  SCOPED: 'SCOPED',
  PLAIN: 'PLAIN',
  BLANK_LINE: 'BLANK_LINE',
  COMMENT: 'COMMENT',
  FAKE_SCOPE_PARAMETER: 'FAKE_SCOPE_PARAMETER'
}

export const LOG_MESSAGE_TYPE = {
  INFO: 'INFO',
  ERROR: 'ERROR'
}

export const MUTATION_TYPE = {
  Files: {
    setCurrentHttpdConfig: 'setCurrentHttpdConfig',
    setCurrentHttpdContent: 'setCurrentHttpdContent',
    setCurrentView: 'setCurrentView',
    pushView: 'pushView',
    setViewHistory: 'setViewHistory',
    setHostsFileContent: 'setHostsFileContent'
  },
  Settings: {
    setXamppRoot: 'setXamppRoot',
    setHostsPath: 'setHostsPath'
  }
}

export const GETTER_TYPE = {
  Files: {
    getCurrentFileConfig: 'getCurrentFileConfig',
    currentView: 'currentView',
    currentFileContent: 'currentFileContent',
    currentFile: 'currentFile',
    views: 'views',
    hostsFileContent: 'hostsFileContent'
  },
  Settings: {
    xamppBase: 'xamppBase',
    hostsPath: 'hostsPath',
    xamppRoot: 'xamppRoot',
    xamppVirtualHostsFilePath: 'xamppVirtualHostsFilePath'
  }
}

export const ACTION_TYPE = {
  Files: {
    loadHttpdFile: 'loadHttpdFile',
    saveHttpdFile: 'saveHttpdFile',
    loadHostsFile: 'loadHostsFile',
    saveHostsFile: 'saveHostsFile'
  }
}
