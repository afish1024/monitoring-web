<template>
    <a-row :gutter="24">
        <a-col :span="5">
            <a-card class="cardImp" :bordered="false" :loading="cardLoading">
				<a-tree
					v-if="treeData.length > 0"
					v-model:expandedKeys="defaultExpandedKeys"
					:tree-data="treeData"
					:field-names="treeFieldNames"
                    v-model:selectedKeys="selectedKeys"
					@select="treeSelect"
                    show-icon
				>
                    <template #icon="{app_icon}">
                        <component :is="app_icon" />
                    </template>
				</a-tree>
				<a-empty v-else :image="Empty.PRESENTED_IMAGE_SIMPLE" />
			</a-card>
		</a-col>
        <a-col :span="19">
            <a-card :bordered="false" style="margin-bottom: 10px">
				<a-form ref="searchFormRef" name="advanced_search" class="ant-advanced-search-form" :model="searchFormState">
					<a-row :gutter="24">
						<a-col :span="6">
							<a-form-item name="keywords" label="主机名称">
								<a-input v-model:value="searchFormState.keywords" placeholder="请输入主机名称" allow-clear></a-input>
							</a-form-item>
						</a-col>
                       
						<a-col :span="6">
							<a-button type="primary" @click="table.refresh(true)">
								<template #icon><SearchOutlined /></template>
								查询
							</a-button>
							<a-button class="snowy-buttom-left" @click="() => searchFormRef.resetFields()">
								<template #icon><redo-outlined /></template>
								重置
							</a-button>
						</a-col>
					</a-row>
				</a-form>
			</a-card>
            <a-card :bordered="false"><!--:row-selection="options.rowSelection"-->
			<s-table
					ref="table"
					:columns="columns"
					:data="loadData"
					:expand-row-by-click="true"
					:alert="options.alert.show"
					bordered
                    :tool-config="toolConfig"
                    :size="50"
                    :scroll="{ x: 1000 }"
				>
                  
                    <template v-slot:bodyCell="{text, record, index, column}">
                        <template v-if="column.dataIndex === 'index'">
                            <span>{{ index+1 }}</span>
                        </template>
                        <template v-if="column.dataIndex === 'action'">
                           
                        </template>
                    </template>
				</s-table>
			</a-card>
        </a-col>
       
    </a-row>
</template>
<script setup name="hostList">
import { message, Empty } from 'ant-design-vue'
import indexApi from '@/api/python/indexApi'

const toolConfig = { refresh: true, height: true, columnSetting: true, striped: false }
// 定义tableDOM
const table = ref(null)
const data = ref([])
let pageNumber = ref(1)
let pageSize = ref(0)
let total = ref(0)
let current = ref(1)
let reportNumber = ref(null)

const searchFormRef = ref()
let searchFormState = reactive({
    keywords:"",
    hostsid:0,
})
let defaultExpandedKeys = ref([])
const treeData = ref([])
// 替换treeNode 中 title,key,children
const treeFieldNames = { children: 'children', title: 'name', key: 'hostid' }
const cardLoading = ref(true)

// 列表选择配置
const options = {
    alert: {
        show: false,
        clear: () => {
            selectedRowKeys = ref([])
        }
    },
    rowSelection: {
        onChange: (selectedRowKey, selectedRows) => {
            selectedRowKeys.value = selectedRowKey
        }
    }
}
const columns = [
    {
        title: '序号',
        fixed: 'left',  
        dataIndex: 'index',
        key: 'index',
        width: '50px'
    },
    {
        title: '主机名称',
        dataIndex: 'host_name',
        width: '150px',
        fixed: 'left',  
    },
    
    {
        title: '资源类别',
        dataIndex: 'content_type_name',
        width: '100px',
        fixed: 'left',  
    },
   
    {
        title: '异常信息',
        dataIndex: 'content',
        width: '180px',
        ellipsis:true
    },
    {
        title: '预警次数',
        dataIndex: 'count',
        width: '80px',
    },
    // {
    //     title: '阈值',
    //     dataIndex: 'threshold',
    //     width: '50px',
    // },
    // {
    //     title: '分值',
    //     dataIndex: 'score',
    //     width: '50px'
    // },
    {
        title: '时间',
        dataIndex: 'addtime',
        width: '180px'
    },
  
]
const serialNumber = (pageIndex, pageSize, index) => {
	return (pageIndex - 1) * pageSize + Number(index) + 1;
}
// 表格查询 返回 Promise 对象
const loadData = (parameter) => {
    return indexApi.hostHistory(Object.assign(parameter, searchFormState)).then((res)=>{
        data.value = res.records
        pageSize.value = res.size
        pageNumber.value = res.current
        current.value = res.current
        total.value = res.total
        return res
    })  
}

onMounted(()=>{
    loadTreeData()
})
// 加载左侧的树
const loadTreeData = () => {
    indexApi.hostsTree().then((res) => {
        cardLoading.value = false
        if (res !== null) {
            treeData.value = res
            treeData.value.unshift({
                name:"全部",
                type:"0"
            })
        }
    })
}
// 点击树查询
const treeSelect = (selectedKeys) => {
    if (selectedKeys.length > 0) {
        searchFormState.hostsid = selectedKeys.toString()
    } else {
        delete searchFormState.hostsid
    }
    table.value.refresh(true)
}
</script>
<style lang="less" scoped>
.snowy-buttom-left{
    margin-left: 10px;
}
.ant-table-thead > tr > th {
    border-bottom: none;
}
</style>