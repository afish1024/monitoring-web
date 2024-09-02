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
                    :row-selection="options.rowSelection"
                    :defkey="selectedRowKeys"
                    :scroll="{ x: 1000 }"
				>
					<template #operator class="table-operator">
						<!-- <a-space> :tool-config="toolConfig":scroll="{ x: 1000 }"
							<a-button type="primary">
								<template #icon><plus-outlined /></template>
								告警记录
							</a-button>
							<a-button danger @click="deleteBatchOrg()">删除</a-button>
						</a-space> -->
                        <a-space>
                            <a-button type="primary" @click="form.onOpen(undefined)"   v-if="hasPerm('monitoringAdd')"   >
                                <template #icon><plus-outlined /></template>
                                新增监控
                            </a-button>
                            <a-button danger @click="deleteBatchMenu()" v-if="hasPerm('monitoringMoreDelete')">删除</a-button>
                        </a-space>
					</template>
                    <template v-slot:bodyCell="{text, record, index, column}">
                        <template v-if="column.dataIndex === 'id'">
                            {{index +1}}
                        </template>
                        <template v-if="column.dataIndex === 'icon'">
                            <component :is="record.icon" />
                        </template>
                        <template v-if="column.dataIndex === 'monitorStatus'">
                            <a-switch
                                :loading="loading"
                                :checked="record.monitorStatus ==1 ? true :false"
                                @change="editStatus($event,record)"
                                checked-children="开启" 
                                un-checked-children="关闭"
                            />
                        </template>
                        <template v-if="column.dataIndex === 'action'">
                            <a-space>
                                <a @click="form.onOpen(record)"  v-if="hasPerm('monitoringEdit')">编辑</a>
                                <a-divider type="vertical"   v-if="hasPerm(['monitoringEdit', 'monitoringSmsTemplate'], 'and')"/>
                                <a @click="sms.onOpen(record)"  v-if="hasPerm('monitoringSmsTemplate')">短信模板</a>
                                <a-divider type="vertical"    v-if="hasPerm(['monitoringSmsTemplate', 'monitoringAlarmSetting'], 'and')"/>
                                <a @click="alarmset.onOpen(record)"  v-if="hasPerm('monitoringAlarmSetting')">告警设置</a>
                                <a-divider type="vertical"   v-if="hasPerm(['monitoringAlarmSetting', 'monitoringHostsSet'], 'and')" />
                                <a @click="hostset.onOpen(record)"  v-if="hasPerm('monitoringHostsSet')">主机设置</a>
                                <a-divider type="vertical"    v-if="hasPerm(['monitoringHostsSet', 'monitoringDelete'], 'and')"/>
                                <a-popconfirm title="确定要删除吗？" @confirm="deleteMenu(record)"  v-if="hasPerm('monitoringDelete')">
                                    <a-button type="link" danger size="small">删除</a-button>
                                </a-popconfirm>
                            </a-space>
                        </template>
                    </template>
                    
				</s-table>
			</a-card>
        </a-col>
    </a-row>    
    <Form ref="form" @successful="table.refresh(true)" />
    <SmsTemplate ref="sms" @successful="table.refresh(true)" />
    <AlarmSet ref="alarmset"  @successful="table.refresh(true)" />
    <HostTemplate ref="hostset"  @successful="table.refresh(true)" />
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
import global from '@/store/modules/global.js'
let selectedRowKeys = ref([])
let selecteDisabledRowKeys = ref([])
let loading = ref(false)

const columns = [
    {
        title: '序号',
        dataIndex: 'id',
        fixed: 'left',
        width: '60px'
    },
    // {
    //     title: '图标',
    //     dataIndex: 'icon',
    //     fixed: 'left',
    //     width: '50px'
    // },
    {
        title: '监控名称',
        dataIndex: 'name',
        width: '240px'
    },
    {
        title: '监控状态',
        dataIndex: 'monitorStatus',
        width: '120px',
    },
    {
        title: '健康度',
        dataIndex: 'healthScore',
        width: '120px',
        sorter:true
    },
    {
        title: '排序',
        dataIndex: 'sort',
        width: '100px',
        sorter:true
    },
    {
        title: '监控接口数量',
        dataIndex: 'api_count',
        width: '120px',
        sorter:true
    },
   {
        title: '接口执行间隔时间(秒)',
        dataIndex: 'intervalTime',
        width: '180px',
        sorter:true
    },
    {
        title: '短信模板',
        dataIndex: 'template',
        width: '150px'
    },

]

if (hasPerm(['monitoringEdit', 'monitoringSmsTemplate','monitoringAlarmSetting','monitoringHostsSet','monitoringDelete'])) {
    columns.push({
        title: '操作',
        dataIndex: 'action',
        align: 'center',
        fixed: 'right',
        width: '400px',
        scopedSlots: { customRender: 'action' }
    })
}
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
let ismute =  ref(global.state.ismute)

let visibleRemind = ref(true)
let timer = ref()



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
    return indexApi.sysList(Object.assign(parameter, searchFormState)).then((res)=>{
            return res
    })
  
}
// 删除
const deleteMenu = (record) => {
		let params = [
			{
				id: record.id
			}
		]
        bizTypeApi.delApi(params).then(()=>{
            table.value.refresh(true)
        })
		
	}
// 批量删除
const deleteBatchMenu = () => {
    if (selectedRowKeys.value.length < 1) {
        message.warning('请选择一条或多条数据')
        return false
    }
    const params = selectedRowKeys.value.map((m) => {
        return {
            id: m
        }
    })
    bizTypeApi.delApi(params).then(()=>{
            table.value.refresh(true)
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