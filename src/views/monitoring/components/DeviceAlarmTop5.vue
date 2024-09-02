<template>
	<div :id="props.performanceid"></div>
</template>
<script setup name="DeviceAlarmTop5">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
	import homeApi from '@/api/monitoring/homeApi'

	const props = defineProps({
		barunit: {
			type: String,
			default: () => '个'
		},
		bardata: {
			type: Array,
			default: () => []
		},
		performanceid: {
			type: String,
			default: () => 'DeviceAlarmTop5'
		}
	})

	const getOptions = (res) => {
		const data = res.alarmCount // [18, 20, 30, 40, 50, 60]

		const option = {
			title: {
				text: ''
			},
			tooltip: {
				trigger: 'axis',
				show: false,
				axisPointer: {
					type: 'shadow'
				}
			},
			legend: {},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				top: '3%',
				containLabel: true
			},
			xAxis: {
				type: 'value',
				show: false,
				boundaryGap: [0, 0.01]
			},
			yAxis: {
				type: 'category',
				data: res.deviceIP, // ['192.168.0.202', '192.168.0.203', '192.168.0.204', '192.168.0.205', '192.168.0.206', '192.168.0.207'],
				axisLine: {
					show: false, // 是否显示坐标轴轴线
					interval: 0,
					rotate: 30
				},
				axisTick: {
					show: false
				}
			},
			series: [
				{
					type: 'bar',
					data: data,
					barWidth: '30%',
					barMinHeight: 10,
					barMaxWidth: 20,
					emphasis: {
						focus: 'series'
					},
					itemStyle: {
						borderRadius: [0, 10, 10, 0]
					},

					label: {
						show: true, // 开启显示
						position: 'right', // 在上方显示
						distance: 15, // 距离图形元素的距离。当 position 为字符描述值（如 'top'、'insideRight'）时候有效
						verticalAlign: 'middle',
						textStyle: {
							color: '#424656', // 顶部数据的颜色
							fontSize: 12 // 顶部数据的字体大小
						},
						formatter: function (params) {
							return data[params.dataIndex] + props.barunit
						}
					}
				}
			]
		}
		return option
	}
	onMounted(() => {
		homeApi.pastSevenDayDeviceAlarmTop5().then((res) => {
			let Echarts = echarts.init(document.getElementById(props.performanceid))

			// 绘制图表
			Echarts.setOption(getOptions(res))
			// 自适应大小
			window.onresize = () => {
				Echarts.resize()
			}
		})
	})
</script>
