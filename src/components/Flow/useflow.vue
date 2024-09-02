<template>
    <div :id="props.nameid" ></div>
</template>
<script setup >
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
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
		
        chartTop();
	}
    
    let chartTop = () => {
        let Echarts = echarts.init(document.getElementById(props.nameid))
    
        const option = {
        color:['#c26242','#c0a265'],
        series: [
            // {
            // name: 'Pyramid',
            // type: 'funnel',
            // width: '40%',
            // height: '45%',
            // left: '55%',
            // top: '50%',
            // sort: 'ascending',
            // funnelAlign: 'left',
            // data: [
            //     { value: 60, name: 'Prod C' },
            //     { value: 30, name: 'Prod D' },
            //     { value: 10, name: 'Prod E' },
            //     { value: 80, name: 'Prod B' },
            //     { value: 100, name: 'Prod A' }
            // ]
            // },
            {
            name: 'Funnel',
            type: 'funnel',
            left: '10%',
            top: 20,
            bottom: 20,
            width: '80%',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
                show: true,
                position: 'right'
            },
            data: [
                { value: 60, name: 'Visit' },
                { value: 40, name: 'Inquiry' },
                { value: 20, name: 'Order' },
                { value: 20, name: 'Click' },
                { value: 100, name: 'Show' }
            ]
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