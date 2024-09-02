<template>
	<div id="businessgroup"></div>
</template>

<script setup name="businessgroup">
	import { onMounted,ref } from 'vue'
	import * as echarts from 'echarts'
	let data = ref([])
	var seriousness = 0

	var zeroColor = '#0d1e51'
	var seriousnessColor = ['#ff3b00']
	if(seriousness == 0){
		seriousnessColor = [zeroColor] 
	}

	
	const props = defineProps({
		warningRes:Array,
	})

	const toRefStrHtml = toRef(props, "warningRes")
    watch(toRefStrHtml, () => {
        getData(toRefStrHtml.value)
    })


	let getData= (data) => {
		let Echarts = echarts.init(document.getElementById('businessgroup'))
		
		var option = {
			tooltip: {
				trigger: 'item'
			},
			color:['#e80000','#32ff31'],
			legend: {
				show:true,
				type:'plain',
				left:'right',
				top:'middle',
				width:100,
				textStyle: {
					fontSize: 12,
					color: '#FFFFFF',
				},
				color:['#4472C5','#ED7C30','#80FF80'],
				left:'75%',
			},
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b}: {c}% '
			},
			series: [
				{
					name: '',
					type: 'pie',
					radius: ['70%', '60%'],
					center: ['45%', '50%'],
					avoidLabelOverlap: false,
					label: {
						formatter: '{c}%',
						show: true,
						position: 'center',
						fontSize: 20,
						color:'#FFFFFF',
						backgroundColor:'rgba(255,255,255,0)',
					
					},
					emphasis: {
						label: {
						show: true,
						fontSize: 40,
						fontWeight: 'bold'
						}
					},
					labelLine: {
						show: false
					},
					data: [
						{ value: data.percentError, name: '异常' },
						{ value: data.percentNormal, name: '正常' },
						
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

		Echarts.on('mouseover',function (params) {
			option.series[0].label.show = false
			Echarts.setOption(option, true, true);
		})

		Echarts.on('mouseout',function (params) {
			option.series[0].label.show = true
			Echarts.setOption(option, true, true);
		})

	}
</script>

<style scoped></style>
