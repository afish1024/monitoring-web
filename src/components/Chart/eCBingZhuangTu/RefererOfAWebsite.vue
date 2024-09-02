<template>
	<div id="RefererOfAWebsite"></div>
</template>
<!--ec官网：https://echarts.apache.org/zh/index.html-->

<script setup name="RefererOfAWebsite">
	import { onMounted,ref } from 'vue'
	import * as echarts from 'echarts'

	const props = defineProps({
		screenTestCommissionsStatusList:Array,
	})
	let data = ref([])
	for(let i = 0; i< props.screenTestCommissionsStatusList.length; i++) {
		data.value.push({
			value : props.screenTestCommissionsStatusList[i].applicant_status_count,
			name : props.screenTestCommissionsStatusList[i].applicant_status,
		})
	}
	onMounted(() => {
		let Echarts = echarts.init(document.getElementById('RefererOfAWebsite'))
		
		const option = {
			title: {
				text: '',
				subtext: '',
				left: 'center'
			},
			tooltip: {
				trigger: 'item'
			},
			legend: {
				
				bottom: '5%',
    			left: 'center',
				textStyle:{
					color: '#FFF'
				}
			},
			series: [
				{	
					center: ['50%', '40%'],
					name: 'Access From',
					type: 'pie',
					radius: '70%',
					data: toRaw(data.value),
					emphasis: {
						itemStyle: {
							borderRadius: 10,
							borderColor: '#fff',
							borderWidth: 2
						}
					}
				}
			]
		}
		// 绘制图表
		Echarts.setOption(option)
		// 自适应大小
		window.onresize = () => {
			Echarts.resize()
		}
	})
</script>

<style scoped></style>
