<template>
	<div id="HuanXingTu01"></div>
</template>

<script setup>
	import { onMounted } from 'vue'
	import { RingProgress} from '@antv/g2plot'

	onMounted(() => {
		const piePlot = new RingProgress('HuanXingTu01', {
			height: 140,
            width: 140,
            autoFit: false,
            percent: 0.6,
            appendPadding:[10,0,0,10],
            color: ['#989ebe', '#E8EDF3'],
            innerRadius: 0.85,
            radius: 0.98,
            statistic: {
                title: {
                    style: { color: '#fff', fontSize: '14px', lineHeight: '14px',marginTop:'10px'},
                    formatter: () => '异常',
                },
            },
		})

		piePlot.render()
	})
</script>

<style scoped></style>
