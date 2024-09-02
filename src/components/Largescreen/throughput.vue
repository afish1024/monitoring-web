<template>
    <div id="throughputdiv"></div>
</template>

<script setup name="throughput">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
    const props = defineProps({
		dataX:{
            type:Array,
            default:()=>[]
        },
        dataY:{
            type:Array,
            default:()=>[]
        },
	})
	let option = {
        tooltip: {
                trigger: 'axis'
                
            },
        color:['#fe945e', '#fcc640'],
        xAxis: {
            type: 'category',
            axisLabel: {
                fontSize: 16,
                color:'#878797'
            },
            data: props.dataX
        },
        yAxis: {
            type: 'value',
            splitLine: {show: false},
            axisLine: { onZero: true },
        },
        series: [
            {
                data: props.dataY,
                type: 'bar',
                barWidth:'20%',
                itemStyle: {
                    borderRadius: [30,30,0,0],
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#4d59c4' },
                        { offset: 0.5, color: '#188df0' },
                        { offset: 1, color: '#83bff6' }
                    ])
                },
                
            },
            // {
            //     data: [10, 50, 150, 80, 70, 110, 130],
            //     type: 'bar',
            //     barWidth:'20%',
            //     itemStyle: {
            //         borderRadius: [30,30,0,0],
            //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //             { offset: 0, color: '#b11d56' },
            //             { offset: 0.5, color: '#e06896' },
            //             { offset: 1, color: '#d2a4b6' }
            //         ])
            //     }
            // }
        ]
    };

	onMounted(() => {
		let Echarts = echarts.init(document.getElementById('throughputdiv'))
		// 绘制图表
		Echarts.setOption(option)
		// 自适应大小
		window.onresize = () => {
			Echarts.resize()
		}
       
	})
</script>

<style scoped></style>
