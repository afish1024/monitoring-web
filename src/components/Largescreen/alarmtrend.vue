<template>
	<div id="alarmtrend"></div>
</template>
<script setup name="alarmtrend">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
    const props = defineProps({
        dataX:{
            type:Array,
            default:()=>[]
        },
        dataY:{
            type:Array,
            default:()=>[]
        }
    })
	let  option = {
        tooltip: {
                trigger: 'axis'
                
            },
        textStyle: {
            color: '#48a1a8'
        },
        color:['#48a1a8'], 
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: props.dataX,
            axisLabel: {
                fontSize: 16,
                color:'#FFF'
            },
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
            data: props.dataY,
            type: 'line',
            smooth: true,
            showSymbol: false,
            lineStyle: {   // 设置线条样式
                width: 3   // 设置线条宽度为2像素
            },
             areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#1f5f6a'
                  },
                  {
                    offset: 1,
                    color: '#100b2b'
                  }
                ])
              },
            }
        ]
    };

	onMounted(() => {
		let Echarts = echarts.init(document.getElementById('alarmtrend'))
		// 绘制图表
		Echarts.setOption(option)
		// 自适应大小
		window.onresize = () => {
			Echarts.resize()
		}
       
	})
</script>
<style lang="less" scoped>
</style>