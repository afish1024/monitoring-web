<template>
	<div id="YiBiaoTu02"></div>
</template>

<script setup>
	import { onMounted } from 'vue'
	import { Liquid } from '@antv/g2plot'

	onMounted(() => {
		const liquidPlot = new Liquid('YiBiaoTu02', {
			percent: 0.25,
			outline: {
				border: 4,
				distance: 0
			},
			wave: {
				length: 128
			},
			statistic: {
				content: {
					style: {
						fontSize: '30px',
						lineHeight: '30px',
						color:'#FFF',
					}
				},
			
			}
		})
		liquidPlot.render()
	})
</script>

<style scoped></style>
