<template>
	<div id="DoughnutChartWithRoundedCorner"></div>
</template>
<script setup name="responsetop">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
	const props = defineProps({
		longapisData:Array,
	})
	let data = []
	let series = []

	onMounted(() => {
		var res = []
		for(let i = 0; i< props.longapisData.length; i++) {
			var name = props.longapisData[i].name
			var appname = props.longapisData[i].appname
			data.push(name+'-'+appname)
			series.push(props.longapisData[i].responsetime ? props.longapisData[i].responsetime : 0)

			res.push({
				name: name+'-'+appname,
				value: props.longapisData[i].responsetime ? props.longapisData[i].responsetime : 0,
        	})
		}
		res.sort(function(a, b) {
			return b.value - a.value;
		}).slice(0, 6);

		res.sort(function(a, b) {
        	return a.value - b.value;
    	})

		for (let t = 0; t < res.length; t++) {
			data[t]= res[t].name
		
			series[t]= Number(res[t].value).toFixed(2)
    	}

		let Echarts = echarts.init(document.getElementById('DoughnutChartWithRoundedCorner'))
		const option  = {
			title: {
				text: ''
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			legend: {
				show:false
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: {
				type: 'value',
				boundaryGap: [0,1],
				axisLabel:{
      				formatter:'{value}秒',
       			}
			},
			color: ['#30d688'],
			yAxis: {
				type: 'category',
				data:data
			},
			series: [
				{
					name: '响应时间',
					type: 'bar',
					data:series,
					sort: 'descending'
				},
			]
		}
		// 绘制图表
		Echarts.setOption(option)
	})
</script>

<style scoped></style>
