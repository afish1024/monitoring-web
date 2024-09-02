<template>
	<div :id="props.nameid"></div>
</template>

<script setup>
	import { onMounted } from 'vue'
	import { Pie, measureTextWidth } from '@antv/g2plot'
	const props = defineProps({
		datalist:{
			type: Array,
			default: () =>[
				{ type: '设备一', value: 27 },
				{ type: '设备二', value: 25 },
				{ type: '设备三', value: 18 },
				{ type: '设备四', value: 15 },
				{ type: '设备五1', value: 10 },
				{ type: '设备五2', value: 10 },
				{ type: '设备五3', value: 10 },
				{ type: '设备五4', value: 10 },
				{ type: '设备五5', value: 10 },
				{ type: '设备五6', value: 10 },
				{ type: '设备五7', value: 10 },
				{ type: '其他', value: 5 }
			]
		},
		innerRadius:{
			type:String,
			default: () =>0.64
		},
		colorList:{
			type: Array,
			default: () =>['#5140b4', '#2d5e0a', '#ff7d18']
		},
		contentcolor:{
			type: Array,
			default: () =>''
		},
		pieStyle:{
			type: Array,
			default: () =>'#fff'
		},
		legend:{
			type: Array,
			default: () =>{
				
			}
		},
		nameid:{
			type:String ,
			default: () =>'BingZhuangTu07'
		}
	})
	const renderStatistic = (containerWidth, text, style) => {
		const { width: textWidth, height: textHeight } = measureTextWidth(text, style)
		const R = containerWidth / 2
		// r^2 = (w / 2)^2 + (h - offsetY)^2
		let scale = 0.7
		if (containerWidth < textWidth) {
			scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1)
		}
		const textStyleStr = `width:${containerWidth}px;`
		return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`
	}

	onMounted(() => {
		var data = props.datalist
		// var color = props.colorList
		const piePlot = new Pie(props.nameid, {
			appendPadding: 10,
			data,
			angleField: 'value',
			colorField: 'type',
			color: props.colorList,
			radius: 1,
			innerRadius: props.innerRadius,
			meta: {
				value: {
					formatter: (v) => `${v} ¥`
				}
			},
			label: {
				type: 'inner',
				offset: '-50%',
				style: {
					textAlign: 'center',
					
				},
				autoRotate: false,
				content: '{value}'
			},
			pieStyle:{
				stroke: props.pieStyle,
			},
			legend:props.legend,
			statistic: {
				title: {
					offsetY: -4,
					customHtml: (container, view, datum) => {
						const { width, height } = container.getBoundingClientRect()
						const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2))
						const text = datum ? datum.type : '总数'
						return renderStatistic(d, text, { fontSize: 28 })
					},
				},
				content: {
					offsetY: 4,
					style: {
						fontSize: '18px',
						color:props.contentcolor
					},
					customHtml: (container, view, datum, data) => {
						const { width } = container.getBoundingClientRect()

						const text = datum ? ` ${datum.value}` : ` ${data.reduce((r, d) => r + d.value, 0)}`
						return renderStatistic(width, text, { fontSize: 22 })
					}
				}
			},
			// 添加 中心统计文本 交互
			interactions: [{ type: 'element-selected' }, { type: 'element-active' }, { type: 'pie-statistic-active' }]
		})

		piePlot.render()
	})
</script>

<style scoped></style>
