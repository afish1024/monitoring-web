<template>
	
	<div id="notarizePie"></div>
       
</template>
<script setup name="CustomizedPiess">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
    import alerts from '@/api/alerts/alerts'
	const emit = defineEmits(['customNotarize'])

	const chartData = ref({})
    let getData= () => {
		return alerts.confirmationStatusAnalysis().then((data) => {
            chartData.value = data
	
			emit('customNotarize', chartData.value);

            chartNotarize();
		})
	}

	let chartNotarize = () => {
		let Echarts = echarts.init(document.getElementById('notarizePie'))
		const option = {
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b}: {c} '
			},
			legend: {
				show:false,
			},
			toolbox: {
				feature: {
				saveAsImage: {}
				}
			},
			
			series: [
				{
					name: '',
					hoverAnimation:true,
					type: 'pie',
					radius: ['50%', '70%'],
					center: ['50%', '50%'],
					avoidLabelOverlap: false,
					label: {
						position: 'center',
						show: true,
						formatter:() => {
							let str = chartData.value.totalCount+'\n'+ `总数`
							return str
						},
						color: '#333',
						lineHeight: 14,
						fontSize: 14,
                    },
					emphasis: {
						show:false,
						label: {
							show: false,
							fontSize: 16,
							fontWeight: 'bold'
						}
					},
					labelLine: {
						show: false
					},
					data: [
						{ value:  chartData.value.confirmedCount, name: '已确认' },
						{ value:  chartData.value.unconfirmedCount, name: '未确认' },
						{ value:  chartData.value.totalCount, name: '总数' },
					]
				}
			]
			};
		// 绘制图表
		Echarts.setOption(option)
		// 自适应大小
		window.onresize = () => {
			Echarts.resize()
		}
	}

	onMounted(() => {
		getData()
	})
</script>
<style lang="less" scoped>
</style>