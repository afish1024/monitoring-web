<template>
	<div id="equipmenttop5Pie"></div>
</template>
<script setup name="equipmenttop5Pie">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
    import flowApi from '@/api/biz/flowApi'
    const yData = ref([])
    const seriesData = ref([])
    const props = defineProps({
		searchFormState:Object,
	})
    let searchFormState = {
        lastTime:props.searchFormState.lastTime
    }
    

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


    let getData= () => {
        return flowApi.rateTop(searchFormState).then((data) => {
        
            yData.value = data.deviceIP
            seriesData.value = data.totalFlowRate
            chartTop();
   
		})
	}
    
    let chartTop = () => {
        let Echarts = echarts.init(document.getElementById('equipmenttop5Pie'))
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
                top:'2%',
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