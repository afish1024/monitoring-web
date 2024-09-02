<template>
	<div id="WeekFault"></div>
</template>
<script setup name="WeekFault">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
	const props = defineProps({
		dataX:{
			type: Array,
			default: () => []
		},
		dataY:{
			type: Array,
			default: () => []
		},
	})
	watch(props, (value, old) => {
		var option = {
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
					left: '3%',
					right: '4%',
					bottom: '0%',
					top:'5%',
					containLabel: true
				},
			xAxis: {
				type: 'category',
				data: props.dataX,
				axisTick:{
					show:false,
				},
				axisLabel: {
					// rotate: 35,//35度角倾斜显示
					color:'#fff'
				},
			},
			yAxis: {
				type: 'value',
				splitLine: {
					show: false
				},
				axisLabel: {
					// rotate: 35,//35度角倾斜显示
					color:'#fff'
				},
			},
			series: [
				{
					data: props.dataY,
					barWidth:'20%',
					type: 'bar',
					name: '故障数',
					itemStyle: {
						borderRadius: [5, 5, 5, 5],
						color:'#fd9560'
					},
				}
			]
		}
		let Echarts = echarts.init(document.getElementById('WeekFault'))
		// 绘制图表
		Echarts.setOption(option)
		// 自适应大小
		window.onresize = () => {
			Echarts.resize()
		}
  	})
	
	// var series = [
	// {
	// 	data: [120, 200, 150, 80, 70, 110, 130],
	// 	barWidth:'20%',
	// 	type: 'bar',
	// 	stack: 'a',
	// 	name: '次要',
	// 	itemStyle: {
	// 			color:'#fd9560'
	// 		},
	// },
	// {
	// 	data: [10, 46, 64, 6, 0, 8, 3],
	// 	barWidth:'20%',
	// 	type: 'bar',
	// 	stack: 'a',
	// 	name: '严重',
	// 	itemStyle: {
	// 			color:'#ea3445'
	// 		},
	// },
	// {
	// 	data: [30, 8, 0, 20, 10, 6, 0],
	// 	barWidth:'20%',
	// 	type: 'bar',
	// 	stack: 'a',
	// 	name: '主要',
	// 	itemStyle: {
	// 			color:'#fac748'
	// 		},
			
	// }
	// ];
	// const stackInfo = {};
	// for (let i = 0; i < series[0].data.length; ++i) {
	// for (let j = 0; j < series.length; ++j) {
	// 	const stackName = series[j].stack;
	// 	if (!stackName) {
	// 	continue;
	// 	}
	// 	if (!stackInfo[stackName]) {
	// 	stackInfo[stackName] = {
	// 		stackStart: [],
	// 		stackEnd: []
	// 	};
	// 	}
	// 	const info = stackInfo[stackName];
	// 	const data = series[j].data[i];
	// 	if (data && data !== '-') {
	// 	if (info.stackStart[i] == null) {
	// 		info.stackStart[i] = j;
	// 	}
	// 	info.stackEnd[i] = j;
	// 	}
	// }
	// }
	// for (let i = 0; i < series.length; ++i) {
	// const data = series[i].data;
	// const info = stackInfo[series[i].stack];
	// for (let j = 0; j < series[i].data.length; ++j) {
	// 	// const isStart = info.stackStart[j] === i;
	// 	const isEnd = info.stackEnd[j] === i;
	// 	const topBorder = 5;
	// 	const bottomBorder = 5;
	// 	data[j] = {
	// 	value: data[j],
	// 	itemStyle: {
	// 		borderRadius: [topBorder, topBorder, bottomBorder, bottomBorder]
	// 	}
	// 	};
	// }
	// }
	
	onMounted(() => {
		
	})
</script>

<style scoped></style>
