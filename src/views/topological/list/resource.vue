<template>
	<a-card :bordered="false" :body-style="{ 'padding-bottom': '0px', 'padding-top': 0 }" class="mb-2">
		<a-form ref="formRef" name="advanced_search" :model="searchFormState" class="ant-advanced-search-form">
			<a-row :gutter="24">
				<a-col :span="6">
					<a-form-item label="资源类型" name="resourceType">
						<a-select v-model:value="searchFormState.resourceType" :options="resourceTypes" />
					</a-form-item>
				</a-col>
				<a-col :span="6">
					<a-form-item label="告警级别" name="deviceStatus">
						<a-select v-model:value="searchFormState.deviceStatus" :options="selectOptions" />
					</a-form-item>
				</a-col>
				<a-col :span="6">
					<a-form-item label="管理状态" name="runningStatus">
						<a-select v-model:value="searchFormState.runningStatus" :options="runningStatus" />
					</a-form-item>
				</a-col>
				<a-button type="primary" @click="table.refresh(true)">查询</a-button>
			</a-row>
		</a-form>
	</a-card>
	<a-card :bordered="false" :body-style="{ 'padding-top': 0 }">
		<div class="table-tools">
			<h2 class="title">资源列表</h2>
			<!-- <div class="btn-group">
				<a-button @click="deleteModule">
					<template #icon><delete-outlined /></template>
				</a-button>
			</div> -->
		</div>
		<s-table
			ref="table"
			:columns="columns"
			:data="loadData"
			:alert="options.alert.show"
			bordered
			:row-key="(record) => record.id"
			:tool-config="toolConfig"
			:row-selection="options.rowSelection"
			:size="20"
		>
		</s-table>
	</a-card>
</template>

<script setup name="sysModule">
	import { message } from 'ant-design-vue'
	import listApi from '@/api/topological/listApi'
	let searchFormState = reactive({
		resourceType: 'all',
		deviceStatus: 'all',
		runningStatus: 'all'
	})
	const formRef = ref()
	const table = ref()
	let form = ref()
	const resourceTypes = [
		{ label: '全部', value: 'all' },
		{ label: '网络接口', value: 'api' },
		{ label: '内存', value: 'memory' },
		{ label: '磁盘', value: 'disk' },
		{ label: '处理器', value: 'cpu' },
		{ label: '系统', value: 'system' }
	]
	const runningStatus = [
		{ label: '全部', value: 'all' },
		{ label: '运行', value: 'running' },
		{ label: '暂停', value: 'paused' },
		{ label: '异常', value: 'abnormal' }
	]
	const selectOptions = [{ label: '全部', value: 'all' }]
	const toolConfig = { refresh: false, height: false, columnSetting: false, striped: false }
	const columns = [
		{
			title: '资源名称',
			dataIndex: 'resourceName',
			sorter: true,
			width: 120
		},
		{
			title: '资源描述',
			dataIndex: '',
			sorter: true,
			width: 120
		},
		{
			title: '管理状态',
			dataIndex: 'runningStatus',
			sorter: true,
			width: 120
		},
		{
			title: '监控',
			dataIndex: 'monitorTaskId',
			sorter: true,
			width: 120
		},
		{
			title: '告警信息',
			dataIndex: 'alarmInformation',
			sorter: true,
			width: '200px'
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
	const loadData = (parameter) => {
		return listApi.resourcePage(Object.assign(parameter, searchFormState)).then((res) => {
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
		listApi.deviceDelete(params).then((res) => table.value.clearRefreshSelected())
	}
</script>

<style lang="less" scoped>
	.table-tools {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.title {
			padding-left: 10px;
			line-height: 16px;
			font-weight: 500;
			font-size: 16px;
			border-left: 4px solid #3a6fd7;
		}

		.btn-group {
			margin-right: 15px;
			margin-left: 15px;
			box-sizing: border-box;
			padding: 0;
			color: #000000d9;
			font-size: 14px;
			font-variant: tabular-nums;
			line-height: 1.5715;
			list-style: none;
			font-feature-settings: 'tnum';
			display: inline-block;
			font-size: 0;
			border: 1px solid #d9d9d9;
			border-radius: 2px;
			background-color: #fff;
		}
		.btn-group .ant-btn {
			border: 0;
		}
		.btn-group .ant-btn ~ .ant-btn {
			border-left: 1px solid #d9d9d9;
		}
	}
</style>
