<template>
    <a-card :bordered="false" style="margin-bottom: 10px;background-color: var(--primary-color);">
        <a-row>
            <a-col :span="23">
                <span style="color: #fff;">10.0.3.99</span>
            </a-col>
            <a-col :span="1">
                <a style="color: #fff;" @click="back">返回</a>
            </a-col>
        </a-row>
    </a-card>
    <a-card :bordered="false" style="margin-bottom: 10px;">
        <a-descriptions title="商品信息" :labelStyle="{justifyContent: 'flex-end',minWidth:'100px'}">
            <a-descriptions-item>主机名：DESKTOP-O4IMB60，系统描述：Microsoft Windows 10 Home China，版本：10.0.19045.3086 Build 19045.3086，kernelArch：x86_64，cpu核数：8 ，cpu型号：Intel(R) Core(TM) i5-1035G1 CPU @ 1.00GHz ，运行进程数量：254，物理总内存：7.67G ，交换区总内存：15.97G，交换区内存已使用：83.86% ，启动时间：2023-06-17 10:24:38，运行时间：12天6小时28分钟34秒，备注： ，累计接收流量：0.96G，累计发送流量：0.24G ，agent版本：v3.4.7，agent上报时间(秒)：120 ，</a-descriptions-item>
        </a-descriptions>
    </a-card>
    <a-card :bordered="false" style="margin-bottom: 10px;">
        <a-descriptions title="CPU温度" :labelStyle="{justifyContent: 'flex-end',minWidth:'100px'}">
            <a-descriptions-item>
                <span>ACPI\ThermalZone\THM0_0： 当前：47.85℃，最高：0℃，临界值：0℃</span>
            </a-descriptions-item>
        </a-descriptions>
    </a-card>
    <a-card :bordered="false" style="margin-bottom: 10px;">
        <a-descriptions title="磁盘空间" :labelStyle="{justifyContent: 'flex-end',minWidth:'100px'}"></a-descriptions>
        <a-table :dataSource="dataSource" :columns="columns" :pagination="false">
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'available'">
                    <a-progress :percent="record.available"  :show-info="false"/>{{record.available }}
                </template>
            </template>
        </a-table>
    </a-card>
    <a-card :bordered="false" style="margin-bottom: 10px;">
        <a-descriptions title="磁盘IO信息" :labelStyle="{justifyContent: 'flex-end',minWidth:'100px'}"></a-descriptions>
        <a-table :dataSource="dataSource" :columns="columns" :pagination="false">
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'available'">
                    <a-progress :percent="record.available"  :show-info="false"/>{{record.available }}
                </template>
            </template>
        </a-table>
    </a-card>
    <a-card :bordered="false" style="margin-bottom: 10px;">
        <a-descriptions title="磁盘SMART信息息" :labelStyle="{justifyContent: 'flex-end',minWidth:'100px'}"></a-descriptions>
        <a-table :dataSource="dataSource" :columns="columns" :pagination="false">
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'available'">
                    <a-progress :percent="record.available"  :show-info="false"/>{{record.available }}
                </template>
            </template>
        </a-table>
    </a-card>
    <a-card :bordered="false" style="margin-bottom: 10px;">
        
        <a-row>
            <a-col :span="16" style="display: flex;">
                <div>
                    <span class="title">磁盘空间总使用率%</span>
                </div>
                <div style="margin-left: 10px;">
                    <span >(统计时间截至到昨天)</span>
                </div>
                <div style="margin-left: 10px;">
                    <span class="title">最高：</span>
                    <span style="color: #dc3545;"> <icon-font type="icon-sanjiaoxing" style="font-size: 16px;"/>30.52</span>
                </div>
                <div style="margin-left: 10px;">
                    <span class="title">平均：</span>
                    <span style="color: #ffc107;"> <icon-font type="icon-sanjiaoxing_shang" style="font-size: 18px;"/>30.37</span>
                </div>
                <div style="margin-left: 10px;">
                    <span class="title">最低：</span>
                    <span style="color: #28a745;"> <icon-font type="icon-sanjiaoxing_shang1" style="font-size: 16px;"/>29.87</span>
                </div>
                
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="24">
                <a-card :bordered="false" ><!--:bodyStyle="{overflow:'hidden'}"-->
                    <StackedAreaChart :style="{ height:'500px',width:clientWidth + 'px' }"  />
                </a-card>
            </a-col>
        </a-row>
    </a-card>
</template>
<script setup name="sysAction">
import StackedAreaChart from '@/components/Chart/eCXianXingTu/StackedAreaChart.vue'
import { createFromIconfontCN } from '@ant-design/icons-vue'
import bus from "@/utils/bus";
import { useRouter } from 'vue-router'
import store from '@/store'
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/c/font_3441767_nx3yazxxp59.js'
})
defineComponent(() => {
    IconFont
})
const clientWidth = ref(store.state.global.layout === 'doublerow' ? document.documentElement.clientWidth - 150 : document.documentElement.clientWidth - 300)
bus.on('widthString',data=>{
	if(data === true){
        clientWidth.value = document.documentElement.clientWidth - 350
        //console.log(clientWidth.value)
        if(document.querySelector('canvas')){
            document.querySelector('canvas').setAttribute('style','width:'+clientWidth.value+'px')
        }
        
    }
})


const router = useRouter()
const back = ()=>{
    router.push({
        path:'/resource/host' 
    })
}
const dataSource = [
    {
        key: '1',
        name: 'C:',
        age: '250.0G',
        used: '88.09G',
        usable:'161.91G',
        available:'38.24'
    },
    {
        key: '2',
        name: 'D:',
        age: '251.0G',
        used: '83.09G',
        usable:'163.91G',
        available:'35.24'
    },
]

const columns = [
    {
        title: '盘符名称',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
    },
    {
        title: '磁盘空间',
        dataIndex: 'age',
        key: 'age',
        align: 'center',
    },
    {
        title: '已使用',
        dataIndex: 'used',
        key: 'used',
        align: 'center',
    },
    {
        title: '可用',
        dataIndex: 'usable',
        key: 'usable',
        align: 'center',
    },
    {
        title: '可使用%',
        dataIndex: 'available',
        key: 'available',
        align: 'center',
    },
]
</script>
<style lang="less" scoped>
.title{
    flex: auto;
    overflow: hidden;
    color: var(--heading-color);
    font-weight: bold;
    font-size: 16px;
    line-height: 1.5715;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>