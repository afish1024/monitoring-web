<template>
	<div :id="props.nameid"></div>
</template>
<script setup name="alarmpie">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
    const props = defineProps({
        nameid:{
            type:String,
            default:()=>'alarmpie'
        },
        roseType:{
            type:String,
            default:()=>'area'
        },
        dataList:{
            type:String,
            default:()=> [
                        { value: 63, name: '严重' },
                        { value: 35, name: '主要' },
                        { value: 72, name: '次要' },

                    ]
        }
    })
    onMounted(() => {
		let Echarts = echarts.init(document.getElementById(props.nameid))
		const option = {
            title: {
                
            },
            grid: {
                left: '3%',
                right: '7%',
                bottom: '15%',
                top:'0%',
                containLabel: true
            },
            tooltip: {
                trigger: 'item'
            },
            color:[ '#fe5e6b','#fcc640', '#fe945e',], 
            series: [
                {
                name: '',
                type: 'pie',
                roseType: props.roseType, // 玫瑰图
                center: ['50%', '50%'], // 图例在容器中的位置，第一个控制左右，第二个控制上下
                radius: ['40%', '55%'], // 20%：内部空白圆的直径，60%：外部圆环的直径
                label: {
                    
                    normal: {
                        textStyle: {
                            color: '#fff',	// 提示文字颜色
                            fontSize: 12		// 提示文字大小
                        },
                        // formatter: '{b}\n\n{@2012}',
                        formatter:function(params){
                            if(params.name!=''){
                                console.log(params.data.value)
                                let res = params.name +'\n\n'+'{a|'+params.data.value+'}'
                                return res
                            }else{
                                return ''
                            }
                        },
                        rich:{
                            a:{
                                color:'rgb(95, 159, 255)'
                            }
                        }
                    }
                },
                labelLine:{  
                        normal:{  
                            length:25,   	// 指示线长度
                            lineStyle: {
                                color: "rgb(95, 159, 255)"  // 指示线颜色
                            }
                        },
                },
                data:props.dataList,
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