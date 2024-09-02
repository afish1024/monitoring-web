<template>
    <div>
    <a-card :bordered="false"  style="height: 60px;" :class="{margint:!isOverview}">
        <div class="line-title">
            <div class="left-line"></div>
            <span class="title" @click="moduleClick('overview')">
                监控概况
            </span>
            <div class="right-date"  @click="moduleClick('overview')">
                <template v-if="isOverview">
                    <up-outlined class="fonts" />
                </template>
                <template v-else>
                    <down-outlined class="fonts"/>
                </template>
            </div>
        </div>
    </a-card>

    <a-card :bordered="false" style="height: 160px;margin-bottom: 20px;" v-if="isOverview">
        <overview :summary="summary" v-if="summary.length != 0 "/>
    </a-card>
    <a-card :bordered="false"  style="height: 60px;"  :class="{margint:!isMonitoring}">
        <div class="line-title">
            <div class="left-line"></div>
            <span class="title"  @click="moduleClick('monitoring')">
                监控系统
            </span>
            <div class="right-date" @click="moduleClick('monitoring')">
                <template v-if="isMonitoring">
                    <up-outlined class="fonts" />
                </template>
                <template v-else>
                    <down-outlined class="fonts"/>
                </template>
            </div>
        </div>
    </a-card>
    <a-card :bordered="false" style="margin-bottom: 20px;"  v-if="isMonitoring">
        <systemstatistics style="height: 500px;" :apiStatistics="apiStatistics" v-if="apiStatistics.length != 0"/>
    </a-card>
    <a-row :gutter="16" justify="space-between">
        <a-col :span="14">
            <a-card :bordered="false" style="margin-bottom: 10px;">
                <div class="line-title">
                    <div class="left-line"></div>
                    <span class="title"  @click="moduleClick('response')">
                        接口响应时间TOP10
                    </span>
                    <div class="right-date" @click="moduleClick('response')">
                        <template v-if="isResponse">
                            <up-outlined class="fonts" />
                        </template>
                        <template v-else>
                            <down-outlined class="fonts"/>
                        </template>
                    </div>
                </div>
               <div style="height: 300px"  v-if="isResponse">
                    <responsetop style="height: 300px" :longapisData="longapisData"  v-if="longapisData.length != 0" />
               </div>
            </a-card>
        </a-col>
        <a-col :span="10">
            <a-card :bordered="false" style="margin-bottom: 15px;">
                <div class="line-title">
                    <div class="left-line"></div>
                    <span class="title"  @click="moduleClick('alarm')">
                        最新告警信息
                    </span>
                    <div class="right-date" @click="moduleClick('alarm')">
                        <template v-if="isAlarm">
                            <up-outlined class="fonts" />
                        </template>
                        <template v-else>
                            <down-outlined class="fonts"/>
                        </template>
                    </div>
                </div>
                <div class="alarm scrollbar" v-if="isAlarm">
                    <alertapis :alertData="alertData" v-if="alertData.length != 0" />
                </div>
            </a-card>
        </a-col>
      
    </a-row>

   
    </div>
    <!-- <div class="example" v-if="isLoading">
        <a-spin  size="large"/>
    </div> -->
</template>
<script setup  name="largescreen">
import { ref } from 'vue';
import responsetop from '@/components/Spectaculars/responsetop.vue'
import apiabnormalremind from '@/components/Spectaculars/apiabnormalremind.vue'
import systemstatistics from '@/components/Spectaculars/systemstatistics.vue'
import loginuser from '@/components/Spectaculars/loginuser.vue'
import alertapis from '@/components/Spectaculars/alertapis.vue'
import overview from '@/components/Spectaculars/overview.vue'
import indexApi from '@/api/python/indexApi'
import logApi from '@/api/dev/logApi'
import global from '@/store/modules/global.js'
import tool from '@/utils/tool'

const isLoading = ref(true)
let apiStatistics = ref([]) // 检测系统统计
let alertData = ref([]) // 警告信息
let summary = ref([]) // 检测概况
let longapisData = ref([]) // 接口相应top
let logData = ref([])
let timer = ref()
let ismute =  ref(global.state.ismute)
let isOverview = ref(true) // 监控概况
let isMonitoring = ref(true) // 监控系统
let isResponse = ref(true) // 接口响应时间
let isAbnormal = ref(true) // 接口异常统计
let isLogin = ref(true) // 登录人员
let isAlarm = ref(true) // 最新告警信息
const userInfo = ref(tool.data.get('USER_INFO'))
let infoData = () => {
    var parameter = {}
    parameter.isNormalUser = 1
    if(userInfo.value.roleCodeList.indexOf('superAdmin') != -1){
        parameter.isNormalUser = 0
    }
    parameter.userid = userInfo.value.id

    // indexApi.largescreen(parameter).then((res) => {
    //     isLoading.value = false
    //     apiStatistics.value = res.api_statistics
    //     alertData.value = res.alert_apis
    //     longapisData.value = res.long_apis
    //     summary.value = res.summary
    // })
    
}
const moduleClick  = (type) => {
    if(type =='overview'){ // 监控概况
        isOverview.value = !isOverview.value
    }else if(type =='monitoring') { // 监控系统
        isMonitoring.value = !isMonitoring.value
    }else if(type == 'response'){  // 接口响应时间
        isResponse.value = !isResponse.value
    }else if(type == 'abnormal'){  // 接口响应时间
        isAbnormal.value = !isAbnormal.value
    }else if(type == 'login'){  // 登录人员
        isLogin.value = !isLogin.value
    }else{ // 异常信息
        isAlarm.value = !isAlarm.value
    }
}

let timerParty = setInterval(async () => {
    infoData()
},30000) // 首页30秒请求一次数据

onMounted(() => {
    infoData()
})

onBeforeUnmount(() => {
  clearInterval(timerParty); //清除定时器
  timerParty = 0;
})
</script>

<style lang="less" >
    body{
        background-color:#f5f5f5;
        height: 100%;
    }
    .example {
       text-align: center;
       border-radius: 4px;
       position:absolute;
       left:50%;
       top:50%;
   }
    .left-line{
        height: 30px;
        width: 4px;
        background-color: #3a6fd7;
        height: 30px;
        float: left;
       
    }
    .fonts{
        font-size: 12px;
        cursor: pointer;
    }
    .margint{
        margin-bottom: 10px !important;
    }
    .line-title{
        width: 100%;
        height: 30px;
        .title{
            float: left;
            line-height: 30px;
            margin-left: 10px;
            font-weight: 500;
            font-size: 18px;
            cursor: pointer;
        }
      
        .right-date{
            float: right;
            color: #333;
            font-size: 16px;
            font-weight: 500;
            line-height: 30px;
        }
    }
   
    .item{
       color: #FFF;
       height: 120px;
       background-color: #BBBBBB;
       .title{
            text-align: center;
            font-size: 18px;
            font-weight: 500;
            height: 30px;
            line-height: 30px;
            width: 100%;
       }
       .bottom{
            height: 60px;
            width: 90%;
            margin: 0 auto;
            .number{
                font-size: 14px;
                font-weight: 500;
                text-align: center;
                margin-top: 5px;
              
            }
       }
    }
    .saffron{
        background-color: #ff6b48 !important;
    }
    .green{
        background-color: #29cfb2;
    }
    .orange{
        background-color: #ec974e;
    }
    .blue{
        background-color: #2694fd;
    }
    .lightskyblue{
        background-color: #87CEFA;
    }
    .orangeRed{
        background-color: #FF4500 !important;
    }
    .orangeRed1{
        background-color: #ff7902 !important;
    }
    .orangeRed2{
        
        background-color: #e37055 !important;
    }
    .green2{
        background-color: #00c080;
    }
    .alarm{
        margin-top: 20px;
        overflow-y: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
        overflow-x: hidden;
        height: 280px;
        .item{
            color: #000;
            overflow: hidden;
            span{
                color:red;
            }
        }

        
    }


    .scrollbar::-webkit-scrollbar {
        width: 6px;
        height: 4px;
    }
    .scrollbar::-webkit-scrollbar-track-piece {
        background-color: transparent; //滚动槽
        -webkit-border-radius: 6px;
    }
    .scrollbar::-webkit-scrollbar-thumb:vertical {
        height: 2px;
        background-color: #efefef;
        -webkit-border-radius: 6px;
    }
    .scrollbar::-webkit-scrollbar-thumb:horizontal {
        width: 2px;
        background-color: #efefef;
        -webkit-border-radius: 6px;
    }
    .scrollbar::-webkit-scrollbar-thumb:vertical:hover,::-webkit-scrollbar-thumb:horizontal:hover
    {
        background-color: #6a6a8c;
    }


</style>