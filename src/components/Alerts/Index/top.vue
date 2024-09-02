<template>
	<div id="topPie"></div>
</template>
<script setup name="topPie">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
    import alerts from '@/api/alerts/alerts'
    const alarmCount = ref([])
    const deviceIP = ref([])
    let getData= () => {
		return alerts.alertTop().then((data) => {
            alarmCount.value = data.alarmCount
            deviceIP.value = data.deviceIP
            chartTop();
		})
	}
    
    let chartTop = () => {
        let Echarts = echarts.init(document.getElementById('topPie'))
		const option = {
            title: {
                text: '',
                show:false,
            },
            legend: {
				show:false,
			},
            toolbox: {
				feature: {
				saveAsImage: {}
				}
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
                type: 'category',
                data: deviceIP.value
            },
            series: [
                {
                name: '',
                type: 'bar',
                data:  alarmCount.value,
                itemStyle: {
                    borderRadius: [0, 50, 50, 0]
                },
                barWidth: 15,
                label: {
                    show: true,
                    position: 'right',
                    formatter: '{c} 个'
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