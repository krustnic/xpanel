<template>
    <div>
        <button>Start</button>
    </div>
</template>

<script>
  // import fs from 'fs'
  import hostile from 'hostile'

  export default {
    data () {
      return {
        sourceHostsFile: ''
      }
    },
    created () {
      const lines = hostile.get()
      // const data = fs.readFileSync('C:\\Windows\\System32\\drivers\\etc\\hosts')
      // this.sourceHostsFile = data
      this.sourceHostsFile = lines.join('\n')
    }
  }
</script>