<template>
	<div id="apiabnormal"></div>
</template>
<script setup name="apiabnormal">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
    const props = defineProps({
		summary:Array,
	})
    let errorNumber = 0
    let goodNumber = 0
	onMounted(() => {
        if(props.summary.host_error_count){
            errorNumber = props.summary.host_error_count
        }
        if(props.summary.host_goods_count){
            goodNumber = props.summary.host_goods_count
        }
		let Echarts = echarts.init(document.getElementById('apiabnormal'))
		const option  = {
            title: {
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'right',
                top:'center'
            },
            color:['#ff6b48','#29cfb2'],
            series: [
                {
                    center: ['50%', '50%'],    
                    name: '',
                    type: 'pie',
                    radius: '70%',
                    data: [
                        { value: errorNumber, name: '异常' },
                        { value: goodNumber, name: '正常' },
                    ],
                    emphasis: {
                        itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
		
		// 绘制图表
		Echarts.setOption(option)
	})
</script>

<style scoped></style>
