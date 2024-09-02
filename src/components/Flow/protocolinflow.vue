<template>
    <div id="protocolinflowPie" ></div>
</template>
<script setup name="protocolinflow">
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
        let Echarts = echarts.init(document.getElementById('protocolinflowPie'))
		
        const option = {
            color:'#00ceac',
            xAxis: {
                type: 'category',
                data: ['TCP', 'Tue', 'ICMP', 'Thu', 'IPV6-ICMP']
            },
            yAxis: {
                name: '单位/MB',
                type: 'value',
                axisTick: { // 坐标轴刻度相关配置
                    show: false  // 是否显示坐标轴刻度
                },
                axisLine: { // 坐标轴轴线相关配置
                    show: false // 是否显示坐标轴轴线
                },
                axisLabel: { // 坐标轴刻度标签相关配置
                    color: '#ffffff',
                    fontSize: 14
                },
                splitLine: { // 坐标轴在 grid 区域中的分隔线
                    show: false, //去掉Y轴分割线
                    lineStyle: { // 分割线配置
                        color: 'rgba(255,255,255,0.15)' // 分割线颜色
                    }
                },
            },
            series: [
                {
                    data: [120, 200, 150, 80, 70],
                    type: 'bar',
                    showBackground: true,
                    backgroundStyle: {
                        color: '#4b4762'
                    },
                    barWidth: 20,
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