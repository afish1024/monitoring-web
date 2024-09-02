<template>
	<div id="classifyPie"></div>
</template>
<script setup name="classifyPie">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
    import assetApi from '@/api/biz/assetApi'
    const chartData = ref([])
    const names = ref([])
    let getData= () => {
		return assetApi.categoryStatisticsTop().then((data) => {
            names.value = data.categoryName
            chartData.value = data.categoryCount
            chartTrend()
		})
	}

    let chartTrend = () => {
        let Echarts = echarts.init(document.getElementById('classifyPie'))
		const option = {
        color:['#249bfb'],
        xAxis: {
            type: 'category',
            data: names.value
        },
        yAxis: {
            type: 'value'
        },
        toolbox: {
            feature: {
            saveAsImage: {}
            }
        },
        series: [
            {
            data: chartData.value,
            name: '1',
                barWidth: 20, // y轴柱宽
                type: 'bar',
                stack: 'Ad',
                itemStyle: {
                    barBorderRadius: [50, 50, 0, 0]
                },
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
        getData();
	})


</script>
<style lang="less" scoped>
</style>