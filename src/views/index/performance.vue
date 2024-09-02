<template>
    <a-row :gutter="10">
		<a-col :span="24" style="display: flex;padding-left:2px">
            <div class="ant-card" style="height: 100px;width: 20%;">
                <div class="ant-card-cover">
                    <!-- <span class="anticon"  style="color: rgb(105, 192, 255);font-size: 30px;padding-top: 18px;padding-bottom: 5px;">
                        <tool-outlined />
                    </span> -->
                    <div style="padding: 24px;line-height: 30px;display: flex;">
                        <div style="width: 80%;">
                            <div>
                                <span>网络数：</span>
                                <span>{{ fromData.totalInfo.networksCount ? fromData.totalInfo.networksCount :0 }}</span>
                            </div>
                            
                            <div>
                                <span>资源数：</span>
                                <span>{{ fromData.totalInfo.resourcesCount ? fromData.totalInfo.resourcesCount :0 }}</span>
                            </div>
                        </div>
                       
                        <div class="network">
                            <global-outlined   class="icon"/>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="ant-card" style="height: 100px;width: 20%;margin-left: 10px;">
                <div class="ant-card-cover">
                    <!-- <span class="anticon"  style="color: rgb(105, 192, 255);font-size: 30px;padding-top: 18px;padding-bottom: 5px;">
                        <tool-outlined />
                    </span> -->
                    <div style="padding: 24px;line-height: 30px;display: flex;">
                        <div style="width: 80%;">
                            <div>
                                <span>设备数：</span>
                                <span>{{ fromData.totalInfo.devicesCount ? fromData.totalInfo.devicesCount :0 }}</span>
                            </div>
                            
                            <div>
                                <span>掉线设备数：</span>
                                <span>{{ fromData.totalInfo.disconnectedDeviceCount ? fromData.totalInfo.disconnectedDeviceCount :0 }}</span>
                            </div>
                        </div>
                       
                        <div class="device">
                            <icon-font type="icon-shebeiguanli" class="icon"/>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="ant-card" style="height: 100px;width: 20%;margin-left: 10px;">
                <div class="ant-card-cover">
                    <!-- <span class="anticon"  style="color: rgb(105, 192, 255);font-size: 30px;padding-top: 18px;padding-bottom: 5px;">
                        <tool-outlined />
                    </span> -->
                    <div style="padding: 24px;line-height: 30px;display: flex;">
                        <div style="width: 80%;">
                            <div>
                                <span>连接数：</span>
                                <span>{{ fromData.totalInfo.connectionCount ? fromData.totalInfo.connectionCount :0 }}</span>
                            </div>
                            
                            <div>
                                <span>断开连接数：</span>
                                <span>{{ fromData.totalInfo.disconnectedCount ? fromData.totalInfo.disconnectedCount :0 }}</span>
                            </div>
                        </div>
                       
                        <div class="connect">
                            <icon-font type="icon-envir-rely"  class="icon"/>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="ant-card" style="height: 100px;width: 20%;margin-left: 10px;">
                <div class="ant-card-cover">
                    <!-- <span class="anticon"  style="color: rgb(105, 192, 255);font-size: 30px;padding-top: 18px;padding-bottom: 5px;">
                        <tool-outlined />
                    </span> -->
                    <div style="padding: 24px;line-height: 30px;display: flex;">
                        <div style="width: 80%;">
                            <div>
                                <span>告警数：</span>
                                <span>{{ fromData.totalInfo.alarmCount ? fromData.totalInfo.alarmCount :0 }}</span>
                            </div>
                            
                            <div>
                                <span>未确认告警数：</span>
                                <span>{{ fromData.totalInfo.unconfirmedAlarmCount ? fromData.totalInfo.unconfirmedAlarmCount :0 }}</span>
                            </div>
                        </div>
                       
                        <div class="alarm">
                            <icon-font type="icon-gaojing" class="icon"/>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="ant-card" style="height: 100px;width: 20%;margin-left: 10px;">
                <div class="ant-card-cover">
                    <!-- <span class="anticon"  style="color: rgb(105, 192, 255);font-size: 30px;padding-top: 18px;padding-bottom: 5px;">
                        <tool-outlined />
                    </span> -->
                    <div style="padding: 24px;line-height: 30px;display: flex;">
                        <div style="width: 80%;">
                            <div>
                                <span>任务数：</span>
                                <span>{{ fromData.totalInfo.taskCount ? fromData.totalInfo.taskCount :0 }}</span>
                            </div>
                            
                            <div>
                                <span>异常任务数：</span>
                                <span>{{ fromData.totalInfo.abnormalTaskCount ? fromData.totalInfo.abnormalTaskCount :0 }}</span>
                            </div>
                        </div>
                       
                        <div class="task">
                            <icon-font type="icon-renwuguanli-" class="icon"/>
                        </div>
                    </div>
                    
                </div>
            </div>
        </a-col>
    </a-row>
    <a-row :gutter="24" style="margin-top: 10px;">
        <a-col :span="8" style="padding-left: 9px;">
            <a-card :bordered="false" style="display: flex;">
                <div class="iconleft"></div>
                <div style="float: left;padding-left: 5px;font-weight: bold;">链路状态统计</div>
            </a-card>
            <a-card :bordered="false">
				<BingZhuangTu06 
                :innerRadius="0.74"
                :datalist="fromData.linkStatusList"
                v-if="fromData.linkStatusList.length > 0"
                style="height: 300px;"
                />
            </a-card>
        </a-col>
        <a-col :span="8" style="padding-left: 0px;">
            <a-card :bordered="false" >
                <div class="iconleft"></div>
                <div style="float: left;padding-left: 5px;font-weight: bold;">内存使用率统计top5</div>
            </a-card>
            <a-card :bordered="false">
				 <BarPerformance 
                 gridRight="10%"
                 barunit="%" 
                 performanceid="memory" 
                 :barDataY="fromData.memoryUsageRatesTop5Y"
                 :barDataX="fromData.memoryUsageRatesTop5X"
                 v-if="fromData.memoryUsageRatesTop5Y.length > 0 && fromData.memoryUsageRatesTop5X.length > 0"
                 style="height: 300px;" />
			</a-card>
        </a-col>
        <a-col :span="8" style="padding-left: 0px;">
            <a-card :bordered="false" >
                <div class="iconleft"></div>
                <div style="float: left;padding-left: 5px;font-weight: bold;">cpu使用率top5</div>
            </a-card>
            <a-card :bordered="false">
                <BarPerformance 
                barunit="%" 
                performanceid="cpu" 
                :barDataY="fromData.cpuUsageRatesTop5Y"
                :barDataX="fromData.cpuUsageRatesTop5X"
                v-if="fromData.cpuUsageRatesTop5Y.length > 0 && fromData.cpuUsageRatesTop5X.length > 0"
                style="height: 300px;" />
			</a-card>
        </a-col>
    </a-row>
    <a-row :gutter="24" style="margin-top: 10px;">
        <a-col :span="12" style="padding-left: 9px;">
            <a-card :bordered="false" style="display: flex;">
                <div class="iconleft"></div>
                <div style="float: left;padding-left: 5px;font-weight: bold;">带宽使用率top5</div>
            </a-card>
            <a-card :bordered="false">
                <BarPerformance 
                gridRight="10%"
                barunit="kb/s" 
                performanceid="broadband" 
                :barDataY="fromData.bandwidthUsageRatesTop5Y"
                :barDataX="fromData.bandwidthUsageRatesTop5X"
                v-if="fromData.bandwidthUsageRatesTop5Y.length > 0 && fromData.bandwidthUsageRatesTop5X.length > 0"
                style="height: 300px;" />
			</a-card>
        </a-col>
        <a-col :span="12" style="padding-left: 0px;">
            <a-card :bordered="false" >
                <div class="iconleft"></div>
                <div style="float: left;padding-left: 5px;font-weight: bold;">吞吐量top5</div>
                
            </a-card>
            <a-card :bordered="false">
                <BarPerformance 
                barunit="kb/s" 
                performanceid="swallow" 
                :barDataY="fromData.throughputTop5Y"
                :barDataX="fromData.throughputTop5X"
                v-if="fromData.throughputTop5Y.length > 0 && fromData.throughputTop5X.length > 0"
                style="height: 300px;" />
			</a-card>
        </a-col>
    </a-row>
</template>
<script setup name="network">
import { createFromIconfontCN } from '@ant-design/icons-vue';
import BarPerformance from '@/components/Chart/eCZhuZhuangTu/BarPerformance.vue'
import homeApi from '@/api/home/indexApi'
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3441767_you5defpxu.js',
});
defineComponent(() => {
	IconFont
})
const fromData = ref({
    totalInfo:{},
    linkStatusList:[],
    throughputTop5X:[],
    throughputTop5Y:[],
    bandwidthUsageRatesTop5X:[],
    bandwidthUsageRatesTop5Y:[],
    cpuUsageRatesTop5X:[],
    cpuUsageRatesTop5Y:[],
    memoryUsageRatesTop5X:[],
    memoryUsageRatesTop5Y:[]
})
onMounted(()=>{
    
    totalStatistics()
    performanceStatistics()
})
//链路状态统计
const performanceStatistics= ()=>{
    homeApi.performanceHomeStatistics({}).then(res=>{
        
        if(typeof(res.linkStateStatistics.list)!='undefined' && res.linkStateStatistics.list.length > 0){
            res.linkStateStatistics.list.map((item)=>{
                fromData.value.linkStatusList.push({type:item.name,value:item.value})
            })
        }
        if(typeof(res.throughputTop5)!='undefined'){
            fromData.value.throughputTop5Y = res.throughputTop5.portIp.map(item => item === null ? '' : item)
            fromData.value.throughputTop5X = res.throughputTop5.throughputUsage.map(item => item === null ? 0 : item)
        }  

        if(typeof(res.bandwidthUsageRatesTop5)!='undefined'){
            fromData.value.bandwidthUsageRatesTop5Y = res.bandwidthUsageRatesTop5.portIp.map(item => item === null ? '' : item)
            fromData.value.bandwidthUsageRatesTop5X = res.bandwidthUsageRatesTop5.bandwidthUsage.map(item => item === null ? 0 : item)
        }

        if(typeof(res.cpuUsageRatesTop5)!='undefined'){
            fromData.value.cpuUsageRatesTop5Y = res.cpuUsageRatesTop5.ipAddress
            fromData.value.cpuUsageRatesTop5X = res.cpuUsageRatesTop5.cpuUsage
        }

        if(typeof(res.memoryUsageRatesTop5)!='undefined'){
            fromData.value.memoryUsageRatesTop5Y = res.memoryUsageRatesTop5.ipAddress
            fromData.value.memoryUsageRatesTop5X = res.memoryUsageRatesTop5.memoryUsage
        }
    })
}
//顶部统计
const totalStatistics = ()=>{
    homeApi.totalHomeStatistics({createTime:'',dateType:'',searchValue:''}).then(res=>{
        fromData.value.totalInfo = res
    })
}
</script>
<style lang="less" scoped>
.network{
    width: 22%;
    font-size: 20px;
    padding-top: 15px;
    background-color:rgb(45 94 10);
    border-radius: 100%;
    overflow: hidden;
    height: 100%;
    position: relative;
    top: 10px;
}
.device{
    width: 22%;
    font-size: 20px;
    padding-top: 15px;
    background-color:#5140b4;
    border-radius: 100%;
    overflow: hidden;
    height: 100%;
    position: relative;
    top: 10px;
}
.connect{
    width: 22%;
    font-size: 20px;
    padding-top: 15px;
    background-color:#1890ff;
    border-radius: 100%;
    overflow: hidden;
    height: 100%;
    position: relative;
    top: 10px;
}
.alarm{
    width: 22%;
    font-size: 20px;
    padding-top: 15px;
    background-color:#ff7d18;
    border-radius: 100%;
    overflow: hidden;
    height: 100%;
    position: relative;
    top: 10px;
}
.task{
    width: 22%;
    font-size: 20px;
    padding-top: 15px;
    background-color:#185eff;
    border-radius: 100%;
    overflow: hidden;
    height: 100%;
    position: relative;
    top: 10px;
}
.icon{
    display: flex;
    justify-content: center; 
    position: relative; 
    color: #fff;
    bottom: 7px;
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
</style>