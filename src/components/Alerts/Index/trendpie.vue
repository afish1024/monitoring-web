<template>
	
	<div id="trendPie"></div>
       
</template>
<script setup name="CustomizedPiess">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
    import alerts from '@/api/alerts/alerts'
    const chartData = ref({})
    let getData= () => {
		return alerts.sevenDaysAlarmTrendAnalysis().then((data) => {
      
            chartData.value = data
     
            chartTrend();
		})
	}

    let chartTrend = () => {
        let Echarts = echarts.init(document.getElementById('trendPie'))
		const option = {
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data:chartData.value.occurrenceTime
        },
        toolbox: {
            feature: {
            saveAsImage: {}
            }
	    },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    width: 2 // 轴线宽度
                }
            }
        },
        series: [
            {
            data: chartData.value.alarmCount,
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: {},
            itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#d3dcfc' // 起始颜色
                        }, {
                            offset: 1,
                            color: '#f3f7ff' // 结束颜色
                        }])
                    }
                }
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