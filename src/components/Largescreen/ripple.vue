<template>
	<div :id="props.nameid"></div>
</template>

<script setup>
	import { onMounted } from 'vue'
	import { Liquid } from '@antv/g2plot'
	const props = defineProps({
        nameid:{
            type:String,
            default:()=>'ripple'
        },
		dataX:{
			type:Array,
            default:()=>[]
		},
        dataY:{
			type:Array,
            default:()=>[]
		},
		dataIndex:{
			type:Number,
			default:()=>0
		}
    })
	onMounted(() => {
		const liquidPlot = new Liquid(props.nameid, {
			percent: typeof(props.dataY[props.dataIndex])!='undefined' ? Number(props.dataY[props.dataIndex])/100 : 0,
			outline: {
				border: 1,
			},
			wave: {
				length: 200
			},
			liquidStyle:{
				 
				fillOpacity: 0.5,
				stroke: 'black',
				lineWidth: 0,
				strokeOpacity: 0.7,
				shadowColor: 'black',
				cursor: 'pointer'
			},
			statistic: {
				content: {
					style: {
						fontSize: '30px',
						lineHeight: '30px',
						color:'#FFF',
					}
				},
				
			},
			color: () =>Number(props.dataIndex)%2===0 ? '#185eff': '#a31d52',
		})
		liquidPlot.render()
	})
</script>

<style scoped></style>
