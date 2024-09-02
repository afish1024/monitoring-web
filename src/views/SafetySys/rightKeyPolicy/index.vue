<template>

  <a-row :gutter="16">
    <!-- <a-col :span="5">
      <a-card title="策略分类" size="small" style="width: 100%;overflow-y:auto;min-height: 600px;max-height: 800px;" :hoverable="true">
     
        <a-tree v-model:expandedKeys="expandedKeys" v-model:selectedKeys="selectedKeys" :tree-data="treeData">
          <template #title="{ dictLabel }">
            <span v-if="dictLabel.indexOf(searchValue) > -1">
              {{ dictLabel.substr(0, dictLabel.indexOf(searchValue)) }}
              <span style="color: #f50">{{ searchValue }}</span>
              {{ dictLabel.substr(dictLabel.indexOf(searchValue) + searchValue.length) }}
            </span>
            <span v-else>{{ dictLabel }}</span>
          </template>
        </a-tree>
      </a-card>

    </a-col> -->
    <a-col :span="24">
      <component @some-event="callback" :par="par" :is="currentComponent"></component>
    </a-col>
  </a-row>

</template>
<script setup name="network">
import table from './table.vue'
import SafetySysApi from '@/api/SafetySys/SafetySysApi'
const currentComponent = ref(table);
const expandedKeys = ref();
const treeData = [];
const defaultExpandedKeys = ref([])
const par = ref({
  flag: true,
  ids: '',
  isShow: true
})
onMounted(() => {
  initData()
})
const callback = (v, flag = true, ids = '', isShow) => {

  par.value.flag = flag
  par.value.ids = ids
  par.value.isShow = isShow
  currentComponent.value = v
}

const initData = () => {
  SafetySysApi.listForLabel({ dictValue: 'STRATEGY_SORT' }).then((res) => {
    console.log(res)
    if (res !== null) {
      treeData.value = [
        {
          id: 0,
          parentId: '-1',
          dictLabel: '全部',
          children: res
        }
      ]
      treeData.value.forEach((item) => {
        defaultExpandedKeys.value.push(item.id)
        if (item.children) {
          item.children.forEach((items) => {
            defaultExpandedKeys.value.push(items.id)
          })
        }
      })
    }

  }).catch((err) => {
    console.log(err);
  })


}

</script>
<style lang="less" scoped>
</style>