<template>
    <a-row :gutter="24">
        <a-col :span="24">
            <a-card :bordered="false" style="margin-bottom: 10px">
                <a-form ref="searchFormRef"  :model="searchFormState">
                    <a-row :gutter="24">
                        <a-col :span="6">
                            <a-form-item name="networkId" label="选择网络">
                                <a-select v-model:value="searchFormState.networkId" placeholder="请选择网络" allowClear>
                                    <a-select-option v-for="item in networkList" :key="item.id" :value="item.id">{{
                                        item.networkName
                                    }}</a-select-option>
                                </a-select>
                             
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-form-item name="deviceId" label="选择设备">
                                <a-select v-model:value="searchFormState.deviceId" placeholder="请选择设备" allowClear>
                                    <a-select-option v-for="item in deviceList" :key="item.id" :value="item.id">{{
                                        item.deviceName
                                    }}</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-form-item name="eventSource" label="事件来源">
                                <a-select v-model:value="searchFormState.eventSource" placeholder="请选事件来源" allowClear>
                                    <a-select-option v-for="item in formData.eventSourcesView" :key="item" :value="item">
                                        {{ item }}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-button type="primary" @click="search">
                                <template #icon><SearchOutlined /></template>
                                    查询
                            </a-button>
                            <a-button class="snowy-buttom-left" @click="reset">
								<template #icon><redo-outlined /></template>
								重置
							</a-button>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="11"></a-col>
                        <a-col :span="13">
							
                            <div style="display: flex;">
                                <a-button v-for="(item,index) in buttonList" :key="index" 
                                style="margin-left: 8px;" 
                                @click="buttonDay(index)"
                                :type="searchFormState.indexButton === index ? 'primary' : ''"
                                >
                                    {{item}}
                                </a-button>
                                <a-range-picker
                                :show-time="false"
                                @change="panelChange" 
                                :format="format"
                                v-model:value="datesInfo"
                                style="width: 100%;margin-left: 8px;"
                                >
                                </a-range-picker>
                            </div>
						</a-col>
                    </a-row>
                </a-form>
            </a-card>
        </a-col>
    </a-row>
    <a-row :gutter="24" style="margin-top: 10px;">
        <a-col :span="8" style="padding-left: 9px;">
            <a-card :bordered="false" style="display: flex;">
                <div class="iconleft"></div>
                <div style="float: left;padding-left: 5px;font-weight: bold;">事件来源分析</div>
            </a-card>
            <a-card :bordered="false">
				<BingZhuangTu04  style="height: 200px;" :datalist="formData.eventSourcesList" content="" :colorarray="colorarray" :innerRadius="0.74" v-if="formData.eventSourcesList.length > 0"/>
            </a-card>
        </a-col>
        <a-col :span="8" style="padding-left: 0px;">
            <a-card :bordered="false" >
                <div class="iconleft"></div>
                <div style="float: left;padding-left: 5px;font-weight: bold;">事件发生top5</div>
            </a-card>
            <a-card :bordered="false">
				 <BarPerformance 
                 :barDataX="formData.dataX" 
                 :barDataY="formData.dataY" 
                 barunit="个" 
                 performanceid="memory" 
                 style="height: 200px;" 
                 v-if="formData.dataX.length > 0 && formData.dataY.length > 0"
                 />
			</a-card>
        </a-col>
        <a-col :span="8" style="padding-left: 0px;">
            <a-card :bordered="false" >
                <div class="iconleft"></div>
                <div style="float: left;padding-left: 5px;font-weight: bold;">事件设备逻辑类型分析</div>
                
            </a-card>
            <a-card :bordered="false">
				<BingZhuangTu05
                :total="formData.total"  
                :datalist="formData.eventDeviceList"
                :innerRadius="0.74"
                style="height: 200px;" 
                v-if="formData.total > 0 && formData.eventDeviceList.length > 0"
                />
			</a-card>
        </a-col>
    </a-row>
    <a-row :gutter="24" style="margin-top: 10px;">
        <a-col :span="24" style="padding-left: 9px;">
            <a-card :bordered="false" >
                <div class="iconleft"></div>
                <div style="float: left;padding-left: 5px;font-weight: bold;">事件列表</div>
                <div style="text-align: right;">
                    <a-button @click="deleteBatchMenu">
                        <template #icon><delete-outlined /></template>
                    </a-button>
                </div>
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
                    :row-selection="options.rowSelection"
				>
                    <template #bodyCell="{ column, record }">
                    
                        <template v-if="column.dataIndex === 'action'">
                            <a-popconfirm title="确定要操作吗？" @confirm="confirm(record)">
                                
                                   <delete-outlined /> 
                                 
                            </a-popconfirm>
                         </template>
                    </template>
                    
                </s-table>
			</a-card>
        </a-col>
    </a-row>
</template>
<script setup name="eventIndex">
import dayjs from 'dayjs';
import planApiList from '@/api/alarm/indexApi'
const treeFieldNames = { children: 'children', title: 'name', key: 'id' }
const networkList = ref([])
const deviceList = ref([])
const searchFormRef = ref()
const table = ref()
const datesInfo = ref(null)
let searchFormState = reactive({
    deviceId:null,
    networkId:undefined,
    startDate:null,
    endDate:null,
    lastDay:null,
    eventSource:null,
    indexButton:null
})
const format = 'YYYY-MM-DD'
const buttonDay = (index)=>{
    switch(index)
    {
        case 0:
            searchFormState.lastDay = 0
            searchFormState.indexButton = 0
            break;
        case 1:
            searchFormState.lastDay = 1
            searchFormState.indexButton = 1
            break;
        case 2:
            searchFormState.lastDay = 3
            searchFormState.indexButton = 2
            break;
        case 3:
            searchFormState.lastDay = 7
            searchFormState.indexButton = 3
            break;
        default:
            break;
    }
    loadEventIndex()
}
const reset = ()=>{
    searchFormState.deviceId = null
    searchFormState.networkId= null
    searchFormState.endDate= null
    searchFormState.startDate= null
    searchFormState.lastDay= null
    searchFormState.eventSource= null
    searchFormState.indexButton= null
    datesInfo.value = null
    loadEventIndex()
}
const search = ()=>{
    loadEventIndex()
}
onMounted(()=>{
    eventDataSourcesAnalysis()
    eventOccurredTop5()
    eventDeviceLogicTypeAnalysis()
    eventSourcesInfoData()
    eventNetworkInfoData()
    eventDeviceInfoData()
})

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
const columns = [
    {
        title: '事件级别',
        width: '100px',
        dataIndex: 'eventLevel'
    },
    {
        title: '发生时间',
        dataIndex: 'occurrenceTime',
        width: '120px',
    },
    {
        title: '事件名称',
        dataIndex: 'eventName',
        width: '100px',
        ellipsis:true,
    },
    {
        title: '事件来源',
        width: '100px',
        ellipsis:true,
        dataIndex: 'eventSource'
    },
    {
        title: '事件类型',
        width: '100px',
        dataIndex: 'eventType'
    },
    {
        title: '网络',
        width: '100px',
        dataIndex: 'networkName'
    },
    {
        title: '设备',
        width: '100px',
        dataIndex: 'deviceName'
    },
    {
        title: '资源名称',
        width: '100px',
        dataIndex: 'resourceName'
    },
    {
        title: 'IP地址',
        width: '100px',
        dataIndex: 'ipAddress'
    },
    {
        title: '操作',
        dataIndex: 'action',
        align: 'center',
        width: '100px'
    }
]
const loadData = (parameter) => {
    return planApiList.eventList(Object.assign(parameter, searchFormState)).then((res)=>{
            return res
    })
}
const panelChange = (dates)=>{
    if (dates != null) {
			searchFormState.startDate = dates[0].format('YYYY-MM-DD')
			searchFormState.endDate = dates[1].format('YYYY-MM-DD')
        if (dates.length < 1) {
            delete searchFormState.startDate
            delete searchFormState.endDate
        } 
    }else{
        searchFormState.startDate = null
        searchFormState.endDate = null
    }
    loadEventIndex()
    // console.log(dates.format('YYYY-MM-DD HH:mm:ss'))
}
const buttonList = ['最新','过去1天','过去3天','过去7天']
const hostGroupList = ref([])
const colorarray = ['#3299dc']
const formData = ref({
    eventSourcesList:[],
    dataY:[],
    dataX:[],
    total:0,
    eventDeviceList:[],
    eventSourcesView:[]
})
const eventDeviceInfoData = ()=>{
    planApiList.eventDeviceInfo({}).then(res=>{
        deviceList.value = res
    })
}
//选择网络
const eventNetworkInfoData = ()=>{
    planApiList.eventNetworkInfo({}).then(res=>{
        networkList.value = res
    })
}
//事件来源查询
const eventSourcesInfoData = ()=>{
    planApiList.eventSourcesInfo({}).then(res=>{
        formData.value.eventSourcesView = res
    })
}
//事件来源分析
const eventDataSourcesAnalysis = ()=>{
    planApiList.eventSourcesAnalysis(searchFormState).then(res=>{
        if(typeof(res.list)!='undefined' && res.list.length > 0){
            res.list.map((item)=>{
                formData.value.eventSourcesList.push({type:item.name,value:item.value})
            })
        }
    })
}
//事件发生top5
const eventOccurredTop5 = ()=>{
    planApiList.eventOccurredTop5(searchFormState).then(res=>{

        formData.value.dataX = typeof(res.eventCount) != 'undefined' ? res.eventCount :[]
        formData.value.dataY = typeof(res.deviceIP) != 'undefined' ? res.deviceIP :[]
    })
}
//事件设备逻辑类型分析
const eventDeviceLogicTypeAnalysis = ()=>{
    planApiList.eventDeviceLogicType(searchFormState).then(res=>{

        formData.value.total = typeof(res.total) != 'undefined' ? res.total :0
        if(typeof(res.list)!='undefined' && res.list.length > 0){
            res.list.map((item)=>{
                if(item.name){
                    formData.value.eventDeviceList.push({type:item.name,value:item.value})
                }
                
            })
        }
    })
}
const confirm = (record) => {
    let params = [
        {
            id: record.id
        }
    ]
    planApiList.delEvent(params).then(()=>{
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
    planApiList.delEvent(params).then(()=>{
            table.value.refresh(true)
        })
}
const loadEventIndex = ()=>{
    //事件列表查询
    loadData({})
    table.value.refresh(true)

     //事件来源分析查询
    formData.value.eventSourcesList = []
    eventDataSourcesAnalysis()

    // 事件发生top5查询
    formData.value.dataX = []
    formData.value.dataY = []
    eventOccurredTop5()

    //事件设备逻辑类型分析
    formData.value.total = 0
    formData.value.eventDeviceList = []
    eventDeviceLogicTypeAnalysis()
}
</script>
<style lang="less" scoped>
.iconleft{
    width: 4px;
    height: 25px;
    background-color: #0069d2;
    float: left;
}
:deep(.ant-card-body){
 padding: 10px;
}
.snowy-buttom-left{
    margin-left: 10px;
}
</style>