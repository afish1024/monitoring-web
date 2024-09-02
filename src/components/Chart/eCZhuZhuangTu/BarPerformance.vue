<template>
	<div :id="props.performanceid"></div>
</template>
<script setup name="BarPerformance">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
    const props = defineProps({
		barunit: {
			type: String,
			default: () => '个'
		},
        barDataY: {
			type: Array,
			default: () => [
                    '192.168.0.202', 
                    '192.168.0.203',
                    '192.168.0.204',
                    '192.168.0.205',
                    '192.168.0.206',
                    '192.168.0.207'
                ]
		},
		barDataX: {
			type: Array,
			default: () => [18, 20, 30, 40, 50, 60]
		},
        performanceid:{
            type: String,
			default: () => 'BarPerformance'
        },
        colorInfoY:{
            type: String,
			default: () => ''
        },
        colorInfoX:{
            type: String,
			default: () => ''
        },
        gridRight:{
            type: String,
			default: () => '4%'
        }
	})
	onMounted(() => {
		let Echarts = echarts.init(document.getElementById(props.performanceid))
		const option = {
			title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis',
                show:false,
                axisPointer: {
                type: 'shadow'
                }
            },
            legend: {},
            grid: {
                left: '3%',
                right: props.gridRight,
                bottom: '3%',
                top:'3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                show:false,
                boundaryGap: [0, 0.01],
            },
            yAxis: {
                type: 'category',
                data: props.barDataY,
                axisLine: {
                    show: false,    // 是否显示坐标轴轴线
                    interval: 0,
                    rotate: 30
                    
                },
                axisTick:{
                    show:false
                },
                axisLabel:{
					color:props.colorInfoY
				}
            },
            series: [
                {
                    type: 'bar',
                    data: props.barDataX,
                    barWidth:'20%',
                    // barMinHeight:10,
                    emphasis: {
                        focus: 'series'
                    },
                    itemStyle: {
                        borderRadius: [0,10,10,0],
                        color:props.colorInfoX
                    },
                
                    label: {
                            show: true, // 开启显示
                            position: 'right', // 在上方显示
                            distance: 15, // 距离图形元素的距离。当 position 为字符描述值（如 'top'、'insideRight'）时候有效
                            verticalAlign: 'middle',
                            textStyle: {
                            color: props.colorInfoX, // 顶部数据的颜色
                            fontSize: 12     // 顶部数据的字体大小
                        },
                        formatter: function (params) {
                            return (
                                props.barDataX[params.dataIndex] + props.barunit
                            )
                        }
                    }
                }
            ]
		}
		// 绘制图表
		Echarts.setOption(option)
		// 自适应大小
		window.onresize = () => {
			Echarts.resize()
		}
	})
</script>

<style scoped></style>
