<template>
    <div :id="props.nameid" ></div>
</template>
<script setup >
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
    import flowApi from '@/api/biz/flowApi'
    const inflow = ref([])
    const outflow = ref([])
    const xAxisData = ref([])
    const props = defineProps({
		datalist:{
			type: Array,
			default: () =>[
				
			]
		},
		innerRadius:{
			type:String,
			default: () =>0.64
		},
		colorList:{
			type: Array,
			default: () =>['#5140b4', '#2d5e0a', '#ff7d18']
		},
		contentcolor:{
			type: Array,
			default: () =>''
		},
		pieStyle:{
			type: Array,
			default: () =>'#fff'
		},
		legend:{
			type: Array,
			default: () =>{
				
			}
		},
		nameid:{
			type:String ,
			default: () =>'BingZhuangTu07'
		}
	})


    let getData= () => {
        return flowApi.networkFlowTrend().then((data) => {
        
            inflow.value = data.inflow
            outflow.value = data.outflow
            xAxisData.value = data.runningTime
            chartTop();
        })
	}
    
    let chartTop = () => {
        let Echarts = echarts.init(document.getElementById(props.nameid))
    
        const option = {
            textStyle: {
                color: '#48a1a8'
            },
        
            legend: {
                data: ['流入流量', '流出流量'],
                textStyle: {
                    color: '#FFF'  
                },
                right: '5%',
                top: '8%', // 图例垂直居上
            },
            grid: {
                show:false,
                top:'80px',
                left: '3%',
                right: '3%',
                containLabel: true
            },
            color:['#c26242','#c0a265'],
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xAxisData.value,
                axisLabel: {
                    fontSize: 16,
                    color:'#FFF'
                },
            },
            yAxis: {
                name:'单位/KB',
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
                name: '流入流量',
                data: inflow.value,
                type: 'line',
                smooth: true,
                showSymbol: false,
                lineStyle: {   // 设置线条样式
                    width: 3   // 设置线条宽度为2像素
                },
                center:['50%','80%'],
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
                },
                {
                    name: '流出流量',
                data: outflow.value,
                type: 'line',
                smooth: true,
                showSymbol: false,
                lineStyle: {   // 设置线条样式
                    width: 3   // 设置线条宽度为2像素
                },
                center:['50%','80%'],
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

		// 绘制图表
		Echarts.setOption(option)
		// 自适应大小
		window.onresize = () => {
			Echarts.resize()
		}
    }
    
	onMounted(() => {
        getData();
	})
</script>