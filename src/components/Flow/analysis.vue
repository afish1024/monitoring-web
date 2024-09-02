<template>
	
	<div id="analysisPie"></div>
       
</template>


<script setup name="analysisPie">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
    import flowApi from '@/api/biz/flowApi'
    const chartData = ref({})
    const total = ref(0)
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
		return flowApi.analysis(searchFormState).then((data) => {
            
            chartData.value = data.list
            total.value = data.total
       
            chartTrend();
		})
	}

    let chartTrend = () => {
        let Echarts = echarts.init(document.getElementById('analysisPie'))
		const option = {
        // color:['#f39c72','#fe5e6a'],
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} '
        },
        legend: {
            orient: 'vertical',
            top: '60%',
            left: 'left'
        },
        series: [
            {
            name: '',
            type: 'pie',
            radius: ['60%', '50%'],
			center: ['50%', '30%'],
            avoidLabelOverlap: false,
            label: {
                position: 'center',
                show: true,
                formatter:() => {
                    let str = '总流量:'+total.value+'MB'
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
            data: chartData.value
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