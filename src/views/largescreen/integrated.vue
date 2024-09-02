<template>
    <div class="content_wrap">
        <div class="title_wrap">
            <div class="zuojuxing"></div>
            <div class="youjuxing"></div>
            <div class="guang"></div>
            <div class="title">
                <span class="title-text">系统综合大屏</span>
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
                    <dv-border-box-10 :color="['#17233d', '#1e2744']">
                        <div class="left-top-title"> 
                            <div>
                                <a-badge color="#fff"/>
                            </div>
                            <div class="size">综合健康度</div>
                        </div>
                        <div class="health">
                            <div class="yuan">
                                <div class="score">
                                    <a-progress :percent="fromData.deviceOnlineRate"  type="dashboard" :width="70" stroke-color="#0a9b94" >
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
                                    <a-progress :percent="fromData.deviceHealthRate"  type="dashboard" :width="70" stroke-color="#e9666c" >
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
                                    <a-progress :percent="fromData.linkConnectivityRate"  type="dashboard" :width="70" stroke-color="#0a9b94" >
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
                    </dv-border-box-10>
                </div>
                <div class="left-center">
                    <dv-border-box-10 :color="['#17233d', '#1e2744']">
                        <div class="left-center-title"> 
                            <div>
                                <a-badge color="#fff"/>
                            </div>
                            <div class="size">链路状态统计</div>
                        </div>
                        <div class="networkdiv" >
                            <BingZhuangTu08 
                                :innerRadius="0.74" 
                                nameid="linkStatus"
                                :datalist="fromData.linkList"
                                class="networkTop"
                                :colorList="fromData.colorarray"
                                :contentcolor="`#fff`"
                                :pieStyle="`#17233d`"
                                :legend="fromData.legend"
                                v-if="fromData.linkList.length > 0"
                            />
                        </div>
                    </dv-border-box-10>
                </div>
            </div>
            <div class="center">
                
                <div class="zhongzlt">
                    <img src="../../assets/images/sysbigscreen/1.png" style="width: 60px;height: 60px;"/>
                    <div class="title">
                        <span>设备总数</span>
                        <span style="color: #0072ff;padding-left: 5px;">{{fromData.deviceCount}}</span> 
                    </div>
                </div>
                <div class="zhongzrt">
                    <img src="../../assets/images/sysbigscreen/1.png" style="width: 60px;height: 60px;"/>
                    <div class="title">
                        <span>在线设备数</span>
                        <span style="color: #0072ff;padding-left: 5px;">{{fromData.onlineDeviceCount}}</span> 
                    </div>
                </div>
                <div class="zhongzlm">
                    <img src="../../assets/images/sysbigscreen/2.png" style="width: 60px;height: 60px;"/>
                    <div class="title">
                        <span>告警总数</span>
                        <span style="color: #de7efa;padding-left: 5px;">{{fromData.alarmTotalCount}}</span> 
                    </div>
                </div>
                <div class="zhongxin"></div>

                <div class="zhongzrm">
                    <img src="../../assets/images/sysbigscreen/2.png" style="width: 60px;height: 60px;"/>
                    <div class="title">
                       <span>严重告警数</span>
                       <span style="color: #de7efa;padding-left: 5px;">{{fromData.alarmSeriousCount}}</span> 
                    </div>
                </div>

                <div class="zhongzlb">
                    <img src="../../assets/images/sysbigscreen/6.png" style="width: 60px;height: 60px;"/>
                    <div class="title">
                        <span>链路总数</span>
                        <span style="color: #0072ff;padding-left: 5px;">{{fromData.linkTotalCount}}</span> 
                    </div>
                </div>
                <div class="zhongzrb">
                    <img src="../../assets/images/sysbigscreen/6.png" style="width: 60px;height: 60px;"/>
                    <div class="title">
                        <span>链路总数</span>
                        <span style="color: #0072ff;padding-left: 5px;">{{fromData.disconnectLinkCount}}</span> 
                    </div>
                </div>
            </div>
            <div class="rigth">
                <div class="right-top">
                    <dv-border-box10 :color="['#17233d', '#1e2744']">
                        <div class="right-top-title"> 
                            <div>
                                <a-badge color="#fff"/>
                            </div>
                            <div class="size">设备类型统计</div>
                        </div>
                        <div class="networkdiv" > 
                            <BingZhuangTu07   
                                :innerRadius="0.74" 
                                :contentcolor="`#fff`"
                                :pieStyle="`#17233d`"
                                :legend="fromData.legend"
                                class="networkTop"
                                :datalist="fromData.deviceTypeList"
                                v-if="fromData.deviceTypeList.length > 0"
                            />
                        </div>
                    </dv-border-box10>
                </div>
                <div class="right-center">
                    <dv-border-box10 :color="['#17233d', '#1e2744']">
                        <div class="right-center-title"> 
                            <div><a-badge color="#fff"/></div>
                            <div class="size">资源类型统计</div>
                        </div>
                        <div class="networkdiv" >
                            <BingZhuangTu07   
                                :innerRadius="0.74" 
                                nameid="type"
                                :contentcolor="`#fff`"
                                :pieStyle="`#17233d`"
                                :legend="fromData.legend"
                                class="networkTop"
                                :datalist="fromData.resourceList"
                                v-if="fromData.resourceList.length > 0"
                            />
                        </div>
                    </dv-border-box10>
                    
                </div>
            </div>
        </div>
        <div class="content1">
            <div class="left">
                <div class="left-top">
                    <dv-border-box-10 :color="['#17233d', '#1e2744']">
                        <div class="left-top-title"> 
                            <div><a-badge color="#fff"/></div>
                            <div class="size">一周故障统计</div>
                        </div>
                        <div class="networkdiv" > 
                            <WeekFault  class="networkTop" :dataX="fromData.weekX" :dataY="fromData.weekY"/>
                        </div>
                    </dv-border-box-10>
                </div>
            </div>
            <div class="rigth">
                <div class="right-top">
                    <dv-border-box-10 :color="['#17233d', '#1e2744']">
                        <div class="right-top-title"> 
                            <div><a-badge color="#fff"/></div>
                            <div class="size">实时告警统计</div>
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
                    </dv-border-box-10>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup name="integratedbigscreen">
import platformInfo from '@/api/showPlatform/indexApi';
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
    const fromData = ref({
        deviceOnlineRate:0,
        deviceHealthRate:0,
        linkConnectivityRate:0,
        onlineDeviceCount:0,
        linkTotalCount:0,
        alarmSeriousCount:0,
        disconnectLinkCount:0,
        alarmTotalCount:0,
        deviceCount:0,
        colorarray:['#14959b','#dc5f71','#7c77de'],
        weekX:[],
        weekY:[],
        tableData:[],
        linkList:[
            // {
            //     type:'正常',
            //     value:10
            // },
            // {
            //     type:'异常',
            //     value:20
            // },
            // {
            //     type:'未知',
            //     value:30
            // },
        ],
        deviceTypeList:[],
        resourceList:[],
        legend:{
            itemName: {
                style: {
                    fill: '#ffffff',
                }
            },
            pageNavigator:{
                marker:{
                    style:{
                        fill:'#fff'
                    }
                },
                text:{
                    style:{
                        fill:'#fff'
                    }
                }
            }
        }
    })
    onMounted(()=>{
        integratedHealthData()
        integratedTotalData()
        alarmTypePage()
        linkStateData()
        deceiveTypeData()
        resourceTypeData()
        comprehensData()
    })
    let timerParty = setInterval(async () => {
        fromData.value = {
            deviceOnlineRate:0,
            deviceHealthRate:0,
            linkConnectivityRate:0,
            onlineDeviceCount:0,
            linkTotalCount:0,
            alarmSeriousCount:0,
            disconnectLinkCount:0,
            alarmTotalCount:0,
            deviceCount:0,
            colorarray:['#14959b','#dc5f71','#7c77de'],
            weekX:[],
            weekY:[],
            tableData:[],
            linkList:[],
            deviceTypeList:[],
            resourceList:[],
            legend:{
                itemName: {
                    style: {
                        fill: '#ffffff',
                    }
                },
                pageNavigator:{
                    marker:{
                        style:{
                            fill:'#fff'
                        }
                    },
                    text:{
                        style:{
                            fill:'#fff'
                        }
                    }
                }
            }
        }
        integratedHealthData()
        integratedTotalData()
        alarmTypePage()
        linkStateData()
        deceiveTypeData()
        resourceTypeData()
        comprehensData()
    },600000) // 首页10分钟请求一次数据
    onBeforeUnmount(() => {
        clearInterval(timerParty); //清除定时器
    })
    //综合健康度
    const integratedHealthData = ()=>{
        platformInfo.integratedHealth({}).then(res=>{
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
        })
    }
    //综合总数
   const integratedTotalData = ()=>{
        platformInfo.integratedTotal({}).then(res=>{
            fromData.value.onlineDeviceCount = typeof(res.totalData.onlineDeviceCount)!='undefined' ? res.totalData.onlineDeviceCount :0
            fromData.value.linkTotalCount = typeof(res.totalData.linkTotalCount)!='undefined' ? res.totalData.linkTotalCount :0
            fromData.value.alarmSeriousCount = typeof(res.totalData.alarmSeriousCount)!='undefined' ? res.totalData.alarmSeriousCount :0
            fromData.value.disconnectLinkCount = typeof(res.totalData.disconnectLinkCount)!='undefined' ? res.totalData.disconnectLinkCount :0
            fromData.value.alarmTotalCount = typeof(res.totalData.alarmTotalCount)!='undefined' ? res.totalData.alarmTotalCount :0
            fromData.value.deviceCount = typeof(res.totalData.deviceCount)!='undefined' ? res.totalData.deviceCount :0
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
   //链路状态统计
   const linkStateData = ()=>{
    platformInfo.linkStateTotal({}).then(res=>{
        if(typeof(res.linkStateStatistics)!='undefined' && res.linkStateStatistics.list.length > 0){
            
            res.linkStateStatistics.list.map((item)=>{
                fromData.value.linkList.push({type:item.name,value:item.value})
            })
        }
        
    })
   }
   //设备类型统计
   const deceiveTypeData = ()=>{
        platformInfo.deceiveTypeTotal({}).then(res=>{
            if(typeof(res.deviceTypeStatistics)!='undefined' && res.deviceTypeStatistics.list.length > 0){
                
                res.deviceTypeStatistics.list.map((item)=>{
                    fromData.value.deviceTypeList.push({type:item.name,value:item.value})
                })
            }
            
        })
   }
   //资源类型统计
   const resourceTypeData = ()=>{
    platformInfo.resourceTypeTotal({}).then(res=>{
            if(typeof(res.resourceTypeStatistics)!='undefined' && res.resourceTypeStatistics.list.length > 0){
                
                res.resourceTypeStatistics.list.map((item)=>{
                    fromData.value.resourceList.push({type:item.name,value:item.value})
                })
            }
            
        })
   }
   //一周统计
   const comprehensData = ()=>{
        platformInfo.comprehensTotal({}).then(res=>{
            if(typeof(res.weeklyFaultStatistics)!='undefined'){
                
              fromData.value.weekY = res.weeklyFaultStatistics.alarmCount
              fromData.value.weekX = res.weeklyFaultStatistics.occurrenceTime
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
  .content1{
    display: flex;
    .px2vh(margin, 14);
    // justify-content: center;
    .left{
        .px2vw(width, 938);
        .left-top{
            .px2vh(height, 305);
            .px2vw(width, 938);
             
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
            .networkdiv{
                .px2vh(height, 300);
                .px2vh(padding, 20);
                .networkTop{
                    .px2vh(height, 230);
                }
            }
        }
    }
    .rigth{
        .px2vw(width, 938);
        .right-top{
            .px2vh(height, 305);
            .px2vw(width, 938);
            .px2vh(margin-left, 18);
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
                .px2vh(padding, 5);
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
                    color: #5b6894;
                    
                }
                
                table tbody tr:nth-child(2n) td {
                    background-color:rgba(225, 225, 225, 0.022);
                }
            }
        }
    }
  }
  .content{
    display: flex;
    .px2vh(margin, 14);
    justify-content: center;
    .left{
        .px2vw(width, 590);
        .left-top{
            .px2vh(height, 305);
            .px2vw(width, 503);
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
            .px2vw(width, 503);
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
                    .px2vh(height, 230);
                }
            }
        }
    }
    .center{
        .px2vw(width, 850);
        .px2vh(height, 620);
        // border:1px solid #0072ff;
        .px2vh(margin, 14);
        .zhongxin{
            background-image: url("@/assets/images/sysbigscreen/7.png");
            background-size: cover;
            background-position: center center;
            .px2vw(width, 220);
            .px2vh(height,220);
            position:absolute;
            top:38%;
            left:50%;
            transform: translate(-50%,-50%); 
        }
        .zhongzlt{
            // background-image: url("@/assets/images/sysbigscreen/1.png");
            // background-size: cover;
            // background-position: center center ;
            // .px2vw(width, 80);
            // .px2vh(height,80);
            position:absolute;
            top:19%;
            left:38%;
            transform: translate(-50%,-50%); 
            .title{
                color: #fff;
                .px2font(12);
                position: absolute;
                .px2vh(bottom,-40);
                .px2vw(width, 180);
            }
            .number{
                color: #0072ff;
                position: absolute;
                .px2font(12);
                .px2vh(bottom,-40);
                .px2vw(left, 70);
            }
        }
        .zhongzrt{
            // background-image: url("@/assets/images/sysbigscreen/1.png");
            // background-size: cover;
            // background-position: center center ;
            // .px2vw(width, 80);
            // .px2vh(height,80);
            position:absolute;
            top:19%;
            right:34.6%;
            transform: translate(-50%,-50%); 
            .title{
                color: #fff;
                .px2font(12);
                position: absolute;
                .px2vh(bottom,-40);
                .px2vw(width, 180);
            }
            .number{
                color: #0072ff;
                position: absolute;
                .px2font(12);
                .px2vh(bottom,-40);
               
                .px2vw(right, -25);
            }
        }
        .zhongzlm{
            // background-image: url("@/assets/images/sysbigscreen/2.png");
            // background-size: cover;
            // background-position: center center ;
            // .px2vw(width, 80);
            // .px2vh(height,80);
            position:absolute;
            top:39.5%;
            left:33.6%;
            transform: translate(-50%,-50%); 
            .title{
                color: #fff;
                .px2font(12);
                position: absolute;
                .px2vh(bottom,-40);
                .px2vw(width, 180);
            }
            .number{
                color: #de7efa;
                position: absolute;
                .px2font(12);
                .px2vh(bottom,-40);
                .px2vw(left, 70);
            }
        }
        .zhongzrm{
            // background-image: url("@/assets/images/sysbigscreen/5.png");
            // background-size: cover;
            // background-position: center center ;
            // .px2vw(width, 80);
            // .px2vh(height,80);
            position:absolute;
            top:39.5%;
            right:30%;
            transform: translate(-50%,-50%); 
            .title{
                color: #fff;
                .px2font(12);
                position: absolute;
                .px2vh(bottom,-40);
                .px2vw(width, 180);
            }
            .number{
                color: #de7efa;
                position: absolute;
                .px2font(12);
                .px2vh(bottom,-40);
                .px2vw(right, -50);
            }
        }
        .zhongzlb{
            // background-image: url("@/assets/images/sysbigscreen/3.png");
            // background-size: cover;
            // background-position: center center ;
            // .px2vw(width, 80);
            // .px2vh(height,80);
            position:absolute;
            bottom:34%;
            left:38%;
            transform: translate(-50%,-50%);
            .title{
                color: #fff;
                .px2font(12);
                position: absolute;
                .px2vh(bottom,-40);
                .px2vw(width, 180);
            }
            .number{
                color: #0072ff;
                position: absolute;
                .px2font(12);
                .px2vh(bottom,-40);
                .px2vw(left, 70);
            }
        }
        .zhongzrb{
            // background-image: url("@/assets/images/sysbigscreen/6.png");
            // background-size: cover;
            // background-position: center center ;
            // .px2vw(width, 80);
            // .px2vh(height,80);
            position:absolute;
            bottom:34%;
            right:34.6%;
            transform: translate(-50%,-50%);
            .title{
                color: #fff;
                .px2font(12);
                position: absolute;
                .px2vh(bottom,-40);
                .px2vw(width, 180);
            }
            .number{
                color: #0072ff;
                position: absolute;
                .px2font(12);
                .px2vh(bottom,-40);
                .px2vw(right, -25);
            }
        }
    }
    .rigth{
        .px2vw(width, 550);
        .right-top{
            .px2vh(height, 305);
            .px2vw(width, 503);
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
                    .px2vh(height, 230);
                }
            }
        }
        .right-center{
            .px2vh(height, 305);
            .px2vw(width, 503);
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
    }
  }
}
</style>