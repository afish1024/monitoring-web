<template>
	<div id="BasicLineCpuChart"></div>
</template>
<script setup name="BasicLineCpuChart">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
    const props = defineProps({
		cpuData:Array,
        cpuThreshold:Number,
	})
	let data = ref([])
	let title = ref([])
    let threshold = ref([])
    const toRefStrHtml = toRef(props, "cpuData")
    watch(toRefStrHtml, () => {
        getData(toRefStrHtml.value)
    })
    let getData= (datalist) => {
        data.value = []
        title.value = []
        for(let i = 0; i< datalist.length; i++) {
            title.value.push(datalist[i].date)
            data.value.push(datalist[i].value)
            threshold.value.push(props.cpuThreshold)
        }
        const option = {
            title: {
                text: ''
            },
            visualMap:{
                show: false,
                type: 'continuous',
                seriesIndex: 0,
                min: 2,
                max: 10,
            },
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                return [pt[0], '10%'];
                }
            },
            grid: {
                top:'3%',
                left: '3%',
                right: '4%',
                bottom: '25%',
                containLabel: true
            },
            
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: title.value,
                axisLabel: {
                    show: true,
                    textStyle: {
                        color:'#333333'  //这里用参数代替了
                    }
                },
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                        show: true,
                        textStyle: {
                        color:'#333333'  //这里用参数代替了
                    }
                },
                splitLine:{//去除网格线
                    show:false
                },
                axisTick:{
                    show:true,
                    color:'#333333',
                },
                max:100,
                min:0,
            },
            legend: {
                orient: 'horizontal', // 'horizontal'
                data:['CPU','预警阈值'],
                textStyle: {  // 图列内容样式
                    color: '#333',  // 字体颜色
                },
                right:0,
                width:500,
                x:'center',
                y:'bottom',
                bottom:'0px'
            },

           
            series: [
               
                {
                    name: 'CPU',
                    type: 'line',
                    stack: 'Total',
                    data:data.value,
                    showSymbol: false,
                    areaStyle: {
                        opacity: 0.8,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgb(255, 191, 0)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(224, 62, 76)'
                        }
                        ])
                    }
                },
                {
                    name: '预警阈值',
                    type: 'line',
                    showSymbol: false,
                    type: 'line',
                    data:threshold.value
                },
            
            ]
            }

            let Echarts = echarts.init(document.getElementById('BasicLineCpuChart'))

            // 绘制图表
            Echarts.setOption(option)
            // 自适应大小
            window.onresize = () => {
                Echarts.resize()
            }
        
    }
</script>

<style scoped></style>
