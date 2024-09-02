<template>
	<div id="ripple4"></div>
</template>

<script setup>
	import { onMounted } from 'vue'
	import { Liquid } from '@antv/g2plot'

	onMounted(() => {
		const liquidPlot = new Liquid('ripple4', {
			percent: 0.85,
			outline: {
				border: 1,
			},
			wave: {
				length: 200
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
