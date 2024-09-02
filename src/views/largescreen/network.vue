<template>
    <div class="content_wrap">
        <div class="title_wrap">
            <div class="zuojuxing"></div>
            <div class="youjuxing"></div>
            <div class="guang"></div>
            <div class="title">
                <span class="title-text">网络信息大屏</span>
            </div>
            <div class="timers">
                <span>{{hours}}:{{minutes > 9 ? minutes :'0'+minutes}}:{{seconds > 9 ? seconds :'0'+seconds}}</span>
                <span>{{ weekDay }}</span>
                <span>{{year}}/{{month > 9 ? month : '0'+month}}/{{day > 9 ? day :'0'+day}}</span>
                 
            </div>
        </div>
        <div class="content">
            <div class="left">
                <div class="left-top">
                    <dv-border-box10 :color="['#01aaff', '#01aaff']">
                        <div class="left-top-title"> 
                            <div><fund-outlined /></div>
                            <div class="size">综合健康度</div>
                        </div>
                        <div class="health">
                            <div class="yuan">
                                <div class="score">
                                    <a-progress :percent="fromData.deviceOnlineRate"  type="dashboard" :width="70" stroke-color="#2d5e0a" >
                                        <template #format="percent">
                                            <span>{{fromData.deviceOnlineRate}}%</span>
                                            
                                        </template>
                                    </a-progress>
                                </div>
                                <div class="title">
                                    设备在线率
                                </div>
                            </div>
                            <div class="yuan">
                                <div class="score">
                                    <a-progress :percent="fromData.deviceHealthRate"  type="dashboard" :width="70" stroke-color="#f59d23f5" >
                                        <template #format="percent">
                                            <span>{{fromData.deviceHealthRate}}%</span>
                                            
                                        </template>
                                    </a-progress>
                                </div>
                                <div class="title">
                                    设备健康率
                                </div>
                            </div>
                            <div class="yuan">
                                <div class="score">
                                    <a-progress :percent="fromData.linkConnectivityRate"  type="dashboard" :width="70" stroke-color="#2d5e0a" >
                                        <template #format="percent">
                                            <span>{{fromData.linkConnectivityRate}}%</span>
                                            
                                        </template>
                                    </a-progress>
                                </div>
                                <div class="title">
                                    链路连接率
                                </div>
                            </div>
                        </div>
                    </dv-border-box10>
                </div>
                <div class="left-center">
                    <dv-border-box10 :color="['#01aaff', '#01aaff']">
                        <div class="left-center-title"> 
                            <div> <icon-font type="icon-gaojing" class="icon"/></div>
                            <div class="size">24小时告警趋势</div>
                        </div>
                        <div class="networkdiv" >
                            <StackedAreaChartSreen 
                            :dataX="fromData.alarmTrendX"
                            :dataY="fromData.alarmTrendY"
                            v-if="fromData.alarmTrendY.length > 0 && fromData.alarmTrendX.length > 0"
                            class="networkTop"
                            />
                        </div>
                    </dv-border-box10>
                </div>
                <div class="left-bottom">
                    <dv-border-box10 :color="['#01aaff', '#01aaff']">
                        <div class="left-bottom-title"> 
                            <div> <icon-font type="icon-gaojing" class="icon"/></div>
                            <div class="size">告警级别统计</div>
                        </div>
                        <div class="networkdiv" >
                            <AlarmPieChart class="networkTop" :dataList="fromData.alarmTypeList" v-if="fromData.alarmTypeList.length > 0"/>
                        </div>
                    </dv-border-box10>
                </div>
            </div>
            <div class="center">
                
                <div class="topology">
                    <div style="cursor: pointer; padding: 10px;position: relative;left: -5%;">
                        <a-dropdown>
                            <img :src="server" style="width: 30px;height: 30px;"/>
                            <template #overlay>
                                <a-menu @click="onClick($event)" >
                                    <a-menu-item :key="item.id" v-for="(item) in wlList" >{{item.networkName}}</a-menu-item>
                                
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </div>
                    <TuoMap class="TuoMapYS" :id="networkId" v-if="wlList.length > 0"/>
                </div>
                <div class="table">
                    <dv-border-box10 :color="['#01aaff', '#01aaff']">
                        <div class="center-bottom-title"> 
                            <div> <icon-font type="icon-gaojing" class="icon"/></div>
                            <div class="size">实时告警动态</div>
                        </div>
                        <div class="networkdiv" >
                            <!-- <dv-scroll-board :config="config" class="scroll-board" /> -->
                            <table border="0" cellspacing="0" cellpadding="0">
                                <thead>
                                    <tr>
                                        <th>序号</th>
                                        <th>告警级别</th>
                                        <th>告警设备</th>
                                        <th>资源名称</th>
                                        <th>告警值</th>
                                        <th>发生时间</th>
                                    </tr>
                                </thead>
                                
                                <tbody v-if="fromData.tableData.length > 0">
                                    <tr v-for="(item,index) in fromData.tableData" :key="index">
                                        <td>{{index+1}}</td>
                                        <td>
                                            <a-tag color="#ea3445" v-if="item.alarmLevel == 'serious'">严重</a-tag>
                                            <a-tag color="#fd9560" v-if="item.alarmLevel == 'primary'">主要</a-tag>
                                            <a-tag color="#fac748" v-if="item.alarmLevel == 'secondary'">次要</a-tag>
                                            <a-tag  v-if="item.alarmLevel == 'unknown'">未知</a-tag>
                                        </td>
                                        <td>{{item.deviceName}}</td>
                                        <td>{{item.resourceName}}</td>
                                        <td>{{item.triggerValue}}个</td>
                                        <td>{{item.occurrenceTime}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </dv-border-box10>
                </div>
            </div>
            <div class="rigth">
                <div class="right-top">
                    <dv-border-box10 :color="['#01aaff', '#01aaff']">
                        <div class="right-top-title"> 
                            <div><icon-font type="icon-shebeiguanli" class="icon"/></div>
                            <div class="size">设备告警TOP5</div>
                        </div>
                        <div class="networkdiv" > 
                            <BarPerformance 
                                barunit="" 
                                performanceid="network_TOP" 
                                :barDataY="fromData.deviceAlarmTop5Y"
                                :barDataX="fromData.deviceAlarmTop5X"
                                :colorInfoY='fromData.colorInfoY'
                                :colorInfoX = "fromData.colorInfoX"
                                gridRight="11%"
                                v-if="fromData.deviceAlarmTop5Y.length > 0 && fromData.deviceAlarmTop5X.length > 0"
                                class="networkTop"/>
                        </div>
                    </dv-border-box10>
                </div>
                <div class="right-center">
                    <dv-border-box10 :color="['#01aaff', '#01aaff']">
                        <div class="right-center-title"> 
                            <div><icon-font type="icon-tongji" class="icon"/></div>
                            <div class="size">设备类型统计</div>
                        </div>
                        <div class="networkdiv" >
                            <AlarmPieChart class="networkTop" nameid="DB" roseType="" :dataList="fromData.deceiveTypeList" v-if="fromData.deceiveTypeList.length > 0"/>
                        </div>
                    </dv-border-box10>
                    
                </div>

                <div class="right-bottom">
                    <dv-border-box10 :color="['#01aaff', '#01aaff']">
                        <div class="right-bottom-title"> 
                            <div><icon-font type="icon-tongji" class="icon"/></div>
                            <div class="size">进7日设备告警分布</div>
                        </div>
                        <div class="networkdiv" >
                            
                            <div id="container" class="networkTop"></div>
                        </div>
                    </dv-border-box10>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup name="networkscreen">
    import { createFromIconfontCN } from '@ant-design/icons-vue';
    import { Heatmap } from '@antv/g2plot';
    import TuoMap from './screen/TuoMap.vue';
    import platformInfo from '@/api/showPlatform/indexApi';
    import topologyApi from '@/api/topology/topologyApi';
    import server from '@/assets/images/server.svg';
    const IconFont = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/c/font_3441767_ksqupa1pkli.js',
    });
    defineComponent(() => {
        IconFont
    })
    onMounted(()=>{
        loadData()
        healthData()
        alarmTopData()
        trendData(),
        alarmTypeData()
        deceiveTypeData()
        alarmTypePage()
        networkList()
    })
    let timerParty = setInterval(async () => {
        wlList.value = []
        fromData.value = {
            deviceAlarmTop5Y:[
                        // '192.168.0.202', 
                        // '192.168.0.203',
                        // '192.168.0.204',
                        // '192.168.0.205',
                        // '192.168.0.206',
                        
                    ],
            deviceAlarmTop5X:[
                // 18, 20, 30, 40, 50,
            ],
            alarmTrendX:[
                        // "01-05",
                        // "01-06",
                        // "01-07",
                        // "01-08",
                        // "01-09",
                        // "01-10",
                        // "01-11"
                    ],
            alarmTrendY:[
                // 0, 0,0,440,450,460,470
            ],
            colorInfoY:'#fff',
            colorInfoX:'#01aaff',
        
            deviceOnlineRate:0,
            deviceHealthRate:0,
            linkConnectivityRate:0,
            alarmTypeList:[],
            deceiveTypeList:[],
            deviceAlarmDistributionFor7DayList:[],
            tableData:[]
        }
        loadData()
        healthData()
        alarmTopData()
        trendData(),
        alarmTypeData()
        deceiveTypeData()
        alarmTypePage()
        networkList()
        
    },600000) // 首页10分钟请求一次数据
    onBeforeUnmount(() => {
        clearInterval(timerParty); //清除定时器
    })
    const wlList = ref([]) 
    const networkId = ref('')
    const onClick = (e)=>{
        networkId.value = e.key
    }
    const networkList = ()=>{
        topologyApi.networkData({}).then(res=>{
            if(res.length > 0){
                res.map((item)=>{
                    if(item.parentId > '-1'){
                        wlList.value.push(item)
                    }
                })
                networkId.value = res[1].id
            }
            // console.log(networkId.value)
        })
    }
    const loadData = ()=>{
        platformInfo.sevenDistribution({}).then(res=>{
            fromData.value.deviceAlarmDistributionFor7DayList = typeof(res.deviceAlarmDistributionFor7Day) !='undefined' ? res.deviceAlarmDistributionFor7Day :[]
            if(fromData.value.deviceAlarmDistributionFor7DayList.length > 0){
                sevenDeceiveDistribution()
            }
        })
    }
    const sevenDeceiveDistribution = ()=>{
        var data = fromData.value.deviceAlarmDistributionFor7DayList
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
          fill: '#0072ff',
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
                fill:'#0072ff'
            }
        }
      },
      heatmapStyle: (item) => (item.value > 0 ?{
            fill: '#239cf9',
            stroke: '#239cf9',
            opacity: 0.8
        } :{
            fill: '#194284',
            stroke: '#239cf9',
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
    
    
    const tableData = [
        {
            id:1,
            alarmType:1,
            alarmDiveice:'192.169.0.0.1 3456',
            name:'JVM类资源名称1',
            alarmValue:10,
            time:'2024-01-29 13:23:45'
        },
        {
            id:2,
            alarmType:2,
            alarmDiveice:'192.169.0.0.1 3456',
            name:'JVM类资源名称1',
            alarmValue:10,
            time:'2024-01-29 13:23:45'
        },
        {
            id:3,
            alarmType:3,
            alarmDiveice:'192.169.0.0.1 3456',
            name:'JVM类资源名称1',
            alarmValue:10,
            time:'2024-01-29 13:23:45'
        },
        {
            id:4,
            alarmType:2,
            alarmDiveice:'192.169.0.0.1 3456',
            name:'JVM类资源名称1',
            alarmValue:10,
            time:'2024-01-29 13:23:45'
        }
    ]
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
    const weekDay = days[weekday];
    const fromData = ref({
        deviceAlarmTop5Y:[
                    // '192.168.0.202', 
                    // '192.168.0.203',
                    // '192.168.0.204',
                    // '192.168.0.205',
                    // '192.168.0.206',
                     
                ],
        deviceAlarmTop5X:[
            // 18, 20, 30, 40, 50,
        ],
        alarmTrendX:[
                    // "01-05",
					// "01-06",
					// "01-07",
					// "01-08",
					// "01-09",
					// "01-10",
                    // "01-11"
        		],
        alarmTrendY:[
            // 0, 0,0,440,450,460,470
        ],
        colorInfoY:'#fff',
        colorInfoX:'#01aaff',
       
        deviceOnlineRate:0,
        deviceHealthRate:0,
        linkConnectivityRate:0,
        alarmTypeList:[],
        deceiveTypeList:[],
        deviceAlarmDistributionFor7DayList:[],
        tableData:[]
        
    })

    //综合健康度
    const healthData = ()=>{
        platformInfo.healthInfo({}).then(res=>{
            if(typeof(res.comprehensiveHealthLevel.deviceOnlineRate) !='undefined'){
                 var  deviceOnlineRate = res.comprehensiveHealthLevel.deviceOnlineRate.split(".")[0]
            }else{
                 var  deviceOnlineRate = 0
            }
            
            if(typeof(res.comprehensiveHealthLevel.deviceHealthRate)!='undefined'){
                var  deviceHealthRate = res.comprehensiveHealthLevel.deviceHealthRate.split(".")[0]
            }else{
                var  deviceHealthRate = 0
            }
            if(typeof(res.comprehensiveHealthLevel.linkConnectivityRate)!='undefined'){
                var  linkConnectivityRate = res.comprehensiveHealthLevel.linkConnectivityRate.split(".")[0]
            }else{
                var  linkConnectivityRate = 0
            }
            fromData.value.deviceOnlineRate = deviceOnlineRate
            fromData.value.deviceHealthRate = deviceHealthRate
            fromData.value.linkConnectivityRate = linkConnectivityRate
            // console.log(fromData.value)
        })
    }
    //设备告警TOP5
   const alarmTopData = ()=>{
        platformInfo.alertTop({}).then(res=>{

            fromData.value.deviceAlarmTop5X = typeof(res.deviceAlarmTop5.alarmCount) !='undefined' ? res.deviceAlarmTop5.alarmCount :[]
            fromData.value.deviceAlarmTop5Y = typeof(res.deviceAlarmTop5.deviceIP) !='undefined' ? res.deviceAlarmTop5.deviceIP :[]
        })
   }
   //24小时告警趋势
   const trendData = ()=>{
        platformInfo.trendList({}).then(res=>{
            fromData.value.alarmTrendX = typeof(res.twentyFourHourAlarmTrend.occurrenceTime) !='undefined' ? res.twentyFourHourAlarmTrend.occurrenceTime :[]
            fromData.value.alarmTrendY = typeof(res.twentyFourHourAlarmTrend.alarmCount) !='undefined' ? res.twentyFourHourAlarmTrend.alarmCount :[]
        })
   }

   //告警级别统计
   const alarmTypeData = ()=>{
        platformInfo.alamLevelType({}).then(res=>{
            if(typeof(res.alarmLevelStatistics.list) !='undefined' && res.alarmLevelStatistics.list.length > 0){
                res.alarmLevelStatistics.list.map((item,index)=>{
                    if(item.name != ''){
                        fromData.value.alarmTypeList.push({value:item.value,name:item.name})
                    }
                  
                })
            }
        })
   }
   //设备类型统计
   const deceiveTypeData = ()=>{
        platformInfo.deveiceType({}).then(res=>{
            if(typeof(res.deviceTypeStatistics.list) !='undefined' && res.deviceTypeStatistics.list.length > 0){
                res.deviceTypeStatistics.list.map((item,index)=>{
                    if(item.name != ''){
                        fromData.value.deceiveTypeList.push({value:item.value,name:item.name})
                    }
                  
                })

            }
        })
   }
   //实时告警状态
   const alarmTypePage = () =>{
        platformInfo.alarmPage({}).then(res=>{
            if(res.records.length > 0){
                res.records.map((item,index)=>{
                    if(index < 4){
                        fromData.value.tableData.push(item)
                    }
                })
                
            }
        })
   }
</script>
<style lang="less" scoped>
@charset "utf-8";

// 默认设计稿的宽度
@designWidth: 1920;

// 默认设计稿的高度
@designHeight: 1080;

.px2vw(@name, @px) {
  @{name}: (@px / @designWidth) * 100vw;
}

.px2vh(@name, @px) {
  @{name}: (@px / @designHeight) * 100vh;
}

.px2font(@px) {
  font-size: (@px / @designWidth) * 100vw;
}

.content_wrap {
  width: 100%;
  height: 100%;
  background-color: rgb(16, 11, 43);
  .title_wrap {
        .px2vh(height, 69);
        background-image: url("@/assets/img/top.png");
        background-size: cover;
        background-position: center center;
        position: relative;
        .px2vh(margin, 15);
        .zuojuxing {
            position: absolute;
            top: 2;
            width: 140px;
            height: 4px;
            background-image: url("@/assets/img/headers/juxing2.png");
            left: 5%;
            transform: rotate(180deg);
        }
        .youjuxing {
            position: absolute;
            top: 2;
            width: 140px;
            height: 4px;
            background-image: url("@/assets/img/headers/juxing1.png");
            right: 5%;
            transform: rotate(180deg);
        }

        .guang {
            position: absolute;
            .px2vh(bottom, -26);
            background-image: url("@/assets/img/guang.png");
            background-position: 80px center;
            width: 100%;
            right: 15%;
            .px2vh(height, 56);
        }
        .title{
            position: relative;
            // width: 500px;
            text-align: center;
            background-size: cover;
            color: transparent;
            height: 60px;
            line-height: 46px;
            .title-text {
                font-size: 28px;
                font-weight: 900;
                letter-spacing: 6px;
                width: 100%;
                background: linear-gradient(
                92deg,
                #0072ff 0%,
                #00eaff 48.8525390625%,
                #01aaff 100%
                );
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
        }
        .timers {
            position: absolute;
            right: 5%;
            top: 25px;
            font-size: 12px;
            display: flex;
            color: #fff;
            align-items: center;
            span{
                padding-left: 5px;
            }
        }
    }
  .content{
    display: flex;
    .px2vh(margin, 14);
    justify-content: center;
    .left{
        .px2vw(width, 500);
        .left-bottom{
            .px2vh(height, 305);
            .px2vw(width, 500);
            .px2vh(margin-top, 15);
            .left-bottom-title{
                color:#fff;
                .px2vh(padding, 20);
                .px2vh(height, 30);
                display: flex;
                .size{
                    .px2vh(padding-left, 5);
                    .px2font(12);
                    .px2vh(line-height, 30);
                }
            }
            .networkdiv{
                .px2vh(height, 300);
                .px2vh(padding, 20);
                .networkTop{
                    .px2vh(height, 230);
                }
            }
        }
        .left-top{
            .px2vh(height, 305);
            .px2vw(width, 500);
            .px2vh(margin-top, 15);
            .left-top-title{
                color:#fff;
                .px2vh(padding, 20);
                .px2vh(height, 30);
                display: flex;
                .size{
                    .px2vh(padding-left, 5);
                    .px2font(12);
                    .px2vh(line-height, 30);
                }
            }
            .health{
                .px2vh(height, 240);
                display: flex;
                justify-content: center;
                align-items: center;
                .yuan{
                    float: left;
                    width: 33%;
                    .score{
                        width: 100%;
                        text-align: center;
                        span{
                            color: #fff
                        }
                        
                    }
                    .title{
                        .px2font(12);
                        text-align: center;
                        color: #fff;
                    }
                }
            }
        }
        .left-center{
            .px2vh(height, 305);
            .px2vw(width, 500);
            .px2vh(margin-top, 15);
            .left-center-title{
                color:#fff;
                .px2vh(padding, 20);
                .px2vh(height, 30);
                display: flex;
                .size{
                    .px2vh(padding-left, 5);
                    .px2font(12);
                    .px2vh(line-height, 30);
                }
            }
            .networkdiv{
                .px2vh(height, 300);
                .px2vh(padding, 20);
                .networkTop{
                    .px2vh(height, 260);
                }
            }
        }
    }
    .center{
        .px2vw(width, 850);
        
        .topology{
            .TuoMapYS{
                .px2vw(width, 850);
            }
            .px2vh(height, 576);
            // border: 1px solid #0072ff;
            // .px2vh(margin, 23);
           // position: relative;
            .px2vh(bottom, 75);
            .px2vh(margin-left, 40);
        }
        .table{
            .px2vh(margin-left, 23);
            .px2vh(margin-bottom, 23);
            .px2vh(margin-right, 23);
            .px2vh(margin-top, 44);
            .px2vw(width, 850);
            .center-bottom-title{
                color:#fff;
                .px2vh(padding, 20);
                .px2vh(height, 30);
                display: flex;
                .size{
                    .px2vh(padding-left, 5);
                    .px2font(12);
                    .px2vh(line-height, 30);
                }
            }
            .networkdiv{
                .px2vh(height, 300);
                .px2vh(padding, 20);
                .scroll-board{
                    .px2vh(padding, 10);
                    .px2vw(width, 820);
                    .px2vh(height, 300);
                }
                table {
                    text-align: center;
                    .px2font(12);
                    white-space: nowrap; /* 不换行 */
                    overflow: hidden; /* 超出部分隐藏 */
                    text-overflow: ellipsis; /* 显示省略号 */
                }

                table thead tr th {
                    .px2vw(width, 820);
                    .px2vh(padding, 10);
                    color: #0072ff;
                    
                }
                table tbody tr{
                    
                    .px2vh(line-height, 35);
                }
                table tbody tr td {
                    .px2vw(width, 130);
                    .px2vh(padding, 10);
                    color: #fff;
                    
                }
                
                table tbody tr:nth-child(2n) td {
                    background-color:rgba(225, 225, 225, 0.022);
                }
                
                // table tbody tr:last-child td {
                    
                // }

            }
        }
    }
    .rigth{
        .px2vw(width, 550);
        .right-top{
            .px2vh(height, 305);
            .px2vw(width, 500);
            .px2vh(margin-top, 16);
            .px2vh(margin-left, 45);
            .right-top-title{
                color:#fff;
                .px2vh(padding, 20);
                .px2vh(height, 30);
                display: flex;
                .size{
                    .px2vh(padding-left, 5);
                    .px2font(12);
                    .px2vh(line-height, 30);
                }
            }
            .networkdiv{
                .px2vh(height, 300);
                .px2vh(padding, 20);
                .networkTop{
                    .px2vh(height, 280);
                }
            }
        }
        .right-center{
            .px2vh(height, 305);
            .px2vw(width, 500);
            .px2vh(margin-top, 15);
            .px2vh(margin-left, 45);
            .right-center-title{
                color:#fff;
                .px2vh(padding, 20);
                .px2vh(height, 30);
                display: flex;
                .size{
                    .px2vh(padding-left, 5);
                    .px2font(12);
                    .px2vh(line-height, 30);
                }
            }
            .networkdiv{
                .px2vh(height, 300);
                .px2vh(padding, 20);
                .networkTop{
                    .px2vh(height, 230);
                }
            }
        }
        .right-bottom{
            .px2vh(height, 304);
            .px2vw(width, 500);
            .px2vh(margin-top, 15);
            .px2vh(margin-left, 45);
            .right-bottom-title{
                color:#fff;
                .px2vh(padding, 20);
                .px2vh(height, 30);
                display: flex;
                .size{
                    .px2vh(padding-left, 5);
                    .px2font(12);
                    .px2vh(line-height, 30);
                }
            }
            .networkdiv{
                .px2vh(height, 300);
                .px2vh(padding, 20);
                .networkTop{
                    .px2vh(height, 230);
                    overflow: hidden;
                }
            }
        }
    }
  }
  
}
</style>
