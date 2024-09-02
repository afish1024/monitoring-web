<template>
	<div id="todayalert"></div>
</template>
<script setup name="todayalert">
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
	let option = {
        tooltip: {
                trigger: 'axis'
                
            },
        xAxis: {
            splitLine: {show: false},
            axisLine: { 
                onZero: false,
                show:false  //隐藏x轴线
            },
            type: 'category',
            axisLabel: {
                fontSize: 16,
                color:'#FFF'
            },
            
            axisTick: {
                show: false
            },
            data: props.dataX
        },
        yAxis: {
            type: 'value',
            show:false,
            splitLine: {show: false},
            axisLine: { onZero: false },
        },
        series: [
            {
                data: props.dataY,
                type: 'bar',
                barWidth:'20%',
                itemStyle: {
                    barWidth:'20%',
                    normal: {
                        borderRadius: [30,30,0,0],
                        //柱体的颜色
                        //右，下，左，上（1，0，0，0）表示从正右开始向左渐变
                        color: function (params) {
                            console.log(params)
                            console.log(params);
                                    var colorList = [
                                        ['#00D273FF', '#00D27300'],
                                        ['#1AAF87FF', '#1AAF8700'],
                                        ['#00B1FFFF', '#00B1FF00'],
                                        ['#FFA900FF', '#FFA90000'],
                                        ['#fa897b', '#462521'],
                                        ['#86e3ce', '#27443e'],
                                        ['#fa897b', '#462521'],
                                    ];
 
                                    var colorItem = colorList[params.dataIndex];
                                    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: colorItem[0]
                                    },
                                    {
                                        offset: 1,
                                        color: colorItem[1]
                                    }
                                    ], false);
                        },
                    },
                }

                
            }
        ]
    };

	onMounted(() => {
		let Echarts = echarts.init(document.getElementById('todayalert'))
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