<template>
    <a-row :gutter="24">
        <a-col :span="8" style="padding-left: 9px;">
            <a-card :bordered="false" style="display: flex;">
                <div class="iconleft"></div>
                <div style="float: left;padding-left: 5px;font-weight: bold;">事件数量统计(数量/个)</div>
            </a-card>
            <a-card :bordered="false" style="padding: 0px;">
                <div style="display: flex;padding-left: 20px;">
                    <div style="width: 50%;">
                        <div>
                            <span>进7天事件总量</span>
                            <p style="margin-top: 10px;font-weight: bold;">{{formData.toDayCount}}</p>
                        </div>
                    </div>
                    <div style="width: 50%;">
                        <div>
                            <span>今日事件数</span>
                            <p style="margin-top: 10px;font-weight: bold;">{{formData.sevenDayCount}}</p>
                        </div>
                    </div>
                </div>
            </a-card>
        </a-col>
        <a-col :span="10" style="padding-left: 0px;">
            <a-card :bordered="false" >
                <div class="iconleft"></div>
                <div style="float: left;padding-left: 5px;font-weight: bold;">进7天事件来源(数量/个)</div>
            </a-card>
            <a-card :bordered="false">
				<div style="display: flex;padding-left: 20px;">
                    <div style="width: 20%;">
                        <div>
                            <span>系统类</span>
                            <p style="margin-top: 10px;font-weight: bold;">{{formData.system}}</p>
                        </div>
                    </div>
                    <div style="width: 20%;">
                        <div>
                            <span>Syslog类</span>
                            <p style="margin-top: 10px;font-weight: bold;">{{formData.syslog}}</p>
                        </div>
                    </div>
                    <div style="width: 20%;">
                        <div>
                            <span>预警类</span>
                            <p style="margin-top: 10px;font-weight: bold;">{{formData.warn}}</p>
                        </div>
                    </div>
                    <div style="width: 20%;">
                        <div>
                            <span>过滤告警类</span>
                            <p style="margin-top: 10px;font-weight: bold;">{{formData.filterAlarm}}</p>
                        </div>
                    </div>
                    <div style="width: 20%;">
                        <div>
                            <span>Trap类</span>
                            <p style="margin-top: 10px;font-weight: bold;">{{formData.trap}}</p>
                        </div>
                    </div>
                </div>
			</a-card>
        </a-col>
        <a-col :span="6" style="padding-left: 0px;">
            <a-card :bordered="false" >
                <div class="iconleft"></div>
                <div style="float: left;padding-left: 5px;font-weight: bold;">进7天事件优先级数量统计(数量/个)</div>
                
            </a-card>
            <a-card :bordered="false">
				<div style="display: flex;padding-left: 20px;">
                    <div style="width: 50%;display: flex;">
                        <div style="background-color: #ffe7ea;width: 40px;text-align: center;">
                            <span style="color: #e25659;">紧急</span>
                        </div>
                        <span style="font-weight: bold;">{{formData.emergency}}</span>
                    </div>
                    <div style="width: 50%;display: flex;justify-content: right;padding-right: 20px;">
                        <div style="background-color: #fdfae9;width: 40px;text-align: center;">
                            <span style="color: #f0d27c;">中</span>
                        </div>
                        <span style="font-weight: bold;">{{formData.medium}}</span>
                    </div>
                </div>

                <div style="display: flex;padding-left: 20px;margin-top: 23px;">
                    <div style="width: 50%;display: flex;">
                        <div style="background-color: #f8f1e7;width: 40px;text-align: center;">
                            <span style="color: #f3b5a6;">高</span>
                        </div>
                        <span style="font-weight: bold;">{{formData.high}}</span>
                    </div>
                    <div style="width: 50%;display: flex;justify-content: right;padding-right: 20px;">
                        <div style="background-color: #e2f6fd;width: 40px;text-align: center;">
                            <span style="color: #50a1d6;">低</span>
                        </div>
                        <span style="font-weight: bold;">{{formData.low}}</span>
                    </div>
                </div>
			</a-card>
        </a-col>
    </a-row>
    <a-row :gutter="24" style="margin-top: 10px;">
        <a-col :span="12" style="padding-left: 9px;padding-right: 0px;">
            <a-card :bordered="false" style="display: flex;">
                <div class="iconleft"></div>
                <div style="float: left;padding-left: 5px;font-weight: bold;">进7天事件类型统计(数量/个)</div>
            </a-card>
            <a-card :bordered="false">
				<BingZhuangTu04  style="height: 200px;" :datalist="formData.dataEventTypelist" content="" :colorarray="colorarray" :innerRadius="0.74" v-if="formData.dataEventTypelist.length > 0"/>
            </a-card>
        </a-col>
        <a-col :span="12">
            <a-card :bordered="false" style="display: flex;">
                <div class="iconleft"></div>
                <div style="float: left;padding-left: 5px;font-weight: bold;">进7天接收事件总量统计(数量/个)</div>
            </a-card>
            <a-card :bordered="false">
				<BasicBar :dataY="formData.dataReceivedY" :dataX="formData.dataReceivedX" style="height: 200px;" v-if="formData.dataReceivedX.length > 0 && formData.dataReceivedY.length"/>
            </a-card>
        </a-col>
    </a-row>
    <a-row :gutter="24" style="margin-top: 10px;">
        <a-col :span="12" style="padding-left: 9px;padding-right: 0px;">
            <a-card :bordered="false" style="display: flex;">
                <div class="iconleft"></div>
                <div style="float: left;padding-left: 5px;font-weight: bold;">进7天事件来源紧急程度分析</div>
            </a-card>
            <a-card :bordered="false">
				<div id="container" style="height: 200px;"></div>
            </a-card>
        </a-col>
        <a-col :span="12">
            <a-card :bordered="false" style="display: flex;">
                <div class="iconleft"></div>
                <div style="float: left;padding-left: 5px;font-weight: bold;">进7天设备接收事件总量(数量/个)</div>
            </a-card>
            <a-card :bordered="false">
				<BarPerformance :barDataX="formData.dataDeviceX" :barDataY="formData.dataDeviceY" barunit="个" performanceid="memory" v-if="formData.dataDeviceY.length > 0 && formData.dataDeviceX.length" style="height: 200px;" />
            </a-card>
        </a-col>
    </a-row>
</template>
<script setup name="analysisInfoList">
import BasicBar from '@/components/Chart/eCZhuZhuangTu/BasicBar.vue'
import { Heatmap } from '@antv/g2plot';
import planApiList from '@/api/alarm/indexApi'
const colorarray = ['#3299dc']
const formData = ref({
    toDayCount:0,
    sevenDayCount:0,
    system:0,
    filterAlarm:0,
    syslog:0,
    trap:0,
    warn:0,
    high:0,
    low:0,
    emergency:0,
    medium:0,
    dataReceivedY:[],
    dataReceivedX:[],
    dataDeviceX:[],
    dataDeviceY:[],
    dataEventTypelist:[],
    
})
onMounted(()=>{
    loaddata()
    eventNum()
    eventSources()
    eventPriority()
    eventType()
    eventReceivedStatistics()
    eventDevice()
})

//进7天设备接收事件总量
const eventDevice = ()=>{
    planApiList.eventDeviceStatistics({}).then(res=>{
        formData.value.dataDeviceX = typeof(res.eventCount) !='undefined' ? res.eventCount :[]
        formData.value.dataDeviceY = typeof(res.deviceIP) !='undefined' ? res.deviceIP :[]
    })
}
//进7天接收事件总量统计
const eventReceivedStatistics = ()=>{
    planApiList.eventReceivedStatistics({}).then(res=>{
        if(res.occurrenceTime.length > 0){
            // console.log(1111)
            res.occurrenceTime.map((item)=>{
                var index = item.indexOf("\-");
                formData.value.dataReceivedX.push(item.substring(index+1,item.length))
            })
        }
        formData.value.dataReceivedY = res.eventCount
    })
}
//进7天事件类型统计
const eventType = ()=>{
    planApiList.eventTypeStatistics({}).then(res=>{
        // console.log(res)
        if(res.list.length > 0){
            res.list.map((item)=>{
                formData.value.dataEventTypelist.push({type:item.name,value:item.value})
            })
        }
    })
}
//进7天事件优先级数量统计
const eventPriority = ()=>{
    planApiList.eventPriorityStatistics({}).then(res=>{
        formData.value.high = typeof(res.high) !='undefined' ? res.high :0
        formData.value.low = typeof(res.low) !='undefined' ? res.low :0
        formData.value.emergency = typeof(res.emergency) !='undefined' ? res.emergency :0
        formData.value.medium = typeof(res.medium) !='undefined' ? res.medium :0
    })
}
//进7天事件来源
const eventSources = ()=>{
    planApiList.eventSourcesStatistics({}).then(res=>{
        formData.value.system = typeof(res.system) !='undefined' ? res.system :0
        formData.value.filterAlarm = typeof(res.filterAlarm) !='undefined' ? res.filterAlarm :0
        formData.value.syslog = typeof(res.syslog) !='undefined' ? res.syslog :0
        formData.value.trap = typeof(res.trap) !='undefined' ? res.trap :0
        formData.value.warn = typeof(res.warn) !='undefined' ? res.warn :0
    })
}
//事件数量统计
const eventNum = ()=>{
    planApiList.eventNumStatistics({}).then(res=>{
        formData.value.toDayCount = res.toDayCount
        formData.value.sevenDayCount = res.sevenDayCount
    })
}
//进7天事件来源紧急程度分析
const loaddata = ()=>{
    planApiList.eventEmergencyDegreeStatistics({}).then(data=>{
        if(data.length == 0){
            return
        }
        const heatmapPlot = new Heatmap(document.getElementById('container'), {
        data,
        xField: 'name',
        yField: 'country',
        colorField: 'value',
        //   shape: 'circle',
        shape:'rect',
        autoHide:false,
        sizeRatio: 0.5,
        color: [ '#ffd2d5','#ffd2d5','#ffd2d5', '#ffd2d5','#ffd2d5','#fe6a78','#fe6a78'],
        label: {
            style: {
            fill: '#fff',
            shadowBlur: 2,
            shadowColor: 'rgba(0, 0, 0, .45)',
            },
        },
        heatmapStyle: (item) => (item.value > 0 ?{
                fill: '#fe6a78',
                stroke: '#fff',
                opacity: 0.8
            } :{
                fill: '#ffd2d5',
                stroke: '#fff',
                opacity: 0.8
            }),
        tooltip:false
        // tooltip: {
        //     formatter: (datum) => {
        //         return { name: datum.country, value: datum.value };
        //     },
        // }
        });
        //  heatmapPlot.on('tooltip:show', (...args) => {
        //   console.log(...args);
        // });
        heatmapPlot.render();
    })
    
}
const data = [
  { "name": "01/04", "value": 0, "country": "系统类" },
  { "name": "01/05", "value": 0, "country": "系统类" },
  { "name": "01/06", "value": 0, "country": "系统类" },
  { "name": "01/07", "value": 0, "country": "系统类" },
  { "name": "01/08", "value": 0, "country": "系统类" },
  { "name": "01/09", "value": 0, "country": "系统类" },
  { "name": "01/10", "value": 0, "country": "系统类" },
   
  { "name": "01/04", "value": 9, "country": "Syslog类" },
  { "name": "01/05", "value": 9, "country": "Syslog类" },
  { "name": "01/06", "value": 49, "country": "Syslog类" },
  { "name": "01/07", "value": 4, "country": "Syslog类" },
  { "name": "01/08", "value": 11, "country": "Syslog类" },
  { "name": "01/09", "value": 0, "country": "Syslog类" },
  { "name": "01/10", "value": 0, "country": "Syslog类" },
  
  { "name": "01/04", "value": 0, "country": "预警类" },
  { "name": "01/05", "value": 0, "country": "预警类" },
  { "name": "01/06", "value": 0, "country": "预警类" },
  { "name": "01/07", "value": 0, "country": "预警类" },
  { "name": "01/08", "value": 0, "country": "预警类" },
  { "name": "01/09", "value": 0, "country": "预警类" },
  { "name": "01/10", "value": 0, "country": "预警类" },

  { "name": "01/04", "value": 0, "country": "过滤告警类" },
  { "name": "01/05", "value": 0, "country": "过滤告警类" },
  { "name": "01/06", "value": 0, "country": "过滤告警类" },
  { "name": "01/07", "value": 0, "country": "过滤告警类" },
  { "name": "01/08", "value": 0, "country": "过滤告警类" },
  { "name": "01/09", "value": 0, "country": "过滤告警类" },
  { "name": "01/10", "value": 0, "country": "过滤告警类" },

  { "name": "01/04", "value": 0, "country": "Trap类" },
  { "name": "01/05", "value": 0, "country": "Trap类" },
  { "name": "01/06", "value": 0, "country": "Trap类" },
  { "name": "01/07", "value": 0, "country": "Trap类" },
  { "name": "01/08", "value": 0, "country": "Trap类" },
  { "name": "01/09", "value": 0, "country": "Trap类" },
  { "name": "01/10", "value": 0, "country": "Trap类" },
]

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
</style>