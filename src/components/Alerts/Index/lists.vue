<template>
    <a-card :bordered="false">
		<a-table
			ref="table"
			:columns="columns"
			:data-source="selectedData"
			:alert="options.alert.show"
			bordered
			:row-key="(record) => record.id"
			:tool-config="toolConfig"
			:pagination="false"
		>
		<template #bodyCell="{ column, record }">
			<template v-if="column.dataIndex === 'alarmLevel'">
		
				<div class="lists-level" 
					:class="{'bg-yellow':record.alarmLevel == 'secondary',
					'bg-orage':record.alarmLevel == 'primary',
					'bg-error':record.alarmLevel =='serious',
					'bg-unknown':record.alarmLevel =='unknown',
					'bg-red':record.alarmLevel == 'disconnect'
				}" >
					{{ record.alarmLevelName }}</div>
			
			</template>
		</template>
		</a-table>
	</a-card>
</template>


<script setup name="lists">
	import alerts from '@/api/alerts/alerts'
	const table = ref()
	const toolConfig = { refresh: false, height: false, columnSetting: false, striped: false,size:10}
	const columns = [
		{
			title: '告警级别',
			dataIndex: 'alarmLevel'
		},
		{
			title: '告警类型',
			dataIndex: 'alarmTypeName',
			width: 120,
		},
		{
			title: '告警值',
			dataIndex: 'alarmValue'
		},
		{
			title: '发生时间',
			dataIndex: 'occurrenceTime'
		},
		{
			title: '网络名称',
			dataIndex: 'networkName'
		},
		{
			title: '设备名称',
			dataIndex: 'deviceName'
		},
		{
			title: '资源名称',
			dataIndex: 'resourceName'
		},
	]
	
	// 列表选择配置
	const options = {
		// columns数字类型字段加入 needTotal: true 可以勾选自动算账
		alert: {
			show: false,
			clear: () => {
				selectedRowKeys.value = ref([])
			}
		},
		rowSelection: {
			onChange: (selectedRowKey, selectedRows) => {
				selectedRowKeys.value = selectedRowKey
			}
		}
	}
	
	let pagination = {
		size:20,
		current:1,
		show:false
	}
	const selectedData = ref([])
	
	let getData= () => {
		return alerts.alarmPage().then((data) => {
		
			selectedData.value = data.records
		})
	}
	onMounted(() => {
		getData();
	})

	// 重置
	const reset = () => {
		searchFormRef.value.resetFields()
		table.value.refresh(true)
	}
	
</script>
<style lang="less" scoped>
</style>