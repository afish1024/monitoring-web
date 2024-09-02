<template>
	<div id="trend-analysis"></div>
</template>
<script setup name="trend-analysis">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
	import homeApi from '@/api/monitoring/homeApi'

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
	const getOption = (data) => {
		return {
			tooltip: {
				trigger: 'axis'
			},
			dataZoom: zoomData,
			xAxis: {
				type: 'category',
				data: data.xAxisData,

				axisLabel: {
					rotate: 35 //35度角倾斜显示
				},
				axisTick: {
					show: false
				}
			},
			yAxis: {
				name: '单位/个',
				type: 'value'
			},
			series: [
				{
					data: data.seriesData,
					barWidth: '20%',
					type: 'line'
				}
			]
		}
	}

	onMounted(() => {
		homeApi.pastSevenDayAlarmTrendsAnalysis().then((res) => {
			const data = {
				xAxisData: res.occurrenceTime,
				seriesData: res.alarmCount
			}
			let Echarts = echarts.init(document.getElementById('trend-analysis'))

			// 绘制图表
			Echarts.setOption(getOption(data))
			// 自适应大小
			window.onresize = () => {
				Echarts.resize()
			}
		})
	})
</script>
