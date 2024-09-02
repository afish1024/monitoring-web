<template>
    <a-row :gutter="24">
        <a-col :span="24">
            <a-card :bordered="false" style="margin-bottom: 10px">
                <a-form ref="searchFormRef"  :model="searchFormState">
                    <a-row :gutter="24">
                        <a-col :span="8">
                            <a-form-item name="type" label="设备或网络">
                                <!-- <a-select v-model:value="searchFormState.type" placeholder="请选设备或网络" allowClear>
                                    <a-select-option v-for="item in hostGroupList" :key="item.id" :value="item.id">{{
                                        item.name
                                    }}</a-select-option>
                                </a-select> -->
                                <a-tree-select
                                    v-model:value="value"
                                    show-search
                                    style="width: 100%"
                                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                                    placeholder="请选择设备或网络"
                                    allow-clear
                                    tree-default-expand-all
                                    :tree-data="treeData"
                                    :field-names="treeFieldNames"
                                    tree-node-filter-prop="name"
                                    @select="selectTree"
                                ></a-tree-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="8">
                            <a-form-item name="alarmType" label="告警类型">
                                <a-select v-model:value="searchFormState.alarmType" placeholder="请选择告警类型" allowClear>
                                    <a-select-option v-for="item in alramTypeList" :key="item.dictValue" :value="item.dictValue">{{
                                        item.dictLabel
                                    }}</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="8">
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
    <a-row :gutter="24">
        <a-col :span="8" style="padding-left: 11px;">
            <a-card :bordered="false" style="display: flex;">
                <div class="iconleft"></div>
                <div style="float: left;padding-left: 5px;font-weight: bold;">告警级别分析</div>
            </a-card>
            <a-card :bordered="false">
				<BingZhuangTu04 :innerRadius="0.74" :datalist="formData.alarmLevelList" style="height: 200px;" v-if="formData.alarmLevelList.length > 0"/>
            </a-card>
        </a-col>
        <a-col :span="8" style="padding-left: 0px;">
            <a-card :bordered="false" >
                <div class="iconleft"></div>
                <div style="float: left;padding-left: 5px;font-weight: bold;">告警数量top5</div>
            </a-card>
            <a-card :bordered="false">
				 <BarPerformance 
                 barunit="个" 
                 performanceid="memory" 
                 style="height: 200px;" 
                 :barDataX="formData.dataX" 
                 :barDataY="formData.dataY" 
                 v-if="formData.dataX.length > 0 && formData.dataY.length > 0"
                 />
			</a-card>
        </a-col>
        <a-col :span="8" style="padding-left: 0px;">
            <a-card :bordered="false" >
                <div class="iconleft"></div>
                <div style="float: left;padding-left: 5px;font-weight: bold;">资源类型告警分析</div>
                
            </a-card>
            <a-card :bordered="false">
				<BingZhuangTu05 
                nameid="resources" 
                :innerRadius="0.74" 
                style="height: 200px;"
                :total="formData.total"  
                :datalist="formData.alarmResourceTypeList"
                v-if="formData.total > 0 && formData.alarmResourceTypeList.length > 0"
                />
			</a-card>
        </a-col>
    </a-row>
    <a-row :gutter="24" style="margin-top: 10px;">
        <a-col :span="12" style="padding-left: 11px;">
            <a-card :bordered="false" >
                <div class="iconleft"></div>
                <div style="float: left;padding-left: 5px;font-weight: bold;">告警趋势分析</div>
                
            </a-card>
            <a-card :bordered="false">
				<StackedAreaChart 
                :dataX="formData.dataTrendX"
                :dataY="formData.dataTrendY"
                v-if="formData.dataTrendY.length > 0 && formData.dataTrendX.length > 0"
                style="height: 200px;"
                />
			</a-card>
        </a-col>
        <a-col :span="12" style="padding-left: 0px;">
            <a-card :bordered="false" >
                <div class="iconleft"></div>
                <div style="float: left;padding-left: 5px;font-weight: bold;">告警类型分析</div>
                
            </a-card>
            <a-card :bordered="false">
				<BingZhuangTu05 
                :innerRadius="0.74" 
                nameid="alert" 
                :total="formData.alarmTypeTotal"  
                :datalist="formData.alarmTypeList"
                v-if="formData.alarmTypeTotal > 0 && formData.alarmTypeList.length > 0"
                style="height: 200px;"/>
			</a-card>
        </a-col>
    </a-row>
</template>
<script setup name="analysisIndex">
import alarmApiList from '@/api/alarm/indexApi'
import dayjs from 'dayjs';
import topologyApi from '@/api/topology/topologyApi';
const treeFieldNames = { children: 'children', label: 'name', value: 'id' }
const searchFormRef = ref()
const treeData = ref([])
const value = ref();
const formData = ref({
    dataY:[],
    dataX:[],
    dataTrendX:[],
    dataTrendY:[],
    total:0,
    alarmResourceTypeList:[],
    alarmTypeTotal:0,
    alarmTypeList:[],
    alarmLevelList:[]

})
onMounted(()=>{
    loadData()
    alramTypeInfo()
    alarmLevelListData()
    alarmsTotalTop5Data()
    resourceTypeAlarmAnalysisData()
    alarmTrendAnalysisData()
    alarmTypeAnalysisData()
})
const alramTypeInfo = ()=>{
    alarmApiList.alramTypeListForLabel({dictValue:'ALARM_TYPE'}).then(res=>{
        alramTypeList.value = res
    })
}
//告警类型分析
const alarmTypeAnalysisData = ()=>{
    alarmApiList.alarmTypeAnalysis(searchFormState).then(res=>{
        formData.value.alarmTypeTotal = typeof(res.total) != 'undefined' ? res.total :0
        if(typeof(res.list)!='undefined' && res.list.length > 0){
            res.list.map((item)=>{
                formData.value.alarmTypeList.push({type:item.name,value:item.value})
            })
        }
    })
}
//告警趋势分析
const alarmTrendAnalysisData =()=>{
    alarmApiList.alarmTrendAnalysis(searchFormState).then(res=>{
        formData.value.dataTrendY = typeof(res.alarmCount) != 'undefined' ? res.alarmCount :[]
        // console.log(res.occurrenceTime)
        var dataArray = []
        if( typeof(res.occurrenceTime)!='undefined'  && res.occurrenceTime.length > 0){
            res.occurrenceTime.map((item)=>{
                const specialCharIndex = item.indexOf(' ');
                if(specialCharIndex !== -1) {
                    dataArray.push(item.substring(0, specialCharIndex));
                }
            })
        }
        formData.value.dataTrendX = dataArray
    })
}
//资源类型告警分析
const resourceTypeAlarmAnalysisData = ()=>{
    alarmApiList.alarmResourceTypeAlarmAnalysis(searchFormState).then(res=>{

        formData.value.total = typeof(res.total) != 'undefined' ? res.total :0
        if(typeof(res.list)!='undefined' && res.list.length > 0){
            res.list.map((item)=>{
                if(item.name){
                    formData.value.alarmResourceTypeList.push({type:item.name,value:item.value})
                }
                
            })
        }
    })
}
//告警数量top5
const alarmsTotalTop5Data = ()=>{
    alarmApiList.alarmsTotalTop5Analysis(searchFormState).then(res=>{
        formData.value.dataX = typeof(res.alarmCount) != 'undefined' ? res.alarmCount :[]
        formData.value.dataY = typeof(res.deviceName) != 'undefined' ? res.deviceName :[]
    })
}
//告警级别分析
const alarmLevelListData = ()=>{
    alarmApiList.alarmLevelAnalysis(searchFormState).then(res=>{
        
        if(typeof(res.list)!='undefined' && res.list.length > 0){
            res.list.map((item)=>{
                formData.value.alarmLevelList.push({type:item.name,value:item.value})
            })
        }
        // console.log(formData.value.alarmLevelList)
    })
}
const loadData = ()=>{
    topologyApi.viewTree().then((res) => {
        // console.log(res)
        treeData.value = res
    })
}
const selectTree = (value, node)=>{
    // console.log(value)
    // console.log(node)
    if(node.type == 'intranet'){
        searchFormState.networkId = node.id
    }else if(node.type == 'equipment'){
        searchFormState.deviceId = node.id
    }
}
let searchFormState = reactive({
    alarmType:null,
    deviceId:null,
    networkId:undefined,
    startDate:null,
    endDate:null,
    lastDay:null,
    indexButton:null
})
const datesInfo = ref(null)
const format = 'YYYY-MM-DD'
const search = ()=>{
    alarmIndexData()
}
const alarmIndexData = ()=>{
    //告警级别分析
    formData.value.alarmLevelList = []
    alarmLevelListData()

    //告警数量top5
    formData.value.dataY = [],
    formData.value.dataX = [],
    alarmsTotalTop5Data()

    //资源类型告警分析
    formData.value.total = 0,
    formData.value.alarmResourceTypeList = [],
    resourceTypeAlarmAnalysisData()

    //告警趋势分析
    formData.value.dataTrendX = [],
    formData.value.dataTrendY = [],
    alarmTrendAnalysisData()

    //告警类型分析
    formData.value.alarmTypeTotal = 0,
    formData.value.alarmTypeList = []
    alarmTypeAnalysisData()
}
const reset = ()=>{
    searchFormState.alarmType = null
    searchFormState.deviceId= null
    searchFormState.networkId= null
    searchFormState.startDate= null
    searchFormState.endDate= null
    searchFormState.lastDay= null
    searchFormState.indexButton= null
    datesInfo.value = null
    value.value = null
    alarmIndexData()
}
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
    alarmIndexData()
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
    alarmIndexData()
}
const buttonList = ['最新','过去1天','过去3天','过去7天']
const alramTypeList = ref([])
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