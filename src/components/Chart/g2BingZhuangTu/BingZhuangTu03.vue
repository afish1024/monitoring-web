<template>
	<div id="BingZhuangTu03"></div>
</template>

<script setup>
	import { onMounted } from 'vue'
	import { Pie } from '@antv/g2plot'

	const data = [
		{ type: '分类一', value: 27 },
		{ type: '分类二', value: 25 },
		{ type: '分类三', value: 18 },
		{ type: '分类四', value: 15 },
		{ type: '分类五1', value: 10 },
		{ type: '分类五2', value: 10 },
		{ type: '分类五3', value: 10 },
		{ type: '分类五4', value: 10 },
		{ type: '分类五5', value: 10 },
		{ type: '分类五6', value: 10 },
		{ type: '分类五7', value: 10 },
		{ type: '其他', value: 5 }
	]

	onMounted(() => {
		const piePlot = new Pie('BingZhuangTu03', {
			appendPadding: 10,
			data,
			angleField: 'value',
			colorField: 'type',
			radius: 1,
			innerRadius: 0.6,
			label: {
				type: 'inner',
				offset: '-50%',
				content: '{value}',
				style: {
					textAlign: 'center',
					fontSize: 14
				}
			},
			interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
			statistic: {
				title: false,
				content: {
					style: {
						whiteSpace: 'pre-wrap',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						fontSize: '18px'
					},
					content: '108\n总数'
				}
			}
		})

		piePlot.render()
	})
</script>

<style scoped></style>
