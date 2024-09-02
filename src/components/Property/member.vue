<template>
	<div id="memberPie"></div>
</template>
<script setup name="memberPie">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
    import assetApi from '@/api/biz/assetApi'
    const seriesData = ref([])
    const yData = ref([])
    let getData= () => {
		return assetApi.member().then((data) => {
 
            seriesData.value = data.assetCount
            yData.value = data.responsibleUserName
            chartTop();
		})

        chartTop();
	}
    
    let chartTop = () => {
        let Echarts = echarts.init(document.getElementById('memberPie'))
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
                bottom: '10%',
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
                    color:'#333'
                },
                type: 'category',
                data: yData.value
            },
            series: [
                {
                name: '',
                type: 'bar',
                data: seriesData.value,
                itemStyle: {
                    borderRadius: [0, 50, 50, 0],
                  
                },
                barWidth: 15,
                label: {
                    show: true,
                    position: 'right',
                    formatter: '{c}个 ',
                    textStyle: {
                        color: '#333', // 顶部数据的颜色
                        fontSize: 12     // 顶部数据的字体大小
                    },
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