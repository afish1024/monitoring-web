<template>
	<div id="BasicLineChart"></div>
</template>
<script setup name="BasicLineChart">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
    const props = defineProps({
		cpuData:Array,
	})
	let data = ref([])
	let title = ref([])
    const toRefStrHtml = toRef(props, "cpuData")
    watch(toRefStrHtml, () => {
        getData(toRefStrHtml.value)
    })
    let getData= (datalist) => {
        data.value = []
        title.value = []
        for(let i = 0; i< datalist.length; i++) {
            title.value.push(datalist[i].date)
            data.value.push(datalist[i].value)
        }
	
        const option = {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis',
                formatter: '{a} {c}%',//a 是series中每条数据name值，c 是data数值
            },
            legend: {
                data: title.value,
                show:true,
                type:'plain',
                textStyle: {
                    fontSize: 12,
                    color: '#FFFFFF',
                },
                x:'center',
                y:'bottom',
                bottom:'0px'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '25%',
                containLabel: true
            },
        
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: title.value,
                axisLabel: {
                    show: true,
                    textStyle: {
                        color:'#FFFFFF'  //这里用参数代替了
                    }
                },
            },
            yAxis: {
                type: 'value',
                max:100,
                min:0,
                axisLabel: {
                        show: true,
                        textStyle: {
                        color:'#FFFFFF'  //这里用参数代替了
                    }
                },
                splitLine:{//去除网格线
                    show:false
                },
                axisTick:{
                    show:true,
                    color:'#FFFFFF',
                },
            },
            series: [
                {
                    name: 'cpu',
                    type: 'line',
                    stack: 'Total',
                    data:data.value
                },
            
            ]
            }

       
            let Echarts = echarts.init(document.getElementById('BasicLineChart'))

            // 绘制图表
            Echarts.setOption(option)
            // 自适应大小
            window.onresize = () => {
                Echarts.resize()
            }
        
    }
</script>

<style scoped></style>
