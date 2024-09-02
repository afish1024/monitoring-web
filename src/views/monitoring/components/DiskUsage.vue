<template>
	<div id="disk-usage"></div>
</template>
<script setup name="disk-usage">
	import { onMounted, ref } from 'vue'
	import * as echarts from 'echarts'
	import dayjs from 'dayjs'

	const props = defineProps({
		selectedKeys: {
			type: Array
		},
		usage: {
			type: String
		},
		rangeDate: {
			type: String
		}
	})
	const chart = ref()

	const getOptions = (data) => {
		const option = {
			toolbox: {
				show: false,
				feature: {
					dataZoom: {
						yAxisIndex: 'none'
					},
					dataView: { readOnly: false },
					magicType: { type: ['line', 'bar'] },
					restore: {},
					saveAsImage: {}
				}
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
			},
			yAxis: {
				type: 'value',
				axisLabel: {
					formatter: '{value}'
				}
			},
			series: [
				{
					name: 'Highest',
					type: 'line',
					data: [10, 11, 13, 11, 12, 12, 9],
					markPoint: {
						data: [
							{ type: 'max', name: 'Max' },
							{ type: 'min', name: 'Min' }
						]
					},
					markLine: {
						data: [{ type: 'average', name: 'Avg' }]
					}
				},
				{
					name: 'Lowest',
					type: 'line',
					data: [1, -2, 2, 5, 3, 2, 0],
					markPoint: {
						data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
					},
					markLine: {
						data: [
							{ type: 'average', name: 'Avg' },
							[
								{
									symbol: 'none',
									x: '90%',
									yAxis: 'max'
								},
								{
									symbol: 'circle',
									label: {
										position: 'start',
										formatter: 'Max'
									},
									type: 'max',
									name: '最高点'
								}
							]
						]
					}
				}
			]
		}

		option.xAxis.data = data.xAxisData
		option.series = data.series.map((item) => {
			return {
				name: item,
				type: 'line',
				data: [10, 11, 13, 11, 12, 12, 9],
				markPoint: {
					data: [
						{ type: 'max', name: 'Max' },
						{ type: 'min', name: 'Min' }
					]
				},
				markLine: {
					data: [{ type: 'average', name: 'Avg' }]
				}
			}
		})
		return option
	}

	// onMounted(() => {
	// 	let Echarts = echarts.init(document.getElementById('disk-usage'))

	// 	// 绘制图表
	// 	Echarts.setOption(getOptions())
	// 	// 自适应大小
	// 	window.onresize = () => {
	// 		Echarts.resize()
	// 	}
	// })
	const renderChart = (data) => {
		const dom = document.getElementById('disk-usage')

		if (!dom) {
			return
		}
		if (!chart.value) {
			chart.value = echarts.init(dom)
			chart.value.setOption(getOptions(data))

			window.onresize = () => {
				chart.value.resize()
			}
		} else {
			// const options = chart.value.getOption()
			// options.xAxis.data = data.xAxisData
			// options.series[0].data = data.seriesData
			const opt = getOptions(data)
			chart.value.setOption(opt)
		}
	}

	const getXarias = () => {
		const rangeStart = props.rangeDate[0]
		const rangeEnd = props.rangeDate[1]
		const start = props.rangeDate[0].format('YYYY-MM-DD HH:mm')
		const end = props.rangeDate[1].format('YYYY-MM-DD HH:mm')
		const hours = []

		const count = rangeEnd.diff(rangeStart, 'hour')

		for (let i = 1; i < count; i++) {
			const d = rangeStart.startOf('hour').add(i, 'hour')
			const t = d.format('YYYY-MM-DD HH:mm')
			hours.push(t)
		}
		return hours
	}
	const loadData = () => {
		renderChart({
			xAxisData: getXarias(),
			series: props.selectedKeys,
			usage: props.usage
		})
	}

	watch(() => props.selectedKeys, loadData, { immediate: true })
	watch(() => props.usage, loadData, { immediate: true })
	watch(() => props.rangeDate, loadData, { immediate: true })

	// onMounted(loadData)
	// watchEffect(loadData, [props.selectedKeys, props.usage, props.rangeDate])
	onBeforeUnmount(() => {
		window.onresize = null
	})
</script>
