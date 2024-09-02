<template>
	<div id="RunStatusAnalysis"></div>
</template>

<script setup name="RunStatusAnalysis">
	import { onMounted } from 'vue'
	import { Pie, measureTextWidth } from '@antv/g2plot'
	import homeApi from '@/api/monitoring/homeApi'

	const renderStatistic = (containerWidth, text, style) => {
		const { width: textWidth, height: textHeight } = measureTextWidth(text, style)
		const R = containerWidth / 2
		// r^2 = (w / 2)^2 + (h - offsetY)^2
		let scale = 1
		if (containerWidth < textWidth) {
			scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1)
		}
		const textStyleStr = `width:${containerWidth}px;`
		return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`
	}

	const renderPie = (data) => {
		const piePlot = new Pie('RunStatusAnalysis', {
			appendPadding: 10,
			data,
			angleField: 'value',
			colorField: 'title',
			color: data.map((d) => d.color),
			radius: 0.8,
			innerRadius: 0.64,
			// meta: {
			// 	value: {
			// 		formatter: (v) => `${v} ¥`
			// 	}
			// },
			legend: {
				visible: true,
				position: 'right-top',
				offsetX: -70
			},
			label: {
				visible: false,
				type: 'inner',
				formatter: (angleField, colorField) => {
					return ['', '']
				},
				offset: '-50%'
				// style: {
				// 	textAlign: 'center'
				// },
				// autoRotate: false,
				// content: '{value}'
			},
			statistic: {
				title: {
					offsetY: -4,
					style: {
						fontSize: '32px',
						fontWeight: 'bold'
					},
					customHtml: (container, view, datum) => {
						const { width, height } = container.getBoundingClientRect()
						const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2))
						const text = datum ? ` ${datum.value}` : ` ${data.reduce((r, d) => r + d.value, 0)}`
						return renderStatistic(width, text, { fontSize: 32, fontWeight: 'bold' })
					}
				},
				content: {
					offsetY: 4,
					style: {
						fontWeight: 'normal',
						fontSize: '14px'
					},
					customHtml: (container, view, datum, data) => {
						const { width } = container.getBoundingClientRect()

						const text = datum ? ` ${datum.value}` : ` ${data.reduce((r, d) => r + d.value, 0)}`
						return renderStatistic(width, '总数', { fontSize: 14 })
					}
				}
			},
			// 添加 中心统计文本 交互
			interactions: [{ type: 'element-selected' }, { type: 'element-active' }, { type: 'pie-statistic-active' }]
		})

		piePlot.render()
	}

	onMounted(() => {
		homeApi.monitorTaskRunStatusAnalysis().then((res) => {
			const des = {
				'(运行个数)running': 1,
				'(暂停个数)paused': 1,
				'(异常比例)abnormalRate': '33.33%',
				'(运行个数)runningRate': '33.33%',
				'(暂停个数)pausedRate': '33.33%',
				'(异常个数)abnormal ': 1,
				totalCount: 3
			}
			const response = {
				running: 2,
				paused: 1,
				abnormal: 1,
				runningRate: '50.00%',
				pausedRate: '25.00%',
				abnormalRate: '25.00%',
				totalCount: 4
			}
			const data = [
				{
					title: `正在运行(${res.running || 0}个, ${res.runningRate || 0})`,
					color: '#1890FF',
					value: res.running || 0
				},
				{
					title: `暂停运行(${res.paused || 0}个, ${res.pausedRate || 0})`,
					color: '#fac748',
					value: res.paused || 0
				},
				{
					title: `运行异常(${res.abnormal || 0}个, ${res.abnormalRate || 0})`,
					color: '#ea3445',
					value: res.abnormal || 0
				}
			]
			renderPie(data)
		})
	})
</script>
