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
        <a-col :span="12" style="padding-left: 9px;">
            <a-card :bordered="false" style="display: flex;">
                <div class="iconleft"></div>
                <div style="float: left;padding-left: 5px;font-weight: bold;">24小时告警统计</div>
            </a-card>
            <a-card :bordered="false">
				<AlarmLine 
                :dataX="fromData.occurrenceTimeX"
                :dataY="fromData.alarmCountY"
                style="height: 300px;"
                v-if="fromData.occurrenceTimeX.length > 0 && fromData.alarmCountY.length > 0"
                />
            </a-card>
        </a-col>
        <a-col :span="12" style="padding-left: 0px;">
            <a-card :bordered="false" >
                <div class="iconleft"></div>
                <div style="float: left;padding-left: 5px;font-weight: bold;">当前告警类型统计</div>
            </a-card>
            <a-card :bordered="false">
				 <BarAlarm 
                 :dataX="fromData.alarmTypeX"
                 :dataY="fromData.alarmTypeY"
                 v-if="fromData.alarmTypeX.length > 0 && fromData.alarmTypeY.length > 0"
                  style="height: 300px;"
                 />
			</a-card>
        </a-col>
    </a-row>
    <a-row :gutter="24" style="margin-top: 10px;">
        <a-col :span="12" style="padding-left: 9px;">
            <a-card :bordered="false" style="display: flex;">
                <div class="iconleft"></div>
                <div style="float: left;padding-left: 5px;font-weight: bold;">进7天设备告警分布</div>
            </a-card>
            <a-card :bordered="false">
				 <div id="container" style="height: 300px;"></div>
			</a-card>
        </a-col>
        <a-col :span="12" style="padding-left: 0px;">
            <a-card :bordered="false" >
                <div class="iconleft"></div>
                <div style="float: left;padding-left: 5px;font-weight: bold;">设备告警top5</div>
                
            </a-card>
            <a-card :bordered="false">
                <BarPerformance 
                performanceid="alarm" 
                style="height: 300px;" 
                :barDataX="fromData.deviceTop5X" 
                :barDataY="fromData.deviceTop5Y" 
                 v-if="fromData.deviceTop5X.length > 0 && fromData.deviceTop5Y.length > 0"
                />
			</a-card>
        </a-col>
    </a-row>
</template>
<script setup name="network">
import { createFromIconfontCN } from '@ant-design/icons-vue';
import BarPerformance from '@/components/Chart/eCZhuZhuangTu/BarPerformance.vue'
import BarAlarm from '@/components/Chart/eCZhuZhuangTu/BarAlarm.vue'
import AlarmLine from '@/components/Chart/eCXianXingTu/AlarmLine.vue'
import { Heatmap } from '@antv/g2plot';
import homeApi from '@/api/home/indexApi'
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3441767_you5defpxu.js',
});
defineComponent(() => {
	IconFont
})
const fromData = ref({
    totalInfo:{},
    alarmCountY:[],
    occurrenceTimeX:[],
    deviceTop5X:[],
    deviceTop5Y:[],
    deviceAlarmDistributionFor7DayList:[],
    alarmTypeX:[],
    alarmTypeY:[]
})
onMounted(()=>{
    totalStatistics()
    alarmStatistics()
})
const totalStatistics = ()=>{
    homeApi.totalHomeStatistics({createTime:'',dateType:'',searchValue:''}).then(res=>{
        fromData.value.totalInfo = res
    })
}
const alarmStatistics = ()=>{
    homeApi.alarmHomeStatistics().then(res=>{
        fromData.value.alarmCountY = typeof(res.alarmStatisticsFor24Hour.alarmCount)!='undefined' ? res.alarmStatisticsFor24Hour.alarmCount :[]
        fromData.value.occurrenceTimeX =typeof(res.alarmStatisticsFor24Hour.occurrenceTime)!='undefined' ? res.alarmStatisticsFor24Hour.occurrenceTime :[]

        fromData.value.deviceTop5X = typeof(res.deviceAlarmTop5.alarmCount)!='undefined' ? res.deviceAlarmTop5.alarmCount:[]
        fromData.value.deviceTop5Y = typeof(res.deviceAlarmTop5.deviceIP) !='undefined' ? res.deviceAlarmTop5.deviceIP :[]
       
        fromData.value.deviceAlarmDistributionFor7DayList = typeof(res.deviceAlarmDistributionFor7Day) !='undefined' ? res.deviceAlarmDistributionFor7Day :[]
        if(fromData.value.deviceAlarmDistributionFor7DayList.length > 0){
            loaddata()
        }

        if(typeof(res.currentAlarmTypeStatistics)!='undefined'){
            fromData.value.alarmTypeX = res.currentAlarmTypeStatistics.data
            if(typeof(res.currentAlarmTypeStatistics.series)!='undefined'){
                res.currentAlarmTypeStatistics.series.map((item)=>{
                    item.barWidth = '15%'
                    if(item.name=='次要'){
                        item.itemStyle = {color:'#fac748'}
                    }else if(item.name=='主要'){
                        item.itemStyle = {color:'#fd9560'}
                    }else if(item.name=='严重'){
                        item.itemStyle = {color:'#ea3445'}
                    }else if(item.name=='掉线'){
                        item.itemStyle = {color:'#9ea5b5'}
                    }else if(item.name=='未知'){
                        item.itemStyle = {color:'#8d79ec'}
                    }
                    
                })
                fromData.value.alarmTypeY = res.currentAlarmTypeStatistics.series
            }
            
        }
    })
}
const loaddata = ()=>{
    var data = fromData.value.deviceAlarmDistributionFor7DayList
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
}
// const data = [
//   { "name": "01/04", "value": 0, "country": "服务器" },
//   { "name": "01/05", "value": 0, "country": "服务器" },
//   { "name": "01/06", "value": 49, "country": "服务器" },
//   { "name": "01/07", "value": 4, "country": "服务器" },
//   { "name": "01/08", "value": 11, "country": "服务器" },
//   { "name": "01/09", "value": 68, "country": "服务器" },
//   { "name": "01/10", "value": 49, "country": "服务器" },
   
//   { "name": "01/04", "value": 0, "country": "中间件" },
//   { "name": "01/05", "value": 0, "country": "中间件" },
//   { "name": "01/06", "value": 49, "country": "中间件" },
//   { "name": "01/07", "value": 4, "country": "中间件" },
//   { "name": "01/08", "value": 11, "country": "中间件" },
//   { "name": "01/09", "value": 68, "country": "中间件" },
//   { "name": "01/10", "value": 49, "country": "中间件" },
  
//   { "name": "01/04", "value": 0, "country": "交换机" },
//   { "name": "01/05", "value": 0, "country": "交换机" },
//   { "name": "01/06", "value": 49, "country": "交换机" },
//   { "name": "01/07", "value": 4, "country": "交换机" },
//   { "name": "01/08", "value": 11, "country": "交换机" },
//   { "name": "01/09", "value": 68, "country": "交换机" },
//   { "name": "01/10", "value": 49, "country": "交换机" },

//   { "name": "01/04", "value": 0, "country": "其他" },
//   { "name": "01/05", "value": 0, "country": "其他" },
//   { "name": "01/06", "value": 49, "country": "其他" },
//   { "name": "01/07", "value": 4, "country": "其他" },
//   { "name": "01/08", "value": 11, "country": "其他" },
//   { "name": "01/09", "value": 68, "country": "其他" },
//   { "name": "01/10", "value": 49, "country": "其他" },

//   { "name": "01/04", "value": 0, "country": "流量设备" },
//   { "name": "01/05", "value": 0, "country": "流量设备" },
//   { "name": "01/06", "value": 49, "country": "流量设备" },
//   { "name": "01/07", "value": 4, "country": "流量设备" },
//   { "name": "01/08", "value": 11, "country": "流量设备" },
//   { "name": "01/09", "value": 68, "country": "流量设备" },
//   { "name": "01/10", "value": 49, "country": "流量设备" },
// ]

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