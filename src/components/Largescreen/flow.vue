<template>
	<div id="flowPie"></div>
</template>
<script setup name="flowPie">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
    import alerts from '@/api/alerts/alerts'
    const alarmCount = ref([])
    const deviceIP = ref([])
    let getData= () => {
		// return alerts.alertTop().then((data) => {
        //     alarmCount.value = data.alarmCount
        //     deviceIP.value = data.deviceIP
        //     chartTop();
		// })

        chartTop();
	}
    
    let chartTop = () => {
        let Echarts = echarts.init(document.getElementById('flowPie'))
		const option = {
            title: {
                text: '',
                show:false,
            },
            legend: {
				show:false,
			},
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                },
                min: 0,
            },
            yAxis: {
                axisLine: {
                    show: false   // 不显示 y 轴线
                },
                axisTick: {
                    show: false   // 隐藏坐标轴刻度
                },
                axisLabel: {
                    fontSize: 16,
                    color:'#FFF'
                },
                type: 'category',
                data: ['10.62.52.130','10.62.52.131','10.62.52.132','10.62.52.133','10.62.52.134']
            },
            series: [
                {
                name: '',
                type: 'bar',
                data:  [20,30,50,10,70],
                itemStyle: {
                    borderRadius: [0, 50, 50, 0],
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [
                        { offset: 0, color: '#e51b63' },
                        { offset: 1, color: '#340e1c' }
                    ])
                },
                barWidth: 15,
                label: {
                    show: true,
                    position: 'right',
                    formatter: '{c} '
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