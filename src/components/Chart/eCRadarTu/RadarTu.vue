<template>
	<div :id="props.nameid"></div>
</template>
<script setup name="alarmpie">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
    const props = defineProps({
        nameid:{
            type:String,
            default:()=>'radar'
        },
    })
    const numInfo = ['一','二','三','四','五'];
    onMounted(() => {
		let Echarts = echarts.init(document.getElementById(props.nameid))
		const option = {
            title: {
                text: ''
            },
            
            legend: {
                left: 'center'
            },
            radar: [
                {
                indicator: (function () {
                    var res = [];
                    for (var i = 0; i < 5; i++) {
                        var wz = numInfo[i]
                        res.push({ text: wz + '星', max: 100 });
                    }
                    return res;
                })(),
                    center: ['55%', '55%'],
                    radius: 80
                }
            ],
            series: [
                {
                    type: 'radar',
                    tooltip: {
                        trigger: 'item'
                    },
                    areaStyle: {},
                    data: [
                        {
                            value: [0,100,0,0,0]
                        }
                    ]
                },
                    
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