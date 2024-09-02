<template>
    <a-row >
        <a-col :span="24">
            <a-card :bordered="false" style="margin-bottom: 10px">
                <a-form ref="searchFormRef" name="advanced_search" class="ant-advanced-search-form" :model="searchFormState">
                    <a-row :gutter="24">
                        <a-col :span="8">
                            <a-form-item name="searchKey" label="部门名称">
                                <a-input v-model:value="searchFormState.searchKey" placeholder="请输入部门名称"></a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :span="8">
                            <a-form-item label="时间" style="margin-left: 15px;">
                                <a-range-picker
                                v-model:value="searchFormState.dates"
								:show-time="false"
                                style="width: 100%"
								format="YYYY-MM-DD"
                                @change="dateChange"
							/>
							</a-form-item>
                        </a-col>
                        <a-col :span="8">
                            <a-button type="primary" @click="table.refresh(true)">
                                <template #icon><SearchOutlined /></template>
                                查询
                            </a-button>
                            <a-button class="snowy-buttom-left" @click="clear">
                                <template #icon><redo-outlined /></template>
                                重置
                            </a-button>
                        </a-col>
                    </a-row>
                </a-form>
            </a-card>
            <a-card :bordered="false">
                <!--:scroll="{ x: 1500 }"-->
                <s-table
					ref="table"
					:columns="columns"
					:data="loadDate"
					:alert="options.alert.show"
					bordered
					:row-key="(record) => record.id"
                    :row-selection="options.rowSelection"
					:tool-config="toolConfig"
                     
				>
                    <template #operator class="table-operator">
						<a-space :size="8">
                            <a-button type="primary" @click="form.onOpen()"> 
                                <template #icon><plus-outlined /></template>
                                新增
                            </a-button>
							<a-button danger @click="deleteCoupon">批量删除</a-button>
						</a-space>
					</template>
                    <template #bodyCell="{ column, record }">
                        
                        <template v-if="column.dataIndex === 'imagePath'">
                            <a-image :src="record.imagePath" height="60px" width="60px" />
                        </template>
                        <template v-if="column.dataIndex === 'action'">
                            <a @click="form.onOpen(record)">编辑</a>
                            <a-divider type="vertical" />
                            <a-popconfirm title="确定删除吗？" @confirm="removeOrg(record)">
                                <a-button type="link" danger size="small">删除</a-button>
                            </a-popconfirm>
                        </template>
                    </template>
                </s-table>
            </a-card>
        </a-col>
        <Form ref="form" @successful="table.refresh(true)" />
    </a-row>
</template>
<script setup name="departmentList">
import Form from './form.vue'
// 定义tableDOM
const table = ref(null)
const form = ref()
const searchFormRef = ref()
let searchFormState = reactive({})
const dateChange = (dates)=>{
    if (dates != null) {
        searchFormState.startDate = dates[0].format('YYYY-MM-DD')
        searchFormState.endDate = dates[1].format('YYYY-MM-DD')
        if (dates.length < 1) {
            delete searchFormState.startDate
            delete searchFormState.endDate
        } 
    }else{
        searchFormState.startDate = ''
        searchFormState.endDate = ''
    }
}
const clear = ()=>{
    searchFormRef.value.resetFields()
    searchFormState.keywords = null
    searchFormState.startDate = null
    searchFormState.endDate = null
    searchFormState.dates = null
}
const columns = [
    {
        
        title: '部门名称',
        dataIndex: 'departmentTitle',
        align: 'center',
        fixed: 'left',
        width: 180 
    },
    {
        
        title: '上级部门',
        dataIndex: 'superiorDepartmentTitle',
        align: 'center',
        width: 80 
    },
    {
        
        title: '添加时间',
        dataIndex: 'createdAt',
        align: 'center',
        width: 180 
    },
    {
        
        title: '操作',
        dataIndex: 'action',
        align: 'center',
        width: 180 
    },
]
let selectedRowKeys = ref([])
// 列表选择配置
const options = {
    alert: {
        show: false,
        clear: () => {
            selectedRowKeys = ref([])
        }
    },
    rowSelection: {
        type:'checkbox',
        preserveSelectedRowKeys:true,
        onChange: (selectedRowKey, selectedRows) => {
            selectedRowKeys.value = selectedRowKey
        },
         
    }
}
const toolConfig = { refresh: true, height: true, columnSetting: true, striped: false }
let loadDate = (parameter) => {
	 return new Promise((resolve)=>{
        return resolve({
            total: 2, 
            current: 1, 
            size: "10", 
            pages: 1, 
            records:[
                {
                    id:1,
                    departmentTitle:'AAA',
                    superiorDepartmentTitle:'A',
                    createdAt:'2023-06-20 16:25:50'
                },
                {
                    id:2,
                    departmentTitle:'BBB',
                    superiorDepartmentTitle:'B',
                    createdAt:'2023-06-20 16:25:50'
                }
            ] 
        })
    })	 
}
// 批量删除
const deleteCoupon = ()=>{
    if (selectedRowKeys.value.length < 1) {
        message.error('请选择一条或多条数据')
        return false
    }
    var  params = selectedRowKeys.value.map((m) => {
            return m
        })
    var params = {ids:params.join(',')}
     
}
const removeOrg = (record)=>{
    let params = {ids: record.id}
    
}
</script>
<style scoped>
	.cardImp {
		margin-right: 10px;
	}
	.ant-form-item {
		margin-bottom: 0 !important;
	}
	.primaryAdd {
		margin-right: 10px;
	}
	.snowy-buttom-left {
		margin-left: 8px;
	}
</style>