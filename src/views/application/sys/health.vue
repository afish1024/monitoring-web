<template>
    <a-row>
		<a-col :span="24">
            <a-card :bordered="false" style="margin-bottom: 10px">
				<a-form ref="searchFormRef" name="advanced_search" class="ant-advanced-search-form" :model="searchFormState">
					<a-row :gutter="24">
						<a-col :span="8">
							<a-form-item name="keywords" label="监控名称">
								<a-input v-model:value="searchFormState.keywords" placeholder="请输入监控名称" allow-clear></a-input>
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
					:row-key="(record) => record.id"
                    :defkey="selectedRowKeys"
                    :size="50"
				>
					<template #operator class="table-operator">
						<!-- <a-space> :tool-config="toolConfig":scroll="{ x: 1000 }"
							<a-button type="primary">
								<template #icon><plus-outlined /></template>
								告警记录
							</a-button>
							<a-button danger @click="deleteBatchOrg()">删除</a-button>
						</a-space> -->
					</template>
                    <template v-slot:bodyCell="{text, record, index, column}">
                        <template v-if="column.dataIndex === 'id'">
                            
                            <p v-if=" index < 9">0{{index +1}}</p>
                            <p v-else> {{index +1}}</p>
                        </template>
                        <template v-if="column.dataIndex === 'action'">
                            <a @click="alarm(record)">业务监控详情</a>
                        </template>
                    </template>
                    
				</s-table>
			</a-card>
        </a-col>
    </a-row>    
</template>
<script setup name="listSys">
import { message, Empty } from 'ant-design-vue'
import indexApi from '@/api/python/indexApi'
import tool from '@/utils/tool'
import Form from './form.vue'
import AlarmSet from './alarmset.vue'
import SmsTemplate from './smstemplate.vue'
import HostTemplate from './hosttemplate.vue'
import bizTypeApi from '@/api/biz/bizTypeApi'
import { useRouter } from 'vue-router'
let selectedRowKeys = ref([])
let selecteDisabledRowKeys = ref([])
let loading = ref(false)
const router = useRouter()
const alarm = (record)=>{
    let routeData = router.resolve({ path: '/businessmonitoring',query:{ type: record.type} });
    window.open(routeData.href, '_blank');
}
const columns = [
    {
        title: '序号',
        dataIndex: 'id',
        fixed: 'left',
        width: '60px'
    },
    {
        title: '监控名称',
        dataIndex: 'name',
        width: '240px'
    },
    {
        title: '健康度分数',
        dataIndex: 'healthScore',
        width: '240px',
        sorter:true,
        // sortOrder: "descend"
    },
    {
        title: 'CPU使用率%',
        dataIndex: 'cpuUsage',
        width: '140px',
        sorter: (a, b) => a.cpuUsage - b.cpuUsage,
    },
    {
        title: '磁盘使用率%',
        dataIndex: 'diskUsage',
        width: '140px',
        sorter: (a, b) => a.diskUsage - b.diskUsage,
    },
    {
        title: '内存使用率%',
        dataIndex: 'memoryUsage',
        width: '140px',
        sorter: (a, b) => a.memoryUsage - b.memoryUsage,
    },
    {
        title: '操作',
        dataIndex: 'action',
        align: 'center',
        fixed: 'right',
        width: '140px'
    }
]

// 定义tableDOM
const table = ref(null)
const form = ref()
const sms = ref()
const alarmset = ref()
const hostset = ref()
const searchFormRef = ref()
let searchFormState = reactive({
    app: "0",
    keywords:"",
    type:0,
})

onMounted(() => {
})

const editStatus = (e,record) => {
    loading.value = true
    if(e === false){
        record.monitorStatus = 0
        bizTypeApi.submitForm(record, !record.id).then(()=>{
            loading.value = false
            table.value.refresh(true)
        })
    }else{
        record.monitorStatus = 1
        bizTypeApi.submitForm(record, !record.id).then(()=>{
            loading.value = false
            table.value.refresh(true)
        })
    }
}
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
        },
        // getCheckboxProps: record => ({
        //         // return {
        //             disabled: selecteDisabledRowKeys.value.includes(record.id),
        //             props: {
        //                 // disabled: record.name === 'Disabled User',
        //                 // name: record.name,
        //                 defaultChecked: selectedRowKeys.value.includes(record.id) // 该属性用于默认勾选处理
        //             },
        //         // }
        //     })
    }
}
const loadData = (parameter) => {
    
    searchFormState.userId = tool.data.get('USER_INFO').id
    return indexApi.adminHealthList(Object.assign(parameter, searchFormState)).then((res)=>{
            return res
    })
  
}


</script>
<style lang="less" scoped>
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
:deep(.ant-tree .ant-tree-node-content-wrapper){
    padding: 0 ;
}
:deep(.ant-tree-switcher){
    width:0;
}
</style>