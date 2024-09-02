<template>
	<div :id="props.nameid"></div>
</template>
<script setup name="AlarmLine">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
    const props = defineProps({
        nameid:{
            type: String,
			default: () => 'AlarmLine'
        },
        dataX:{
			type: Array,
			default: () =>['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
		},
        dataY:{
			type: Array,
			default: () =>[1, 2, 13, 12, 11, 10, 15]
		},
    })
    const zoomData=[  // 有滚动条 平移
        {
            type: 'slider',
            realtime: true,
            start: 0,
            end: 50,  // 初始展示40%
            height: 4,
            fillerColor: "#eee", // 滚动条颜色
            borderColor: "#eee", 
            handleSize:0, // 两边手柄尺寸
            showDetail: false, // 拖拽时是否展示滚动条两侧的文字
            top:'96%',
            
            // zoomLock:true, // 是否只平移不缩放
            // moveOnMouseMove:true, //鼠标移动能触发数据窗口平移
            // zoomOnMouseWheel :true, //鼠标移动能触发数据窗口缩放
        },
        { 
            type: "inside",  // 支持内部鼠标滚动平移
            start: 0,
            end: 40,
            zoomOnMouseWheel: false,  // 关闭滚轮缩放
            moveOnMouseWheel: true, // 开启滚轮平移
            moveOnMouseMove: true  // 鼠标移动能触发数据窗口平移 
        }
    ]
	const option = {
        tooltip: {
                    trigger: 'axis'
                },
        dataZoom: zoomData,
        xAxis: {
            
            type: 'category',
            data: props.dataX,
            
            axisLabel: {
                rotate: 35,//35度角倾斜显示
            },
            axisTick:{
            show:false,
            }
        },
        yAxis: {
            name:'单位/个',
            type: 'value'
        },
        series: [
            {
                data: props.dataY,
                barWidth:'20%',
                type: 'line'
            }
        ]
    };

	onMounted(() => {
		let Echarts = echarts.init(document.getElementById(props.nameid))

		// 绘制图表
		Echarts.setOption(option)
		// 自适应大小
		window.onresize = () => {
			Echarts.resize()
		}
	})
</script>

<style scoped></style>
