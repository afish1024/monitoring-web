<template>
    <div class="entrustment-title" >
        <a-row :gutter="0" justify="space-between" class="item">
            <a-col :span="4">
                <div>序号</div>
            </a-col>
            <a-col :span="5">
                <div>接口</div>
            </a-col>
            <a-col :span="4">
                <div>设备</div>
            </a-col>
            <a-col :span="4">
                <div>流入流量</div>
            </a-col>
            <a-col :span="6">
                <div>流出流量</div>
            </a-col>
        </a-row>
    </div>
    <div class="entrustment"  ref="scrollRef">
        <a-row :gutter="0" justify="space-between" class="item"  v-for="(item, index) in flows" :key="index">
            <a-col :span="4">
                <div>{{ index+1 }}</div>
            </a-col>
            <a-col :span="5">
                <div >{{ item.portName }}</div>
            </a-col>
            <a-col :span="4"  style="overflow: hidden;">
               <div>{{ item.deviceName }}</div>
            </a-col>
            <a-col :span="4" >
                <div >{{ item.inflow }}</div>
            </a-col>
            <a-col :span="6" >
                <div >{{ item.outflow }}</div>
            </a-col>
        </a-row>
       
    </div>
    <div class="pagination">
        <a-pagination v-model:current="current"  :total="total" @change="onChange" :defaultPageSize="20" :showSizeChanger="false" :itemRender="itemRender"/>
   </div>
</template>
<script setup name="apirealtime">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
    import flowApi from '@/api/biz/flowApi'
    const flows = ref([])
    const total = ref(0)
    const current = ref(1)


    let getData= () => {
		return flowApi.bytesInsight({current:current.value}).then((data) => {
           flows.value = data.records
           total.value = data.total
		})
	}
    const onChange= (page, pageSize) => {
  
        current.value = page
        getData();
    }
   
    
	onMounted(() => {
        getData();
	})
</script>
<style scoped  lang="less">
.entrustment::-webkit-scrollbar {display:none}
.entrustment-title{
    font-size: 16px;
    margin-top:2%;
    .item{
        height: 30px;
        width: 100%;
        margin: 0 auto;
        text-align: center;
        line-height: 30px;
        overflow: hidden;
        color: #398faf;
    }
}
.entrustment{
    margin-bottom:5%;
    font-size: 16px;
    height:800px;
    scrollbar-width: none;
    -ms-overflow-style: none;
    overflow-x: hidden;
    overflow-y: auto;
    ms-overflow-style: none;  /* IE 和 Edge */
    scrollbar-width: none;  /* Firefox */
    color: #FFF;
    .item{
        line-height: 40px;
        width: 100%;
        margin: 0 auto;
        text-align: center;
        height:  40px;
        overflow: hidden;
        cursor: pointer;
        div{
            overflow: hidden;text-overflow: ellipsis;white-space: nowrap;
        }
    }
}
.pagination{
    text-align: right;
    /deep/ .ant-pagination-item-ellipsis{
        color: #fff !important;
    }
}
</style>