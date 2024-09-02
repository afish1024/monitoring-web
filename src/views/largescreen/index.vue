<template>
    <div class="specialized" ref="mainref">
        <div class="timeDiv" :data="currentTime">{{ currentTime }}</div>
        <div class="bigTitle" >{{ title }}</div>
        <div class="content">
            <div class="leftDiv">
               
                <div class="titleImg">监控系统</div>
                <monitoringsystem   style="height: 300px"/>
                <div class="titleImg">监控接口</div>
                <monitoringapi  style="height: 300px"/>
            </div>
            <div class="center">
                <div class="titleImg">系统概况</div>
                <systemoverview  :summary="summary" v-if="summary.length != 0"  /> 
                <div class="titleImg">7日数据</div>
                <sevendata  style="height: 400px"   />
                <div class="titleImg">监控人员</div>
                <monitoringuser />
            </div>
            <div class="rightDiv">
                <div class="titleImg">接口异常统计</div>
                <apiabnormal  style="height: 400px"/>
                <div class="titleImg">报警列表</div>
                <div class="alarm scrollbar">
                    <alertapis :alertData="alertData" v-if="alertData.length != 0" style="height: 300px" />
                </div>
            </div>
        </div>
    </div>
    <div class="example" v-if="isLoading">
        <a-spin  size="large"/>
    </div>
</template>
<script setup name="largescreen">
import { onMounted,ref } from 'vue'
import monitoringsystem from '@/components/Largescreen/monitoringsystem.vue' // 监控系统
import systemoverview from '@/components/Largescreen/systemoverview.vue' // 系统概况
import monitoringapi from '@/components/Largescreen/monitoringapi.vue' // 监控系统
import sevendata from '@/components/Largescreen/sevendata.vue' // 7日数据
import monitoringuser from '@/components/Largescreen/monitoringuser.vue' // 监控人员
import apiabnormal from '@/components/Largescreen/apiabnormal.vue' // 接口异常统计
import alertapis from '@/components/Spectaculars/alertapis.vue' //告警列表
import indexApi from '@/api/python/indexApi'
const title =  '数据看板'
const currentTime = ref('')
const isLoading = ref(true)
let apiStatistics = ref([]) // 检测系统统计
let alertData = ref([]) // 警告信息
let summary = ref([]) // 检测概况
let longapisData = ref([]) // 接口相应top
let timer1 = setInterval(() => {
    var y = new Date().getFullYear()
    var m = appendZero(new Date().getMonth() + 1)
    var d = appendZero(new Date().getDate())
    var ho = appendZero(new Date().getHours())
    var mi = appendZero(new Date().getMinutes())
    var se = appendZero(new Date().getSeconds())
    // 修改数据date
   currentTime.value = y + '-' + m + '-' + d + ' ' + ho + ':' + mi + ':' + se
}, 1000)

let appendZero = (obj) => {
    if (obj < 10) {
        return '0' + obj
    } else {
        return obj
    }
}
let infoData = () => {
    indexApi.largescreen({}).then((res) => {
        isLoading.value = false
        apiStatistics.value = res.api_statistics
        alertData.value = res.alert_apis
        longapisData.value = res.long_apis
        summary.value = res.summary
    })
}    
onMounted(() => {
    infoData()
})
</script>
<style lang="less" scoped>
.specialized{
    height: auto;
    padding-bottom: 100%;
    background-repeat: no-repeat;
    background-size: 100%;
    background-image: url('../../assets/images/backdround.png');
    position: relative;
	color: #FFF;
    .example {
       text-align: center;
       border-radius: 4px;
       position:absolute;
       left:50%;
       top:50%;
   }
	.timeDiv {
        font-size: 18px;
        font-family: ping;
        font-weight: bold;
        color: #ffffff;
        line-height: 0.21rem;
        letter-spacing: 1px;
        z-index: 102;
        position: absolute;
        left: 24px;
        top: 20px;
    }
	.bigTitle {
        font-size: 46px;
        font-family: PangMenZhengDao;
        color: #dceeff;
        letter-spacing: 0.02rem;
        text-align: center;
        cursor: pointer;
    }

	
	.content{
        display: flex;
        width: 98%;
        margin:0 auto;
        margin-top: 50px;
        justify-content:space-between;
        .rightDiv{
            width: 28%;
           
        }
        .center{
            width: 40%;

        }
		.leftDiv{
            width: 28%;
		}
		.titleImg {
                height: 46px;
                background-repeat: no-repeat;
                background-image: url('../../assets/images/titleImg.png');
                background-repeat: no-repeat;
                background-size: 100% 100%;
                font-size: 18px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #ffffff;
                line-height: 46px;
                padding-left: 11px;
                margin-bottom: 20px;
                cursor: pointer;
                .btnMain {
                    position: absolute;
                    top: 0.15rem;
                    right: 1.7%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 100;
                    cursor: pointer;
                    .left {
                        width: 0.24rem;
                        height: 0.24rem;
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                        background-image: url('../../assets/images/leftLunbo.png');
                    }

                    .right {
                        width: 0.24rem;
                        height: 0.24rem;
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                        background-image: url('../../assets/images/rightLunbo.png');
                    }
                    .pressMain {
                        width: 0.5rem;
                        height: 0.24rem;
                        line-height: 0.24rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        span {
                            float: left;
                            width: 0.04rem;
                            height: 0.04rem;
                            background: rgba(255, 255, 255, 0.6);
                            border-radius: 50px;
                            margin-left: 3px;
                            cursor: pointer;
                            transition: all 0.5s ease-out;
                        }
                    }
                    .pressMain .active {
                        background: rgba(255, 255, 255, 1);
                        width: 10px;
                    }
                }


            }


	}

    .alarm{
        margin-top: 20px;
        overflow-y: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
        overflow-x: hidden;
        height: 390px;
        .item{
            height: 50px;
            line-height: 50px;
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
}
</style>