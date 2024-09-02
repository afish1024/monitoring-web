<template>
    <v-scale-screen :fullScreen="true">
    <div class="dv-full-screen-container">
        <div class="content">
            <topHeader ref="msg" :paramName="paramName" />
            <a-row :gutter="40" justify="space-between" class="contdiv">
                <a-col :span="16" class="leftcontent" >
                    <a-row :gutter="16" justify="start" style="" class="statistics">
                        <a-col :span="8"  >
                            <a-row :gutter="16" justify="start" class="line-title">
                                <a-col :span="2" >
                                    <div class="iconleft"></div>
                                </a-col>
                                <a-col :span="12" >
                                    可用性
                                </a-col>
                                <a-col :span="8" >
                                    总数： {{ usableRes.value ?  usableRes.value : 0}}%
                                </a-col>
                            </a-row>
                        </a-col>
        
                        <a-col :span="8"  >
                            <a-row :gutter="10" justify="start" class="line-title">
                                <a-col :span="2">
                                    <div class="iconleft"></div>
                                </a-col>
                                <a-col :span="14">
                                    预警统计
                                </a-col>
                                <a-col :span="5" >
                                    总数：{{ warningRes.count ?  warningRes.count : 0}}
                                </a-col>
                            </a-row>
                        </a-col>
        
                        <a-col :span="8"  >
                            <a-row :gutter="16" justify="start" class="line-title" >
                                <a-col :span="2" >
                                    <div class="iconleft"></div>
                                </a-col>
                                <a-col :span="14" >
                                    报警统计
                                </a-col>
                                <a-col :span="5" >
                                    总数：{{ alarmRes.count ?  alarmRes.count : 0}}
                                </a-col>
                            </a-row>
                        </a-col>
                       
                    </a-row>

                    <a-row :gutter="0" justify="space-between" >
                        <a-col :span="8"  >
                            <usable style="height: 280px" :usableRes="usableRes"/>
                        </a-col>
                        <a-col :span="8" >
                            <businessgroup  style="height: 280px;" :warningRes="warningRes"/>
                        </a-col>
                        <a-col :span="8" >
                            <alarm  style="height: 280px;width:100%;" :alarmRes="alarmRes"/>
                        </a-col>
                    </a-row>
                 
                    <a-row :gutter="40" justify="space-between" class="statistics" >
                        <a-col :span="12" >
                            <a-row :gutter="20" justify="start" class="line-title"  >
                                <a-col :span="1" >
                                    <div class="iconleft" ></div>
                                </a-col>
                                <a-col :span="23">
                                    接口监控
                                </a-col>
                            </a-row>
                            
                            <a-row :gutter="0" justify="space-between" class="title">
                                <a-col :span="9"  :offset="1">
                                    名称
                                </a-col>
                                <a-col :span="10" >
                                    系统
                                </a-col>
                                <a-col :span="4" >
                                    接口状态
                                </a-col>
                                
                            </a-row>
                            <apires  :apiresData="apiresData"  />
                        </a-col>
                        <a-col :span="11" class="dbdiv">
                            <a-row :gutter="20" justify="start" class="line-title">
                                <a-col :span="1" >
                                    <div class="iconleft"></div>
                                </a-col>
                                <a-col :span="23" >
                                    数据库监控
                                </a-col>
                                
                            </a-row>
                            <a-row justify="center" class="title">
                                <a-col :span="14" :offset="1">
                                    实例名
                                </a-col>
                                <a-col :span="5" >
                                    磁盘大小 
                                </a-col>
                                <a-col :span="4" >
                                    连通性
                                </a-col>
                            </a-row>
                            <database :databaseData="databaseData" />
                            <a-row :gutter="20" justify="start" class="line-title" >
                                <a-col :span="1" >
                                    <div class="iconleft"></div>
                                </a-col>
                                <a-col :span="23" >
                                    网络监控
                                </a-col>
                                
                            </a-row>
                            <a-row  justify="center" class="title">
                                <a-col :span="15" :offset="1">
                                    主机地址
                                </a-col>
                                <a-col :span="4" >
                                    连通性
                                </a-col>
                                <a-col :span="4" >
                                    流量
                                </a-col>
                                
                            </a-row>

                            <network :networkData="networkData" />
                           
                        </a-col>
                      
                    </a-row>

                
                </a-col>
                <a-col :span="8"  class="rightcontent" >
                    <a-row :gutter="16" justify="space-between" class="statistics" >
                        <a-col :span="24" >
                            <a-row :gutter="16" justify="start" class="line-title">
                                <a-col :span="1" >
                                    <div class="iconleft"></div>
                                </a-col>
                                <a-col :span="6" >
                                    磁盘使用率
                                </a-col>
                                
                            </a-row>
                        </a-col>
                    </a-row>

                    <a-row :gutter="0" justify="space-between" class="cartogram" >
                        <a-col :span="6" class="percentage" >
                          <div class="number">{{ diskCount }}</div>
                          <div class="pah">%</div>
                        </a-col>
                        <a-col :span="18"  >
                            <disk style="height:270px;width:500px;" :diskData="diskData"  />
                        </a-col>
                    </a-row>
                    
                    <a-row :gutter="16" justify="space-between" class="statistics" >
                        <a-col :span="24" >
                            <a-row :gutter="16" justify="start" class="line-title">
                                <a-col :span="1" >
                                    <div class="iconleft"></div>
                                </a-col>
                                <a-col :span="6" >
                                    CPU使用率
                                </a-col>
                                
                            </a-row>
                        </a-col>
                    </a-row>

                    <a-row :gutter="16" justify="space-between" class="cartogram">
                        <a-col :span="6" class="percentage" >
                          <div class="number">{{ cpuCount }}</div>
                          <div class="pah">%</div>
                        </a-col>
                        <a-col :span="18" >
                            <cpu style="height:270px;width:480px;" :cpuData="cpuData"  />
                        </a-col>
                    </a-row>

                    <a-row :gutter="16" justify="space-between" class="statistics" >
                        <a-col :span="24" >
                            <a-row :gutter="16" justify="start" class="line-title">
                                <a-col :span="1" >
                                    <div class="iconleft"></div>
                                </a-col>
                                <a-col :span="6" >
                                    内存使用率
                                </a-col>
                            </a-row>
                        </a-col>
                    </a-row>

                    <a-row :gutter="16" justify="space-between" class="cartogram">
                        <a-col :span="6" class="percentage">
                          <div class="number-red">{{ memoryCount }}</div>
                          <div class="pah-red">%</div>
                        </a-col>
                        <a-col :span="18" >
                            <memory style="height:280px;width:480px;" :memoryData="memoryData"  />
                        </a-col>
                    </a-row>

                </a-col>
            </a-row>
        </div>
    </div>
    <div class="example" v-if="isLoading">
        <a-spin  size="large"/>
    </div>
</v-scale-screen>

</template>
<script setup name="businessmonitoring" >
import { onMounted,ref  } from 'vue'
import { Decoration1, Decoration2 } from '@kjgl77/datav-vue3'
import memory from '@/components/Spectaculars/memory.vue' 
import usable from '@/components/Businessmonitoring/usable.vue' // 可用性
import businessgroup from '@/components/Businessmonitoring/businessgroup.vue' // 业务组运行总览
import alarm from '@/components/Businessmonitoring/alarm.vue' // 告警
import topHeader from './screen/topHeader.vue'
import disk from '@/components/Spectaculars/disk.vue' 
import cpu from '@/components/Spectaculars/cpu.vue'
import database from '@/components/Spectaculars/database.vue' // 数据库监控
import network from '@/components/Spectaculars/network.vue' // 网络监控
import apires from '@/components/Spectaculars/apires.vue' // 接口监控
import VScaleScreen from 'v-scale-screen'
import businessApi from '@/api/python/businessApi'
import { useRouter } from 'vue-router'
const isLoading = ref(false)
let databaseData = ref([]) // 数据库监控
let networkData = ref([]) // 网络监控
let apiresData = ref([]) // 接口监控
let cpuData = ref([]) // cpu利用率
let cpuCount = ref(0)
let memoryData = ref([]) // 内存利用率
let memoryCount = ref(0)
let diskData = ref([]) // 磁盘利用率
let diskCount = ref(0)
let type = ref(0)
let alarmRes = ref([])
let warningRes = ref([])
let usableRes = ref([])
let paramName = ref('业务监控')
const router = useRouter()
type.value = router.currentRoute._value.query.type
onMounted(() => {
    infoData()
})
let infoData = () => {
    businessApi.business({type:type.value}).then((res) => {
        databaseData.value = res.database
        networkData.value = res.network
        apiresData.value = res.apires
        cpuData.value = res.cpuResults.reverse()
        cpuCount.value = res.cpuCount
        memoryData.value = res.memoryResults.reverse()
        memoryCount.value = res.memoryCount
        diskData.value = res.diskData
        diskCount.value = res.diskCount
        alarmRes.value = res.alarmRes
        warningRes.value = res.warningRes
        usableRes.value = res.usableRes
        if(res.type != 0){
            paramName.value = res.system+"-业务监控"
        }
    })
}    


let timerParty = setInterval(async () => {
    infoData()
},60000) // 一分钟请求一次数据

</script>

<style lang="less" scoped>
.dv-full-screen-container{
    height: auto;
    padding-bottom: 100%;
    background-repeat: no-repeat;
    background-size: 100%;
    background-image: url('../../assets/images/bg.110420cf.png');
    position: relative;
	color: #FFF;
    .content{
        height: auto;
        width: 95%;
        margin: 0 auto;
        .date{
            font-size: 20px;
            line-height: 30px;
        }
        .logo{
            width:80px;
        }
        .title{
            font-size: 28px;
            line-height: 100px;
        }
      
        .contdiv{
            margin-top: 20px;
            .cartogram{
                .percentage{
                    display: flex;
                    align-items: center;
                    align-content:center;
                    flex-direction:column;
                    padding-top: 20px;
                    letter-spacing:-3px;
                    .number{
                   
                        font-size: 80px;
                        color: transparent;
                        /*定义背景渐变*/
                        background-image: linear-gradient(to bottom, #48fe88, #57e92e);
                        /*添加-webkit-background-clip，保证渐变生效*/
                        -webkit-background-clip: text;
                        background-clip: text;
                    }
                    .pah{
                        color: #299311;
                        font-size: 22px;
                        text-align: center;
                    }
                    .number-red{
                        font-size: 80px;
                        color: transparent;
                        /*定义背景渐变*/
                        background-image: linear-gradient(to bottom, #fb6c78, #ff262f);
                        /*添加-webkit-background-clip，保证渐变生效*/
                        -webkit-background-clip: text;
                        background-clip: text;
                    }
                    
                    .pah-red{
                        color: #9d000e;
                        font-size: 22px;
                        text-align: center;
                    }
                   
                }
                
            }
            .statistics{
                height: auto;
                .line-title{
                    height: 30px;
                    line-height: 30px;
                    margin-top: 20px;
                }
                .iconleft{
                    width: 3px;
                    height: 30px;
                    background-color: #0069d2;
                }
                .title{
                    height: 35px;
                    background-image: linear-gradient(to right, #4444ff, #7766ee);
                    line-height: 35px;
                    font-size: 14px;
                    margin-top: 10px;
                }
                .row{
                    height: 45px;
                    line-height: 45px;
                    overflow: hidden;
                    color:#00941b;
                    border-left:2px solid #0e1434;
                    border-right:2px solid #0e1434;
                }
                .row:nth-child(even) {
                    background-color: #111144;
                }
                .row:last-child{
                    border-bottom:2px solid #0e1434;
                }

                .dbdiv {
                    .dbrow{
                        height: 45px;
                        line-height: 45px;
                        overflow: hidden;
                        color:#00941b;
                        border-left:2px solid #0e1434;
                        border-right:2px solid #0e1434;
                        &:last-child { border-bottom:2px solid #0e1434; }
                        &:nth-child(even) {
                            background-color: #111144;
                        }
                    }
                }
                
                .cartogram-block{
                    height: 200px !important;
                    width:500px !important;
                }
            }


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