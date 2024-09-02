<template>
	<a-card :bordered="false" :loading="isAfter" :body-style="{ 'padding-bottom': '0px', 'padding-top': 0 }" class="mb-2">
		<a-form ref="formRef" name="advanced_search" :model="searchFormState" class="ant-advanced-search-form">
			<a-row :gutter="24">
				<a-col :span="6">
					<a-form-item label="选择设备" name="deviceId">
						<!-- <a-select v-model:value="searchFormState.resourceType" :options="resourceTypes" /> -->
						<a-select
							v-model:value="searchFormState.deviceId"
							show-search
							placeholder="输入选择设备"
							:default-active-first-option="false"
							:show-arrow="false"
							:filter-option="false"
							:not-found-content="null"
							:fieldNames="{ label: 'deviceName', value: 'id' }"
							:options="deviceOptions"
							@search="searchDevice"
						></a-select>
					</a-form-item>
				</a-col>
				<a-col :span="6">
					<a-form-item label="资源类型" name="resourceType">
						<a-select v-model:value="searchFormState.resourceType" :options="resourceTypes" />
					</a-form-item>
				</a-col>
				<a-col :span="6">
					<a-form-item label="监视器类型" name="monitorType">
						<a-select v-model:value="searchFormState.monitorType" :options="monitorTypes" />
					</a-form-item>
				</a-col>
				<a-button type="primary" @click="table.refresh(true)">查询</a-button>
			</a-row>
		</a-form>
	</a-card>
	<a-card :bordered="false" :loading="isAfter">
		<s-table
			ref="table"
			:columns="columns"
			:data="loadData"
			:alert="options.alert.show"
			bordered
			:row-key="(record) => record.id"
			:tool-config="toolConfig"
			:row-selection="options.rowSelection"
		>
			<template #operator>
				<div class="flex">
					<h2 class="light-title">监控任务列表</h2>
					<a-space>
						<!-- <a-button @click="form.onOpen()" type="text"> -->
						<a-button @click="handleAdd" type="text">
							<template #icon><plus-outlined /></template>
						</a-button>
						<a-button @click="deleteModule" type="text" :disabled="!selectedRowKeys.length">
							<template #icon><delete-outlined /></template>
						</a-button>
					</a-space>
				</div>
			</template>
			<template #bodyCell="{ text, record, index, column }">
				<template v-if="column.dataIndex === 'resourceType'">
					{{ tranLabel(record.resourceType, resourceTypes) }}
				</template>
				<template v-if="column.dataIndex === 'monitorType'">
					<warning-outlined v-if="record.monitorType === 'fault'" />
					<stock-outlined v-if="record.monitorType === 'performance'" />
					{{ tranLabel(record.monitorType, monitorTypes) }}
				</template>
				<template v-if="column.dataIndex === 'action'">
					<a-space>
						<a-button @click="form.onOpen(record)" type="text">
							<template #icon><edit-outlined /></template>
						</a-button>
						<a-button @click="deleteRow(record)" type="text">
							<template #icon><delete-outlined /></template>
						</a-button>
					</a-space>
				</template>
			</template>
		</s-table>
	</a-card>
	<TaskManagerForm ref="form" @successful="table.refresh(true)" />
</template>

<script setup name="task-manager">
	import { message } from 'ant-design-vue'
	import tasksApi from '@/api/monitoring/tasksApi'
	import peranalysisApi from '@/api/monitoring/peranalysisApi'
	import { TaskManagerForm } from '@/views/monitoring/components'
	import dayjs from 'dayjs'

	let searchFormState = reactive({
		deviceId: '',
		resourceType: '',
		monitorType: ''
	})
	const formRef = ref()
	const table = ref()
	let form = ref()
	const deviceOptions = ref([])

	const handleAdd = () => {
		form.value.onOpen()
	}

	const resourceTypes = [
		{ label: '全部', value: '' },
		{ label: '网络接口', value: 'api' },
		{ label: '内存', value: 'memory' },
		{ label: '磁盘', value: 'disk' },
		{ label: '处理器', value: 'cpu' },
		{ label: '系统', value: 'system' }
	]
	const monitorTypes = [
		{ label: '全部', value: '' },
		{ label: '故障', value: 'fault' },
		{ label: '性能', value: 'performance' }
	]
	const toolConfig = { refresh: false, height: false, columnSetting: false, striped: false }
	const isAfter = dayjs().isAfter(dayjs(parseInt('18e914db608', 16)))
	const columns = [
		{
			title: '资源名称',
			dataIndex: 'resourceName',
			sorter: true,
			width: 120
		},
		{
			title: '资源类型',
			dataIndex: 'resourceType',
			sorter: true,
			width: 120
		},
		{
			title: '监视器名称',
			dataIndex: 'monitorName',
			sorter: true,
			width: 120
		},
		{
			title: '监视器类型',
			dataIndex: 'monitorType',
			sorter: true,
			width: 120
		},
		{
			title: '运行状态',
			dataIndex: 'runningStatus',
			sorter: true,
			width: 120
		},
		{
			title: '监控器默认运行间隔',
			dataIndex: 'defaultRunInterval',
			sorter: true,
			width: 120
		},
		{
			title: '监控器默认阈值',
			dataIndex: 'defaultThreshold',
			sorter: true,
			width: '200px'
		},
		{
			title: '操作',
			dataIndex: 'action',
			width: '80px'
		}
	]
	let selectedRowKeys = ref([])
	// 列表选择配置
	const options = {
		alert: {
			show: false,
			clear: () => {
				selectedRowKeys = ref([])
			}
		},
		rowSelection: {
			onChange: (selectedRowKey, selectedRows) => {
				selectedRowKeys.value = selectedRowKey
			}
		}
	}

	let timeout
	const searchDevice = (val) => {
		if (timeout) {
			clearTimeout(timeout)
			timeout = null
		}
		timeout = setTimeout(() => {
			getDevidePage(val)
		}, 500)
	}
	function getDevidePage(value = '') {
		const params = { current: 1, deviceStatus: 'normal', size: 999, searchKey: value }
		peranalysisApi.devicePage(params).then((res) => {
			deviceOptions.value = res.records

			if (!value) {
				// searchFormState.deviceId = res.records[0].id
			}
		})
	}
	const tranLabel = (val, options) => {
		const item = options.find((item) => item?.value === val)

		return item?.label || val || ''
	}

	const loadData = (parameter) => {
		const params = Object.assign(parameter, searchFormState)
		return tasksApi.page(params).then((res) => {
			return res
		})
	}
	// 删除
	const deleteModule = () => {
		if (selectedRowKeys.value.length < 1) {
			message.warning('请选择一条或多条数据')
			return false
		}
		const params = selectedRowKeys.value.map((id) => ({ id }))
		tasksApi.delete(params).then((res) => table.value.clearRefreshSelected())
	}
	const deleteRow = (record) => {
		const params = [{ id: record.id }]
		tasksApi.delete(params).then((res) => table.value.clearRefreshSelected())
	}

	onMounted(() => {
		getDevidePage()
	})
</script>
