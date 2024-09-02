<template>
	<div id="ipPie"></div>
</template>
<script setup name="ipPie">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
    import flowApi from '@/api/biz/flowApi'
    const props = defineProps({
		searchFormState:Object,
	})

    watch(props, (value, old) => {
        if(value.searchFormState.lastTime){
            searchFormState.lastTime = value.searchFormState.lastTime
        }
        if(value.searchFormState.startDate || value.searchFormState.endDate){
            searchFormState.startDate = value.searchFormState.startDate
            searchFormState.endDate = value.searchFormState.endDate
        }
        getData()
    })

    const yData = ref([])
    const seriesData = ref([])
    let searchFormState = {
        lastTime:props.searchFormState.lastTime
    }
    let getData= () => {
		return flowApi.ipTop(searchFormState).then((data) => {
            yData.value = data.deviceIP
            seriesData.value = data.totalFlow
            chartTop();
		})
	}
    
    let chartTop = () => {
        let Echarts = echarts.init(document.getElementById('ipPie'))
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
                top:'5%',
                left: '3%',
                right: '8%',
                bottom: '0%',
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
                data:  seriesData.value,
                itemStyle: {
                    borderRadius: [0, 0, 0, 0],
                    color: '#576af8'
                },
                barWidth: 15,
                barGap: '-80%', 
                barCategoryGap: '80%',
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