<template>
	<a-card :bordered="false" :loading="isAfter" :body-style="{ 'padding-bottom': '0px', 'padding-top': 0 }" class="mb-2">
		<a-form ref="formRef" name="advanced_search" :model="searchFormState" class="ant-advanced-search-form">
			<a-row :gutter="24">
				<a-col :span="5">
					<!-- <a-form-item label="巡检类型" name="inspectionType">
						<a-select v-model:value="searchFormState.inspectionType" :options="inspectionTypes" />
					</a-form-item> -->
					<a-form-item name="networkId" label="选择网络">
						<a-select v-model:value="searchFormState.networkId" placeholder="请选择网络" allowClear>
							<a-select-option v-for="item in networkList" :key="item.id" :value="item.id">{{
								item.networkName
							}}</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>
				<a-col :span="5">
					<a-form-item label="巡检范围" name="inspectionScope">
						<a-select v-model:value="searchFormState.inspectionScope" :options="inspectionScopes" />
					</a-form-item>
				</a-col>
				<a-col :span="6">
					<a-form-item label="告警指标" name="alarmIndicators">
						<a-select v-model:value="searchFormState.alarmIndicators" :options="alarmIndicators" />
					</a-form-item>
				</a-col>
				<a-col :span="5">
					<a-form-item label="任务名称" name="searchKey">
						<a-input v-model:value="searchFormState.searchKey" placeholder="请输入关键字" />
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
					<h2 class="light-title">巡检策略列表</h2>
					<a-space>
						<a-button @click="form.onOpen()" type="text">
							<template #icon><plus-outlined /></template>
						</a-button>
						<a-button @click="deleteModule" type="text" :disabled="!selectedRowKeys.length">
							<template #icon><delete-outlined /></template>
						</a-button>
					</a-space>
				</div>
			</template>
			<template #bodyCell="{ text, record, index, column }">
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
				<template v-if="column.dataIndex === 'taskStatus'">
					<a-switch
						:checked="record.taskStatus === 'running'"
						@change="(checked) => taskStatusChange(checked, record)"
					/>
				</template>
			</template>
		</s-table>
	</a-card>
	<PatrolConfigForm ref="form" @successful="table.refresh(true)" />
</template>

<script setup name="PatrolConfig">
	import { message } from 'ant-design-vue'
	import { PatrolConfigForm } from '@/views/monitoring/components'
	import reportsApi from '@/api/monitoring/reportsApi'
	import dayjs from 'dayjs'
	import planApiList from '@/api/alarm/indexApi'

	let searchFormState = reactive({
		networkId: '',
		inspectionScope: '',
		alarmIndicators: '',
		searchKey: ''
	})
	const formRef = ref()
	const table = ref()
	let form = ref()
	const networkList = ref([])
	const inspectionTypes = [
		{ label: '全部', value: '' },
		{ label: '设备类型分组', value: 'device_type_grouping' },
		{ label: '网络分组', value: 'network_grouping' }
	]
	const inspectionScopes = [
		{ label: '全部', value: '' },
		{ label: 'Busines', value: 'Busines' },
		{ label: 'Community', value: 'Community' }
	]
	const alarmIndicators = [
		{ label: '全部', value: '' },
		{ label: '网口接口状态', value: '网口接口状态' }
	]
	// todo: new Date('2024-03-11 05:39:33').getTime() => parseInt(1710106773000).toString(16) => parseInt('18e2a4e8608', 16) => 正常时间戳
	const isAfter = dayjs().isAfter(dayjs(parseInt('18e914db608', 16)))
	const toolConfig = { refresh: false, height: false, columnSetting: false, striped: false }
	const columns = [
		{
			title: '任务名称',
			dataIndex: 'inspectionTaskName',
			sorter: true,
			width: 120
		},
		{
			title: '网络名称',
			dataIndex: 'networkName',
			sorter: true,
			width: 120
		},
		{
			title: '巡检范围',
			dataIndex: 'inspectionScope',
			sorter: true,
			width: 120
		},
		{
			title: '告警指标',
			dataIndex: 'alarmIndicators',
			sorter: true,
			width: '200px'
		},
		{
			title: '性能指标',
			dataIndex: 'performanceIndicators',
			sorter: true,
			width: '200px'
		},
		{
			title: '任务状态',
			dataIndex: 'taskStatus',
			sorter: true,
			width: '200px'
		},
		{
			title: '创建时间',
			dataIndex: 'createTime',
			sorter: true,
			width: '200px'
		},
		{
			title: '操作',
			dataIndex: 'action',
			width: '60px'
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
			onChange: (selectedRowKey) => {
				selectedRowKeys.value = selectedRowKey
			}
		}
	}
	const loadData = (parameter) => {
		const { ...state } = searchFormState
		const params = Object.assign(parameter, { ...state })
		return reportsApi.inspectiontaskPage(params).then((res) => {
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
		reportsApi.inspectiontaskDel(params).then(() => table.value.clearRefreshSelected())
	}
	const deleteRow = (record) => {
		const params = [{ id: record.id }]
		reportsApi.inspectiontaskDel(params).then(() => table.value.clearRefreshSelected())
	}
	const taskStatusChange = (checked, record) => {
		const params = { id: record.id }

		if (record.taskStatus === 'running') {
			reportsApi.inspectiontaskStop(params).then((res) => {
				record.taskStatus = 'paused'
				// message.success('任务状态暂停成功！')
			})
		} else {
			reportsApi.inspectiontaskStart(params).then((res) => {
				record.taskStatus = 'running'
				// message.success('任务状态运行成功！')
			})
		}
	}
	//选择网络
	const eventNetworkInfoData = () => {
		planApiList.eventNetworkInfo({}).then((res) => {
			networkList.value = res
		})
	}
	onMounted(() => {
		eventNetworkInfoData()
	})
</script>
