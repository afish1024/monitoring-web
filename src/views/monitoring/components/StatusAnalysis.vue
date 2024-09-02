<template>
	<div id="status-analysis"></div>
</template>

<script setup name="status-analysis">
	import { onMounted } from 'vue'
	import { Pie, measureTextWidth } from '@antv/g2plot'
	import homeApi from '@/api/monitoring/homeApi'

	const data = [{ type: '未确认', value: 27 }]
	const status = [
		{ name: 'confirmedCount', title: '已确认', color: '#fbc640', value: 0 },
		{ name: 'totalCount', title: '总数', color: '#ff945d', value: 0 },
		{ name: 'unconfirmedCount', title: '未确认', color: '#9d9cbd', value: 0 }
	]

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
		const piePlot = new Pie('status-analysis', {
			appendPadding: 10,
			data,
			angleField: 'value',
			colorField: 'title',
			color: data.map((d) => d.color),
			radius: 1,
			innerRadius: 0.64,
			// meta: {
			// 	value: {
			// 		formatter: (v) => `${v} ¥`
			// 	}
			// },
			label: {
				visible: false,
				type: 'inner',
				formatter: (angleField, colorField) => {
					return ['', '']
				}
				// offset: '-50%',
				// style: {
				// 	textAlign: 'center'
				// },
				// autoRotate: false,
				// content: '{value}',
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
		homeApi
			.alarmConfirmationStatusAnalysis()
			.then((res) => {
				const data = status.map((l) => {
					return {
						...l,
						type: l.title,
						value: res[l.name]
					}
				})
				renderPie(data)
			})
			.catch(() => {
				renderPie(status)
			})
	})
</script>
