<template>
	<div id="qosoutflowPie"></div>
</template>
<script setup name="qosoutflowPie">
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
        let Echarts = echarts.init(document.getElementById('qosoutflowPie'))
		const   option = {
        legend: {
            data: ['Allocated Budget', 'Actual Spending']
        },
        grid: {
            show:false,
            top:'50%',
            containLabel: true
        },
        radar: {
            center: ['50%', '50%'],
            // 外半径占据容器大小
            radius: '65%',
            // shape: 'circle',
            indicator: [
            { name: 'Sales', max: 6500 },
            { name: 'Administration', max: 16000 },
            { name: 'Information Technology', max: 30000 },
            { name: 'Customer Support', max: 38000 },
            { name: 'Development', max: 52000 },
            { name: 'Marketing', max: 25000 }
            ]
        },
        series: [
            {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
            ]
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