<template>
    <v-scale-screen style="background-color: rgb(16, 11, 43);" >
        <div id="preview">
            <div class="top">
                <div class="title">
                    核心设备实时监控大屏
                </div>
                <div class="dateinfo">
                    <div class="time">{{hours}}:{{minutes > 9 ? minutes :'0'+minutes}}:{{seconds > 9 ? seconds :'0'+seconds}}</div>
                    <div class="date">
                        <span>{{year}}/{{month > 9 ? month : '0'+month}}/{{day > 9 ? day :'0'+day}}</span>
                        <span>{{ weekDay }}</span>
                    </div>
                </div>
            </div>

            <div>
                <a-row :gutter="10" justify="space-between" v-if="fromData.tableData.length > 0">
                    <a-col :span="8" v-for="(item,index) in fromData.tableData" :key="index">
                        <div class="item">
                            <div class="title">{{item.coreDeviceInformation.deviceName}}</div>
                            <a-row :gutter="10" justify="space-between" >
                                <a-col :span="6" >
                                    <div class="iocn">
                                        <icon-font type="icon-jiaohuanji" class="icon" style="font-size: 40px;padding-top:20px;"/>
                                    </div>
                                    <div style="color: #fff;margin-left: 30%;padding-top: 20px">
                                        {{item.coreDeviceInformation.deviceIP}}
                                    </div>
                                </a-col>
                                <a-col :span="8" >

                                    <div class="info">
                                        
                                        <a-row :gutter="70" justify="start" >
                                            <a-col :span="5" >
                                                <div class="circle">MAC</div>
                                            </a-col>
                                            <a-col :span="8" >
                                                <div class="ip"> {{item.coreDeviceInformation.deviceMAC}}</div>
                                            </a-col>
                                            
                                        </a-row>    
                                    </div>
                                </a-col>
                                <a-col :span="8" >
                                    <div class="info noborder">
                                    <a-row :gutter="0" justify="start" >
                                        <a-col :span="8" >
                                            <div class="circle">
                                                <icon-font type="icon-guanwangguanli_tianjiawang"  style="font-size: 30px;padding-top:10px;"/>
                                            </div>
                                        </a-col>
                                        <a-col :span="8" >
                                            <div class="ip">SNMP</div>
                                        </a-col>
                                        
                                    </a-row>  
                                    </div>
                                </a-col>
                            </a-row> 
                            
                            <div class="line"></div>

                            <div class="chart">
                                <div class="charttitle">实时吞吐量</div>
                                <div style="height: 300px;width:580px;">
                                    <realtimecapacity 
                                    style="height: 100%;" 
                                    :nameid="'flowPie'+index"
                                    :sendData="item.sendData"
                                    :receiveData="item.receiveData"
                                    :timeData="item.throughputTime"
                                    />
                                </div>
                            </div>
                            <div class="line"></div>

                            <div class="chart">
                                <div class="charttitle">实时告警动态</div>
                                <div style="width:100%;">
                                    <!-- <realtimealerts style="height: 100%;" 
                                    :tableData="item.alarmlist"/> -->
                                    
                                    <div class="entrustment-title" >
                                        <a-row :gutter="0" justify="space-between" class="item_2">
                                            <a-col :span="4">
                                                <div>资源名</div>
                                            </a-col>
                                            <a-col :span="5">
                                                <div>告警类型</div>
                                            </a-col>
                                            <a-col :span="4">
                                                <div>告警级别</div>
                                            </a-col>
                                            <a-col :span="4">
                                                <div>告警值</div>
                                            </a-col>
                                            <a-col :span="6">
                                                <div>发生时间</div>
                                            </a-col>
                                        </a-row>
                                    </div>
                                    <div class="entrustment"  ref="scrollRef" v-if="fromData.firstList.length > 0">
                                        <div v-for="(item_3,index_3) in fromData.firstList" :key="index_3">
                                            <div v-if="item_3.deviceId == item.coreDeviceInformation.deviceId">
                                                <a-row :gutter="0" justify="space-between" class="item_4" v-for="(item_4,index_4) in item_3.records" :key="index_4">
                                                    <a-col :span="4">
                                                        <div :title="item_4.resourceName">{{item_4.resourceName}}</div>
                                                    </a-col>
                                                    <a-col :span="5">
                                                        <div >
                                                            {{ item_4.alarmTypeName }}
                                                        </div>
                                                    </a-col>
                                                    <a-col :span="4"  style="overflow: hidden;">
                                                    <div>
                                                        <a-tag color="#ea3445" v-if="item_4.alarmLevel == 'serious'">严重</a-tag>
                                                        <a-tag color="#fd9560" v-if="item_4.alarmLevel == 'primary'">主要</a-tag>
                                                        <a-tag color="#fac748" v-if="item_4.alarmLevel == 'secondary'">次要</a-tag>
                                                        <a-tag  v-if="item_4.alarmLevel == 'unknown'">未知</a-tag>
                                                    </div>
                                                    </a-col>
                                                    <a-col :span="4" >
                                                        <div >{{item_4.alarmValue}}</div>
                                                    </a-col>
                                                    <a-col :span="6" >
                                                        <div :title="item_4.occurrenceTime">{{item_4.occurrenceTime}}</div>
                                                    </a-col>
                                                </a-row>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a-col>
                </a-row>
            </div>
        </div>
    </v-scale-screen>
</template>
<script setup name="integratedbigscreen">
    import { createFromIconfontCN } from '@ant-design/icons-vue';
    import platformInfo from '@/api/showPlatform/indexApi';
    import deviceApi from '@/api/topological/deviceApi'
    import VScaleScreen from 'v-scale-screen'
    const IconFont = createFromIconfontCN({
     scriptUrl: '//at.alicdn.com/t/c/font_4427041_hxf9lpmdkmg.js',
    });
    defineComponent(() => {
        IconFont
    })
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
        tableData:[],
        firstList:[]
    })
    onMounted(()=>{
        loadData()
    })
    let timerParty = setInterval(async () => {
        fromData.value = {
            tableData:[],
            firstList:[]
        }
        loadData()
    },600000) // 首页10分钟请求一次数据
    onBeforeUnmount(() => {
        clearInterval(timerParty); //清除定时器
    })
    const loadData = ()=>{
        platformInfo.monitoringInfo({}).then(res=>{
            if(res.length > 0){

                res.map((item)=>{
                    item.receiveData = []
                    item.sendData = []
                    item.throughputTime = []
                    platformInfo.alarmPage({deviceId:item.coreDeviceInformation.deviceId}).then(res=>{
                        fromData.value.firstList.push({deviceId:item.coreDeviceInformation.deviceId,records:res.records})
                    })
                    if(item.realTimeThroughput.length > 0){
                        item.realTimeThroughput.map((item1)=>{
                            item.receiveData.push(item1.receiveThroughput)
                            item.sendData.push(item1.sendThroughput)
                            var a = item1.updateTime
                            var index = a.indexOf(' ');
                            var time_1 = index !== -1 ? (a.substring(index + 1)) :''
                            item.throughputTime.push(time_1)
                            // var time_1 = 
                        })
                    }
                })
                // console.log(res)
                fromData.value.tableData = res
            }
        })
        console.log( fromData.value.firstList)
    }
</script>
<style lang="less" scoped>
.entrustment::-webkit-scrollbar {display:none}
.entrustment-title{
    font-size: 16px;
    margin-top:2%;
    .item_2{
        height: 30px;
        width: 100%;
        margin: 0 auto;
        text-align: center;
        line-height: 30px;
        overflow: hidden;
    }
}
.entrustment{
    margin-bottom:5%;
    font-size: 16px;
    height:180px;
    scrollbar-width: none;
    -ms-overflow-style: none;
    overflow-x: hidden;
    overflow-y: auto;
    ms-overflow-style: none;  /* IE 和 Edge */
    scrollbar-width: none;  /* Firefox */
    color: #7e7f81;
    .item_4{
        line-height: 35px;
        width: 100%;
        margin: 0 auto;
        text-align: center;
        height:  50px;
        overflow: hidden;
        cursor: pointer;
        div{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #fff;
            span{
                color: #fff;
            }
        }
    }
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
        border: 1px solid #14344e;
        border-radius: 15px;
        box-shadow: inset 0 0 5px #fff, /* 内部阴影 */
        inset 0 0 5px #14344e, /* 内部阴影 */
        inset 0 0 5px #14344e, /* 内部阴影 */
        inset 0 0 5px #14344e; /* 内部发光 */
		overflow: hidden; //溢出部分隐藏
		font-family: '宋体';
        color: #16cad3;
        .title{
            height: 100px;
            line-height: 100px;
            text-align: center;
            font-size: 26px;
        }
        .icon{
            background-color: #00a593;
            border-radius: 100%;
            height: 80px;
            width: 80px;
            line-height: 50px;
            margin-left: 30%;
            margin-top: 20px;
        }
        .info{
            border-left: 1px solid #132a46;
            height: 150px;
            padding-left: 10px;
            padding-top: 40px;
        }
        .noborder{
            border: none !important;
        }
        .circle{
            border: 1px solid #1f3550;
            width: 60px;
            height: 60px;
            border-radius: 100%;
            line-height: 60px;
            text-align: center;
        }
        .ip{
            color: #adadad;
            margin-top: 15px;
        }
        .line{
            border-bottom: 1px solid #112f4a;
            width: 90%;
            margin: 0 auto;
            margin-top: 20px;
            margin-bottom: 20px;
        }
        .chart{
            width: 90%;
            margin: 0 auto;
            .charttitle{
                height: 50px;
                line-height: 50px;
                color: #39ccd9;
                font-weight: bold;
                font-size: 18px;
            }
        }
    }
}
</style>