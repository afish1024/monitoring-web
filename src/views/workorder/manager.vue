<template>
    <a-row class="device">
        <a-col :span="5">
            <a-card title="工单管理">
                <div>
                    <a-button type="primary" style="width: 100%;" @click="orderInfo.onOpen()">
                        <template #icon><plus-outlined /></template>
                        创建工单
                    </a-button>
                </div>
                <div style="font-size: 12px;color: #e0e0e0;margin-top: 20px;">我的工单</div>
                
                <div class="myworkorder">
                    <div :class="item.key == selectKey ? 'divclick':''" v-for="(item,index) in myWorkOrderList" :key="index" @click="order(item)">
                        <div style="width: 96%;">{{item.name}}</div>
                        <div>2</div>
                    </div>
                </div>
                <div style="border-bottom:1px solid var(--border-color-split);margin-left: -24px;margin-right: -24px;"></div>
                <div style="font-size: 12px;color: #e0e0e0;margin-top: 20px;">全部工单</div>
                <div class="myworkorder">
                    <div :class="item1.key == selectKey ? 'divclick':''" v-for="(item1,index1) in allWorkOrderList" :key="index1" @click="orderall(item1)">
                        <div style="width: 96%;">{{item1.name}}</div>
                        <div>2</div>
                    </div>
                </div>
            </a-card>
        </a-col>
        <a-col :span="19">
            <a-row :gutter="24">
                <a-col :span="24">
                    <a-card :bordered="false">
                        <a-form ref="searchFormRef"  :model="searchFormState"  :label-col="{ span: 8 }">
                            <a-row :gutter="24">
                                <a-col :span="6">
                                    <a-form-item name="priority" label="优先级">
                                        <a-select v-model:value="searchFormState.priority" placeholder="请选择优先级" allowClear>
                                            <a-select-option v-for="item in priorityList" :key="item.dictValue" :value="item.dictValue">
                                                {{item.dictLabel}}
                                            </a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6">
                                    <a-form-item name="templateId" label="模板">
                                        <a-select v-model:value="searchFormState.templateId" placeholder="请选择模板" allowClear>
                                            <a-select-option v-for="item in templateInfo" :key="item.id" :value="item.id">
                                                {{item.templateName}}
                                            </a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6">
                                    <a-form-item name="slaStatus" label="SLA状态">
                                        <a-select v-model:value="searchFormState.slaStatus" placeholder="请选择SLA状态" allowClear>
                                            <a-select-option value="normal">正常</a-select-option>
                                            <a-select-option value="abnormal">异常</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6">
                                    <a-form-item name="createUser" label="创建人">
                                        <a-select v-model:value="searchFormState.createUser" placeholder="请选择创建人" allowClear>
                                            <a-select-option v-for="item in userList" :key="item.id" :value="item.id">
                                                {{item.name}}
                                            </a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                            </a-row>
                           
                            <a-row :gutter="24">
                                <a-col :span="6">
                                    <a-form-item name="processingUser" label="处理人">
                                        <a-select v-model:value="searchFormState.processingUser" placeholder="请选择处理人" allowClear>
                                            <a-select-option v-for="item in userList" :key="item.id" :value="item.id">
                                                {{item.name}}
                                            </a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6">
                                    <a-form-item name="workerTag" label="请选标签">
                                        <a-select v-model:value="searchFormState.workerTag" placeholder="请选标签" allowClear>
                                           
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6">
                                    <a-form-item name="searchKey" label="工单标题">
                                        <a-input v-model:value="searchFormState.searchKey" placeholder="请输入工单标题" allow-clear></a-input>
                                    </a-form-item>
                                </a-col>
                               
                                <a-col :span="6">
                                    <a-button type="primary" @click="table.refresh(true)">
                                        <template #icon><SearchOutlined /></template>
                                        查询
                                    </a-button>
                                    <a-button class="snowy-buttom-left" @click="reset">
                                        <template #icon><redo-outlined /></template>
                                        重置
                                    </a-button>
                                </a-col>
                            </a-row>
                        </a-form>
                    </a-card>
                </a-col>
            </a-row>
            <a-row :gutter="24">
                <a-col :span="24">
                    <a-card :bordered="false" >
                        <div class="iconleft"></div>
                        <div style="float: left;padding-left: 5px;font-weight: bold;">{{title}}</div>
                        <div style="text-align: right;">
                            <a-button style="margin-right: 10px;" @click="modifydata">批量变更</a-button>
                            <a-button @click="deleteBatchMenu()">
                                <template #icon><delete-outlined /></template>
                            </a-button>
                            
                        </div>
                    </a-card>
                </a-col>
            </a-row>
            <a-row :gutter="24">
                <a-col :span="24">
                    <a-card :bordered="false">
                        <s-table
                            ref="table"
                            :columns="columns"
                            :data="loadData"
                            :expand-row-by-click="true"
                            :alert="options.alert.show"
                            bordered
                            :row-key="(record) => record.id"
                            :row-selection="options.rowSelection"
                            :scroll="{ x: 1000 }"
                        >
                            <template #bodyCell="{ column, record }">
                                <template v-if="column.dataIndex === 'workerTitle'">
                                <a @click="vieworder(record)">{{ record.workerTitle }}</a>
                                </template>
                                <template v-if="column.dataIndex === 'slaStatus'">
                                    <span v-if="record.slaStatus =='normal'">正常</span>
                                    <span v-else>异常</span>
                                </template>
                                <template v-if="column.dataIndex === 'workerStatus'">
                                    <div v-for="(item,index) in orderList" :key="index">
                                        <span v-if="item.statusCode ==record.workerStatus ">{{ item.statusName }}</span>
                                    </div>
                                </template>
                            </template>
                        </s-table>
                    </a-card>
                </a-col>
            </a-row>
        </a-col>
    </a-row>
    <addWorkOrder ref="orderInfo" 
    @successful="table.refresh(true)"
    :templateList="templateInfo"
    :userList="userList"
    :tagList="tagList"
    :priorityList="priorityList"
    :orderList="orderList"
    ></addWorkOrder>
    <modifyInfo ref="modify" 
    @successful="table.refresh(true)" 
    :orderList="orderList" 
    :modifyIds="modifyIds"
    ></modifyInfo>
    <component 
    :is="currentComponent" 
    :recordInfo="recordInfo" 
    :visibleShow="visibleShow" 
    @closeview="closeview"
    :orderList="orderList"
    ></component>
</template>
<script setup name="manager">
import { message, Empty } from 'ant-design-vue'
import orderApi from '@/api/workorder/orderApi'
import userApi from '@/api/sys/userApi'
import tool from '@/utils/tool'
import template from './template.vue'
import addWorkOrder from './orderinfo.vue'
import modifyInfo from './modify.vue'
import viewInfo from './view.vue'
const visibleShow = ref(false)
const searchFormRef = ref()
const table = ref()
const orderInfo = ref()
const modify = ref()
const modifyIds = ref([])
const currentComponent = ref('')
const recordInfo = ref({})
let searchFormState = reactive({
    createUserId:null,
    statusCode:null

})
const templateInfo = ref([])
const userList = ref([])
const tagList = ref([])
const priorityList = ref([])
const orderList = ref()
onMounted(()=>{
    workStatusData()
    templateData()
    userPageData()
    priorityData()
})
const priorityData = ()=>{
    orderApi.dictListForLabel({dictValue:'WORKER_PRIORITY'}).then(res=>{
        // console.log(res)
        priorityList.value = res
    })
}
const closeview = ()=>{
    visibleShow.value = false
}
const vieworder = (item)=>{
    currentComponent.value = viewInfo
    recordInfo.value = item
    visibleShow.value = true
}
const userPageData = ()=>{
    userApi.userPage({isLogin:1,size:1000}).then((res) => {
        userList.value = res.records
    })
}
const templateData = ()=>{
    orderApi.templateList({size:1000}).then(res=>{
        templateInfo.value = res.records
    })
}
const loadData = (parameter)=>{
    return orderApi.workOrderList(Object.assign(parameter, searchFormState)).then((res)=>{
         return res
    })
}
const modifydata = ()=>{
    modifyIds.value = []
    if (selectedRowKeys.value.length < 1) {
        message.warning('请选择一条或多条数据')
        return false
    }
    selectedRowKeys.value.map((m) => {
        modifyIds.value.push(m)
    })
    modify.value.onOpen()
}
const columns = ref([
    {
        title: '工单标题',
        align: 'center',
        width: '120px',
        dataIndex: 'workerTitle'
    },
    {
        title: 'SLA状态',
        align: 'center',
        width: '100px',
        dataIndex: 'slaStatus'
    },
    {
        title: '工单状态',
        align: 'center',
        width: '100px',
        dataIndex: 'workerStatusName'
    },
    {
        title: '模板',
        align: 'center',
        width: '120px',
        dataIndex: 'worderTemplate'
    },
    {
        title: '优先级别',
        align: 'center',
        width: '80px',
        dataIndex: 'priorityName'
    },
    {
        title: '标签',
        align: 'center',
        width: '80px',
        dataIndex: 'workerTag'
    },
    {
        title: '创建人',
        align: 'center',
        width: '120px',
        ellipsis:true,
        dataIndex: 'createUserName'
    },
    {
        title: '创建时间',
        align: 'center',
        sorter: true,
        width: '150px',
        dataIndex: 'createTime'
    },
    {
        title: '更新时间',
        align: 'center',
        sorter: true,
        width: '150px',
        dataIndex: 'updateTime'
    }
])
const selectKey = ref('')
const title = ref('')
const reset =()=>{
    // console.log(myWorkOrderList)
    selectKey.value = myWorkOrderList.value.length > 0 ? myWorkOrderList.value[0].key : ''
    title.value = myWorkOrderList.value.length > 0 ? myWorkOrderList.value[0].name :''
    searchFormRef.value.resetFields()
} 
const order = (item)=>{
    selectKey.value = item.key
    title.value = item.name
    searchFormState.createUserId = tool.data.get('USER_INFO').id
    searchFormState.statusCode = item.statusCode
    table.value.refresh(true)
    columns.value = [
        {
            title: '工单标题',
            align: 'center',
            width: '120px',
            dataIndex: 'workerTitle'
        },
        {
            title: 'SLA状态',
            align: 'center',
            width: '100px',
            dataIndex: 'slaStatus'
        },
        {
            title: '工单状态',
            align: 'center',
            width: '100px',
            dataIndex: 'workerStatusName'
        },
        {
            title: '模板',
            align: 'center',
            width: '120px',
            dataIndex: 'worderTemplate'
        },
        {
            title: '优先级别',
            align: 'center',
            width: '80px',
            dataIndex: 'priorityName'
        },
        {
            title: '标签',
            align: 'center',
            width: '80px',
            dataIndex: 'workerTag'
        },
        {
            title: '创建人',
            align: 'center',
            width: '120px',
            ellipsis:true,
            dataIndex: 'createUserName'
        },
        {
            title: '创建时间',
            align: 'center',
            sorter: true,
            width: '150px',
            dataIndex: 'createTime'
        },
        {
            title: '更新时间',
            align: 'center',
            sorter: true,
            width: '150px',
            dataIndex: 'updateTime'
        }
    ]
}

const orderall = (item)=>{
    selectKey.value = item.key
    title.value = item.name
    searchFormState.statusCode = item.statusCode
    searchFormState.createUserId = null
    columns.value = [
        {
            title: '工单标题',
            align: 'center',
            width: '120px',
            dataIndex: 'workerTitle'
        },
        {
            title: 'SLA状态',
            align: 'center',
            width: '100px',
            dataIndex: 'slaStatus'
        },
        {
            title: '工单状态',
            align: 'center',
            width: '100px',
            dataIndex: 'workerStatusName'
        },
        {
            title: '模板',
            align: 'center',
            width: '120px',
            dataIndex: 'worderTemplate'
        },
        {
            title: '优先级别',
            align: 'center',
            width: '80px',
            dataIndex: 'priorityName'
        },
        {
            title: '标签',
            align: 'center',
            width: '80px',
            dataIndex: 'workerTag'
        },
        {
            title: '创建人',
            align: 'center',
            width: '120px',
            ellipsis:true,
            dataIndex: 'createUserName'
        },
        {
            title: '当前处理人',
            align: 'center',
            width: '120px',
            ellipsis:true,
            dataIndex: 'createUser'
        },
        {
            title: '满意度',
            align: 'center',
            width: '120px',
            ellipsis:true,
            dataIndex: 'satisfaction'
        },
        {
            title: '响应时间',
            align: 'center',
            width: '150px',
            ellipsis:true,
            dataIndex: 'responseTime'
        },
        {
            title: '处理时间',
            align: 'center',
            width: '150px',
            ellipsis:true,
            dataIndex: 'processingTime'
        },
        {
            title: '创建时间',
            align: 'center',
            sorter: true,
            width: '150px',
            dataIndex: 'createTime'
        },
        {
            title: '更新时间',
            align: 'center',
            sorter: true,
            width: '150px',
            dataIndex: 'updateTime'
        }
    ]
    table.value.refresh(true)
}
const allWorkOrderList = ref([
    // {
    //     key:'all',
    //     name:'所有工单'
    // },
    // {
    //     key:'all_pending_processing',
    //     name:'待处理的工单'
    // },
    // {
    //     key:'all_processing',
    //     name:'处理中的工单'
    // },
    // {
    //     key:'all_processed',
    //     name:'已处理的工单'
    // },
    // {
    //     key:'all_closed',
    //     name:'已关闭的工单'
    // },
])
const myWorkOrderList = ref([
    // {
    //     key:'my_pending_processing',
    //     name:'我的待处理工单'
    // },
    // {
    //     key:'my_processing',
    //     name:'我的处理中工单'
    // },
    // {
    //     key:'my_processed',
    //     name:'我的已处理工单'
    // },
    // {
    //     key:'my_closed',
    //     name:'我的已关闭工单'
    // },
    // {
    //     key:'my_submit',
    //     name:'我提交的工单'
    // }
])

const workStatusData = ()=>{
    orderApi.statusList({size:1000}).then(res=>{
        if(res.records.length > 0){
            orderList.value = res.records
            var name_1 = '我的'+res.records[0].statusName+'工单'
            var key_1 = res.records[0].statusCode+'-0'
            title.value  = name_1 ? name_1 :'我提交的工单'
            selectKey.value = key_1? key_1 :'my-submit'
            res.records.map((item,index)=>{
                myWorkOrderList.value.push({
                    id:item.id,
                    name:'我的'+item.statusName+'工单',
                    key:item.statusCode+'-'+index,
                    statusCode:item.statusCode
                })
                allWorkOrderList.value.push({
                    id:item.id,
                    name:item.statusName+'的工单',
                    key:item.statusCode+'--'+index,
                    statusCode:item.statusCode
                })
            })
            myWorkOrderList.value.push({
                    id:0,
                    name:'我提交的工单',
                    key:'my-submit'
                })
            allWorkOrderList.value.unshift({
                id:-1,
                name:'所有工单',
                key:'all'
            })
        }
    })
}
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
        onChange: (selectedRowKey, selectedRows) => {
            selectedRowKeys.value = selectedRowKey
        }
    }
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
    // planApiList.delPlan(params).then(()=>{
    //         table.value.refresh(true)
    //     })
}
</script>
<style lang="less" scoped>
  .device {
	width: 100%;
	background-color: #fff;
    .myworkorder{
        margin-top: 10px;
        cursor: pointer;
        line-height:3;
        div{
            display: flex;
        }
        .divclick{
            background: rgba(255, 237, 24, 0.14);
            margin-left: -24px;
            margin-right: -24px;
            padding-left: 24px;
            padding-right: 24px;
        }
    }
    .iconleft{
        width: 4px;
        height: 25px;
        background-color: #0069d2;
        float: left;
    }
    .snowy-buttom-left{
        margin-left: 10px;
    }
}
:deep(.ant-card-body){
    padding-bottom: 0px;
}
</style>