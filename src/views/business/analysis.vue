<template>
    <a-row :gutter="10">
		<a-col :span="24" style="display: flex;padding-left:2px">
            <div class="ant-card" style="height: 100px;width: 25%;">
                <div class="ant-card-cover">
                    <div style="padding: 24px;line-height: 30px;display: flex;">

                        <div class="network">
                            <icon-font type="icon-yewu" class="icon"/>
                        </div>
                        <div style="width: 80%;padding-left: 20px;">
                            <div>
                                <span>业务总数</span>
                                
                            </div>
                            <div>
                                <span>{{ fromData.totalInfo.businessCount ? fromData.totalInfo.businessCount :0 }}</span>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="ant-card" style="height: 100px;width: 25%;margin-left: 10px;">
                <div class="ant-card-cover">
                    <div style="padding: 24px;line-height: 30px;display: flex;">

                        <div class="device">
                            <icon-font type="icon-shebeiguanli" class="icon"/>
                        </div>
                        <div style="width: 80%;padding-left: 20px;">
                            <div>
                                <span>设备总数：</span>
                              
                            </div>
                            
                            <div>
                                
                                <span>{{ fromData.totalInfo.deviceCount ? fromData.totalInfo.deviceCount :0 }}</span>
                            </div>
                        </div>
                       
                       
                    </div>
                    
                </div>
            </div>
            <div class="ant-card" style="height: 100px;width: 25%;margin-left: 10px;">
                <div class="ant-card-cover">
                    <!-- <span class="anticon"  style="color: rgb(105, 192, 255);font-size: 30px;padding-top: 18px;padding-bottom: 5px;">
                        <tool-outlined />
                    </span> -->
                    <div style="padding: 24px;line-height: 30px;display: flex;">
                        <div class="alarm">
                            <icon-font type="icon-gaojing" class="icon"/>
                        </div>
                        <div style="width: 80%;padding-left: 20px;">
                            <div>
                                <span>告警总数</span>
                                
                            </div>
                            
                            <div>
                                <span>{{ fromData.totalInfo.alarmCount ? fromData.totalInfo.alarmCount :0 }}</span>
                                 
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="ant-card" style="height: 100px;width: 25%;margin-left: 10px;">
                <div class="ant-card-cover">
                    <!-- <span class="anticon"  style="color: rgb(105, 192, 255);font-size: 30px;padding-top: 18px;padding-bottom: 5px;">
                        <tool-outlined />
                    </span> -->
                    <div style="padding: 24px;line-height: 30px;display: flex;">
                        <div class="connect">
                            <icon-font type="icon-envir-rely"  class="icon"/>
                        </div>
                        <div style="width: 80%;padding-left: 20px;">
                            <div>
                                <span>业务链接数：</span>
                                
                            </div>
                            
                            <div>
                                
                                <span>{{ fromData.totalInfo.linkCount ? fromData.totalInfo.linkCount :0 }}</span>
                            </div>
                        </div>
                       
                        
                    </div>
                    
                </div>
            </div>
            
            <!-- <div class="ant-card" style="height: 100px;width: 20%;margin-left: 10px;">
                <div class="ant-card-cover">
                    
                    <div style="padding: 24px;line-height: 30px;display: flex;">

                        <div class="task">
                            <icon-font type="icon-lock-full" class="icon"/>
                        </div>
                        <div style="width: 80%;padding-left: 20px;">
                            <div>
                                <span>锁定业务数：</span>
                                
                            </div>
                            
                            <div>
                                
                                <span>{{ fromData.totalInfo.abnormalTaskCount ? fromData.totalInfo.abnormalTaskCount :0 }}</span>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div> -->
        </a-col>
    </a-row>
    <a-row :gutter="24" style="margin-top: 10px;">
        <a-col :span="12" style="padding-left: 9px;">
            <a-card :bordered="false" style="display: flex;">
                <div class="iconleft"></div>
                <div style="float: left;padding-left: 5px;font-weight: bold;">业务健康度</div>
            </a-card>
            <a-card :bordered="false">
                <div class="health">
                    <div class="yuan">
                        <div class="score">
                            <a-progress :percent="fromData.deviceLineRate"  type="dashboard" :width="120" stroke-color="#2d5e0a" >
                                <template #format="percent">
                                    <span>{{fromData.deviceLineRate}}%</span>
                                    
                                </template>
                            </a-progress>
                        </div>
                        <div class="title">
                            设备在线率
                        </div>
                    </div>
                    <div class="yuan">
                        <div class="score">
                            <a-progress :percent="fromData.deviceHealthRate"  type="dashboard" :width="120" stroke-color="#2d5e0a" >
                                <template #format="percent">
                                    <span>{{fromData.deviceHealthRate}}%</span>
                                    
                                </template>
                            </a-progress>
                        </div>
                        <div class="title">
                            业务健康度
                        </div>
                    </div>
                    <div class="yuan">
                        <div class="score">
                            <a-progress :percent="fromData.linkConnectivityRate"  type="dashboard" :width="120" stroke-color="#185eff" >
                                <template #format="percent">
                                    <span>{{fromData.linkConnectivityRate}}%</span>
                                    
                                </template>
                            </a-progress>
                        </div>
                        <div class="title">
                            业务连通率
                        </div>
                    </div>
                </div>
                
            </a-card>
        </a-col>
        <a-col :span="12" style="padding-left: 0px;">
            <a-card :bordered="false" >
                <div class="iconleft"></div>
                <div style="float: left;padding-left: 5px;font-weight: bold;">CPU使用率TOP5</div>
            </a-card>
            <a-card :bordered="false">
                <BarPerformance 
                barunit="%" 
                performanceid="CPUT0P" 
                style="height: 200px;" 
                :barDataX="fromData.cpuTop5X" 
                :barDataY="fromData.cpuTop5Y" 
                 v-if="fromData.cpuTop5X.length > 0 && fromData.cpuTop5Y.length > 0"
                />
			</a-card>
        </a-col>
    </a-row>
    <a-row :gutter="24" style="margin-top: 10px;">
        <a-col :span="8" style="padding-left: 9px;">
            <a-card :bordered="false" style="display: flex;">
                <div class="iconleft"></div>
                <div style="float: left;padding-left: 5px;font-weight: bold;">业务优先级统计</div>
            </a-card>
            <a-card :bordered="false">
                <BasicBar
                :dataX="fromData.levelX" 
                :dataY="fromData.levelY" 
                v-if="fromData.levelY.length > 0 && fromData.levelX.length > 0"
                style="height: 200px;" />
            </a-card>
        </a-col>
        <a-col :span="8" style="padding-left: 0px;">
            <a-card :bordered="false" >
                <div class="iconleft"></div>
                <div style="float: left;padding-left: 5px;font-weight: bold;">业务类型统计</div>
            </a-card>
            <a-card :bordered="false">
				<BingZhuangTu05   
                :innerRadius="0.74" 
                style="height: 200px;"
                :total="fromData.businessTotal"  
                :datalist="fromData.businessStatistics"
                v-if="fromData.businessTotal > 0 && fromData.businessStatistics.length > 0"
                />
			</a-card>
        </a-col>
        <a-col :span="8" style="padding-left: 0px;">
            <a-card :bordered="false" >
                <div class="iconleft"></div>
                <div style="float: left;padding-left: 5px;font-weight: bold;">业务告警统计</div>
            </a-card>
            <a-card :bordered="false">
                <BingZhuangTu06   
                :innerRadius="0.74" 
                style="height: 200px;"
                :total="fromData.businessAlarmTotal"
                :datalist="fromData.businessAlarmStatistics" 
                :colorList="fromData.colorAlarmList"
                v-if="fromData.businessAlarmTotal > 0 && fromData.businessAlarmStatistics.length > 0"
                />
            </a-card>
        </a-col>
    </a-row>
</template>
<script setup name="network">
import { createFromIconfontCN } from '@ant-design/icons-vue';
import DisplayPlatform from '@/api/platform/indexApi'
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3441767_9w0tftm0xea.js',
});
defineComponent(() => {
	IconFont
})
const fromData = ref({
    totalInfo:{
        businessCount:0,
        alarmCount:0,
        deviceCount:0,
        linkCount:0,
        abnormalTaskCount:0
    },
    linkConnectivityRate:'',
    deviceHealthRate:'',
    deviceLineRate:'',
    cpuTop5X:[],
    cpuTop5Y:[],
    levelX:[],
    levelY:[],
    businessTotal:0,
    businessStatistics:[
        // { type: '无分类(1.235%)', value: 3 },
        // { type: '子进程(1.235%)', value: 2 },
        // { type: '生产业务(1.235%)', value: 1 },
        // { type: 'HTTP(1.235%)', value: 1 },
    ],
    businessAlarmTotal:0,
    businessAlarmStatistics:[
        // { type: '主要(1.235%)', value: 3 },
        // { type: '严重(1.235%)', value: 3 },
        // { type: '次要(1.235%)', value: 4 },
        
    ],
    colorAlarmList:['#ea3445','#fd9560','#fac748']
})
onMounted(()=>{
    businessAnalysisTotalData()
    businessAnalysisHealthData()
    businessAnalysisCpuData()
    businessAnalysisPriorityData()
    businessAnalysisTypeData()
    businessAnalysisLevelData()
})
// 业务告警统计
const businessAnalysisLevelData = ()=>{
    DisplayPlatform.businessAnalysisLevel().then(res=>{
        fromData.value.businessAlarmTotal = typeof(res.businessAlarmStatistics.total) !='undefined' ? res.businessAlarmStatistics.total :0

        if(typeof(res.businessAlarmStatistics.list) !='undefined' && res.businessAlarmStatistics.list.length > 0){

            res.businessAlarmStatistics.list.map((item)=>{
                if(item.name){
                    fromData.value.businessAlarmStatistics.push({type:item.name,value:item.value})
                }
            })
        }
    })
}
// 业务类型统计
const businessAnalysisTypeData = ()=>{
    DisplayPlatform.businessAnalysisType().then(res=>{

        fromData.value.businessTotal = typeof(res.businessTypeStatistics.total) !='undefined' ? res.businessTypeStatistics.total :0
        if(typeof(res.businessTypeStatistics.list) !='undefined' && res.businessTypeStatistics.list.length > 0){
            res.businessTypeStatistics.list.map((item)=>{
                if(item.name){
                    fromData.value.businessStatistics.push({type:item.name,value:item.value})
                }
            })
        }
        
    })
}

 // 业务优先级统计

 const businessAnalysisPriorityData = ()=>{
    DisplayPlatform.businessAnalysisPriority().then(res=>{
        if(res.businessPriorityStatistics.list && res.businessPriorityStatistics.list.length > 0){
            res.businessPriorityStatistics.list.map((item,index)=>{
                if(item.name){
                    fromData.value.levelX.push(item.name)
                    fromData.value.levelY.push(item.value)
                }
            })
        }
    })
 }
 // CPU使用率TOP5
 const businessAnalysisCpuData = ()=>{
    DisplayPlatform.businessAnalysisCpu().then(res=>{
        
        fromData.value.cpuTop5X = typeof(res.cpuUtilizationRateTop5.cpuUsage) !='undefined' ? res.cpuUtilizationRateTop5.cpuUsage :[]
        fromData.value.cpuTop5Y = typeof(res.cpuUtilizationRateTop5.ipAddress) !='undefined' ? res.cpuUtilizationRateTop5.ipAddress :[]
    })
 }
//业务健康度
const businessAnalysisHealthData = ()=>{
    DisplayPlatform.businessAnalysisHealth().then(res=>{
        if(typeof(res.businessHealth.deviceOnlineRate) !='undefined'){
          var  deviceOnlineRate = res.businessHealth.deviceOnlineRate.split(".")[0]
        }else{
          var  deviceOnlineRate = 0
        }

        if(typeof(res.businessHealth.deviceHealthRate)!='undefined'){
          var  deviceHealthRate = res.businessHealth.deviceHealthRate.split(".")[0]
        }else{
          var  deviceHealthRate = 0
        }
        if(typeof(res.businessHealth.linkConnectivityRate)!='undefined'){
          var  linkConnectivityRate = res.businessHealth.linkConnectivityRate.split(".")[0]
        }else{
          var  linkConnectivityRate = 0
        }
        fromData.value.deviceLineRate = deviceOnlineRate
        fromData.value.deviceHealthRate = deviceHealthRate
        fromData.value.linkConnectivityRate = linkConnectivityRate
    })
}
//业务总数
const businessAnalysisTotalData = ()=>{
    DisplayPlatform.businessAnalysis({}).then(res=>{
        fromData.value.totalInfo.businessCount = typeof(res.totalData.businessCount)!='undefined' ? res.totalData.businessCount : 0
        fromData.value.totalInfo.alarmCount = typeof(res.totalData.alarmCount)!='undefined' ? res.totalData.alarmCount : 0
        fromData.value.totalInfo.deviceCount = typeof(res.totalData.deviceCount)!='undefined' ? res.totalData.deviceCount : 0
        fromData.value.totalInfo.linkCount = typeof(res.totalData.linkCount)!='undefined' ? res.totalData.linkCount : 0
    })
}
</script>
<style lang="less" scoped>
.network{
    background: #185eff;
    border-radius: 50%;
    height: 3em;
    object-fit: cover;
    width: 3em;
    margin-top: 5px;
}
.device{
    background: #185eff;
    border-radius: 50%;
    height: 3em;
    object-fit: cover;
    width: 3em;
    margin-top: 5px;
}
.connect{
    background: #185eff;
    border-radius: 50%;
    height: 3em;
    object-fit: cover;
    width: 3em;
    margin-top: 5px;
}
.alarm{
    background: #185eff;
    border-radius: 50%;
    height: 3em;
    object-fit: cover;
    width: 3em;
    margin-top: 5px;
}
.task{
    background: #185eff;
    border-radius: 50%;
    height: 2.8em;
    object-fit: cover;
    width: 3em;
    margin-top: 5px;
}
.icon{
    display: flex;
    justify-content: center; 
    position: relative; 
    color: #fff;
    bottom: -30%;
}
.iconleft{
    width: 4px;
    height: 25px;
    background-color: #0069d2;
    float: left;
}
:deep(.ant-card-body){
 padding: 10px;
}
.health{
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    .yuan{
        float: left;
        width: 33%;
        .score{
            width: 100%;
            text-align: center;
            
        }
        .title{
                font-size: 12px;
                text-align: center;
            }
    }
}
</style>