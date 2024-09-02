
<template>
     <v-scale-screen style="background-color: rgb(16, 11, 43);" >
        <div id="preview">
            <div class="top">
                <div class="title">
                    信息系统应用预警运维管理平台
                </div>
                <div class="dateinfo">
                    <div class="time">{{hours}}:{{minutes > 9 ? minutes :'0'+minutes}}:{{seconds > 9 ? seconds :'0'+seconds}}</div>
                    <div class="date">
                        <span>{{ weekDay }}</span>
                        <span>{{year}}/{{month > 9 ? month : '0'+month}}/{{day > 9 ? day :'0'+day}}</span>
                    </div>
                </div>
            </div>
            <div class="content">
                <div style="display: flex;"> 
                    <div class="monitor"> 
                        <div class="title" style="cursor:pointer;" @click="resources()">
                            <span>系统资源占用情况</span>
                        </div>
                        <div class="resources" v-if="cpuList.length > 0"> 
                            <a-tabs v-model:activeKey="activeKey">
                                <a-tab-pane key="1" tab="CPU使用率">
                                    <div class="syshealthtop" v-for="(item,index) in cpuList" :key="index">
                                        <div class="titletop">
                                            <span>{{item.name}}</span>
                                        </div>
                                        <div class="numtop">
                                            <span>{{item.cpuUsage}}%</span>
                                        </div>
                                        <div style="margin-top: -8px;"> 
                                            <a-progress :percent="item.cpuUsage" 
                                                :show-info="false" 
                                                :stroke-color="{'0%': 'rgb(0, 246, 255)','100%': 'rgb(0, 148, 255)',}" 
                                                type="line"
                                                :strokeWidth="2"
                                            />
                                        </div>
                                        <div class="ordernumber"> 
                                            <span>0{{index+1}}</span>
                                        </div>
                                    </div>
                                </a-tab-pane>
                                <a-tab-pane key="2" tab="内存使用率">
                                    <div class="syshealthtop" v-for="(item,index) in memoryList" :key="index">
                                        <div class="titletop">
                                            <span>{{item.name}}</span>
                                        </div>
                                        <div class="numtop">
                                            <span>{{item.memoryUsage}}%</span>
                                        </div>
                                        <div style="margin-top: -8px;"> 
                                            <a-progress :percent="item.memoryUsage" 
                                                :show-info="false" 
                                                :stroke-color="{'0%': 'rgb(0, 246, 255)','100%': 'rgb(0, 148, 255)',}" 
                                                type="line"
                                                :strokeWidth="2"
                                            />
                                        </div>
                                        <div class="ordernumber"> 
                                            <span>0{{index+1}}</span>
                                        </div>
                                    </div>
                                </a-tab-pane>
                                <a-tab-pane key="3" tab="磁盘使用率">
                                    <div class="syshealthtop" v-for="(item,index) in diskList" :key="index">
                                        <div class="titletop">
                                            <span>{{item.name}}</span>
                                        </div>
                                        <div class="numtop">
                                            <span>{{item.diskUsage}}%</span>
                                        </div>
                                        <div style="margin-top: -8px;"> 
                                            <a-progress :percent="item.diskUsage" 
                                                :show-info="false" 
                                                :stroke-color="{'0%': 'rgb(0, 246, 255)','100%': 'rgb(0, 148, 255)',}" 
                                                type="line"
                                                :strokeWidth="2"
                                            />
                                        </div>
                                        <div class="ordernumber"> 
                                            <span>0{{index+1}}</span>
                                        </div>
                                    </div>
                                </a-tab-pane>
                            </a-tabs>
                        </div>
                        <!-- <div class="monitordiv"> 
                            <div class="monitordivtitle">
                                <span>应</span>
                                <span>用</span>
                                <span>监</span>
                                <span>控</span>
                            </div>
                            <div class="progress"> 
                                <div class="progressdiv">
                                    <a-progress :percent="applicationMonitorInfo.wapApiNum"  type="dashboard" :width="90" stroke-color="#00d0f5" >
                                        <template #format="percent">
                                            <span>移动接口</span>
                                            <span style="padding-top: 5px;">{{applicationMonitorInfo.wapApiNum}}</span>
                                        </template>
                                    </a-progress>
                                </div>
                                <div class="progressdiv">
                                    <a-progress :percent="applicationMonitorInfo.pcApiNum"  type="dashboard" :width="90" stroke-color="#1a97ff" >
                                        <template #format="percent">
                                            <span>PC接口</span>
                                            <span style="padding-top: 5px;">{{applicationMonitorInfo.pcApiNum}}</span>
                                        </template>
                                    </a-progress>
                                </div>
                                <div class="progressdiv">
                                    <a-progress :percent="applicationMonitorInfo.webApiNum"  type="dashboard" :width="90" stroke-color="#ffd87b" >
                                        <template #format="percent">
                                            <span>网页接口</span>
                                            <span style="padding-top: 5px;">{{applicationMonitorInfo.webApiNum}}</span>
                                        </template>
                                    </a-progress>
                                </div>
                            </div>
                        </div>
                        <div class="monitordiv"> 
                            <div class="monitordivtitle">
                                <span>服</span>
                                <span>务</span>
                                <span>器</span>
                                <span>监</span>
                                <span>控</span>
                            </div>
                            <div class="progress"> 
                                <div class="progressdiv">
                                    <a-progress :percent="serverMonitorInfo.cpu"  type="dashboard" :width="90" stroke-color="#3682be" >
                                        <template #format="percent">
                                            <span>CPU</span>
                                            <span style="padding-top: 5px;">{{serverMonitorInfo.cpu}}</span>
                                        </template>
                                    </a-progress>
                                </div>
                                <div class="progressdiv">
                                    <a-progress :percent="serverMonitorInfo.memory"  type="dashboard" :width="90" stroke-color="#45a776" >
                                        <template #format="percent">
                                            <span>内存</span>
                                            <span style="padding-top: 5px;">{{serverMonitorInfo.memory}}</span>
                                        </template>
                                    </a-progress>
                                </div>
                                <div class="progressdiv">
                                    <a-progress :percent="serverMonitorInfo.disk"  type="dashboard" :width="90" stroke-color="#f05326" >
                                        <template #format="percent">
                                            <span>磁盘</span>
                                            <span style="padding-top: 5px;">{{serverMonitorInfo.disk}}</span>
                                        </template>
                                    </a-progress>
                                </div>
                            </div>
                        </div>
                        <div class="monitordiv"> 
                            <div class="monitordivtitle">
                                <span>数</span>
                                <span>据</span>
                                <span>库</span>
                                <span>监</span>
                                <span>控</span>
                            </div>
                            <div class="progress"> 
                                <div class="progressdiv">
                                    <a-progress :percent="10"  type="dashboard" :width="90" stroke-color="#00d0f5" >
                                        <template #format="percent">
                                            <span>节点</span>
                                            <span style="padding-top: 5px;">10</span>
                                        </template>
                                    </a-progress>
                                </div>
                                <div class="progressdiv">
                                    <a-progress :percent="30"  type="dashboard" :width="90" stroke-color="#1a97ff" >
                                        <template #format="percent">
                                            <span>缓存</span>
                                            <span style="padding-top: 5px;">30</span>
                                        </template>
                                    </a-progress>
                                </div>
                                <div class="progressdiv">
                                    <a-progress :percent="10"  type="dashboard" :width="90" stroke-color="#ffd87b" >
                                        <template #format="percent">
                                            <span>数据库</span>
                                            <span style="padding-top: 5px;">10</span>
                                        </template>
                                    </a-progress>
                                </div>
                            </div>
                        </div>
                        <div class="monitordiv"> 
                            <div class="monitordivtitle">
                                <span>网</span>
                                <span>络</span>
                                <span>监</span>
                                <span>控</span>
                            </div>
                            <div class="progress"> 
                                <div class="progressdiv">
                                    <a-progress :percent="10"  type="dashboard" :width="90" stroke-color="#00d0f5" >
                                        <template #format="percent">
                                            <span>节点</span>
                                            <span style="padding-top: 5px;">10</span>
                                        </template>
                                    </a-progress>
                                </div>
                                <div class="progressdiv">
                                    <a-progress :percent="30"  type="dashboard" :width="90" stroke-color="#1a97ff" >
                                        <template #format="percent">
                                            <span>上传数据</span>
                                            <span style="padding-top: 5px;">30</span>
                                        </template>
                                    </a-progress>
                                </div>
                                <div class="progressdiv">
                                    <a-progress :percent="10"  type="dashboard" :width="90" stroke-color="#ffd87b" >
                                        <template #format="percent">
                                            <span>下载数据</span>
                                            <span style="padding-top: 5px;">10</span>
                                        </template>
                                    </a-progress>
                                </div>
                            </div>
                        </div> -->
                    </div>
                    <div class="middle"> 
                        <div style="display: flex;width: 100%;"> 
                            <div class="middletoppic"> 
                                <span>内存总和</span>
                                <span v-if="serverMonitorInfo.memory > 1024">{{(serverMonitorInfo.memory/1024).toFixed(2)}}T</span>
                                <span v-else>{{serverMonitorInfo.memory}}G</span>
                            </div>
                            <div class="middletoppic"> 
                                <span>CPU使用率</span>
                                <span>{{cpuNum}}%</span>
                            </div>  
                            <div class="middletoppic"> 
                                <span>磁盘总和</span>
                                <span v-if="serverMonitorInfo.disk > 1024">{{(serverMonitorInfo.disk/1024).toFixed(2)}}T</span>
                                <span v-else >{{serverMonitorInfo.disk}}G</span>
                            </div>
                            <div class="middletoppic"> 
                                <span>累计预警</span>
                                <span style="color: rgb(245, 166, 35);">{{earlyNum}}</span>
                            </div>
                            <div class="middletoppic"> 
                                <span>累计报警</span>
                                <span style="color: rgb(208, 2, 27);">{{alarmNum}}</span>
                            </div>
                        </div>
                        <div style="margin-top: 10px;margin-left: 15px;">
                            
                            <!-- <div id="mynetwork" class="network"></div> -->
                            <iframe :src="`/topologmap?`+controLlist" class="myifame"  frameBorder="0" v-if="controLlist"></iframe>
                        </div>
                    </div>
                    <div class="syshealth"> 
                        <div class="title" style="cursor:pointer;" @click="health()">
                            <span>系统健康度</span>
                        </div>
                        <div class="syshealthtop" v-for="(item,index) in randomList" :key="index"> 
                            <div class="titletop">
                                <span>{{item.name}}</span>
                            </div>
                            <div class="numtop">
                                <span>{{item.healthScore}}</span>
                            </div>
                            <div class="line"> 

                            </div>
                            <div class="ordernumber"> 
                                <span>{{item.orderNumber}}</span>
                            </div>
                        </div>
                        <div class="syshealthbottom" > 
                            <!-- v-if="randomList.length > 0" -->
                            <div style="display: flex;">
                                <div class="proesstop" @click="scoreClick(0,60,1)">
                                    <a-progress :percent="score_1"  type="dashboard" :width="70" stroke-color="#0dc9f1" >
                                        <template #format="percent">
                                            <span>0-60</span>
                                            <span>{{score_1}}</span>
                                        </template>
                                    </a-progress>
                                </div>
                                <div class="proesstop" @click="scoreClick(60,70,2)">
                                    <a-progress :percent="score_2"  type="dashboard" :width="70" stroke-color="#2f88fb" >
                                        <template #format="percent">
                                            <span>60-70</span>
                                            <span>{{score_2}}</span>
                                        </template>
                                    </a-progress>
                                </div>
                                <div class="proesstop" @click="scoreClick(70,80,3)">
                                    <a-progress :percent="score_3"  type="dashboard" :width="70" stroke-color="#f0ca72" >
                                        <template #format="percent">
                                            <span>70-80</span>
                                            <span>{{score_3}}</span>
                                        </template>
                                    </a-progress>
                                </div>
                                <div class="proesstop" @click="scoreClick(80,90,4)">
                                    <a-progress :percent="score_4"  type="dashboard" :width="70" stroke-color="#ff7748" >
                                        <template #format="percent">
                                            <span>80-90</span>
                                            <span>{{score_4}}</span>
                                        </template>
                                    </a-progress>
                                </div>
                                <div class="proesstop" @click="scoreClick(90,100,5)">
                                    <a-progress :percent="score_5"  type="dashboard" :width="70" stroke-color="#6cca89" >
                                        <template #format="percent">
                                            <span>90-100</span>
                                            <span>{{score_5}}</span>
                                        </template>
                                    </a-progress>
                                </div>
                            </div>
                            
                        </div>
                    </div>                
                </div>
                <div style="display: flex;margin: 0 0 0 -5px;"> 
                    <div class="bottom" style="width: 25%;"> 
                        <div class="title" style="cursor:pointer;" @click="early()">
                            <span>预警信息</span>
                        </div>
                        <div class="proessdiv" v-if="bottomEarlyList"> 
                            <div class="proessbottomyj">
                                <a-progress :percent="bottomEarlyList.earlyInterface"  type="dashboard" :width="70" stroke-color="#e4892f" >
                                    <template #format="percent">
                                        <span>网络</span>
                                        <span>{{bottomEarlyList.earlyInterface}}</span>
                                    </template>
                                </a-progress>
                            </div>
                            <div class="proessbottomyj">
                                <a-progress :percent="bottomEarlyList.earlyDisk"  type="dashboard" :width="70" stroke-color="#e4892f" >
                                    <template #format="percent">
                                        <span>磁盘</span>
                                        <span>{{bottomEarlyList.earlyDisk}}</span>
                                    </template>
                                </a-progress>
                            </div>
                            <div class="proessbottomyj">
                                <a-progress :percent="bottomEarlyList.earlyMemory"  type="dashboard" :width="70" stroke-color="#e4892f" >
                                    <template #format="percent">
                                        <span>内存</span>
                                        <span>{{bottomEarlyList.earlyMemory}}</span>
                                    </template>
                                </a-progress>
                            </div>
                            <div class="proessbottomyj">
                                <a-progress :percent="bottomEarlyList.earlyCpu"  type="dashboard" :width="70" stroke-color="#e4892f" >
                                    <template #format="percent">
                                        <span>CPU</span>
                                        <span>{{bottomEarlyList.earlyCpu}}</span>
                                    </template>
                                </a-progress>
                            </div>
                         
                            <!-- <div class="proessbottomyj">
                                <a-progress :percent="10"  type="dashboard" :width="60" stroke-color="#e4892f" >
                                    <template #format="percent">
                                        <span>容器</span>
                                        <span>21/100</span>
                                    </template>
                                </a-progress>
                            </div>
                            <div class="proessbottomyj">
                                <a-progress :percent="10"  type="dashboard" :width="60" stroke-color="#e4892f" >
                                    <template #format="percent">
                                        <span>虚拟机</span>
                                        <span>32/100</span>
                                    </template>
                                </a-progress>
                            </div> -->
                            <div class="proessbottomyj">
                                <a-progress :percent="bottomEarlyList.earlyDatabase"  type="dashboard" :width="70" stroke-color="#e4892f" >
                                    <template #format="percent">
                                        <span>数据库</span>
                                        <span>{{bottomEarlyList.earlyDatabase}}</span>
                                    </template>
                                </a-progress>
                            </div>
                        </div>
                        <div style="display: flex;margin: -35px 10px 0px 10px" v-if="earlyList"> 
                            <div>
                                <lineChart chartId="YJ" style="height: 260px;width: 460px;" :earlyinfo="earlyList"/>
                            </div>
                        </div>
                    </div>    
                    <div class="bottom" style="width: 25%;"> 
                        <div class="title" style="cursor:pointer;" @click="alarm()">
                            <span>报警信息</span>
                        </div>
                        <div class="proessdiv" v-if="reportList"> 
                            <div class="proessbottom">
                                <a-progress :percent="10"  type="dashboard" :width="60" stroke-color="#f8181e" >
                                    <template #format="percent">
                                        <span>网络</span>
                                        <span>2</span>
                                    </template>
                                </a-progress>
                            </div>
                            <div class="proessbottom">
                                <a-progress :percent="10"  type="dashboard" :width="60" stroke-color="#f8181e" >
                                    <template #format="percent">
                                        <span>磁盘</span>
                                        <span>7</span>
                                    </template>
                                </a-progress>
                            </div>
                            <div class="proessbottom">
                                <a-progress :percent="10"  type="dashboard" :width="60" stroke-color="#f8181e" >
                                    <template #format="percent">
                                        <span>内存</span>
                                        <span>12</span>
                                    </template>
                                </a-progress>
                            </div>
                            <div class="proessbottom">
                                <a-progress :percent="10"  type="dashboard" :width="60" stroke-color="#f8181e" >
                                    <template #format="percent">
                                        <span>CPU</span>
                                        <span>20</span>
                                    </template>
                                </a-progress>
                            </div>
                            <div class="proessbottom">
                                <a-progress :percent="10"  type="dashboard" :width="60" stroke-color="#f8181e" >
                                    <template #format="percent">
                                        <span>应用</span>
                                        <span>21</span>
                                    </template>
                                </a-progress>
                            </div>
                            <!-- <div class="proessbottom">
                                <a-progress :percent="10"  type="dashboard" :width="60" stroke-color="#f8181e" >
                                    <template #format="percent">
                                        <span>虚拟机</span>
                                        <span>32/100</span>
                                    </template>
                                </a-progress>
                            </div> -->
                            <div class="proessbottom">
                                <a-progress :percent="10"  type="dashboard" :width="60" stroke-color="#f8181e" >
                                    <template #format="percent">
                                        <span>数据库</span>
                                        <span>42</span>
                                    </template>
                                </a-progress>
                            </div>
                        </div>
                        <div style="display: flex;margin: -35px 10px 0px 10px" v-if="reportList"> 
                            <div>
                                <lineChart chartId="BJ" style="height: 270px;width: 460px;" :reporinfo="reportList"/>
                            </div>
                        </div>
                       
                    </div> 
                    <div class="bottom" style="width: 25%;" >  
                        <div class="title" style="cursor:pointer;" @click="sms()">
                            <span>短信推送</span>
                        </div>
                        <div style="padding-top: 20px;" v-if="smsList"> 
                            <barChart chartId="DX" style="height: 320px;width: 520px;" :smsnumber="smsList"/>
                        </div>
                    </div>
                    <div class="bottom" style="width: 24%;">  
                        <div class="title" style="cursor:pointer;" @click="order()">
                            <span>辅助运维</span>
                        </div>
                        <div style="padding-top: 20px;" v-if="maintenanceList"> 
                            <barChart chartId="FZ" style="height: 320px;width: 500px;" :maintenancenum="maintenanceList"/>
                        </div>
                    </div>       
                    
                </div>
                
            </div>
        </div>
    </v-scale-screen>
</template>

<script setup name="alarmbigscreen">
import VScaleScreen from 'v-scale-screen'
import barChart from './screen/bar.vue'
import lineChart from './screen/linechart.vue'
// import TopologyMap from './screen/topologmap.vue'
import indexApi from '@/api/python/indexApi'
import { useRouter } from 'vue-router'
import vis from 'vis'
import "../../style/font.css";
    const activeKey = ref('1')
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
    const randomList = ref([])//系统健康度列表
    const storageNum = ref(0)//储存总和
    const alarmNum = ref(0)//报警数量
    const earlyNum = ref(0)//预警数量
    const cpuNum = ref()//cpu使用率
    const memoryNum = ref(0)//内存总和
    const applicationMonitorInfo = ref({})//应用监控
    const serverMonitorInfo = ref({})//服务监控
    const controLlist = ref()
    const score = ref()
    const score_1 = ref(0)
    const score_2 = ref(0)
    const score_3 = ref(0)
    const score_4 = ref(0)
    const score_5 = ref(0)
    const smsList = ref()
    const maintenanceList = ref()
    const reportList = ref()
    const earlyList = ref()
    const bottomEarlyList = ref()
    const memoryList = ref([])
    const cpuList = ref([])
    const diskList = ref([])
    onMounted(()=>{
        loadData()
    })
    const loadData = ()=>{
        indexApi.alarmBigGreen({}).then((res)=>{
            randomList.value = res.randomList
            storageNum.value = res.storageCount
            alarmNum.value = res.alarmCount
            earlyNum.value = res.earlyCount
            cpuNum.value = res.serverMonitor.cpu
            memoryNum.value = res.serverMonitor.memory
            applicationMonitorInfo.value = res.applicationMonitor
            serverMonitorInfo.value = res.serverMonitor
            controLlist.value = encodeURIComponent(JSON.stringify(res.controLlist))
            score_1.value = res.sysHealthScore.score_0_60
            score_2.value = res.sysHealthScore.score_60_70
            score_3.value = res.sysHealthScore.score_70_80
            score_4.value = res.sysHealthScore.score_80_90
            score_5.value = res.sysHealthScore.score_90_100
            smsList.value = res.smsReport
            maintenanceList.value = res.maintenanceInfo
            reportList.value = res.reportInfo
            console.log(reportList.value)
            earlyList.value = res.earlyInfo
            bottomEarlyList.value = res.bottomEarlyInfo
            memoryList.value = res.memoryList
            cpuList.value = res.cpuList
            diskList.value = res.diskList
           
            // console.log(serverMonitorInfo.value.cpu)
        })
    }
    const scoreClick = (lowScore,highScore,type)=>{
        var data = {
            lowScore:lowScore,
            highScore:highScore,
            type:type
        }
        indexApi.healthClickList(data).then((res)=>{
            // console.log(res.healthLlist)
            randomList.value = res.healthLlist
        })
    }
    const router = useRouter()
    const sms = ()=>{
        let routeData = router.resolve({ path: '/alarm/message' });
        window.open(routeData.href, '_blank');
    }
    const alarm = ()=>{
        let routeData = router.resolve({ path: 'alarm/statistics' });
        window.open(routeData.href, '_blank');
    }
    const early=()=>{
        let routeData = router.resolve({ path: '/hostdev/statistics' });
        window.open(routeData.href, '_blank');
    }
    const health=()=>{
        let routeData = router.resolve({ path: '/sys/health' });
        window.open(routeData.href, '_blank');
    }
    const resources =()=>{
        let routeData = router.resolve({ path: '/sys/resource' });
        window.open(routeData.href, '_blank');
    }
    const order = ()=>{
        let routeData = router.resolve({ path: '/sys/workorder' });
        window.open(routeData.href, '_blank');
    }
</script>
<style lang="less" scoped>
.resources{
    margin-top: 10px;
    padding: 0 30px;
    .numtop{
        color: rgb(0, 246, 255)
        
    }
    .syshealthtop{
        height: 55px;
        color: #fff;
    }
    .ordernumber{
        float: right;
        margin-top: -55px;
        span{
            font-size: 28px;
            color: rgb(0, 246, 255);
        }
    }
}
:deep(.ant-tabs-top > .ant-tabs-nav::before, .ant-tabs-bottom > .ant-tabs-nav::before, .ant-tabs-top > div > .ant-tabs-nav::before, .ant-tabs-bottom > div > .ant-tabs-nav::before){
    border-bottom:none ;
}
:deep(.ant-tabs-ink-bar){
    background:none;
}
:deep(.ant-tabs-tab-btn:focus, .ant-tabs-tab-remove:focus, .ant-tabs-tab-btn:active, .ant-tabs-tab-remove:active){
    color: #fff;
}
:deep(.ant-tabs-tab + .ant-tabs-tab){
    margin: 0 15px;
}
:deep(.ant-tabs-nav-list){
    // width: 100%;
    // padding-left: 30px;
    // padding-right: 30px;
}
:deep(.ant-tabs-tab){
    
    color: #fff;
    height: 35px;
    line-height: 35px;
    // width: 33%;
    width: 120px;
    justify-content: center;
}
:deep(.ant-tabs-tab-active){
    // background-color: #50e3c2;
    color: #fff;
    width: 124px;
    background: linear-gradient(to top, #50e3c2, #00f6ff);
}
:deep(.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn){
    color: #fff;
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
                    font-size: 12px;
                    display: block;
                    white-space: pre-wrap;
                }
            }
        }
    }
    .content{
        display: flex;
        flex-direction: column;
        color: #fff;
        padding-left: 1%;
        padding-right: 1%;
        margin-top: 10px;
        .monitor{
            width: 25.1%;
            height: 600px;
            background-image: url('../../assets/images/monitor.png');
            background-size: 100% 100%;
            .title{

                font-family: "Source Han Sans-FVS Normal";
                color: #11bcff;
                font-size: 18px;
                display: flex;
                justify-content: center;
                margin-top: 2rem;
                font-weight: bold;
                span{
                    background: linear-gradient(to top, rgb(17, 188, 255), rgb(255, 255, 255));
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            }
            .monitordiv{
                padding-left: 2rem;
                padding-right: 2rem;
                display: flex;
                margin-top: 1rem;
                .monitordivtitle{
                    width: 35px;
                    background: #9013fe;
                    height: 110px;
                    text-align: center;
                    span{
                        font-size: 14px;
                        display: block;
                        white-space: pre-wrap;
                    }
                }
                .progress{
                    height: 110px;
                    width: 100%;
                    color: #fff;
                    border: 1px solid #9013fe;
                    border-left:none ;
                    display: flex;
                    .progressdiv{
                        padding-top: 10px;
                        padding-left: 7%;
                        span{
                            color: #fff;
                            font-size: 10px; 
                            display: block;
                            white-space: pre-wrap;
                            padding-top: 5px;
                        }
                    }
                }
            }
        }
        .middle{
            width:50%;
            height: 600px;
            margin-top: 10px;
            // display: flex;
            .middletoppic{
                width: 192px; 
                height: 70px;
                margin-left: 15px;
                background: url('../../assets/images/middle.png') center center / 100% 100% no-repeat;
                span:first-child {
                    font-size: 18px;
                    display: block;
                    white-space: pre-wrap;
                    font-weight:bold;
                    padding: 10px 0px 0px 15px;
                }
                span:nth-child(2){
                    font-size: 18px;
                    font-weight:bold;
                    color: rgb(80, 227, 194);
                    padding-left: 80px;
                }
            }
        }
        .syshealth{
            width: 24%;
            height: 600px;
            margin-left: 15px;
            background-image: url('../../assets/images/monitor.png');
            background-size: 100% 100%;
            .title{
                font-family: "Source Han Sans-FVS Normal";
                color: #11bcff;
                font-size: 18px;
                display: flex;
                justify-content: center;
                margin-top: 2rem;
                font-weight: bold;
                span{
                    background: linear-gradient(to top, rgb(17, 188, 255), rgb(255, 255, 255));
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            }
            .syshealthtop{
                padding: 10px 30px 10px 30px;
                .titletop{
                    font-size: 14px;
                }
                .numtop{
                    color: rgb(0, 246, 255);
                }
                .line{
                    height: 3px;
                    width: 100%;
                    background: linear-gradient(to right, rgb(0, 246, 255), rgb(0, 148, 255));
                    border-radius: 1.5px;
                }
                .ordernumber{
                    float: right;
                    margin-top: -55px;
                    span{
                        font-size: 28px;
                        color: rgb(0, 246, 255);
                    }
                }
            }
            .syshealthbottom{
                padding: 25px 21px 15px 21px;
                .proesstop{
                    cursor:pointer;
                    padding-left: 10px;
                    span{
                        color: #fff;
                        display: block;
                        white-space: pre-wrap;
                    }
                }
            }
        }
        .bottom{
            // width:33%;
            height: 22rem;
            margin-top: 15px;
            margin-left: 5px;
            background-image: url('../../assets/images/bottom.png');
            background-size: 100% 100%;
            .title{
                font-family: "Source Han Sans-FVS Normal";
                color: rgb(17, 188, 255);
                font-size: 18px;
                display: flex;
                justify-content: center;
                margin-top: 10px;
                font-weight: bold;
                span{
                    background: linear-gradient(to top, rgb(17, 188, 255), rgb(255, 255, 255));
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            }
            .proessdiv{
                display: flex;
                padding: 10px 5px 0px 5px;
                .proessbottom{
                    padding-left: 15px;
                        span{
                            color: #fff;
                            display: block;
                            white-space: pre-wrap;
                            font-size: 12px;
                        }
                        span:nth-child(2){
                            margin-top: 3px;
                        }
                }
                .proessbottomyj{
                    padding-left: 18px;
                        span{
                            color: #fff;
                            display: block;
                            white-space: pre-wrap;
                            font-size: 12px;
                        }
                        span:nth-child(2){
                            margin-top: 3px;
                        }
                }
            }
            
        }
    }
    table {
        width: 100%;
        text-align: left;
        thead{
            tr{
                background: #112255;
                opacity: 0.5;
                height: 31px;
                color: #11bcff;
            }
        }
        tbody{
        
            tr{ 
                color: #fff;
                height: 31px;
            }

        }
    }
}

</style>