<template>
    <a-row>
        <a-col :span="5">
            <div class="cardImp">
                <div style="background: #096dd9;height: 40px;line-height: 40px;color: #fff;padding-left: 8px;">
                    视图列表
                </div>
                <a-tree v-if="treeData.length > 0" v-model:expandedKeys="defaultExpandedKeys" @select="selectTree" :field-names="treeFieldNames" :tree-data="treeData"  default-expand-all>
                
                </a-tree>
                <a-empty v-else :image="Empty.PRESENTED_IMAGE_SIMPLE" />
            </div>
        </a-col>
        <a-col :span="19">
            <a-card :bordered="false" style="margin-bottom: 10px">
            
            </a-card>
        </a-col>
    </a-row>
</template>
<script setup name="topology">
import { message, Empty } from 'ant-design-vue'
// 默认展开的节点
let defaultExpandedKeys = ref([])

// 替换treeNode 中 title,key,children
const treeFieldNames = { children: 'children', title: 'name', key: 'id' }
const treeData = ref([])
</script>
<style lang="less" scoped>
.cardImp {
	margin-right: 10px;
}
</style>