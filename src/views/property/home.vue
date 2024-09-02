<template>
    <div>
        <a-row :gutter="0" justify="space-between" style="margin-top:20px;" >
            <a-col :span="4">
                <div class="items">
                    <a-row :gutter="8" justify="space-between" >
                        <a-col :span="10" >
                            <div class="item-icon">
                                <icon-font type="icon-a-lujing390" class="icon" style="font-size: 20px;"/>
                            </div>
                           
                        </a-col>
                        <a-col :span="9">
                            <div class="line line-red">
                               闲置中
                            </div>
                            <div class="line line-value">{{ totalStatisticsData.unusedCount ? totalStatisticsData.unusedCount : 0  }}</div>
                        </a-col>
                    </a-row>
                </div>
            </a-col>

            <a-col :span="4">
                <div class="items">
                    <a-row :gutter="8" justify="space-between" >
                        <a-col :span="10" >
                            <div class="item-icon">
                                <icon-font type="icon-shiyongzhong" class="icon" style="font-size: 20px;"/>
                            </div>
                            
                        </a-col>
                        <a-col :span="9">
                            <div class="line line-red">
                               使用中
                            </div>
                            <div class="line line-value"> {{ totalStatisticsData.useCount ? totalStatisticsData.useCount : 0  }}</div>
                        </a-col>
                    </a-row>
                </div>
            </a-col>
            <a-col :span="4">
                <div class="items">
                    <a-row :gutter="8" justify="space-between" >
                        <a-col :span="10" >
                            <div class="item-icon">
                                <icon-font type="icon-jieyongzhong" class="icon" style="font-size: 20px;"/>
                            </div>
                            
                        </a-col>
                        <a-col :span="9">
                            <div class="line line-red">
                               借用中
                            </div>
                            <div class="line line-value">  {{ totalStatisticsData.borrowCount ? totalStatisticsData.borrowCount : 0  }}</div>
                        </a-col>
                    </a-row>
                </div>
            </a-col>

            <a-col :span="4">
                <div class="items">
                    <a-row :gutter="8" justify="space-between" >
                        <a-col :span="10" >
                            <div class="item-icon">
                                <icon-font type="icon-weixiuzhong11" class="icon" style="font-size: 20px;"/>
                            </div>
                            
                        </a-col>
                        <a-col :span="9">
                            <div class="line line-red">
                               维修中
                            </div>
                            <div class="line line-value">  {{ totalStatisticsData.maintenanceCount ? totalStatisticsData.maintenanceCount : 0  }}</div>
                        </a-col>
                    </a-row>
                </div>
            </a-col>

            <a-col :span="4">
                <div class="items">
                    <a-row :gutter="8" justify="space-between" >
                        <a-col :span="10" >
                            <div class="item-icon">
                                <icon-font type="icon-yibaofei" class="icon" style="font-size: 20px;"/>
                            </div>
                            
                        </a-col>
                        <a-col :span="9">
                            <div class="line line-red">
                               已报废
                            </div>
                            <div class="line line-value">  {{ totalStatisticsData.disposalCount ? totalStatisticsData.disposalCount : 0  }}</div>
                        </a-col>
                    </a-row>
                </div>
            </a-col>

            
        </a-row>

        <a-row :gutter="10" justify="space-between" >
            <a-col :span="24">
                <div class="items" style="height:380px;">
                    <div class="line-top">
                        <span class="line-top-title">
                            资产分类统计TOP5
                        </span>
                    </div>
                    <classify style="height: 260px;width:100%;"></classify>
                </div>
            </a-col>
          

        </a-row>

        <a-row :gutter="10" justify="space-between" >
            <a-col :span="12">
                <div class="items" style="height:310px;">
                    <div class="line-top">
                        <span class="line-top-title">
                            资产品牌统计
                        </span>
                    </div>
                    <brand style="height: 260px;width:100%;"></brand>
                </div>
            </a-col>
            <a-col :span="12">

                <div class="items" style="height:310px;">
                    <div class="line-top">
                        <span class="line-top-title">
                            成员负责资产数量TOP5
                        </span>
                    </div>
                    <member style="height: 260px;width:100%;"></member>
                </div>

            </a-col>

        </a-row>

    </div>
</template>

<script setup name="property">
import { onMounted } from 'vue'
import VScaleScreen from 'v-scale-screen'
import dayjs, { Dayjs } from 'dayjs';
import { createFromIconfontCN } from '@ant-design/icons-vue';
import assetApi from '@/api/biz/assetApi'
const IconFont = createFromIconfontCN({
     scriptUrl: '//at.alicdn.com/t/c/font_4427041_74fwn70lfjo.js',
});
defineComponent(() => {
    IconFont
})
let searchFormState = reactive({
    lastTime:4
})
let totalStatisticsData = ref([])
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
//总计数据统计
const totalStatistics = ()=>{
    assetApi.totalStatistics(searchFormState).then(res=>{
     
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
onMounted(()=>{
    totalStatistics()
})
</script>
<style lang="less"  scoped>
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
        font-size: 14px;
        text-align:center;
        height:30px;
        line-height: 30px;
    }
    .line-value{
        color: #333;
        font-weight: 600;
    }
    .line-red{
        color: rgb(123, 123, 123);
        font-size: 15px;
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

</style>