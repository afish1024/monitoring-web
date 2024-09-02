<template>
    <div class="scrollbar dbdiv">
        <a-row justify="start" class="dbrow" v-for="item in data" :key="item.value">
            <a-col :span="16" :offset="1">
                {{ item.address }}
            </a-col>
            <a-col :span="3" >
               
                {{ item.statusName }}
            </a-col>
            <a-col :span="4" >
                {{ item.flow }}kb/s
            </a-col>
            
        </a-row>
    </div>    
</template>
<script setup name="network">
	import { onMounted,ref } from 'vue'
	const props = defineProps({
		networkData:Array,
	})
    let data = ref([])
    const toRefStrHtml = toRef(props, "networkData")
    watch(toRefStrHtml, () => {
        getData(toRefStrHtml.value)
    })
    let getData= (datalist) => {
        data.value = datalist
    }

</script>

<style lang="less" scoped>
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
        height: 200px;
        width: 100%;
        overflow-y: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
        overflow-x: hidden;
        .dbrow{
            height: 45px;
            line-height: 45px;
            overflow: hidden;
            color: #fff;
            border-left:2px solid #0e1434;
            border-right:2px solid #0e1434;
            &:last-child { border-bottom:2px solid #0e1434; }
            &:nth-child(even) {
                background-color: #111144;
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
        background-color: #26265c;
        -webkit-border-radius: 6px;
    }
    .scrollbar::-webkit-scrollbar-thumb:horizontal {
        width: 2px;
        background-color: #26265c;
        -webkit-border-radius: 6px;
    }
    //滚动条鼠标移上去的样式
    .scrollbar::-webkit-scrollbar-thumb:vertical:hover,::-webkit-scrollbar-thumb:horizontal:hover
    {
        background-color: #6a6a8c;
    }
    
    .cartogram-block{
        height: 200px !important;
        width:500px !important;
    }
}
</style>
