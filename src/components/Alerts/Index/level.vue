<template>
	
	<div id="levelPie"></div>
       
</template>
<script setup name="levelPie">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'

    import alerts from '@/api/alerts/alerts'
    const chartData = ref({})
    let getData= () => {
		return alerts.sevenDaysAlarmLevelAnalysis().then((data) => {
            chartData.value = data
            chartTrend();
		})
	}
    onMounted(() => {
        getData();
	})
    let chartTrend = () => {
        let Echarts = echarts.init(document.getElementById('levelPie'))
        let xAxisData = [];
        let data1 = [];
        let data2 = [];
        let data3 = [];
        let data4 = [];
        let data5 = [];
        for (let i = 0; i < chartData.value.length; i++) {
            xAxisData.push(chartData.value[i].occurrenceTime);
            data1.push(chartData.value[i].disconnectCount); // 掉线
            data2.push(chartData.value[i].seriousCount); // 严重
            data3.push(chartData.value[i].primaryCount); // 主要
            data4.push(chartData.value[i].secondaryCount); // 次要
            data5.push(chartData.value[i].unknownCount); // 未知
        }
        var emphasisStyle = {
        itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0,0,0,0.3)'
        }
        };
        var option = {
        legend: {
            data: ['掉线', '严重', '主要', '次要','未知'],
            center: '0%'
        },
        
        toolbox: {
        },
        tooltip: {},
        xAxis: {
          
            data: xAxisData,
            name: '',
            axisLine: { onZero: true },
            splitLine: { show: false },
            splitArea: { show: false }
        },
        yAxis: {
            splitLine: {show: false},
            axisLine: { onZero: true },
        },
        grid: {
            bottom: 30
        },
        series: [
            
            {
            name: '掉线',
            type: 'bar',
            stack: 'one',
            emphasis: emphasisStyle,
            data: data1,
            barWidth: 20,
            itemStyle: {
                normal: {
                    borderColor:'#fff',
                    borderWidth: 2
                }
            },
            },
            {
            name: '严重',
            type: 'bar',
            stack: 'one',
            emphasis: emphasisStyle,
            data: data2,
            itemStyle: {
                normal: {
                    borderColor:'#fff',
                    borderWidth: 2
                }
            },
            },
            {
            name: '主要',
            type: 'bar',
            stack: 'one',
            emphasis: emphasisStyle,
            data: data3,
            itemStyle: {
                normal: {
                    borderColor:'#fff',
                    borderWidth: 2
                }
            },
            },
            {
            name: '次要',
            type: 'bar',
            stack: 'one',
            emphasis: emphasisStyle,
            data: data4,
            itemStyle: {
                normal: {
                    borderColor:'#fff',
                    borderWidth: 2
                }
            },
            },
            {
            name: '未知',
            type: 'bar',
            stack: 'one',
            emphasis: emphasisStyle,
            data: data5,
            itemStyle: {
                normal: {
                    borderColor:'#fff',
                    borderWidth: 2
                }
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

</script>
<style lang="less" scoped>
</style>