<template>
    <a-card :bordered="false"  style="height: 60px;" >
        <div class="line-title">
            <div class="left-line"></div>
            <span class="title">
                实时统计
            </span>
            <div class="right-date">
                <a-form name="advanced_search" :model="searchFormState" >
                    <a-space direction="horizontal" :size="10">
                        <a-range-picker v-model:value="searchFormState.dates" :show-time="false" format="YYYY-MM-DD" @change="dateChange"
                        />  
                        <a-button type="primary" html-type="submit" @click="inquireClick()">查询</a-button>
                    </a-space>
                </a-form>
            </div>
        </div>
    </a-card>

    <a-card :bordered="false" style="margin-bottom: 20px;width: 100%;">
        <realtime  style="height: 400px;width: 100%;" :statisticsData="statisticsData" />
    </a-card>
   
    <record  />
    <div class="example" v-if="isLoading">
        <a-spin  size="large"/>
    </div>
</template>
<script setup  name="statisticsindex">
import dayjs, { Dayjs } from 'dayjs';
import indexApi from '@/api/python/indexApi'
import realtime from  './realtime.vue'
import record from  './record.vue'

const dateFormat = 'YYYY-MM-DD';

let summary = ref([]) // 检测概况
let longapisData = ref([]) // 接口相应top
let statisticsData = ref([]) // 统计
let parameter = ref({})
let searchFormState = reactive({})
const isLoading = ref(true)

let infoData = () => {
    indexApi.hostStatistics(searchFormState).then((data) => {
        isLoading.value = false
        statisticsData.value = data.hosts_statistics
        searchFormState.dates = [
            dayjs(data.start_date, dateFormat),
            dayjs(data.end_date, dateFormat),
        ]
    })
}
const dateChange = (dates) => {
    if (dates != null) {
        searchFormState.start_date = dates[0].format('YYYY-MM-DD')
        searchFormState.end_date = dates[1].format('YYYY-MM-DD')
    }
}
let inquireClick = () => {
    isLoading.value = true
    infoData()
}    
onMounted(() => {
    infoData()
})
</script>
<style lang="less" scoped >
    body{
        background-color:#f5f5f5;
        height: auto;
    }
    .left-line{
        height: 30px;
        width: 4px;
        background-color: #3a6fd7;
        height: 30px;
        float: left;
       
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
        }
        .right-date{
            float: right;
            color: #333;
            font-size: 16px;
            font-weight: 500;
            line-height: 30px;
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