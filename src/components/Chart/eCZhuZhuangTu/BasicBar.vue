<template>
	<div :id="props.nameid"></div>
</template>
<script setup name="BasicBar">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
	const props = defineProps({
		nameid:{
            type: String,
			default: () => 'BasicBar'
        },
		dataX:{
			type: Array,
			default: () => ['紧急', '高', '中', '低']
		},
		dataY:{
			type: Array,
			default: () => [120, 200, 150, 180]
		},
	})
	onMounted(() => {
		let Echarts = echarts.init(document.getElementById(props.nameid))
		const option = {
			xAxis: {
				type: 'category',
				data: props.dataX,
				axisTick:{
                    show:false
                },
			},
			tooltip: {
                trigger: 'axis',
                show:true,
                axisPointer: {
                	type: 'shadow'
                }
            },
			grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                top:'3%',
                containLabel: true
            },
			yAxis: {
				type: 'value'
			},
			series: [
				{
					data: props.dataY,
					barWidth:'30%',
					type: 'bar',
					// barMinHeight:10,
                    emphasis: {
                        focus: 'series'
                    },
					itemStyle: {
                        borderRadius: [10,10,0,0],
                    },
				}
			]
		}
		// 绘制图表
		Echarts.setOption(option)
		// 自适应大小
		window.onresize = () => {
			Echarts.resize()
		}
	})
</script>

<style scoped></style>
