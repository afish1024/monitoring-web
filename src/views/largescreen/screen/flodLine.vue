<template>
	<div id="flodline" style="margin-left: 5px;"></div>
</template>
<script setup name="flodLineChart">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
    const option = {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            show:false
        },
        toolbox: {
            show: false,
            feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
                dataView: { readOnly: false },
                magicType: { type: ['line', 'bar'] },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['01', '02', '03', '04', '05', '06', '07','08'],
            axisLine: {
                lineStyle: {
                    color: "#fff",
                }
            }

        },
        yAxis: {
            type: 'value',
            splitLine: {
                show: false
            },
            axisLabel: {
                formatter: '{value}   '
            },
            axisLine: {
                lineStyle: {
                    color: "#fff",
                }
            }

        },
        series: [
            {
                name: '当天告警趋势',
                type: 'line',
                data: [10, 11, 13, 11, 12, 12, 9,8],
                lineStyle: {
                    color: '#ff6644'
                },
                itemStyle: {
                    borderWidth: 3,
                    borderColor: '#ff6644',
                    color: '#ff6644',
                    
                },
                markPoint: {
                    itemStyle: {
                        normal: {
                            label: {
                                textStyle: {
                                    color: '#FFFFFF'
                                }
                            }
                        }
                    },
                    data: [
                        { value: 10, xAxis: 0, yAxis: 10 },
                        { value: 11, xAxis: 1, yAxis: 11 },
                        { value: 13, xAxis: 2, yAxis: 13 },
                        { value: 11, xAxis: 3, yAxis: 11 },
                        { value: 12, xAxis: 4, yAxis: 12 },
                        { value: 12, xAxis: 5, yAxis: 12 },
                        { value: 9, xAxis: 6, yAxis: 9 },
                        { value: 8, xAxis: 7, yAxis: 8 }
                    ]
                }
            },
        ]
    };
    onMounted(() => {
		let Echarts = echarts.init(document.getElementById('flodline'))

		// 绘制图表
		Echarts.setOption(option)
		// 自适应大小
		window.onresize = () => {
			Echarts.resize()
		}
	})
</script>