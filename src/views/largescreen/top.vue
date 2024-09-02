<template>
    <v-scale-screen style="background-color: rgb(16, 11, 43);" >
        <div id="preview">
            <div class="top">
                <div class="title">
                    TOP大屏
                </div>
                <div class="dateinfo">
                    <div class="time">{{hours}}:{{minutes > 9 ? minutes :'0'+minutes}}:{{seconds > 9 ? seconds :'0'+seconds}}</div>
                    <div class="date">
                        
                        <span>{{year}}/{{month > 9 ? month : '0'+month}}/{{day > 9 ? day :'0'+day}}</span>
                        <span>{{ weekDay }}</span>
                    </div>
                </div>
            </div>

            <a-row :gutter="0" justify="space-between" >
                <a-col :span="11" >
                    <a-row :gutter="0" justify="space-between" >
						<a-col :span="10"> 	
                            
                            <div class="item-title">
                                <div class="title">Ping响应时长TOP5</div>
                                <div class="border"><div class="borderred">&nbsp;</div></div>
                            </div>

                            <div class="item">
                                <a-progress :percent="fromData.resourceUsage"  type="dashboard" :width="200" stroke-color="#2fb6c3" >
                                    <template #format="percent">
                                        <span>{{fromData.resourceUsage}}%</span>
                                        
                                    </template>
                                </a-progress>

                            </div>
                            <div style="color: #fff;font-size: 18px;padding-left: 120px;">
                            {{fromData.ipAddress}}
                            </div>
					    </a-col>
						<a-col :span="13"  >
						  
                          <div class="item-title">
                            <div class="title">CPU使用率</div>
                            <div class="border"><div class="borderred">&nbsp;</div></div>
                          </div>

                          <div class="cpus">
                            <div class="cpu" v-for="(item,index) in fromData.cpuList" :key="index">
                                <a-row :gutter="0" justify="space-between"  v-if="index<5">
                                    <a-col :span="1"> 	
                                        <div class="idx">{{index+1}}</div>
                                    </a-col>
                                    
                                    <a-col :span="13"> 	
                                        <div class="content">{{item}}</div>
                                    </a-col>
                                    <a-col :span="2"> 	
                                        <div class="percentage">{{typeof(fromData.cpuUsage[index])!='undefined' ? fromData.cpuUsage[index] : 0}}%</div>
                                    </a-col>
                                    <a-col :span="5"> 	
                                        <a-progress 
                                        :percent="typeof(fromData.cpuUsage[index])!='undefined' ? fromData.cpuUsage[index] : 0"  
                                        type="dashboard" 
                                        :width="80" 
                                        :stroke-color="index%2===0 ? '#9c2153': ''" 
                                        >
                                            <template #format="percent">
                                                <span>{{typeof(fromData.cpuUsage[index])!='undefined' ? fromData.cpuUsage[index] : 0}}%</span>
                                                
                                            </template>
                                        </a-progress>
        
                                    </a-col>
                                
                                </a-row>
                            </div>
                           
                            
                          </div>
						</a-col>
			
					   
					</a-row>

                    <a-row :gutter="0" justify="space-between"  >
						<a-col :span="24"> 	
                            
                            <div class="item-title">
                                <div class="title">设备告警TOP6 </div>
                                <div class="border"><div class="borderred">&nbsp;</div></div>
                            </div>
                            <div class="equipments" v-if="fromData.deceiveAlarmX.length > 0 && fromData.deceiveAlarmY.length > 0">
                                <div class="equipment" v-for="(item,index) in fromData.deceiveAlarmX" :key="index">
                                    <a-row :gutter="50" justify="space-between" >
                                        <a-col :span="8"> 	
                                            <div style="margin-top: 10px;margin-left: 20px;">
                                                <icon-font type="icon-jingling-copy" style="font-size: 48px;" v-if="index%2===0"/>
                                                <icon-font type="icon-jingling-red-copy" style="font-size: 48px;" v-else/>
                                                
                                            </div>
                                        </a-col>
                                        <a-col :span="16"> 	
                                            <div class="number">{{typeof(fromData.deceiveAlarmY[index])!='undefined' ? fromData.deceiveAlarmY[index] :0}}</div>
                                            <div class="ip">{{item}}</div>
                                        </a-col>
                                    </a-row>
                
                                </div>
                            </div>

					    </a-col>
					</a-row>
                </a-col>
                <a-col :span="12" >

                    <a-row :gutter="0" justify="space-between" >
						<a-col :span="24"> 	
                            
                            <div class="item-title">
                                <div class="title">吞吐量TOP5 </div>
                                <div class="border"><div class="borderred">&nbsp;</div></div>
                            </div>

                            <div style="height: 300px;width:1000px;">
                                <throughput style="height: 100%;width:100%;"
                                :dataX="fromData.throughputDataX"
                                :dataY="fromData.throughputDataY"
                                v-if="fromData.throughputDataX.length > 0 && fromData.throughputDataY.length > 0"
                                />
                            </div>
					    </a-col>
                        
					   
					</a-row>


                    <a-row :gutter="0" justify="space-between"  >
						<a-col :span="24"> 	
                            
                            <div class="item-title">
                                <div class="title">内存使用率TOP5 </div>
                                <div class="border"><div class="borderred">&nbsp;</div></div>
                            </div>

                            <div class="memorys" v-if="fromData.memoryDataX.length > 0 && fromData.memoryDataY.length">

                                <div class="memory" v-for="(item,index) in fromData.memoryDataX" :key="index">
                                    <ripple style="height: 100%;" 
                                    :dataX="fromData.memoryDataX"
                                    :dataY="fromData.memoryDataY"
                                    :nameid="'ripple'+index"
                                    :dataIndex="index"
                                    />
                                    <span style="color: #fff;font-size: 16px;position: relative;top: -20%;margin-left: 30px;">{{item}}</span>
                                </div>
                            </div>
					    </a-col>
					</a-row>


                    <a-row :gutter="0" justify="space-between" >
						<!-- <a-col :span="12"> 	
                            
                            <div class="item-title">
                                <div class="title">磁盘使用率TOP5 </div>
                                <div class="border"><div class="borderred">&nbsp;</div></div>
                            </div>
                            <div style="height: 200px;">
                                <diskRate style="height: 100%;"
                                :dataX="fromData.diskX"
                                :dataY="fromData.diskY"
                                v-if="fromData.diskX.length > 0 && fromData.diskY.length > 0"
                                />
                            </div>

					    </a-col> -->

                        <a-col :span="24"> 	
                            
                            <div class="item-title">
                                <div class="title">链路流量TOP5 </div>
                                <div class="border"><div class="borderred">&nbsp;</div></div>
                            </div>
                            <div style="height: 200px;">
                                <flow style="height: 100%;"/>
                            </div>
					    </a-col>
					</a-row>
                </a-col>
            </a-row>
        </div>
    </v-scale-screen>
</template>
<script setup name="integratedbigscreen">
    import VScaleScreen from 'v-scale-screen'
    import { createFromIconfontCN } from '@ant-design/icons-vue';
    import "../../style/font.css";
    import platformInfo from '@/api/showPlatform/indexApi';
    const IconFont = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/c/font_3441767_flbftud2lk5.js',
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
        ipAddress:'',
        cpuList:[],
        cpuUsage:[],
        throughputDataX:[],
        throughputDataY:[],
        memoryDataX:[],
        memoryDataY:[],
        resourceUsage:0,
        deceiveAlarmX:[],
        deceiveAlarmY:[],
        diskX:[],
        diskY:[]
    })
    onMounted(()=>{
        pingData()
        cpuData()
        throughputData()
        memoryData()
        deceiveAlarmData()
        // diskData()
    })
    let timerParty = setInterval(async () => {
        fromData.value = {
            ipAddress:'',
            cpuList:[],
            cpuUsage:[],
            throughputDataX:[],
            throughputDataY:[],
            memoryDataX:[],
            memoryDataY:[], 
            resourceUsage:0,
            deceiveAlarmX:[],
            deceiveAlarmY:[],
            diskX:[],
            diskY:[]
        }
        pingData()
        cpuData()
        throughputData()
        memoryData()
        deceiveAlarmData()
        // diskData()
    },600000) // 首页10分钟请求一次数据
    onBeforeUnmount(() => {
        clearInterval(timerParty); //清除定时器
    })
    const pingData = ()=>{
        platformInfo.pingInfo({}).then(res=>{
            if(typeof(res.pingResponseTimesTop5)!='undefined'){
                fromData.value.ipAddress = res.pingResponseTimesTop5.ipAddress ? res.pingResponseTimesTop5.ipAddress :''
                fromData.value.resourceUsage = res.pingResponseTimesTop5.resourceUsage ? res.pingResponseTimesTop5.resourceUsage :0
            }
        })
    }
    const cpuData = ()=>{
        platformInfo.cpuInfo({}).then(res=>{
            if(typeof(res.cpuUsageRate)!='undefined'){
                fromData.value.cpuList = res.cpuUsageRate.ipAddress ? res.cpuUsageRate.ipAddress :[]
                fromData.value.cpuUsage = res.cpuUsageRate.cpuUsage ? res.cpuUsageRate.cpuUsage :[]
            }
        })
    }
    const throughputData = ()=>{
        platformInfo.throughputInfo({}).then(res=>{
            if(typeof(res.throughputTop5)!='undefined'){
                fromData.value.throughputDataX = res.throughputTop5.portIp ? res.throughputTop5.portIp:[]
                fromData.value.throughputDataY = res.throughputTop5.throughputUsage ? res.throughputTop5.throughputUsage:[]
            }
        })
        
    }
    const memoryData = ()=>{
        platformInfo.memoryInfo({}).then(res=>{
            if(typeof(res.memoryUsageRatesTop5)!='undefined'){
                fromData.value.memoryDataX = res.memoryUsageRatesTop5.ipAddress ? res.memoryUsageRatesTop5.ipAddress:[]
                fromData.value.memoryDataY = res.memoryUsageRatesTop5.memoryUsage ? res.memoryUsageRatesTop5.memoryUsage:[]
            }
        })
    }

    const deceiveAlarmData = ()=>{
        platformInfo.deceiveAlarmInfo({}).then(res=>{
            if(typeof(res.deviceAlarmsTop6)!='undefined'){
                fromData.value.deceiveAlarmX = res.deviceAlarmsTop6.deviceIP ? res.deviceAlarmsTop6.deviceIP :[]
                fromData.value.deceiveAlarmY = res.deviceAlarmsTop6.alarmCount ? res.deviceAlarmsTop6.alarmCount :[]
            }
        })
    }
    const diskData = ()=>{
        platformInfo.diskInfo({}).then(res=>{
            if(typeof(res.diskUsageRatesTop5)!='undefined'){
                fromData.value.diskX = res.diskUsageRatesTop5.ipAddress ? res.diskUsageRatesTop5.ipAddress :[]
                fromData.value.diskY = res.diskUsageRatesTop5.diskUsage ? res.diskUsageRatesTop5.diskUsage :[]
            }
        })
    }
</script>
<style lang="less" scoped>
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
    .item-title{
        height: 50px;
        line-height: 50px;
        color: #fff;
        font-size: 20px;
        font-weight: 500;
        .border{
            height: 2px;
            background-color: #2c3460;
            border-radius: 15px;
            .borderred{
                width: 50px;
                height: 3px;
                background-color: #a31d52;
                margin-left: 15px;
                border-radius: 15px;

            }
        }
    }
    .item{
        width: 100%;;
        margin: 0 auto;
        margin-top: 40%;
        padding-left: 20%;
        // color: #fff;
        span{
            color: #fff;
        }
    }
    .cpus{
        color: #FFF;
        font-size: 18px;
        font-weight: 500;
        .cpu{
            height: 120px;
            line-height: 120px;
            border-bottom: 1px solid #404040;
            .idx{
                color: #474f82;
            }
            .content{
                color: #6b6e8a;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .percentage{
                font-weight: bold;
            }
        }
    }
    .equipments{
        display: flex;
        flex-direction: row;
        flex-wrap:wrap;
        justify-content:center;
        margin-top: 5%;
        .equipment{
            width: 30%;
            margin-bottom: 5%;
            .icon{
                width: 100px;
                height: 100px;
                border-radius:60%;
                background-color: #577ddc;
                opacity:0.3;
            }
            .number{
                font-size: 24px;
                color: #FFF;
                font-weight: bold;
                height: 20px;
                line-height: 20px;
                margin-top: 20px;
            }
            .ip{
                font-size: 20px;
                color: #6a6a6a;
                height:50px;
                line-height: 50px;
            }
        }
    }
    .ipaddress{
        color: #FFF;

    }

    .memorys{
        display: flex;
        flex-direction: row;
        flex-wrap:wrap;
        justify-content:lists;
        height: 300px;
        .memory{
            width: 20%;
            height: 100%;
            float: left;
            padding: 0 20px;
        }
    }
}
</style>