<template>
        <div class="dv-full">
            <div class="content"  style="height: 400px;">
                <a-row :gutter="40" justify="space-between" class="contdiv">
                    <a-col :span="24" class="title" v-if="hostsinfo">
                       {{ hostsinfo }}：CPU使用率%
                    </a-col>
                </a-row>
                <a-row :gutter="40" justify="space-between" class="contdiv">
                    <a-col :span="24" class="leftcontent" >
                        <cpuchart style="height:280px;width:100%;" :cpuData="cpuData"  :cpuThreshold="cpuThreshold"/>
                    </a-col>
                </a-row>
            </div> 
            <div class="content" style="height: 400px;">
                <a-row :gutter="40" justify="space-between" class="contdiv">
                    <a-col :span="24" class="title" v-if="hostsinfo">
                       {{ hostsinfo }}：内存使用率%
                    </a-col>
                </a-row>
                <a-row :gutter="40" justify="space-between" class="contdiv">
                    <a-col :span="24" class="leftcontent" >
                        <memorychart style="height:280px;width:100%;" :memoryData="memoryData" :memoryThreshold="memoryThreshold" />
                    </a-col>
                </a-row>
            </div> 

            <div class="content"  style="height: 400px;">
                <a-row :gutter="40" justify="space-between" class="contdiv">
                    <a-col :span="24" class="title" v-if="hostsinfo">
                       {{ hostsinfo }}  磁盘使用率%
                    </a-col>
                </a-row>
                <a-row :gutter="40" justify="space-between" class="contdiv">
                    <a-col :span="24" class="leftcontent" >
                        <diskchart style="height:300px;width:100%; " :diskData="diskData"  :diskThreshold="diskThreshold"/>
                    </a-col>
                </a-row>
            </div> 
            <div class="content" style="height: 400px;">
                <a-row :gutter="40" justify="space-between" class="contdiv">
                    <a-col :span="24" class="title" v-if="hostsinfo">
                       {{ hostsinfo }} : 网络流量kb/s
                    </a-col>
                </a-row>
                <a-row :gutter="40" justify="space-between" class="contdiv">
                    <a-col :span="24" class="leftcontent" >
                        <networkchart style="height:300px;width:100%;" :networkData="networkData" />
                    </a-col>
                </a-row>
            </div> 
           
            <mysqlsizechart  :mysqlData="mysqlData" :hostsinfo="hostsinfo"/>
            <oraclechart  :oracleData="oracleData" :hostsinfo="hostsinfo"/>
            <redischart  :redisData="redisData" :hostsinfo="hostsinfo"/>
            <mssqlchart  :mssqlData="mssqlData" :hostsinfo="hostsinfo"/>
            <postgresqlchart  :postgresqlData="postgresqlData" :hostsinfo="hostsinfo"/>
            <mongodbchart  :mongodbData="mongodbData" :hostsinfo="hostsinfo"/>

        </div>
        <div class="example" v-if="isLoading">
            <a-spin  size="large"/>
        </div>
   
</template>
<script setup name="hostsinfo" >
import { onMounted,ref  } from 'vue'
import cpuchart from '@/components/Spectaculars/cpuchart.vue' // cpu折线图
import memorychart from '@/components/Spectaculars/memorychart.vue' // 内存折线图
import diskchart from '@/components/Spectaculars/diskchart.vue' // 磁盘折线图
import networkchart from '@/components/Spectaculars/networkchart.vue' // 网络折线图
import mysqlsizechart from '@/components/Spectaculars/mysqlsizechart.vue' // mysql大小
import oraclechart from '@/components/Spectaculars/oraclechart.vue' // oracle大小
import mongodbchart from '@/components/Spectaculars/mongodbchart.vue' // mongodb
import redischart from '@/components/Spectaculars/redischart.vue' // redis
import mssqlchart from '@/components/Spectaculars/mssqlchart.vue' // mssql
import postgresqlchart from '@/components/Spectaculars/postgresqlchart.vue' // postgresql

import businessApi from '@/api/python/businessApi'
import { useRouter } from 'vue-router'
let hostsid = ref(0)

const isLoading = ref(true)
let cpuData = ref([]) // cpu利用率
let memoryData = ref([]) // 内存利用率
let diskData = ref([]) // 磁盘利用率
let networkData = ref([]) // 网络利用率
let mysqlData = ref([]) // mysql状态
let oracleData = ref([]) // oracle状态
let redisData = ref([])
let mssqlData = ref([]) 
let postgresqlData = ref([]) 
let mongodbData = ref([])
let diskName = ref('')
let hostsinfo = ref('')
const router = useRouter()
let cpuThreshold =  ref(0)
let memoryThreshold =  ref(0)
let diskThreshold =  ref(0)
hostsid.value = router.currentRoute._value.query.hostsid
onMounted(() => {
    infoData()
})
let infoData = () => {
    businessApi.hostsinfo({hostsid:hostsid.value}).then((res) => {
        isLoading.value = false
        cpuData.value = res.cpuResults.reverse()
        hostsinfo.value = res.hostinfo
        memoryData.value = res.memoryResults.reverse()
        diskData.value = res.diskData
        diskName.value = res.diskNames.toString()
        networkData.value = res.networkData
        mysqlData.value = res.mysqlData
        oracleData.value = res.oracleData
        redisData.value = res.redisData
        mssqlData.value = res.mssqlData
        postgresqlData.value = res.postgresqlData
        mongodbData.value = res.mongodbData
        cpuThreshold.value = res.cpuThreshold
        memoryThreshold.value = res.memoryThreshold
        diskThreshold.value = res.diskThreshold
    })
}    

let timerParty = setInterval(async () => {
    infoData()
},60000) // 一分钟请求一次数据
</script>

<style lang="less" >
.aminui{
    height: auto !important;
}
.dv-full{
    background-color: #ECECEC;
	color: #FFF;
    height: auto;
    .content{
        height: 280px;
        width: 98%;
        margin: 0 auto;
        background-color: #FFF;
        border-radius: 15px;
        .date{
            font-size: 20px;
            line-height: 30px;
        }
        .logo{
            width:80px;
        }
        .title{
            font-size: 28px;
            text-align: center;
            color: #333333;
        }
      
        .contdiv{
            margin-top: 15px;
        }
    }
    
}
.example {
    text-align: center;
    border-radius: 4px;
    position:absolute;
    left:50%;
    top:50%;
}
</style>