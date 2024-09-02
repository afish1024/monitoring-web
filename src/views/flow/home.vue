<template>
    <div>
        <a-row :gutter="0" justify="end" style="margin-top:10px;" >
            <a-col :span="7.5">
                <div class="times">
                    <div class="item" :class="searchFormState.lastTime == 0 ? 'selectitem' : ''"  @click="tabClick(0)">近1个小时</div>
                    <div class="item" :class="searchFormState.lastTime == 1 ? 'selectitem' : ''"  @click="tabClick(1)">近6个小时</div>
                    <div class="item" :class="searchFormState.lastTime == 2 ? 'selectitem' : ''"  @click="tabClick(2)">近1天</div>
                    <div class="item" :class="searchFormState.lastTime == 3 ? 'selectitem' : ''"  @click="tabClick(3)">近7天</div>
                    <div class="item" :class="searchFormState.lastTime == 4 ? 'selectitem' : ''"  @click="tabClick(4)">近1个月</div>
                </div>
            </a-col>
            <a-col :span="6">
                <a-range-picker v-model:value="searchFormState.dates" :show-time="true" format="YYYY-MM-DD HH:mm:ss" @change="dateChange" 
                />  
            </a-col>
            <a-col :span="1">
                <a-button type="primary" html-type="submit" @click="inquireClick()">查询</a-button>
            </a-col>
            <a-col :span="1">
                <div class="sync" @click="refresh()">
                    <sync-outlined  />
                </div>
            </a-col>
        </a-row>

        <a-row :gutter="10" justify="space-between" style="margin-top:20px;" >
            <a-col :span="6">
                <div class="items">
                    <a-row :gutter="10" justify="space-between" >
                        <a-col :span="19" >
                            <div class="line">
                                <span class="line-value">{{ totalStatisticsData.totalFlow ? totalStatisticsData.totalFlow : 0 }}</span> <span>MB</span>
                            </div>
                            <div class="line"> <span class="line-title">总计流量</span>
                                <!-- <span class="line-red">
                               <arrow-up-outlined />%</span>
                                 -->
                            </div>
                        </a-col>
                        <a-col :span="5">
                            <div class="item-icon">
                                SUM
                            </div>
                        </a-col>
                    </a-row>
                </div>
            </a-col>
            <a-col :span="6">
                <div class="items">
                   
                    <a-row :gutter="10" justify="space-between" >
                        <a-col :span="19" >
                            <div class="line">
                                <span class="line-value"> {{ totalStatisticsData.averageFlow  ? totalStatisticsData.averageFlow : 0 }}</span> <span>MB</span>
                            </div>
                            <div class="line"> <span class="line-title">平均流量</span><span class="line-red">
                                <!-- <arrow-up-outlined />
                               % --></span></div>
                        </a-col>
                        <a-col :span="5">
                            <div class="item-icon">
                                AVG
                            </div>
                        </a-col>
                    </a-row>
                  
                </div>
            </a-col>
            <a-col :span="6">
                <div class="items">
                    <a-row :gutter="10" justify="space-between" >
                        <a-col :span="19" >
                            <div class="line">
                                <span class="line-value">{{ totalStatisticsData.maxFlow   ? totalStatisticsData.maxFlow : 0 }}</span> <span>MB</span>
                            </div>
                            <div class="line"> <span class="line-title">最大流量</span>
                                <!-- <span class="line-red">
                                <arrow-up-outlined />
                                %</span> -->
                            </div>
                        </a-col>
                        <a-col :span="5">
                            <div class="item-icon">
                                MAX
                            </div>
                        </a-col>
                    </a-row>
                  
                </div>
            </a-col>
            <a-col :span="6">
                <div class="items">
                   
                    <a-row :gutter="10" justify="space-between" >
                        <a-col :span="19" >
                            <div class="line">
                                <span class="line-value">{{ totalStatisticsData.minFlow   ? totalStatisticsData.minFlow : 0}}</span> <span>MB</span>
                            </div>
                            <div class="line"> <span class="line-title">最小流量</span>
                                <span class="line-red"></span>
                                <!-- <arrow-up-outlined />
                                % -->
                            </div>
                        </a-col>
                        <a-col :span="5">
                            <div class="item-icon">
                                MIN
                            </div>
                        </a-col>
                    </a-row>
                  
                </div>
            </a-col>
        </a-row>
        <a-row :gutter="10" justify="space-between" >
            <a-col :span="18">
                <a-row :gutter="10" justify="space-between" >
                    <a-col :span="12">   
                        <div class="items" style="height:400px;">
                            <div class="line-top">
                                <span class="line-top-title">
                                    IP流量TOP5
                                </span>
                            </div>
                            <iptop5 style="height: 350px;width:100%;" :searchFormState="searchFormState"></iptop5>
                        </div>
                    </a-col> 
                    <a-col :span="12">   
                        <div class="items" style="height:400px;">
                            <div class="line-top">
                                <span class="line-top-title">
                                    设备速率TOP5
                                </span>
                            </div>
                            <equipmenttop5 style="height: 350px;width:100%;" :searchFormState="searchFormState"></equipmenttop5>
                        </div>
                    </a-col>
                </a-row>
                <!-- <a-row :gutter="10" justify="space-between" >
                    <a-col :span="24">
                        <div class="items" style="height:350px;">
                            <div class="line-top">
                                <span class="line-top-title">
                                    TOP3设备流向分析
                                </span>
                            </div>
                            <a-row :gutter="10" justify="space-between" >
                                <a-col :span="8">
                                    <flowdirection style="height:300px;width:100%;margin-top:20px;"></flowdirection>
                                </a-col>
                                
                            </a-row>

                        </div>
                    </a-col>
                </a-row> -->
            </a-col>
            <a-col :span="6">
                <div class="items" style="height:400px;">
                    <div class="line-top">
                        <span class="line-top-title">
                            设备流量分析
                        </span>
                    </div>

                    <analysis style="height: 350px;width:100%;" :searchFormState="searchFormState"/>
                    
                </div>
            </a-col>
        </a-row>
    </div>
</template>

<script setup name="flow">
import { onMounted } from 'vue'
import VScaleScreen from 'v-scale-screen'
import dayjs, { Dayjs } from 'dayjs';
import flowApi from '@/api/biz/flowApi'

let searchFormState = reactive({
    lastTime:4
})
let totalStatisticsData = ref([])
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
//总计数据统计
const totalStatistics = ()=>{
    flowApi.totalStatistics(searchFormState).then(res=>{
        totalStatisticsData.value = res
    })
}
const tabClick= (index)=>{
    searchFormState.lastTime = index
    totalStatistics()
}
const refresh = ()=>{
    location.reload()
}
let inquireClick = () => {
    totalStatistics()
}    

const dateChange = (dates) => {
    
    if (dates != null) {
        searchFormState.startDate = dates[0].format('YYYY-MM-DD HH:mm:ss')
        searchFormState.endDate = dates[1].format('YYYY-MM-DD HH:mm:ss')

        searchFormState.dates = [
            dayjs(dates[0], dateFormat),
            dayjs(dates[1], dateFormat),
        ]

    }

}



onMounted(()=>{
    totalStatistics()
})
</script>
<style lang="less" >
.items{
    background-color: #FFF;
    height: 100px;
    width: 100%;
    border-radius: 5px;
    padding: 20px 20px;
    margin-bottom: 20px;
    .line-top{
        width: 90%;
        height: 25px;
       
        .line-top-title{
            line-height: 25px;
            font-weight: 600;
            font-size: 16px;
            cursor: pointer;
            margin-right: 30px;
        }
    }


    .line{
        color: #ababaf;
        font-size: 12px;
    }
    .line-value{
        font-size: 28px;
        color: #333;
    }
    .line-red{
        color: red;
        padding-left: 10px;
    }
    .item-icon{
        background-color: #576afb;
        color: #FFF;
        width: 50px;
        height: 45px;
        line-height: 45px;
        border-radius:50%;
        text-align: center;
        font-size: 12px;
    }
}
.times{
    display:flex;
    .item{
        height:30px;
        line-height:30px;
        padding-left:5px;
        padding-right:5px;
        border:1px solid #c3c3c3;
        border-radius: 5px;
        margin-right:15px;
        background-color:#FFF;
        cursor: pointer;
    }
    .selectitem{
        background-color: #e4e8fb !important;
        color:#7e7d9c;
    }
}
.sync{
    background-color:#FFF;
    width:25px;
    margin:0 auto;
    padding-left:5px;
    border:1px solid #c3c3c3;
    border-radius: 5px;
    height:30px;
    line-height:30px;
    cursor: pointer;
}
</style>