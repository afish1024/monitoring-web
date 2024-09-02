<template>
	<a-card :bordered="false" :body-style="{ 'padding-bottom': '0px', 'padding-top': 0 }" class="mb-2">
		<a-form ref="formRef" name="advanced_search" :model="searchFormState" class="ant-advanced-search-form">
			<a-row :gutter="24">
				<a-col :span="6">
					<a-form-item label="设备名称" name="deviceName">
						<a-input v-model:value="searchFormState.deviceName" placeholder="设备名称"></a-input>
					</a-form-item>
				</a-col>
				<a-col :span="6">
					<a-form-item label="状态" name="deviceStatus">
						<a-select v-model:value="searchFormState.deviceStatus" :options="deviceStatuss" />
					</a-form-item>
				</a-col>
				<a-col :span="6">
					<a-form-item label="其他条件" name="searchKey">
						<a-input v-model:value="searchFormState.searchKey" placeholder="其他条件"></a-input>
					</a-form-item>
				</a-col>
					<a-button type="primary" @click="table.refresh(true)">查询</a-button>
			</a-row>
		</a-form>
	</a-card>
	<a-card :bordered="false">
		<div class="table-tools">
			<h2 class="title">链路列表</h2>
			<div class="btn-group">
				<a-button @click="formlink.onOpen()">
					<template #icon><plus-outlined /></template>
				</a-button>
				<a-button @click="deleteModule">
					<template #icon><delete-outlined /></template>
				</a-button>
			</div>
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
			<template #bodyCell="{ column, record }">
				<!-- <template v-if="column.dataIndex === 'icon'">
					<a-tag :color="record.color">
						<component :is="record.icon" />
					</a-tag>
				</template> -->
				<template v-if="column.dataIndex === 'action'">
					<a-space>
						<edit-outlined @click="formlink.onOpen(record)" v-if="record.id != 0"/>

						<a-popconfirm title="确定要删除吗？" @confirm="confirm(record)">
							<delete-outlined />
						</a-popconfirm>
					</a-space>
				</template>
			</template>
		</s-table>
	</a-card>
	<linkFrom ref="formlink" @successful="table.refresh(true)"></linkFrom>
</template>

<script setup name="sysModule">
	import { message } from 'ant-design-vue'
	import listApi from '@/api/topological/listApi'
	let searchFormState = reactive({})
	import linkFrom from './linkfrom.vue'
	const formRef = ref()
	const table = ref()
	let form = ref()
	const formlink = ref()
	const deviceTypes = [
		{ label: '交换机', value: 'switch' },
		{ label: '服务器', value: 'server' },
		{ label: '路由器', value: 'router' }
	]
	const deviceStatuss = [
		{ label: '正常', value: 'normal' },
		{ label: '严重', value: 'serious' },
		{ label: '未监控', value: 'not_monitored' }
	]
	const toolConfig = { refresh: false, height: false, columnSetting: false, striped: false }
	const columns = [
		{
			title: '起点网络',
			dataIndex: 'startPointNetworkName',
			sorter: true,
			width: 120
		},
		{
			title: '起点设备IP',
			dataIndex: 'startPointDeviceName',
			sorter: true,
			width: 130
		},
		{
			title: '起点端口名称',
			dataIndex: 'startPointPortName',
			sorter: true,
			width: 180
		},
		{
			title: '终点网络',
			dataIndex: 'endPointNetworkName',
			sorter: true,
			width: 120
		},
		{
			title: '终点设备IP',
			dataIndex: 'endPointDeviceName',
			sorter: true,
			width: '200px'
		},
		{
			title: '终点端口名称',
			dataIndex: 'endPointPortName',
			sorter: true,
			width: '200px'
		},
		{
			title: '操作',
			dataIndex: 'action',
			width: 80
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
		return listApi.linkPage(Object.assign(parameter, searchFormState)).then((res) => {
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
		listApi.linkDelete(params).then((res) => table.value.clearRefreshSelected())
	}
	const confirm = (record) => {
		let params = [
			{
			id: record.id
			}
		]
		listApi.linkDelete(params).then(() => {
			table.value.refresh(true)
		})
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
