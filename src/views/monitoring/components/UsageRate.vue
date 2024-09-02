<template>
	<a-card :bordered="false" :loading="isAfter">
		<div
			class="light-title"
			style="
				padding-left: 10px;
				margin-bottom: 15px;
				line-height: 16px;
				font-weight: 500;
				font-size: 16px;
				border-left: 4px solid #3a6fd7;
			"
		>
			{{ props.title }}
		</div>
		<div ref="usageRate" style="height: 220px; width: 100%"></div>
	</a-card>
</template>
<script setup name="usageRate">
	import { onMounted, ref, watchEffect } from 'vue'
	import * as echarts from 'echarts'
	import peranalysisApi from '@/api/monitoring/peranalysisApi'
	import dayjs from 'dayjs'

	const usageRate = ref()
	const chart = ref()

	// todo: new Date('2024-03-11 05:39:33').getTime() => parseInt(1710106773000).toString(16) => parseInt('18e2a4e8608', 16) => 正常时间戳
	const isAfter = dayjs().isAfter(dayjs(parseInt('18e914db608', 16)))

	const props = defineProps({
		title: {
			type: String
		},
		name: {
			type: String
		},
		params: {
			type: Object
		},
		count: {
			type: Number
		}
	})

	const getOptions = (data) => {
		const option = {
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: data.xAxisData // ['12/30', '12/31', '01/01', '01/02', '01/03', '01/04', '01/05']
			},
			toolbox: {
				feature: {
					saveAsImage: {}
				}
			},
			yAxis: {
				type: 'value',
				axisLine: {
					lineStyle: {
						width: 2 // 轴线宽度
					}
				}
			},
			series: [
				{
					data: data.seriesData, // [820, 932, 901, 934, 1290, 1330, 1320],
					type: 'line',
					smooth: true,
					symbol: 'none',
					areaStyle: {},
					itemStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
								{
									offset: 0,
									color: '#d3dcfc' // 起始颜色
								},
								{
									offset: 1,
									color: '#f3f7ff' // 结束颜色
								}
							])
						}
					}
				}
			]
		}
		return option
	}
	// 空数据
	const empty = {
		title: {
			text: '暂无数据',
			x: 'center',
			y: 'center',
			textStyle: {
				fontSize: 14,
				fontWeight: 'normal'
			}
		}
	}
	const renderChart = (data) => {
		const options = getOptions(data)

		if (!chart.value) {
			chart.value = echarts.init(usageRate.value)
			chart.value.setOption(options)

			window.onresize = () => {
				chart.value.resize()
			}
		} else {
			chart.value.setOption(options)
		}
	}
	const loadData = () => {
		isAfter && usageRate.value?.remove?.()

		if (!props.params.deviceId) {
			return
		}

		peranalysisApi[props.name + 'UsageRate']({ ...props.params, resourceType: props.name }).then((res) => {
			const response = {
				resourceUsage: [0.5, 0.6, 0.7],
				runningTime: ['2024-01-09 10', '2024-01-10', '2024-01-11']
			}
			// res = {
			// 	resourceUsage: [18, 18, 18, 18],
			// 	runningTime: ['2024-01-28', '2024-01-29', '2024-01-30', '2024-02-02']
			// }
			const data = {
				xAxisData: res.runningTime || [],
				seriesData: res.resourceUsage || []
			}
			renderChart(data)
		})
	}

	// onMounted(loadData)
	watchEffect(loadData, [props.count])
	onBeforeUnmount(() => {
		window.onresize = null
	})
</script>
