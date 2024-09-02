<template>
    <div>
        <!-- <a-card class="cardImp" :bordered="false" :loading="cardLoading"> -->
            <!-- <a-row>
                <a-col :span="2"></a-col>
                <a-col :span="20">
                    <a-input v-model:value="searchValue" style="margin-bottom: 10px" placeholder="关键词搜索" allowClear/>
                </a-col>
            </a-row> -->
        <div class="cardImp" >
            <div style="background: var(--table-row-hover-bg);height: 40px;line-height: 40px;color: #000;padding-left: 8px;">
            设备分类
          </div>
            <a-tree
                v-if="treeData.length > 0"
                v-model:expandedKeys="defaultExpandedKeys"
                :tree-data="treeData"
                :field-names="treeFieldNames"
                @select="treeSelect"
                :style="style"
                v-model:selectedKeys="selectedKeys"
            >
            <template #title="{ dictLabel }">
                <span v-if="dictLabel.indexOf(searchValue) > -1">
                {{ dictLabel.substr(0, dictLabel.indexOf(searchValue)) }}
                <span style="color: #f50">{{ searchValue }}</span>
                {{ dictLabel.substr(dictLabel.indexOf(searchValue) + searchValue.length) }}
                </span>
                <span v-else>{{ dictLabel }}</span>
            </template>
            </a-tree>
            <a-empty v-else :image="Empty.PRESENTED_IMAGE_SIMPLE" />
        </div>
        <!-- </a-card> -->
    </div>
</template>
<script setup name="tableTreeList">
import { Empty } from 'ant-design-vue'
import topologyApi from '@/api/topology/topologyApi';
import { onMounted } from 'vue'
const treeData = ref([])
const defaultTreeData =  ref([])
const cardLoading = ref(true)
let defaultExpandedKeys = ref([])
const searchValue = ref('');
let searchFormState = reactive({})
const treeFieldNames = { children: 'children', title: 'dictLabel', key: 'id' }
const emit = defineEmits({ tableRefresh: null })
const selectedKeys = ref([0])
onMounted(() => {
    loadTreeData()
})
const porps = defineProps({
    topheight:{
        type:String,
        required:true
    },
    dumpurl:{
        type:String,
        required:true
    }
})
const q = document.documentElement.clientHeight - porps.topheight
//const q = porps.topheight
const style = {height:q+'px',overflow:'auto',marginTop:'5px'}
// 加载左侧的树
	const loadTreeData = () => {
		topologyApi.deviceTreeList({dictValue:'DEVICE_TYPE'}).then((res) => {
            // console.log(res)
            cardLoading.value = false
			if (res !== null) {
                treeData.value = [
                    {
                        id: 0,
                        parentId: '-1',
                        dictLabel: '全部',
                        children: res
                    }
                ]
				// treeData.value = res
                defaultTreeData.value = res
                //console.log(treeData.value)
				// 默认展开2级
				treeData.value.forEach((item) => {
					// 因为0的顶级
					// if (item.parentId == 0) {
						defaultExpandedKeys.value.push(item.id)
						// 取到下级ID
						if (item.children) {
							item.children.forEach((items) => {
								defaultExpandedKeys.value.push(items.id)
							})
						}
					// }
				})
			}
		})
	}
    // 点击树查询
	const treeSelect = (selectedKeys,e) => {
		 
         if (selectedKeys.length > 0) {
             const node = e.node;
             if(node.id > 0){
                 searchFormState.parentStoreId = node.id
                 searchFormState.storeId = node.id
             }else{
                 searchFormState.parentStoreId = 0
                 searchFormState.storeId = 0
             }
         } else {
             delete searchFormState.storeId
             delete searchFormState.parentStoreId
         }
         emit('tableRefresh',searchFormState)
     }
     
     watch(searchValue, value => {
        const a = []
         const expanded = treeData.value.map(item => {
         if (item.dictLabel.indexOf(value) > -1) {
            a.push(item)
           return getParentKey(item.dictLabel, treeData.value);
           
         }

         return null;
       }).filter((item, i, self) => item && self.indexOf(item) === i);
       defaultExpandedKeys.value = expanded;
       searchValue.value = value;
       if(searchValue.value){
         treeData.value = a
       }else{
        treeData.value = defaultTreeData.value
        searchFormState.storeId = 0
        searchFormState.parentStoreId = 0
        emit('tableRefresh',searchFormState)
       }
       
     });
     const getParentKey = (key, tree) => {
         let parentKey;
         for (let i = 0; i < tree.length; i++) {
             const node = tree[i];
             if (node.children) {
                 if (node.children.some(item => item.key === key)) {
                     parentKey = node.key;
                 } else if (getParentKey(key, node.children)) {
                    
                     parentKey = getParentKey(key, node.children);
                 }
             }
         }
         return parentKey;
    };
</script>
<style lang="less">
.heighttree {
    height: ~"calc(100vh - 230px)";
    overflow:auto;
}
.cardImp {
		margin-right: 10px;
	}
</style>