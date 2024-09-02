<template>
		<div class="systemtable title">
			<table v-for="(item,index) in list" :key="index">
				<tr >
					<td style="width:15%;">序号</td>
					<td style="width:50%;">系统</td>
					<td style="width:20%;">报警数</td>
					<td style="width:20%;">预警数</td>
				</tr>
			</table>
		</div>
		<div class="systemtable">
			
			<table v-for="(item,index) in datalist" :key="index" >
				<tr v-for="(titem,tindex) in item" :key="tindex">
					<td style="width:15%;">{{ titem.key }}</td>
					<td style="width:50%;" :class="{'colorred':titem.errorcount || titem.hostserrorcount }"  @click="monitorRecords(titem.type,1)">{{ titem.systemname }}</td>
					<td style="width:20%;" :class="{'colorred':titem.errorcount}"  @click="monitorRecords(titem.type,1)">{{ titem.errorcount }}</td>
					<td style="width:20%;" :class="{'colorred':titem.hostserrorcount}"  @click="monitorRecords(titem.type,2)">{{ titem.hostserrorcount }}</td>
				</tr>
				<tr v-if="item.length != 4" v-for="count in 4-item.length" >
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
			</table>
		</div>
	
</template>

<script setup>
import router from '@/router/index'
import { onMounted,ref } from 'vue'
	const props = defineProps({
		apiStatistics:Array,
	})
	let apiStatistics = props.apiStatistics
	let data =[]
	let datalist = ref([])
	let list = ref([])
	let tdcount = 3
	let trcount = 0
	const  monitorRecords = (type,cateogry) => {
		var pathval = '/application/monitor';
		if(cateogry == 2){
			pathval = '/sys/workorder';
		}
		router.push({
			path : pathval,
			query: {
            	app: type
        	}
		})
	}
	for(let i = 0; i<apiStatistics.length; i++) {
		apiStatistics[i].isUse = 0
		if(i % 4 == 0){
			trcount++
		}
	}
	for(let i = 0; i< tdcount; i++){
		list.value.push(i)
	}
	for(let i = 0; i< trcount; i++){
		data[i] = new Array()
	}
	console.log(trcount)
	for(let i = 0; i< trcount; i++){
		for(let s = 0; s < apiStatistics.length; s++) {
			if(data[i].length != 4){
				if(apiStatistics[s].isUse == 0) {
					data[i].push({
						key:s+1,
						idx:apiStatistics[s].type,
						systemname: apiStatistics[s].name,
						errorcount:apiStatistics[s].app_error_count,
						hostserrorcount:apiStatistics[s].hosts_error_count,
						type:apiStatistics[s].type,
					})
					apiStatistics[s].isUse = 1
				}
			}
		}
	}
	datalist.value = data
</script>

<style scoped  lang="less">
.monitoring tr{
	height: 20px;

}
.monitoring td{
	width:100px;
	border: 1px solid #ececec;
	text-align: center;
}
.info{
	border-right: 1px solid #ececec;
	font-size: 12px;
	height: 50px;
	line-height: 50px;
	text-align: center;
	cursor: pointer;
}
.system{
	border-left: 1px solid #ececec;
	border-top: 1px solid #ececec;
}
.system:nth-last-child(2){
	border-right: 1px solid #ececec;
	height: 50px;
}
.colorred{
	color: red;
	cursor: pointer;
}
.monitoring 
{
	font-size: 12px;
	.stystemname{
		width: 15% !important;
	}
	.idx{
		width: 4% !important;
	}
	.number{
		width: 5%;
		
	}
	
}
.systemtable{
	display: flex;
	table{
		width: 100%;
	}
	td{
		border: 1px solid #ececec;
		text-align: center;
		height: 50px;
		border-left: none;
	}
	table:first-child{
		border-left: 1px solid #ececec;
	}
}
.title td{
	border-bottom: none;
}
</style>
