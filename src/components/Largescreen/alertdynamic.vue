<template>
        <div class="entrustment-title" >
            <a-row :gutter="0" justify="space-between" class="item">
                <a-col :span="2">
                    <div>告警级别</div>
                </a-col>
                <a-col :span="3">
                    <div>网络名称</div>
                </a-col>
                <a-col :span="3">
                    <div>设备IP</div>
                </a-col>
                <a-col :span="4">
                    <div>资源名称</div>
                </a-col>
                <a-col :span="3">
                    <div>告警类型</div>
                </a-col>
                <a-col :span="2">
                    <div>告警值</div>
                </a-col>
                <a-col :span="4">
                    <div>发生时间</div>
                </a-col>
            </a-row>
        </div>
        <div class="entrustment"  ref="scrollRef">
            <a-row :gutter="0" justify="space-between" class="item" v-for="(item,index) in props.tableList" :key="index">
                <a-col :span="2">
                    <div >
                        <a-tag color="#ea3445" v-if="item.alarmLevel == 'serious'">严重</a-tag>
                        <a-tag color="#fd9560" v-if="item.alarmLevel == 'primary'">主要</a-tag>
                        <a-tag color="#fac748" v-if="item.alarmLevel == 'secondary'">次要</a-tag>
                        <a-tag  v-if="item.alarmLevel == 'unknown'">未知</a-tag>
                    </div>
                </a-col>
                <a-col :span="3">
                    <div >{{item.networkName}}</div>
                </a-col>
                <a-col :span="3"  style="overflow: hidden;">
                   <div>{{item.ipAddress}}</div>
                </a-col>
                <a-col :span="4" >
                    <div >{{item.resourceName}}</div>
                </a-col>
                <a-col :span="3" >
                    <div >{{item.alarmTypeName}}</div>
                </a-col>
                <a-col :span="2" >
                    <div >{{item.alarmValue}}</div>
                </a-col>
                <a-col :span="4" >
                    <div >{{item.occurrenceTime}}</div>
                </a-col>
            </a-row>
        </div>
   
</template>
<script setup name="alertDyna">
const props = defineProps({
    tableList:{
        type:Array,
        defalut:()=>[]
    } 
})
</script>
<style scoped  lang="less">
.entrustment::-webkit-scrollbar {display:none}
.entrustment-title{
    font-size: 16px;
    margin-top:2%;
    color: #32a9aa;
    .item{
        height: 30px;
        width: 100%;
        margin: 0 auto;
        text-align: center;
        line-height: 30px;
        overflow: hidden;
    }
}
.entrustment{
    margin-bottom:5%;
    font-size: 16px;
    height:500px;
    scrollbar-width: none;
    -ms-overflow-style: none;
    overflow-x: hidden;
    overflow-y: auto;
    ms-overflow-style: none;  /* IE 和 Edge */
    scrollbar-width: none;  /* Firefox */
    color: #c3c4c8;
    .item{
        line-height: 50px;
        width: 100%;
        margin: 0 auto;
        text-align: center;
        height:  50px;
        overflow: hidden;
        cursor: pointer;
        div{
            overflow: hidden;text-overflow: ellipsis;white-space: nowrap;

        }
    }
}
</style>