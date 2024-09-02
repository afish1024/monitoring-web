<template>
   
	<div id="BasicLineNetworkChart"></div>
</template>
<script setup name="BasicLineNetworkChart">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
    const props = defineProps({
		networkData:Array,
	})
	let receiveData = ref([])
    let sentData = ref([])
    let statusData = ref([])
	let title = ref([])
    const toRefStrHtml = toRef(props, "networkData")
    watch(toRefStrHtml, () => {
        getData(toRefStrHtml.value)
    })
    let getData= (datalist) => {
        receiveData.value = []
        sentData.value = []
        title.value = []
        statusData.value = []
        const xAxis = []
        var receivedResults = datalist.receivedResults.reverse()
        var sentResults = datalist.sentResults.reverse()
        var statusResults = datalist.statusResults.reverse()
        for(let i = 0; i< receivedResults.length; i++) {
            xAxis.push(receivedResults[i].date)
            receiveData.value.push(receivedResults[i].value)
        }

        for(let i = 0; i< sentResults.length; i++) {
            sentData.value.push(sentResults[i].value)
        }

        for(let i = 0; i< statusResults.length; i++) {
            statusData.value.push(statusResults[i].value)
        }

        var option = {
            title: {
                show: false,
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
                }
            },
            grid: {
                top:'3%',
                left: '3%',
                right: '4%',
                bottom: '20%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: xAxis
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    position: 'left',
                   
                },
                {
                    type: 'value',
                    name: '',
                    position: 'right',
                    min:0,
                    max:1,
                }
            ],
            legend: {
                orient: 'horizontal', // 'horizontal'
                data:['上行速率','下行速率','连通性'],
                textStyle: {  // 图列内容样式
                    color: '#333',  // 字体颜色
                },
                bottom:0,
                right:0,
                width:500,
                x:'center',
                y:'bottom',
                bottom:'0px'
            },
            series:[
                {
                    name:'下行速率',
                    data: receiveData.value,
                    type: 'line',
                    showSymbol: false,
                    areaStyle: {},
                    yAxisIndex:0,
                },
                {
                    name:'上行速率',
                    data: sentData.value,
                    showSymbol: false,
                    type: 'line',
                    yAxisIndex:0,
                },
                {
                    name:'连通性',
                    data: statusData.value,
                    showSymbol: false,
                    type: 'line',
                    yAxisIndex:1,
                }
            ]
        }

        let Echarts = echarts.init(document.getElementById('BasicLineNetworkChart'))

        // 绘制图表
        Echarts.setOption(option)
        // 自适应大小
        window.onresize = () => {
            Echarts.resize()
        }
        
    }
</script>

<style scoped></style>
