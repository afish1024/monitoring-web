<template>
	<a-card :bordered="false">
		<s-table
			ref="table"
			:columns="columns"
			:data="loadData"
			:alert="options.alert.show"
			bordered
			:row-key="(record) => record.id"
			:tool-config="toolConfig"
		>
			<template #operator class="table-operator">
				<a-space>
					<a-button type="primary" @click="formRef.onOpen()" v-if="hasPerm('screenRemoteMonitoringAdd')">
						<template #icon><plus-outlined /></template>
						新增
					</a-button>
					<xn-batch-delete
						v-if="hasPerm('screenRemoteMonitoringBatchDelete')"
						:selectedRowKeys="selectedRowKeys"
						@batchDelete="deleteBatchScreenRemoteMonitoring"
					/>
				</a-space>
			</template>
			<template #bodyCell="{ column, record }">
				<template v-if="column.dataIndex === 'action'">
					<a-space>
						<a @click="teamViewer(record)" v-if="hasPerm('screenRemoteMonitoringEdit')">远程访问</a>
						<a-divider type="vertical" v-if="hasPerm(['screenRemoteMonitoringEdit', 'screenRemoteMonitoringDelete'], 'and')" />
						<a @click="formRef.onOpen(record)" v-if="hasPerm('screenRemoteMonitoringEdit')">编辑</a>
						<a-divider type="vertical" v-if="hasPerm(['screenRemoteMonitoringEdit', 'screenRemoteMonitoringDelete'], 'and')" />
						<a-popconfirm title="确定要删除吗？" @confirm="deleteScreenRemoteMonitoring(record)">
							<a-button type="link" danger size="small" v-if="hasPerm('screenRemoteMonitoringDelete')">删除</a-button>
						</a-popconfirm>
					</a-space>
				</template>
			</template>
		</s-table>
	</a-card>
	<Form ref="formRef" @successful="table.refresh(true)" />
</template>

<script setup name="remotemonitoring">
	import Form from './form.vue'
	import screenRemoteMonitoringApi from '@/api/biz/screenRemoteMonitoringApi'
	const table = ref()
	const formRef = ref()
	const toolConfig = { refresh: true, height: true, columnSetting: true, striped: false }
	const columns = [
		{
			title: '设备名称',
			dataIndex: 'deviceName'
		},
		{
			title: '操作系统',
			dataIndex: 'operatingSystem'
		},
		{
			title: '设备IP',
			dataIndex: 'deviceIp'
		},
		{
			title: '连接序号',
			dataIndex: 'connectionNumber'
		},
		{
			title: '连接密码',
			dataIndex: 'connectionPassword'
		},
		{
			title: '创建人',
			dataIndex: 'createUserId'
		},
	]
	// 操作栏通过权限判断是否显示
	if (hasPerm(['screenRemoteMonitoringEdit', 'screenRemoteMonitoringDelete'])) {
		columns.push({
			title: '操作',
			dataIndex: 'action',
			align: 'center',
			width: '250px'
		})
	}
	const selectedRowKeys = ref([])
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
	const loadData = (parameter) => {
		return screenRemoteMonitoringApi.screenRemoteMonitoringPage(parameter).then((data) => {
			return data
		})
	}
	// 重置
	const reset = () => {
		searchFormRef.value.resetFields()
		table.value.refresh(true)
	}
	// 删除
	const deleteScreenRemoteMonitoring = (record) => {
		let params = [
			{
				id: record.id
			}
		]
		screenRemoteMonitoringApi.screenRemoteMonitoringDelete(params).then(() => {
			table.value.refresh(true)
		})
	}
	// 批量删除
	const deleteBatchScreenRemoteMonitoring = (params) => {
		screenRemoteMonitoringApi.screenRemoteMonitoringDelete(params).then(() => {
			table.value.clearRefreshSelected()
		})
	}


	const teamViewer = (e) => {
	
		window.location.href = "f3://"
	}


</script>
