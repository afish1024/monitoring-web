<template>
	<div :id="props.nameid"></div>
</template>
<script setup name="flowPie">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
    const props = defineProps({
        nameid:{
            type:String,
            defalut:()=>'flowPie'
        },
        sendData:{
            type:Array,
            defalut:()=>[]
        },
        receiveData:{
            type:Array,
            defalut:()=>[]
        },
        timeData:{
            type:Array,
            defalut:()=>[]
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
        let Echarts = echarts.init(document.getElementById(props.nameid))
        var option = {
        tooltip: {
                trigger: 'axis'
            },
        xAxis: {
            type: 'category',
            data: props.timeData
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
                data: props.sendData,
                type: 'line',
                name: '发送',
            },
            {
                data: props.receiveData,
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