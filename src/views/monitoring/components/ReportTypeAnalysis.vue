<template>
	<div id="ReportTypeAnalysis"></div>
</template>

<script setup name="ReportTypeAnalysis">
	import { onMounted } from 'vue'
	import { Pie, measureTextWidth } from '@antv/g2plot'
	import homeApi from '@/api/monitoring/homeApi'

	const levels = [
		{ name: 'secondary', title: '次要', color: '#fac748', value: 0 },
		{ name: 'primary', title: '主要', color: '#fd9560', value: 0 },
		{ name: 'serious', title: '严重', color: '#ea3445', value: 0 },
		{ name: 'unknown', title: '未知', color: '#8d79ec', value: 0 },
		{ name: 'disconnect', title: '掉线', color: '#9ea5b5', value: 0 }
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
		const piePlot = new Pie('ReportTypeAnalysis', {
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
				offsetX: -50
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
		homeApi.reportTaskTypeAnalysis().then((res) => {
			const des = {
				'(日报比例)weekRate': '33.33%',
				'(日报个数)week': 1,
				'(月报个数)month': 1,
				'(月报比例)monthRate': '33.33%',
				'(日报比例)dayRate': '33.33%',
				'(总数)totalCount': 3,
				'(日报个数)day': 1
			}
			const response = {
				weekRate: '33.33%',
				week: 1,
				month: 1,
				monthRate: '33.33%',
				dayRate: '33.33%',
				totalCount: 3,
				day: 1
			}
			const data = [
				{
					title: `日报表(${res.day || 0}个, ${res.dayRate || '0%'})`,
					color: '#1890FF',
					value: res.day || 0
				},
				{
					title: `周报表(${res.week || 0}个, ${res.weekRate || '0%'})`,
					color: '#fac748',
					value: res.week || 0
				},
				{
					title: `月报表(${res.month || 0}个, ${res.monthRate || '0%'})`,
					color: '#ea3445',
					value: res.month || 0
				}
			]
			renderPie(data)
		})
	})
</script>
