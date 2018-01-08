import {LogLoader} from '@/utils/file-loaders'
const logExamplePath = 'test/unit/utils/log-example.txt'
const logEmptyExamplePath = 'test/unit/utils/log-empty-example.txt'

describe('LogLoader', () => {
  it('return file size', (done) => {
    LogLoader.getFileSize(logExamplePath).then(size => {
      expect(size).toBe(25)
      done()
    }).catch((err) => {
      done(err)
    })
  })

  it('return last N lines', (done) => {
    LogLoader.load(logExamplePath, 8).then(({content, list}) => {
      expect(list).toBeInstanceOf(Array)
      expect(list.length).toBe(2)
      expect(list[0]).toBe('8')
      expect(list[1]).toBe('9')
      done()
    }).catch((err) => {
      done(err)
    })
  })

  it('small file - large buffer', (done) => {
    LogLoader.load(logExamplePath, 2048).then(({content, list}) => {
      expect(list).toBeInstanceOf(Array)
      expect(list.length).toBe(8)
      expect(list[0]).toBe('2')
      expect(list[7]).toBe('9')
      done()
    }).catch((err) => {
      done(err)
    })
  })

  it('empty buffer', (done) => {
    LogLoader.load(logExamplePath, 0).then(({content, list}) => {
      expect(list).toBeInstanceOf(Array)
      expect(list.length).toBe(0)
      done()
    }).catch((err) => {
      done(err)
    })
  })

  it('empty file', (done) => {
    LogLoader.load(logEmptyExamplePath, 2048).then(({content, list}) => {
      expect(list).toBeInstanceOf(Array)
      expect(list.length).toBe(0)
      done()
    }).catch((err) => {
      done(err)
    })
  })
})
