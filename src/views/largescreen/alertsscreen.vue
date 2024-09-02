<template>
    <v-scale-screen style="background-color: rgb(16, 11, 43);" >
        <div id="preview">
            <div class="top">
                <div class="title">
                    告警大屏
                </div>
                <div class="dateinfo">
                    <div class="time">{{hours}}:{{minutes > 9 ? minutes :'0'+minutes}}:{{seconds > 9 ? seconds :'0'+seconds}}</div>
                    <div class="date">
                        
                        <span>{{year}}/{{month > 9 ? month : '0'+month}}/{{day > 9 ? day :'0'+day}}</span>
                        <span>{{ weekDay }}</span>
                    </div>
                </div>
            </div>

            <a-row :gutter="20" justify="space-between" class="contdiv">
                <a-col :span="6" >
                  <div class="item">
                    <div class="toral"></div>

                    <a-row :gutter="0" justify="start" class="titlediv">
                        <a-col :span="1" >
                            <div class="icon">&nbsp;</div>
                        </a-col>
                        <a-col :span="10" class="title">
                            今日告警总量
                        </a-col>
                    </a-row>
                    
                    <div class="total">
                        <div v-if="fromData.total.length > 0">
                            <div v-for="(item,index) in fromData.total" :key="index">{{item}}</div>
                        </div>
                        <!-- <div v-else> 
                            <div>0</div>
                        </div> -->

                    </div>
                    <div style="height: 200px;width:460px;">
                        <todayalert style="height: 100%;width:100%" 
                        :dataX="fromData.alarmTotalX"
                        :dataY="fromData.alarmTotalY"
                        v-if="fromData.alarmTotalX.length > 0 && fromData.alarmTotalY.length > 0"
                        />
                    </div>
                  </div>
                  <div class="item">
                    <div class="toral"></div>
                    <a-row :gutter="0" justify="start" class="titlediv">
                        <a-col :span="1" >
                            <div class="icon">&nbsp;</div>
                        </a-col>
                        <a-col :span="10" class="title">
                            最新告警状态分析
                        </a-col>
                    </a-row>

                    <a-row :gutter="0" justify="start" class="titlediv">
                        <a-col :span="14" >
                            <div style="height: 200px;width:240px;">
                                <!-- <newalertanalysis style="height: 100%;width:100%" /> -->
                                <div class="circle1">
                                        <!-- <HuanXingTu01/> -->
                                    <a-progress type="circle" :percent="fromData.alarmStatusNumber" strokeColor='#989ebe' style="margin: 15px;">
                                        <template #format="percent">
                                            <span style="color: #32a9aa;font-size: 16px;">{{ percent }}%<br/></span>
                                            <span style="color: #32a9aa;font-size: 14px;">已确认</span>
                                        </template>
                                    </a-progress>
                                </div>
                            </div>
                        </a-col>
                        <a-col :span="10" >
                            <div class="alertinfo">
                                <div class="alertinfo-title">
                                    已确认告警数
                                </div>
                                <div class="alertinfo-value">
                                    {{fromData.confirmedAlarmNumber}}
                                </div>
                            </div>

                            <div class="alertinfo">
                                <div class="alertinfo-title">
                                    确认告警总数
                                </div>
                                <div class="alertinfo-value">
                                    {{fromData.confirmedAlarmTotalCount}}
                                </div>
                            </div>

                        </a-col>
                    </a-row>


                  </div>
                  <div class="item">
                    <div class="toral"></div>
                    <a-row :gutter="0" justify="start" class="titlediv">
                        <a-col :span="1" >
                            <div class="icon">&nbsp;</div>
                        </a-col>
                        <a-col :span="10" class="title">
                            最新设备告警TOP5
                        </a-col>
                    </a-row>

                    <div style="height: 200px;width:450px;">
                        <newequipment style="height: 120%;width:100%" 
                        :dataX="fromData.newAlarmTopX"
                        :dataY="fromData.newAlarmTopY"
                        v-if="fromData.newAlarmTopX.length > 0 && fromData.newAlarmTopY.length > 0"
                        />
                    </div>


                  </div>
                </a-col>

                <a-col :span="12" >
                    <div class="item">
                        <div class="toral"></div>
                        <a-row :gutter="0" justify="start" class="titlediv">
                            <a-col :span="1" >
                                <div class="icon">&nbsp;</div>
                            </a-col>
                            <a-col :span="23" class="title">
                                24小时告警趋势
                            </a-col>
                        </a-row>

                        <div style="height: 240px;width:950px;">
                            <alarmtrend style="height: 100%;width:100%" 
                            :dataX="fromData.hourAlarmX"
                            :dataY="fromData.hourAlarmY"
                            v-if="fromData.hourAlarmX.length > 0 && fromData.hourAlarmX.length > 0"
                            />
                        </div>
    
                    </div>
                    <div class="item" style="height: 623px;">
                        <div class="toral"></div>
                        <a-row :gutter="0" justify="start" class="titlediv">
                            <a-col :span="1" >
                                <div class="icon">&nbsp;</div>
                            </a-col>
                            <a-col :span="23" class="title">
                                实时告警动态
                            </a-col>
                        </a-row>

                        <alertdynamic :tableList="fromData.tableData" v-if="fromData.tableData.length > 0"/>
                    </div>
                </a-col>

                <a-col :span="6" >
                    <div class="item">
                        <div class="toral"></div>
                        <a-row :gutter="0" justify="start" class="titlediv">
                            <a-col :span="1" >
                                <div class="icon">&nbsp;</div>
                            </a-col>
                            <a-col :span="10" class="title">
                                任务状态分析
                            </a-col>
                        </a-row>

                        <a-row :gutter="0" justify="start" class="titlediv">
                            <a-col :span="14" >
                                <div style="height: 200px;width:240px;">
                                    <div class="circle1">
                                        <!-- <HuanXingTu01/> -->
                                        <a-progress type="circle" :percent="fromData.taskStatusNumber" strokeColor='#989ebe' style="margin: 15px;">
                                            <template #format="percent">
                                                <span style="color: #fff;font-size: 16px;">{{ percent }}%<br/></span>
                                                <span style="color: #fff;font-size: 14px;">异常</span>
                                            </template>
                                        </a-progress>
                                    </div>
                                    <!-- <taskanalysis style="height: 100%;width:100%" /> -->
                                </div>
                            </a-col>
                            <a-col :span="10" >
                                <div class="alertinfo">
                                    <div class="alertinfo-title">
                                        全网任务数
                                    </div>
                                    <div class="alertinfo-value">
                                        {{fromData.networkTaskNumber}}
                                    </div>
                                </div>
    
                                <div class="alertinfo">
                                    <div class="alertinfo-title">
                                        异常任务数
                                    </div>
                                    <div class="alertinfo-value">
                                        {{fromData.errorTaskNumber}}
                                    </div>
                                </div>
    
                            </a-col>
                        </a-row>


                      </div>
                      <div class="item">
                        <div class="toral"></div>
                        <a-row :gutter="0" justify="start" class="titlediv">
                            <a-col :span="1" >
                                <div class="icon">&nbsp;</div>
                            </a-col>
                            <a-col :span="10" class="title">
                                近7日设备告警分析
                            </a-col>
                        </a-row>
                        <div style="height: 230px;width:450px;overflow: hidden;">
                            <!-- <alertanalysis style="height: 100%;width:100%" /> -->
                            <div id="container" style="height: 100%;width:100%;overflow: hidden;"></div> 
                        </div>
                      </div>
                      <div class="item">
                        <div class="toral"></div>
                        <a-row :gutter="0" justify="start" class="titlediv">
                            <a-col :span="1" >
                                <div class="icon">&nbsp;</div>
                            </a-col>
                            <a-col :span="10" class="title">
                                近7日资源告警总量分布
                            </a-col>
                        </a-row>
                        <div style="height: 240px;width:500px;">
                            <resourcedistribution style="height: 100%;width:100%;" 
                            :dataX="fromData.resourceX"
                            :dataY="fromData.resourceY"
                            v-if="fromData.resourceX.length > 0 && fromData.resourceY.length > 0"
                            />
                        </div>
                      </div>
                </a-col>
            </a-row>
        </div>
    </v-scale-screen>
</template>
<script setup name="integratedbigscreen">
    import VScaleScreen from 'v-scale-screen'
    import "../../style/font.css";
    import platformInfo from '@/api/showPlatform/indexApi';
    import { Heatmap } from '@antv/g2plot';
    var date = new Date();
    const year = date.getFullYear();  //获取年份
    const month = date.getMonth() + 1   //获取月份
    const day = date.getDate();  //获取日期
    const hours = date.getHours();  //获取小时
    const minutes = date.getMinutes();  //获取分钟
    const seconds = date.getSeconds()//获取秒
    const days = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    let today = new Date();
    let weekday = today.getDay();
    const weekDay = days[weekday]
    const fromData = ref({
        total:0,
        alarmTotalX:[],
        alarmTotalY:[],
        tableData:[],
        lastSevenDayDeviceAlarmsAnalysis:[],
        hourAlarmX:[],
        hourAlarmY:[],
        newAlarmTopX:[],
        newAlarmTopY:[],
        resourceX:[],
        resourceY:[],
        taskStatusNumber:0,
        errorTaskNumber:0,
        networkTaskNumber:0,
        alarmStatusNumber:0,
        confirmedAlarmNumber:0,
        confirmedAlarmTotalCount:0,
    })
    onMounted(()=>{
        loadData()
        alarmTypePage()
        alarmTotalData()
        deviceAlarmSeveData()
        hourAlarmData()
        newAlarmTopData()
        resourceSevenData()
        newAlarmTypeData()
        taskStatusData()
    })
    //任务状态分析
    const taskStatusData = ()=>{
        platformInfo.taskStatusInfo({}).then(res=>{
            if(typeof(res.taskStatusAnalysis)!='undefined' ){
                fromData.value.networkTaskNumber = res.taskStatusAnalysis.totalCount ? res.taskStatusAnalysis.totalCount :0
                fromData.value.errorTaskNumber = res.taskStatusAnalysis.running ? res.taskStatusAnalysis.running :0
                fromData.value.taskStatusNumber = res.taskStatusAnalysis.runningRate ? res.taskStatusAnalysis.runningRate.split(".")[0] : 0
            }
        })
    }
    //最新告警任务状态分析
    const newAlarmTypeData = ()=>{
        platformInfo.newAlarmTypeInfo({}).then(res=>{
            
            if(typeof(res.latestAlarmStatusAnalysis)!='undefined' ){
                fromData.value.confirmedAlarmNumber = res.latestAlarmStatusAnalysis.confirmed ? res.latestAlarmStatusAnalysis.confirmed:0
                fromData.value.confirmedAlarmTotalCount = res.latestAlarmStatusAnalysis.totalCount ? res.latestAlarmStatusAnalysis.totalCount:0
                fromData.value.alarmStatusNumber = res.latestAlarmStatusAnalysis.confirmedRate ? res.latestAlarmStatusAnalysis.confirmedRate.split(".")[0] : 0
            }
        })
    }
    //进7日资源告警
    const resourceSevenData = ()=>{
        platformInfo.resourceSevenInfo({}).then(res=>{
            if(typeof(res.lastSevenDayResourceTotalDistribution)!='undefined' ){
                if(res.lastSevenDayResourceTotalDistribution.resourceType.length > 0){

                    res.lastSevenDayResourceTotalDistribution.resourceType.map((item,index)=>{
                        fromData.value.resourceX.push({
                            name:item,
                            max:res.lastSevenDayResourceTotalDistribution.statusCount.length > 0 ? res.lastSevenDayResourceTotalDistribution.statusCount[index] : 0
                        })
                    })
                    fromData.value.resourceY = res.lastSevenDayResourceTotalDistribution.statusCount.length > 0 ? res.lastSevenDayResourceTotalDistribution.statusCount : []
                }
            }
        })
    }
    //最新告警top5
    const newAlarmTopData = ()=>{
        platformInfo.newAlarmTop({}).then(res=>{
            if(typeof(res.latestDeviceAlarmsTop5)!='undefined' ){
                fromData.value.newAlarmTopX =  res.latestDeviceAlarmsTop5.deviceIP.length > 0 ? res.latestDeviceAlarmsTop5.deviceIP :[]
                fromData.value.newAlarmTopY = res.latestDeviceAlarmsTop5.alarmCount.length > 0 ? res.latestDeviceAlarmsTop5.alarmCount : []
            }
        })
    }
    //24小时告警
    const hourAlarmData = ()=>{
        platformInfo.hourAlarmInfo({}).then(res=>{
            if(typeof(res.twentyFourHourAlarmTrend)!='undefined' ){
                fromData.value.hourAlarmX = res.twentyFourHourAlarmTrend.occurrenceTime.length > 0 ?  res.twentyFourHourAlarmTrend.occurrenceTime :[]
                fromData.value.hourAlarmY = res.twentyFourHourAlarmTrend.alarmCount.length > 0 ? res.twentyFourHourAlarmTrend.alarmCount :[]
            }
        })
    }
     //实时告警状态
   const alarmTypePage = () =>{
        platformInfo.alarmPage({}).then(res=>{
            if(res.records.length > 0){
                fromData.value.tableData = res.records
            }
        })
   }
    const alarmTotalData = ()=>{
        platformInfo.alarmTotalInfo({}).then(res=>{
            if(typeof(res.todayTotalAlarmsTotal)!='undefined' ){
                fromData.value.total = res.todayTotalAlarmsTotal.total ? res.todayTotalAlarmsTotal.total :0
                if(res.todayTotalAlarmsTotal.list > 0){
                    res.todayTotalAlarmsTotal.list.map((item,index)=>{
                        if(item.name!=''){
                            fromData.value.alarmTotalX.push(item.name)
                            fromData.value.alarmTotalY.push(item.value)
                        }
                    })
                }
            }
        })
    }
    const loadData = ()=>{
        platformInfo.deviceAlarmSevenInfo({}).then(res=>{
            fromData.value.lastSevenDayDeviceAlarmsAnalysis = typeof(res.lastSevenDayDeviceAlarmsAnalysis) !='undefined' ? res.lastSevenDayDeviceAlarmsAnalysis :[]
            if(fromData.value.lastSevenDayDeviceAlarmsAnalysis.length > 0){
                deviceAlarmSeveData()
            }
        })
    }
    const deviceAlarmSeveData = ()=>{
        var data = fromData.value.lastSevenDayDeviceAlarmsAnalysis
        if(data.length == 0){
            return true
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
          fill: '#48a1a8',
          shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0, .45)',
        },
      },
      slider:{
        textStyle:{
            fill:'#fff'
        }
      },
      xAxis:{
        label:{
            style:{
                fill:'#fff'
            }
        }
      },
      yAxis:{
        label:{
            style:{
                fill:'#48a1a8'
            }
        }
      },
      heatmapStyle: (item) => (item.value > 0 ?{
            fill: '#1c7178',
            stroke: '#205f6a',
            opacity: 0.8
        } :{
            fill: '#1c7178',
            stroke: '#205f6a',
            opacity: 0.8
        }),
        // tooltip:false
        tooltip: {
            formatter: (datum) => {
                return { name: datum.country, value: datum.value };
            },
        }
        });
        
        //  heatmapPlot.on('tooltip:show', (...args) => {
        //   console.log(...args);
        // });
        heatmapPlot.render();
    }
</script>
<style lang="less" scoped>
.circle1{
    position: relative;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: rgb(16, 11, 43);
    margin: 0 auto;
    margin-top: 30px;
}
.circle1::after {
    position: absolute;
    content: '';
    background: #32a9aa;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
    z-index: -1;
    transform: scale(1.02);
    border-radius: 50%;
}
#preview {
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-size: cover !important;
    // background-color: rgb(16, 11, 43);
    .myifame{
        border:medium none;
        width: 100%;
        height: 500px;
    }
    .top{
        width: 100%; 
        height: 80px;
        filter: hue-rotate(0deg); 
        background: url('../../assets/images/preview.webp') center center / 100% 100% no-repeat;
        .title{
            font-family: PangMenZhengDao;
            justify-content: center;
            color: rgb(255, 255, 255);
            font-size: 35px;
            letter-spacing: 4px;
            display: flex;
            align-items: center;
            padding-right: 20px;
            padding-top: 3px;
            filter: drop-shadow(rgba(0, 11, 27, 0.66) 1px 1px 6px) drop-shadow(rgb(95, 159, 255) 2px 1px 8px);
        }
        .dateinfo{
            color: #fff;
            display: flex;
            position: absolute;
            right: 8%;
            top:42%;
            .time{
                font-size: 18px;
            }
            .date{
                padding-left: 5px;
                span{
                    font-size: 18px;
                    padding-left: 5px;
                    // display: block;
                    //white-space: pre-wrap;
                }
            }
        }
    }
    .item{
        width: 100%;
        border: 1px solid #292c40;
        position: relative;
        height: 300px;
        margin-bottom: 20px;
        margin-top: 10px;
    }

    .item::before {
        position: absolute;
        top: 0;
        left: 0;
        width: 10px;
        height: 10px;
        border-left: 2px solid #1f5f6a;
        border-top: 2px solid #1f5f6a;
        content: "";
    }
    
    .item::after {
        position: absolute;
        top: 0;
        right: 0;
        width: 10px;
        height: 10px;
        border-right: 2px solid #1f5f6a;
        border-top: 2px solid #1f5f6a;
        content: "";
    }

    .toral{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
       
    }
    
    .toral::before{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 10px;
        height: 10px;
        border-left: 2px solid #1f5f6a;
        border-bottom: 2px solid #1f5f6a;
        content: "";
    }
    .toral::after{
        position: absolute;
        bottom: 0;
        right: 0;
        width: 10px;
        height: 10px;
        border-right: 2px solid #02A6B5;
        border-bottom: 2px solid #02A6B5;
        content: "";
    }

    .titlediv{
        width: 90%;
        margin: 0 auto;
        height: 60px;
        line-height: 60px;
        color: #ccd0dd;
        font-size: 15px;
        font-weight: bold;
        .icon{
            background-color: #4fabad;
            border-radius: 50%;
            width:8px;
            height: 8px;
            margin-top: 25px;
        }
    }
    .total{
        display: flex;
        flex-direction: row;
        flex-wrap:wrap;
        justify-content:center;
        div{
            background-color:#000000;
            color: #66a9ae;
            margin:0px 5px;
            padding: 0px 8px;
            font-size: 30px;
            font-weight: 550;
        }
    }
    .alertinfo{
        font-size: 20px;
        margin-top: 30px;
        div{
            line-height: 30px;
        }
        .alertinfo-value{
            color: #479197;
        }
    }
 
    




    
}
</style>