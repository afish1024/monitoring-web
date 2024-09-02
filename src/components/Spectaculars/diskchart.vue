<template>
	<div id="BasicLineDiskChart"></div>
</template>
<script setup name="BasicLineDiskChart">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
    const props = defineProps({
	    diskData:Array,
        diskThreshold:Number,
	})
	let data = ref([])
	let legendData = ref([])
    let threshold = ref([])
    const toRefStrHtml = toRef(props, "diskData")
    watch(toRefStrHtml, () => {
        getData(toRefStrHtml.value)
    })
    let getData= (datalist) => {
        legendData.value = []
        var series = []
        var xAxis = []
        var title = []

        series.push({
            name: '预警阈值',
            type: 'line',
            showSymbol: false,
            type: 'line',
            data:threshold.value
        })
        title.push('预警阈值')


        for(var i in datalist) {
            if(i){
                data = []
                var dataitem = datalist[i].reverse()
                for(let r = 0; r< dataitem.length; r++) {
                    data.push(dataitem[r].value)
                    threshold.value.push(props.diskThreshold)
                    if(i =='C:' || i == '/'){
                        xAxis.push(dataitem[r].date)
                    }
                    title.push(i)
                }
                
                series.push({
                    name: i,
                    type: 'line',
                    showSymbol: false,
                    data: data 
                })
            }
        }
        var option = {
            color: ['#78e245','#3366CC', '#FFCC99','#d21fed','#ff9517',],
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
            legend: {
                orient: 'horizontal', // 'horizontal'
                data:title,
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
                type: 'value'
                }
            ],
            series:series
        }
        let Echarts = echarts.init(document.getElementById('BasicLineDiskChart'))

        // 绘制图表
        Echarts.setOption(option)
        // 自适应大小
        window.onresize = () => {
            Echarts.resize()
        }
    }
</script>

<style scoped></style>
