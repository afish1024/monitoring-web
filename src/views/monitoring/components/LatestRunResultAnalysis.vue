<template>
	<div id="LatestRunResultAnalysis"></div>
</template>

<script setup name="LatestRunResultAnalysis">
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
		const piePlot = new Pie('LatestRunResultAnalysis', {
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
			.monitorTaskLatestRunResultAnalysis()
			.then((res) => {
				const dest = {
					'(正常比例)normallyRate': '60.00%',
					'(从未运行个数)never': 0,
					'(异常比例)abnormallyRate': '40.00%',
					'(异常数量)abnormally': 2,
					'(从未运行比例)neverRate': '0.00%',
					totalCount: 5,
					'(正常数量)normally': 3
				}
				const response = {
					normallyRate: '60.00%',
					never: 0,
					abnormallyRate: '40.00%',
					abnormally: 2,
					neverRate: '0.00%',
					totalCount: 5,
					normally: 3
				}

				const data = [
					{
						title: `从未运行(${res.never || 0}个, ${res.neverRate})`,
						color: '#fac748',
						value: res.never
					},
					{
						title: `正常运行(${res.normally || 0}个, ${res.normallyRate})`,
						color: '#1890FF',
						value: res.normally
					},
					{
						title: `运行异常(${res.abnormally || 0}个, ${res.abnormallyRate})`,
						color: '#ea3445',
						value: res.abnormally
					}
				]

				renderPie(data)
			})
			.catch(() => {
				const data = [
					{ name: 'never', title: '从未运行', color: '#fac748', value: 0 },
					{ name: 'normally', title: '正常运行', color: '#1890FF', value: 0 },
					{ name: 'abnormally', title: '运行异常', color: '#ea3445', value: 0 }
				]
				renderPie(data)
			})
	})
</script>
