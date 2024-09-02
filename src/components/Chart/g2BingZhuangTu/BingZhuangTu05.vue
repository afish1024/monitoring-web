<template>
	<div :id="props.nameid"></div>
</template>

<script setup>
	import { onMounted } from 'vue'
	import { Pie } from '@antv/g2plot'
	const props = defineProps({
        nameid:{
            type: String,
			default: () => 'BingZhuangTu05'
        },
		datalist:{
			type: Array,
			default: () =>[
				{ type: '设备一', value: 27 },
				{ type: '设备二', value: 25 },
				{ type: '设备三', value: 18 },
				{ type: '设备四', value: 15 },
				{ type: '设备五1', value: 10 },
				{ type: '设备五2', value: 10 },
				{ type: '设备五3', value: 10 },
				{ type: '设备五4', value: 10 },
				{ type: '设备五5', value: 10 },
				{ type: '设备五6', value: 10 },
				{ type: '设备五7', value: 10 },
				{ type: '其他', value: 5 }
			]
		},
		content:{
			type: String,
			default: () => '{value}'
		},
		innerRadius:{
			type: String,
			default: () => 0.6
		},
		total:{
			type: Number,
			default: () => 0
		}
	})
	

	onMounted(() => {
		var data = props.datalist
		const piePlot = new Pie(props.nameid, {
			appendPadding: 10,
			data,
			angleField: 'value',
			colorField: 'type',
			radius: 1,
			innerRadius: props.innerRadius,
			label: {
				type: 'inner',
				offset: '-50%',
				content: props.content,
				style: {
					textAlign: 'center',
					fontSize: 14
				}
			},
			interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
			statistic: {
				title: false,
				content: {
					style: {
						whiteSpace: 'pre-wrap',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						fontSize: '18px'
					},
					content: props.total+'\n总数'
				}
			},
			legend: {

				position: 'right',
				offsetX:-30
			}
		})

		piePlot.render()
	})
</script>

<style scoped></style>
