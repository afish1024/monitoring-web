<template>
  <a-row>
    <a-col :span="5">
      <div class="cardImp">
        <div style="background: #096dd9;height: 40px;line-height: 40px;color: #fff;padding-left: 8px;">
          视图列表
        </div>
        <a-tree v-if="treeData.length > 0" v-model:expandedKeys="defaultExpandedKeys" :tree-data="treeData" :field-names="treeFieldNames" v-model:selectedKeys="selectedKeys" @select="treeSelect" show-icon style="margin-top: 5px;">

        </a-tree>
        <a-empty v-else :image="Empty.PRESENTED_IMAGE_SIMPLE" />
      </div>
    </a-col>
    <a-col :span="19">
      <a-card :bordered="false" style="margin-bottom: 10px">
        <span style="color: red;">温馨提示：按住鼠标左键可拖动拓扑图，滚动鼠标放大缩小拓扑图。</span>
      </a-card>
      <a-card :bordered="false" style="margin-bottom: 10px">

        <rightKeyComponent @menu-click="menuClick" />
      </a-card>
    </a-col>
  </a-row>
</template>
<script setup name="topologyList">
import { message, Empty } from 'ant-design-vue'
import topologyApi from '@/api/topology/topologyApi';

import { useRouter } from "vue-router";
import rightKeyComponent from './rightKeyComponent.vue'
const route = useRouter()
const cardLoading = ref(true)
// 默认展开的节点
let defaultExpandedKeys = ref([])
const selectedKeys = ref(["1"])
const treeData = ref([])
// 替换treeNode 中 title,key,children
const treeFieldNames = { children: 'children', title: 'name', key: 'id' }



onMounted(() => {
  loadTreeData()
})


const menuClick = (m, n) => {
  console.log(m)
  console.log(n)
}

const loadTreeData = () => {
  topologyApi.viewTree().then((res) => {
    if(!res){
      treeData.value = []
      return 
    }
    cardLoading.value = false
    treeData.value = res
    // 默认展开2级
    treeData.value.forEach((item) => {
      // 因为0的顶级
      if (item.parentId === '0') {
        defaultExpandedKeys.value.push(item.id)
        // 取到下级ID
        if (item.children) {
          item.children.forEach((items) => {
            defaultExpandedKeys.value.push(items.id)
          })
        }
      }
    })
  })
}
</script>
<style lang="less" scoped>
.cardImp {
	margin-right: 10px;
}

#contextMenu {
	position: absolute;
	list-style-type: none;
	padding: 10px 8px;
	left: -150px;
	background-color: rgba(255, 255, 255, 0.9);
	border: 1px solid #e2e2e2;
	border-radius: 4px;
	font-size: 12px;
	color: #545454;
}
#contextMenu li {
	list-style: none;
	height: 20px;
	width: 120px;
	border-bottom: 1px solid #eee;
	cursor: pointer;
	list-style-type: none;
	list-style: none;
	margin-left: 0px;
}
#contextMenu li:hover {
	color: #aaa;
}
</style>