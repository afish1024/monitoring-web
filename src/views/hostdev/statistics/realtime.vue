<template>
    <div id="realtimestatistics" ></div>
</template>
<script setup name="responsetop">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
	const props = defineProps({
		statisticsData:Array,
	})
    const toRefStrHtml = toRef(props, "statisticsData")
    watch(toRefStrHtml, () => {
        getData(toRefStrHtml.value)
    })

    let getData= (datalist) => {
        var titles = []
        var alertCount = []
        var smsCount = []
        var cpuCount = []
        var diskCount = []
        var memoryCount = []
        var connectivityCount = []
        var pingCount = []
        var databaseCount = []
        for(let i = 0; i< datalist.length; i++) {
            titles.push(datalist[i].name)
            alertCount.push(datalist[i].log_count)
            smsCount.push(datalist[i].sms_count)
            cpuCount.push(datalist[i].cpu)
            diskCount.push(datalist[i].disk)
            memoryCount.push(datalist[i].memory)
            connectivityCount.push(datalist[i].network_status)
            pingCount.push(datalist[i].ping_status)
            databaseCount.push(datalist[i].database)
        }    
        let Echarts = echarts.init(document.getElementById('realtimestatistics'))
		const option = {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['预警次数', '数据库','CPU','内存','磁盘','网络','PING'],
                bottom:'left',
            },
            grid: {
                top:'5%',
                left: '5%',
                right: '5%',
                bottom: '30%',
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: titles,
                axisLabel: {  
                    interval:0,  
                    rotate:20,
                }  
            },
            yAxis: [
                {
                    type: 'value',
                    name: '',
                    position: 'left',
                    axisLabel: {
                    formatter: '{value} 次'
                }
                },
                {
                    type: 'value',
                    name: '',
                    position: 'right',
                    axisLabel: {
                    formatter: '{value} %'
                    }
                }
            ],
           
            series: [
                {
                name: '预警次数',
                type: 'line',
                data: alertCount,
                yAxisIndex: 0,
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: "{c}",
                            textStyle: {
                                color: '#000'
                            }
                        },
                        textColor : '#000'
        
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        }
                    }
                },
                {
                name: '数据库',
                type: 'line',
                data: databaseCount,
                yAxisIndex: 0,
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: "{c}",
                            textStyle: {
                                color: '#000'
                            }
                        },
                        textColor : '#000'
        
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        }
                    }
                },
                {
                name: 'CPU',
                type: 'line',
                data: cpuCount,
                yAxisIndex: 1,
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: "{c}",
                            textStyle: {
                                color: '#000'
                            }
                        },
                        textColor : '#000'
        
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        }
                    }
                },
                {
                name: '内存',
                type: 'line',
                data: memoryCount,
                yAxisIndex: 1,
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: "{c}",
                            textStyle: {
                                color: '#000'
                            }
                        },
                        textColor : '#000'
        
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        }
                    }
                },
                {
                name: '磁盘',
                type: 'line',
                data: diskCount,
                yAxisIndex: 1,
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: "{c}",
                            textStyle: {
                                color: '#000'
                            }
                        },
                        textColor : '#000'
        
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        }
                    }
                },
                {
                name: '网络',
                type: 'line',
                data: connectivityCount,
                yAxisIndex: 1,
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: "{c}",
                            textStyle: {
                                color: '#000'
                            }
                        },
                        textColor : '#000'
        
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        }
                    }
                },
                {
                name: 'PING',
                type: 'line',
                data: pingCount,
                yAxisIndex: 1,
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: "{c}",
                            textStyle: {
                                color: '#000'
                            }
                        },
                        textColor : '#000'
        
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


    }
   


	onMounted(() => {
     
		
	})
</script>

<style scoped></style>
