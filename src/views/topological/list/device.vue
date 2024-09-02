<template>
	<a-card :bordered="false" :body-style="{ 'padding-bottom': '0px', 'padding-top': 0 }" class="mb-2">
		<a-form ref="formRef" name="advanced_search" :model="searchFormState" class="ant-advanced-search-form">
			<a-row :gutter="24">
				<a-col :span="8">
					<a-form-item label="设备类型" name="deviceType">
						<a-select
							v-model:value="searchFormState.deviceType"
							:options="deviceTypes"
							:fieldNames="{ label: 'dictLabel', value: 'dictValue' }"
							placeholder="请选择设备类型"
						/>
					</a-form-item>
				</a-col>
				<a-col :span="8">
					<a-form-item label="状态" name="deviceStatus">
						<a-select v-model:value="searchFormState.deviceStatus" :options="deviceStatuss" placeholder="请选择状态"/>
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
			<h2 class="title">设备列表</h2>
			<div class="btn-group">
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
			:scroll="{ x: 1000 }"
			:size="20"
		>
			<template #bodyCell="{ column, record }">
				<template v-if="column.dataIndex === 'ipAddress'"> {{ record.ipAddress }} : {{ record.devicePort }} </template>
				<template v-if="column.dataIndex === 'action'">
					<a-space>
						<!-- <a @click="form.onOpen(record)">编辑</a>
						<a-divider type="vertical" /> -->
						<a-popconfirm title="确定要删除吗？" @confirm="confirm(record)">
							<delete-outlined />
						</a-popconfirm>
					</a-space>
				</template>
			</template>
		</s-table>
	</a-card>
</template>

<script setup name="sysModule">
	import { message } from 'ant-design-vue'
	import listApi from '@/api/topological/listApi'
	let searchFormState = reactive({})
	const formRef = ref()
	const table = ref()
	let form = ref()

	const props = defineProps({
		treeId: {
			type: Number,
			default: 0
		}
	})

	watch(() => props.treeId,(newVal, oldVal) => {

		searchFormState.deviceId = newVal
		console.log(newVal)
		table.value.refresh(true)
		loadData({})
	})


	let deviceTypes = ref([])
	// const deviceTypes = [
	// 	{ label: '交换机', value: 'switch' },
	// 	{ label: '服务器', value: 'server' },
	// 	{ label: '路由器', value: 'router' }
	// ]
	const deviceStatuss = [
		{ label: '正常', value: 'normal' },
		{ label: '严重', value: 'serious' },
		{ label: '未监控', value: 'not_monitored' }
	]
	const toolConfig = { refresh: false, height: false, columnSetting: false, striped: false }

	const columns = [
		{
			title: '设备名称',
			dataIndex: 'deviceName',
			sorter: false,
			fixed: 'left',  
			ellipsis:true,
			width: 200
		},
		// {
		// 	title: '告警信息',
		// 	dataIndex: 'alarmInformation',
		// 	sorter: true,
		// 	width: 120
		// },
		{
			title: '监控状态',
			dataIndex: 'monitoringStatusName',
			sorter: false,
			width: 120
		},
		{
			title: '所属网络',
			dataIndex: 'networkName',
			sorter: false,
			width: 120
		},
		{
			title: '设备类型',
			dataIndex: 'deviceTypeName',
			sorter: false,
			width: 120
		},
		{
			title: '在线状态',
			dataIndex: 'onlineStatusName',
			sorter: false,
			width: 120
		},
		{
			title: 'IP/端口',
			dataIndex: 'ipAddress',
			sorter: false,
			width: 200
		},
		{
			title: '资源数量',
			dataIndex: 'resourceCount',
			sorter: false,
			width: 120
		},
		{
			title: '操作',
			dataIndex: 'action',
			fixed: 'right',  
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
		return listApi.devicePage(Object.assign(parameter, searchFormState)).then((res) => {
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
	const confirm = (record) => {
		let params = [
			{
				id: record.id
			}
		]
		listApi.deviceDelete(params).then(() => {
			table.value.refresh(true)
		})
	}
	onMounted(() => {
		listApi.listForLabel().then((res) => {
			deviceTypes.value = res
		})
	})
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
