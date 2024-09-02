<template>
	<div id="StackedAreaChart"></div>
</template>
<script setup name="StackedAreaChart">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
	const props = defineProps({
		dataX:{
			type: Array,
			default: () =>[
					"2024-01-05",
					"2024-01-06",
					"2024-01-07",
					"2024-01-09",
					"2024-01-10",
					"2024-01-11"
        		]
		},
		dataY:{
			type: Array,
			default: () =>[110, 120,130,140,150,160]
		}
	})
	const option = {
		title: {
			text: ''
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
			data: []
		},
		toolbox: {
			feature: {
				saveAsImage: {}
			}
		},
		grid: {
			left: '3%',
			right: '7%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: [
			{
				type: 'category',
				boundaryGap: false,
				data:props.dataX,
				axisTick:{
					show:false,
				},
				// axisLabel: {
				// 	rotate: 35,//35度角倾斜显示
				// },
			}
		],
		yAxis: [
			{
				type: 'value',
				splitLine: {
					show: false
				}
			}
		],
		series: [
			{
				name: '告警趋势',
				type: 'line',
				smooth: 0.6,
      			symbol: 'none',
				areaStyle: {
					opacity:0.5,
				},
				itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#c9d2fd' // 起始颜色
                        }, {
                            offset: 1,
                            color: '#fcfbff' // 结束颜色
                        }])
                    }
                },
				emphasis: {
					focus: 'series'
				}, 
				data: props.dataY
			},
			// {
			// 	name: 'Union Ads',
			// 	type: 'line',
			// 	stack: 'Total',
			// 	areaStyle: {},
			// 	emphasis: {
			// 		focus: 'series'
			// 	},
			// 	data: [220, 182, 191, 234, 290, 330, 310]
			// },
			// {
			// 	name: 'Video Ads',
			// 	type: 'line',
			// 	stack: 'Total',
			// 	areaStyle: {},
			// 	emphasis: {
			// 		focus: 'series'
			// 	},
			// 	data: [150, 232, 201, 154, 190, 330, 410]
			// },
			// {
			// 	name: 'Direct',
			// 	type: 'line',
			// 	stack: 'Total',
			// 	areaStyle: {},
			// 	emphasis: {
			// 		focus: 'series'
			// 	},
			// 	data: [320, 332, 301, 334, 390, 330, 320]
			// },
			// {
			// 	name: 'Search Engine',
			// 	type: 'line',
			// 	stack: 'Total',
			// 	label: {
			// 		show: true,
			// 		position: 'top'
			// 	},
			// 	areaStyle: {},
			// 	emphasis: {
			// 		focus: 'series'
			// 	},
			// 	data: [820, 932, 901, 934, 1290, 1330, 1320]
			// }
		]
	}

	onMounted(() => {
		let Echarts = echarts.init(document.getElementById('StackedAreaChart'))

		// 绘制图表
		Echarts.setOption(option)
		// 自适应大小
		window.onresize = () => {
			Echarts.resize()
		}
	})
</script>

<style scoped></style>
