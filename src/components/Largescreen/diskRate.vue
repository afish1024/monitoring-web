<template>
	<div id="diskPie"></div>
</template>
<script setup name="diskPie">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
    import alerts from '@/api/alerts/alerts'
    const props = defineProps({
        dataY:{
            type:Array,
            default:()=>[]
        },
        dataX:{
            type:Array,
            default:()=> []
        }
    })
    let getData= () => {
		// return alerts.alertTop().then((data) => {
        //     alarmCount.value = data.alarmCount
        //     deviceIP.value = data.deviceIP
        //     chartTop();
		// })

        chartTop();
	}
    
    let chartTop = () => {
        let Echarts = echarts.init(document.getElementById('diskPie'))
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
                data: props.dataX
            },
            series: [
                {
                name: '',
                type: 'bar',
                data:  props.dataY,
                itemStyle: {
                    borderRadius: [0, 50, 50, 0],
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [
                        { offset: 0, color: '#5569f8' },
                        { offset: 0.5, color: '#373f90' },
                        { offset: 1, color: '#100b2b' }
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