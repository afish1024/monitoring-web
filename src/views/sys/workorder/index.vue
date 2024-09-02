<template>
    <a-row  :gutter="20">
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
                <a-form
                    ref="searchFormRef"
                    name="advanced_search"
                    class="ant-advanced-search-form"
                    :model="searchFormState"
				>
					<a-row :gutter="24">
						<a-col :span="6">
							<a-form-item name="keywords" >
								<a-input v-model:value="searchFormState.keywords" placeholder="请输入关键词" allow-clear></a-input>
							</a-form-item>
						</a-col>
                        <a-col :span="6">
                            <a-form-item  name="orderType">
                                <a-select v-model:value="searchFormState.orderType" placeholder="请选择工单类型" allowClear>
                                    <a-select-option v-for="item in workorderTypes" :key="item.dictValue" :value="item.dictValue">{{
                                        item.name
                                    }}</a-select-option>
                                </a-select>
                            </a-form-item>
                            
                        </a-col>
                        <a-col :span="6">
                            <a-form-item name="confirmStatus">
                                <a-select v-model:value="searchFormState.confirmStatus" placeholder="请选择确认状态" allowClear>
                                    <a-select-option v-for="item in confirmStatus" :key="item.value" :value="item.value">{{
                                        item.name
                                    }}</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-form-item  name="repairedStatus">
                                <a-select v-model:value="searchFormState.repairedStatus" placeholder="请选择修复状态" allowClear>
                                    <a-select-option v-for="item in repairedStatus" :key="item.value" :value="item.value">{{
                                        item.name
                                    }}</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-form-item name="dates"  >
                                <a-space direction="horizontal" :size="10">
                                    <a-range-picker v-model:value="searchFormState.dates" :show-time="false" format="YYYY-MM-DD" @change="dateChange"
                                    />  
                                </a-space>
                            </a-form-item>
                        </a-col>
                       
						<a-col :span="7">
							<a-button type="primary" @click="table.refresh(true)" style="margin-right: 10px;">{{ $t('common.searchButton') }}</a-button>
                            <a-button class="snowy-buttom-left" @click="() => searchFormRef.resetFields()">{{
                                $t('common.resetButton')
                            }}</a-button>
						</a-col>
					</a-row>
				</a-form>
			</a-card>
            <a-card :bordered="false">
				<s-table
					ref="table"
					:columns="columns"
					:data="loadData"
					:expand-row-by-click="true"
					:alert="options.alert.show"
					bordered
					:row-key="(record) => record.id"
                    :scroll="{ x: 1000 }"
                    :tool-config="toolConfig"
				>
                <template v-slot:bodyCell="{text, record, index, column}">
                    <template v-if="column.dataIndex === 'id'">
                        {{index+1 }}
                    </template>
                    <template v-if="column.dataIndex === 'workorder_name'">
                        <span v-if="record.order_type === 'api'">
                            {{  record.app_api_name }}
                        </span>
                        <span v-else>
                            {{  record.host_name }}
                        </span>
                    </template>
                    <template v-if="column.dataIndex == 'status'">
                        <block v-if="record.order_type == 'api'">
                            <span class="color-red">{{ record.status_message }}</span>
                        </block>
                        <block v-if="record.order_type != 'api'">
                            <span >{{ record.status }}</span>
                        </block>
                    </template>
                    <template v-if="column.dataIndex === 'confirm_status_name'">
                        <span>{{  record.confirm_status_name }}</span>
                    </template>
                    <template v-if="column.dataIndex === 'repaired_status_name'">
                      
                        <span >{{  record.repaired_status_name }}</span>
                    </template>
                  
                    <template v-if="column.dataIndex === 'action'">
                        <a @click="info.onOpen(record,'info')" v-if="hasPerm('wordorderInfo')">详情</a>
                        <a-divider type="vertical"  v-if="hasPerm(['wordorderInfo','confirmWorkorder'], 'and')" />
                        <template v-if="record.is_confirm == 1 && hasPerm('confirmWorkorder')" >
                            <a  @click="statusUpdate(record,index)">确认工单</a>
                        </template>
                    </template>
                </template>
				</s-table>
			</a-card>
        </a-col>
    </a-row>
    <Info ref="info" @successful="table.refresh(true)" />
    <a-modal
        :title="generateTitle"
        v-model:visible="generateVisible"
        @cancel="generateVisible = false"
        @ok="statusAffirm"
    >
        <div>系统：{{ generateContent.app_name }}</div>
        <div v-if="generateContent.host_name">主机：{{ generateContent.host_name }}</div>
        <div v-if="generateContent.app_api_name">接口：{{ generateContent.app_api_name }}</div>
        <div v-if="generateContent.app_api_name">异常状态：{{ generateContent.status_message }}</div>
        <div v-if="generateContent.host_name">异常状态：{{ generateContent.status }}</div>
        <div>异常信息：{{ generateContent.msg }}</div>
        <div>创建时间：{{ generateContent.create_time }}</div>
    </a-modal>
</template>
<script setup name="alarmLogList">
import { message, Empty } from 'ant-design-vue'
import indexApi from '@/api/python/indexApi'
import tool from '@/utils/tool'
import bus from "@/utils/bus";
import global from '@/store/modules/global.js'
import workorderApi from '@/api/python/workorderApi'
import Info from './info.vue'
let info = ref()
const table = ref()
const toolConfig = { refresh: true, height: true, columnSetting: true, striped: false }
const visibleModel = ref(false)

const userInfo = ref(tool.data.get('USER_INFO'))
const cancelModel = () =>{
    visibleModel.value = false
}
let searchFormState = reactive({})
let generateTitle = ref('请确认工单消息')
let generateVisible = ref(false)
let generateContent = ref([])
let workorderIndex = ref(0)
let workorderId = ref(0)
const searchFormRef = ref()
// 默认展开的节点
let defaultExpandedKeys = ref([])
const selectedKeys = ref(["0"])
const treeData = ref([])
// 替换treeNode 中 title,key,children
const treeFieldNames = { children: 'children', title: 'name', key: 'type' }
const cardLoading = ref(true)

let workorderTypes = ref([{

        'dictValue':'host',
        'name':'主机'
    },
    {
        'dictValue': 'api',
        'name': '接口'
    }])
let repairedStatus = ref([
        {
            'id':1,
            'value':'unrepaired',
            'name':'待修复'
        },
        {
            'id': 2,
            'value': 'repaired',
            'name': '已修复'
        }
    ])
let confirmStatus = ref([
    {
        'id':1,
        'value':'unconfirm',
        'name':'待确认'
    },
    {
        'id': 2,
        'value': 'confirmed',
        'name': '已确认'
    }
])

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
        dataIndex: 'id',
        fixed: 'left',
        width: '60px'
    },
    {
        title: '系统',
        fixed: 'left',
        dataIndex: 'app_name',
        width: '200px'
    },
    {
        title: '工单类别',
        fixed: 'left',
        dataIndex: 'order_type_name',
        width: '100px'
    },
    {
        title: '接口名称/主机名称',
        dataIndex: 'workorder_name',
        fixed: 'left',
        width: '200px'
    },
    {
        title: '异常状态',
        dataIndex: 'status',
        width: '220px'
    },
    {
        title: '确认状态',
        dataIndex: 'confirm_status_name',
        width: '120px'
    },
    {
        title: '修复状态',
        dataIndex: 'repaired_status_name',
        width: '120px'
    },
    {
        title: '创建时间',
        dataIndex: 'create_time',
        width: '150px'
    },
    {
        title: '确认时间',
        dataIndex: 'confirm_time',
        width: '150px'
    },
    {
        title: '修复时间',
        dataIndex: 'repaired_time',
        width: '150px'
    },
  
]
if (hasPerm(['wordorderInfo', 'confirmWorkorder'])) {

    columns.push({
        title: '操作',
        dataIndex: 'action',
        align: 'center',
        width: '150px',
        fixed: 'right',
    })
}

const loadData = (parameter) => {
    parameter.isNormalUser = 1
    if(userInfo.value.roleCodeList.indexOf('superAdmin') != -1){
        parameter.isNormalUser = 0
    }
    parameter.userid = userInfo.value.id
    return workorderApi.workorderPage(Object.assign(parameter, searchFormState)).then((res) => {
     
        return res
    })
}
const statusUpdate  = (record,index) => {
    workorderId.value = record.id
    workorderIndex.value = index
    generateVisible.value = true
    generateContent.value = record
}
const statusAffirm = () => {
   
    indexApi.updatedata({id:workorderId.value,userid:userInfo.value.id}).then((res) => {
        generateVisible.value = false
        table.value.refresh()
    })
    
}
onMounted(()=>{
    loadTreeData()
})
// 加载左侧的树
const loadTreeData = () => {
    indexApi.monitorTree().then((res) => {
        cardLoading.value = false
        if (res !== null) {
            treeData.value = res.records
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
        searchFormState.type = selectedKeys.toString()
        searchFormState.app = selectedKeys.toString()
    } else {
        delete searchFormState.type
    }
    table.value.refresh(true)
}
</script>
<style lang="less" scoped>
.color-red{
    background-color: red;
}
</style>