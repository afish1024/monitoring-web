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
        for(let i = 0; i< datalist.length; i++) {
            titles.push(datalist[i].name)
            alertCount.push(datalist[i].alert_count)
            smsCount.push(datalist[i].sms_count)
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
                data: ['报警次数', '推送次数'],
                bottom:'left',
            },
            grid: {
                top: '5%',
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
                    rotate:35  
                }  
            },
            yAxis: {
                type: 'value'
            },
           
            series: [
                {
                name: '报警次数',
                type: 'line',
                data: alertCount,
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
                name: '推送次数',
                type: 'line',
                data: smsCount,
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
