<template>
	<div id="newalertanalysis"></div>
</template>
<script setup name="newalertanalysis">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
	let  option = {
                color: ['#2e3b4e', '#2e7bad', '#1dc499', '#4da7c1', '#65b5c2', "rgba(250,250,250,0.3)"],
                grid: {
                    left: 0,
                    // right: 0,
                    bottom: 0,
                    top:0,
                    containLabel: true
                },
                
                series: [
                    // 主要展示层的
                    {
                        radius: ['60%', '70%'],
                        center: ['50%', '50%'],
                        type: 'pie',
                        label: {
                            show: false,
                           
                        },
                        labelLine: {
                            normal: {
                                show: true,
                                length: 20,
                                length2: 35
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data: [10],
                    }, {
                        name: '外边框',
                        type: 'pie',
                        clockWise: false, //顺时加载
                        hoverAnimation: false, //鼠标移入变大
                        center: ['50%', '50%'],
                        radius: ['88%', '90%'],
                        label: {
                            position: 'center',
                            show: true,
                            formatter:() => {
                                let str = '0%'+'\n'+ `已确认`
                                return str
                            },
                            color: '#06c6c4',
                            lineHeight: 16,
                            fontSize: 16,
                        },
                        data: [{
                            value: 9,
                            name: '',
                            itemStyle: {
                                normal: {
                                    borderWidth: 2,
                                    borderColor: '#2f4756'
                                }
                            }
                        }]
                    },
                ]
       };

	onMounted(() => {
		let Echarts = echarts.init(document.getElementById('newalertanalysis'))
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