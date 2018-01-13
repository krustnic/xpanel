<template>
    <div class="php-versions">
        <x-form-group>
            <x-form-group v-for="(folderItem, index) in folders" :key="index">
                <div class="php-folder-item">
                    <x-file-path class="label">{{ folderItem.label }}</x-file-path>
                    <x-path-input @input="updatePath(folderItem, $event)" :value="folderItem.path"></x-path-input>
                    <x-button @click="removeFolder(index)" class="remove" type="danger">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </x-button>
                </div>
            </x-form-group>

            <x-form-group>
                <x-button @click="addFolder">
                    <i class="fa fa-plus" aria-hidden="true"></i> Add PHP folder
                </x-button>
            </x-form-group>
        </x-form-group>
    </div>
</template>

<script>
  import XFormGroup from '@/components/XFormGroup'
  import XButton from '@/components/XButton'
  import XPathInput from '@/components/XPathInput'
  import XFilePath from '@/components/XFilePath'
  import PhpChecker from '@/utils/PhpChecker'

  export default {
    components: {XFormGroup, XButton, XPathInput, XFilePath},
    props: {
      folders: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {}
    },
    methods: {
      addFolder () {
        this.folders.push({
          path: '',
          label: 'version'
        })
      },
      removeFolder (index) {
        this.folders.splice(index, 1)
      },
      updatePath (folderItem, value) {
        console.log('change value', value)

        PhpChecker.validate(value).then(phpVersion => {
          folderItem.path = value
          folderItem.label = phpVersion
        }).catch(e => {
          this.$message({
            type: 'error',
            title: e.toString(),
            timeout: 2000
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
    .php-versions {
        & .php-folder-item {
            display: grid;
            grid-template-columns: auto 1fr auto;
            grid-template-rows: auto;
        }

        & .remove {
            margin-left: 4px;
        }

        & .label {
            margin-right: 4px;
        }
    }
</style>