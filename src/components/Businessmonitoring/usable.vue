<template>
	<div id="RefererOfAWebsite1"></div>
</template>

<script setup name="RefererOfAWebsite1">
	import { onMounted,ref } from 'vue'
	import * as echarts from 'echarts'

	let data = ref([])
	const props = defineProps({
		usableRes:Array,
	})
	const toRefStrHtml = toRef(props, "usableRes")
    watch(toRefStrHtml, () => {
        getData(toRefStrHtml.value)
    })
	let getData= (data) => {
		let Echarts = echarts.init(document.getElementById('RefererOfAWebsite1'))
		const option = {
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b}: {c} %'
			},
			legend: {
				show:false,
				x: 'right',
				y:'center',
				orient: 'orient',
				textStyle: {
					fontSize: 12,
					color: '#FFFFFF',
				},
				itemWidth:10,
			},
			series: [
				{
					center: ['45%', '50%'],
					name: '',
					type: 'pie',
					selectedMode: 'single',
					radius: [0, '58%'],
					label: {
						position: 'center',
						fontSize: 30,
						color:'#FFFFFF',
						formatter: ' {c}%',
						
					},
					labelLine: {
						show: false
					},
					color:['#1199ee'],
					data: [
						{ value: data.value, name: '可用性' },
					]
				},
				{
					center: ['45%', '50%'],
					name: '',
					type: 'pie',
					radius: ['65%', '70%'],
					labelLine: {
						length: 10,
					},
					color:['#79d0f5'],
					label: {
						show:false,
					},
					data: [
						{ value:data.value, name: '可用性' },
					]
				}
			]
			}
		// 绘制图表
		Echarts.setOption(option)
		// 自适应大小
		window.onresize = () => {
			Echarts.resize()
		}
	}
</script>

<style scoped></style>
