<template>
	<div id="ipPie"></div>
</template>
<script setup name="influxratePie">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
    import flowApi from '@/api/biz/flowApi'
    const seriesData = ref([])
    let getData= () => {
        seriesData.value = [];
		return flowApi.outflowRate().then((data) => {

            if(data.outflowRate.length != 0){
                for(var i = 0;i < data.outflowRate.length; i++){
                    seriesData.value[i] = {
                        'value': data.outflowRate[i],
                        'name':data.portName[i]
                    }
                }
            }
            chartTop();
		})
      
	}
    
    let chartTop = () => {
        let Echarts = echarts.init(document.getElementById('ipPie'))
		const option = {
      
        series: [
            {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [50, 100],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
                borderRadius: 10
            },
            label: {
                show: true,
                color: '#FFF', // 设置文字颜色为红色
                formatter: '{b}\n{c} ({d}%)'
            },
            data:seriesData.value
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