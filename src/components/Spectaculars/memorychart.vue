<template>
   
	<div id="BasicLineMemoryChart"></div>
</template>
<script setup name="BasicLineMemoryChart">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
    const props = defineProps({
		memoryData:Array,
        memoryThreshold:Number,
	})

	let data = ref([])
	let title = ref([])
    let threshold = ref([])
    const toRefStrHtml = toRef(props, "memoryData")
    watch(toRefStrHtml, () => {
        getData(toRefStrHtml.value)
    })
    let getData= (datalist) => {
        data.value = []
        title.value = []
        for(let i = 0; i< datalist.length; i++) {
            title.value.push(datalist[i].date)
            data.value.push(datalist[i].value)
            threshold.value.push(props.memoryThreshold)
        }
        const option = {
            color:[ '#78e245'],
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            legend: {
                orient: 'horizontal', // 'horizontal'
                data:['内存','预警阈值'],
                textStyle: {  // 图列内容样式
                    color: '#333',  // 字体颜色
                },
                right:0,
                width:500,
                x:'center',
                y:'bottom',
                bottom:'0px'
            },
            grid: {
                top:'3%',
                left: '3%',
                right: '4%',
                bottom: '20%',
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
            series: [
                {
                    name: '内存',
                    type: 'line',
                    stack: 'Total',
                    data:data.value,
                    showSymbol: false,
                    areaStyle: {
                        opacity: 0.8,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgb(128, 255, 165)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(1, 191, 236)'
                        }
                        ])
                    },
                    itemStyle: {
                    normal: {
                        color: "#3ad4f3", //改变折线点的颜色
                        lineStyle: {
                            color: "#39ceed", //改变折线颜色
                        },
                    },
                    },
                },
                {
                    name: '预警阈值',
                    type: 'line',
                    showSymbol: false,
                    type: 'line',
                    data:threshold.value,

                },
            
            ]
            }

            let Echarts = echarts.init(document.getElementById('BasicLineMemoryChart'))

            // 绘制图表
            Echarts.setOption(option)
            // 自适应大小
            window.onresize = () => {
                Echarts.resize()
            }
       
    }
</script>

<style scoped></style>
