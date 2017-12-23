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
  Settings: {
    setXamppRoot: 'setXamppRoot',
    setHostsPath: 'setHostsPath'
  }
}

export const GETTER_TYPE = {
  Settings: {
    xamppBase: 'xamppBase',
    hostsPath: 'hostsPath',
    xamppRoot: 'xamppRoot',
    xamppVirtualHostsFilePath: 'xamppVirtualHostsFilePath'
  }
}
