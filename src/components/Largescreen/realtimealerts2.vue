<template>
	<div id="flowPie2"></div>
</template>
<script setup name="flowPie2">
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
        let Echarts = echarts.init(document.getElementById('flowPie2'))
        var option = {
        xAxis: {
            type: 'category',
            data: ['10:48', '10:49', '10:50', '10:51', '10:52', '10:53', '10:54']
        },
        textStyle: {
            color: '#16cad3'
        },
        legend: {
            data: ['发送', '接收'],
            textStyle: {
                color: '#FFF'
            },
            left: "right" ,
        },
        yAxis: {
            type: 'value',
            splitLine:{
                show:true,
                lineStyle:{
                    type:'dashed',
                    color:'#211b45',
                }
            }

        },
        series: [
            {
                data: [150, 230, 224, 218, 11, 147, 260],
                type: 'line',
                name: '发送',
            },
            {
                data: [150, 88, 20, 10, 135, 147, 88],
                type: 'line',
                name: '接收',
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