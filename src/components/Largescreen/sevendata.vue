<template>
    <div id="sevendatadiv" ></div>
</template>


<script setup name="sevendata">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
	

	onMounted(() => {
		
		let Echarts = echarts.init(document.getElementById('sevendatadiv'))
		const option = {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['报警次数', '推送失败'],
                top:'left',
				textStyle: { //图例文字的样式
					color: '#fff',
					fontSize: 14
				}
            },
            grid: {
                left: '2%',
                right: '2%',
                bottom: '15%',
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
				axisLabel: {//x轴文字的配置
					show: true,
					textStyle: {
						color: "#fff",
					}
				}
            },
            yAxis: {
                type: 'value'
            },
           
            series: [
                {
                name: '报警次数',
                type: 'line',
                stack: 'Total',
                data: [100, 132, 101, 134, 90, 230, 210],
                itemStyle: {
                normal: {
                    label: {
                        show: true,
                        formatter: "{c}",
                        textStyle: {
                            color: '#FFF'
                        }
                    },
                    textColor : '#FFF'
    
                    },
                    emphasis: {
                        label: {
                            show: true
                        }
                    }
                }
                },
                {
                name: '推送失败',
                type: 'line',
                stack: 'Total',
                data: [100, 182, 191, 234, 290, 330, 310],
                itemStyle: {
                normal: {
                    label: {
                        show: true,
                        formatter: "{c}",
                        textStyle: {
                            color: '#FFF'
                        }
                    },
                    textColor : '#FFF'
    
                    },
                    emphasis: {
                        label: {
                            show: true
                        }
                    }
                }
                }
                
            
            ]
            }
		// 绘制图表
        Echarts.resize()
		Echarts.setOption(option)
	})
</script>

<style scoped></style>
