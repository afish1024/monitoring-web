<template>
	<div id="BasicLineChart"></div>
</template>
<script setup name="BasicLineChart">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'

	const props = defineProps({
		screenInspectionReportDetailForDayList:Array,
	})
	let data = ref([])
	let title = ref([])
	for(let i = 0; i< props.screenInspectionReportDetailForDayList.length; i++) {
		title.value.push(props.screenInspectionReportDetailForDayList[i].create_time)
		data.value.push(props.screenInspectionReportDetailForDayList[i].create_time_count)
	}

	const option = {
		xAxis: {
			type: 'category',
			data: toRaw(title.value)
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				data: toRaw(data.value),
				type: 'line'
			}
		]
	}

	onMounted(() => {
		let Echarts = echarts.init(document.getElementById('BasicLineChart'))

		// 绘制图表
		Echarts.setOption(option)
		// 自适应大小
		window.onresize = () => {
			Echarts.resize()
		}
	})
</script>

<style scoped></style>
