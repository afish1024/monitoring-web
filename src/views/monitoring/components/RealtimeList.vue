<template>
	<div class="realtime-list">
		<s-table
			ref="table"
			:columns="columns"
			:data="loadData"
			:alert="options.alert.show"
			bordered
			:row-key="(record) => record.id"
			:tool-config="toolConfig"
		>
			<template #bodyCell="{ column, record }">
				<template v-if="column.dataIndex === 'alarmLevel'">
					<div
						class="lists-level"
						:class="{
							'bg-yellow': record.alarmLevel == '次要',
							'bg-orage': record.alarmLevel == '主要',
							'red-orage': record.alarmLevel == '严重'
						}"
					>
						{{ record.alarmLevel }}
					</div>
				</template>
			</template>
		</s-table>
	</div>
</template>

<script setup name="RealtimeList">
	import homeApi from '@/api/monitoring/homeApi'
	const table = ref()
	const toolConfig = { refresh: false, height: false, columnSetting: false, striped: false, size: 10 }
	const columns = [
		{
			title: '告警级别',
			dataIndex: 'alarmLevel'
		},
		{
			title: '告警类型',
			dataIndex: 'alarmType'
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
		}
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
		size: 20,
		current: 1,
		show: false
	}
	const selectedData = ref([
		{
			alarmLevel: '次要',
			alarmType: '网口丢包率',
			alarmValue: '8%',
			occurrenceTime: '2024-01-02 10:59:00',
			networkName: '业务监控图',
			deviceName: 'H3C',
			resourceName: 'WANL'
		},
		{
			alarmLevel: '主要',
			alarmType: '网口丢包率',
			alarmValue: '50%',
			occurrenceTime: '2024-01-03 10:59:00',
			networkName: '业务监控图',
			deviceName: 'H3C',
			resourceName: 'WANL'
		}
	])

	const loadData = homeApi.alarmPage

	// 重置
	const reset = () => {
		searchFormRef.value.resetFields()
		table.value.refresh(true)
	}
</script>
