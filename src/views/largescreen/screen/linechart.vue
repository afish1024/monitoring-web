<template>
	<div :id="props.chartId"></div>
</template>
<script setup name="StackedAreaChart">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
    const props = defineProps({
        chartId:{
            type:String,
            required:true
        },
		earlyinfo:{
			type:Object,
		},
		reporinfo:{
			type:Object,
		}
    })
	if (props.chartId == 'YJ'){
		var data_x = props.earlyinfo.X
		var data_Y = props.earlyinfo.Y
	}else{
		var data_x = props.reporinfo.X
		var data_Y = props.reporinfo.Y
	}
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
			show:false
		},
		// toolbox: {
		// 	feature: {
		// 		saveAsImage: {}
		// 	}
		// },
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		// xAxis: [
		// 	{
		// 		type: 'category',
		// 		boundaryGap: false,
		// 		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
		// 	}
		// ],
        xAxis: { 
            type: 'category',
            axisLine: {
                lineStyle: {
                    color: "#163a72",
                }
            },
            axisLabel: {
                color: "#8d9aad",
            },
            axisTick: {
                show: false,
            },
            data: data_x
        },
		yAxis: {
            type: 'value',
            splitLine: {
                show: true,
                lineStyle:{
                    color: "#1b283e",
                    type:'dashed' //设置网格线类型 dotted：虚线 solid:实线
                },
            },
            axisLabel: {
                formatter: '{value}   '
            },
            axisLine: {
                lineStyle: {
                    color: "#61aff1",
                }
            },
        },
		series: [
			{
				name: props.chartId == 'YJ'?'预警信息':'报警信息',
				type: 'line',
				stack: 'Total',
				areaStyle: {},
				emphasis: {
					focus: 'series'
				}, 
                itemStyle : {
                    normal : {
                        label : {
                            show: true,
                            position : 'top',
                            color:'#61aff1',
                        },
                        
                    }
                },
				data: data_Y ? data_Y :[120, 132, 101, 134, 90, 230, 210]
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
		let Echarts = echarts.init(document.getElementById(props.chartId))

		// 绘制图表
		Echarts.setOption(option)
		// 自适应大小
		window.onresize = () => {
			Echarts.resize()
		}
	})
</script>

<style scoped></style>
