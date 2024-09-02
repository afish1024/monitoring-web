<template>
	<div id="level-analysis-of-7"></div>
</template>
<script setup name="level-analysis-of-7">
	import { onMounted } from 'vue'
	import homeApi from '@/api/monitoring/homeApi'
	import * as echarts from 'echarts'

	const zoomData = [
		// 有滚动条 平移
		{
			type: 'slider',
			realtime: true,
			start: 0,
			end: 50, // 初始展示40%
			height: 4,
			fillerColor: '#eee', // 滚动条颜色
			borderColor: '#eee',
			handleSize: 0, // 两边手柄尺寸
			showDetail: false, // 拖拽时是否展示滚动条两侧的文字
			top: '96%'

			// zoomLock:true, // 是否只平移不缩放
			// moveOnMouseMove:true, //鼠标移动能触发数据窗口平移
			// zoomOnMouseWheel :true, //鼠标移动能触发数据窗口缩放
		},
		{
			type: 'inside', // 支持内部鼠标滚动平移
			start: 0,
			end: 40,
			zoomOnMouseWheel: false, // 关闭滚轮缩放
			moveOnMouseWheel: true, // 开启滚轮平移
			moveOnMouseMove: true // 鼠标移动能触发数据窗口平移
		}
	]
	const levels = [
		{ name: 'secondary', title: '次要', color: '#fac748', value: 0 },
		{ name: 'primary', title: '主要', color: '#fd9560', value: 0 },
		{ name: 'serious', title: '严重', color: '#ea3445', value: 0 },
		{ name: 'unknown', title: '未知', color: '#8d79ec', value: 0 },
		{ name: 'disconnect', title: '掉线', color: '#9ea5b5', value: 0 }
	]

	// seriousCount: 0,
	// 				disconnectCount: 0,
	// 				primaryCount: 0,
	// 				unknownCount: 0,
	// 				occurrenceTime: '2024-01-05',
	// 				secondaryCount: 0
	const getOptions = (data) => {
		var series = [
			{
				data: data.secondaryCount,
				type: 'bar',
				stack: 'a',
				barWidth: '20%',
				itemStyle: {
					color: '#fac748'
				},
				// label: {
				//     show: true,
				//     formatter: (params) => params.value
				// },
				name: '次要'
			},
			{
				data: data.primaryCount,
				type: 'bar',
				stack: 'a',
				barWidth: '20%',
				itemStyle: {
					color: '#fd9560'
				},
				// label: {
				//     show: true,
				//     formatter: (params) => params.value
				// },
				name: '主要'
			},
			{
				data: data.seriousCount,
				type: 'bar',
				stack: 'a',
				barWidth: '20%',
				itemStyle: {
					color: '#ea3445'
				},
				// label: {
				//     show: true,
				//     formatter: (params) => params.value
				// },
				name: '严重'
			},
			{
				data: data.disconnectCount,
				type: 'bar',
				stack: 'a',
				barWidth: '20%',
				itemStyle: {
					color: '#9ea5b5'
				},
				name: '掉线'
			},
			{
				data: data.unknownCount,
				type: 'bar',
				stack: 'a',
				barWidth: '20%',
				itemStyle: {
					color: '#8d79ec'
				},
				// label: {
				//     show: true,
				//     formatter: (params) => params.value
				// },
				name: '未知'
			}
		]
		const stackInfo = {}
		for (let i = 0; i < series[0].data.length; ++i) {
			for (let j = 0; j < series.length; ++j) {
				const stackName = series[j].stack
				if (!stackName) {
					continue
				}
				if (!stackInfo[stackName]) {
					stackInfo[stackName] = {
						stackStart: [],
						stackEnd: []
					}
				}
				const info = stackInfo[stackName]
				const data = series[j].data[i]
				if (data && data !== '-') {
					if (info.stackStart[i] == null) {
						info.stackStart[i] = j
					}
					info.stackEnd[i] = j
				}
			}
		}
		for (let i = 0; i < series.length; ++i) {
			const data = series[i].data
			const info = stackInfo[series[i].stack]
			for (let j = 0; j < series[i].data.length; ++j) {
				// const isStart = info.stackStart[j] === i;
				const isEnd = info.stackEnd[j] === i
				const topBorder = isEnd ? 20 : 0
				const bottomBorder = 0
				data[j] = {
					value: data[j],
					itemStyle: {
						normal: {
							borderColor: '#fff',
							borderWidth: 2
						}
						//borderRadius: [topBorder, topBorder, bottomBorder, bottomBorder]
					}
				}
			}
		}

		const option = {
			dataZoom: zoomData,
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: levels.map((l) => l.title)
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: {
				type: 'category',
				data: data.occurrenceTime,
				axisLabel: {
					rotate: 35 //35度角倾斜显示
				}
			},
			yAxis: {
				type: 'value'
			},
			series: series
		}
		return option
	}
	onMounted(() => {
		homeApi.pastSevenDayAlarmLevelAnalysis().then((res) => {
			const data = res.reduce((acc, cur, curIndex) => {
				for (let key in cur) {
					acc[key] = acc[key] || []
					acc[key].push(cur[key])
				}
				return acc
			}, {})
			let Echarts = echarts.init(document.getElementById('level-analysis-of-7'))

			// 绘制图表
			Echarts.setOption(getOptions(data))
			// 自适应大小
			window.onresize = () => {
				Echarts.resize()
			}
		})
	})
</script>
