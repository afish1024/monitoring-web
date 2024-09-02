<template>
	<a-card :bordered="false" :body-style="{ 'padding-bottom': '0px', 'padding-top': 0 }" class="mb-2">
		<a-form ref="formRef" name="advanced_search" :model="searchFormState" class="ant-advanced-search-form">
			<a-row :gutter="24">
				<a-col :span="8">
					<a-form-item label="设备IP或MAC" name="searchKey">
						<a-input v-model:value="searchFormState.searchKey" placeholder="请输入设备IP或MAC"></a-input>
					</a-form-item>
				</a-col>
				<a-col :span="8">
					<!-- <a-form-item label="侦测属性" name="deviceId">
						<a-input v-model:value="searchFormState.deviceId" placeholder="请输入模块名称关键词"></a-input>
					</a-form-item> -->
					<a-form-item label="侦测属性" name="deviceId">
						<a-select v-model:value="searchFormState.deviceId" placeholder="请选择侦测属性" allowClear>
							<a-select-option v-for="item in deviceList" :key="item.id" :value="item.id">{{
								item.deviceName
							}}</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>
				<a-col :span="8">
					<a-form-item label="" name="date">
						<a-range-picker v-model:value="searchFormState.date" />
					</a-form-item>
				</a-col>
				<a-col :span="8">
					<a-button type="primary" @click="table.refresh(true)">查询</a-button>
					<a-button style="margin: 0 8px" @click="() => formRef.resetFields()">重置</a-button>
				</a-col>
			</a-row>
		</a-form>
	</a-card>
	<a-card :bordered="false">
		<div class="table-tools">
			<h2 class="title">MAC-IP列表</h2>
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
			:size="20"
		>
			<!-- <template #bodyCell="{ column, record }">
				<template v-if="column.dataIndex === 'icon'">
					<a-tag :color="record.color">
						<component :is="record.icon" />
					</a-tag>
				</template>
				<template v-if="column.dataIndex === 'action'">
					<a-space>
						<a @click="form.onOpen(record)">编辑</a>
						<a-divider type="vertical" />
						<a-popconfirm title="确定要删除此模块吗？" @confirm="deleteModule(record)">
							<a-button type="link" danger size="small">删除</a-button>
						</a-popconfirm>
					</a-space>
				</template>
			</template> -->
		</s-table>
	</a-card>
</template>

<script setup name="sysModule">
	import { message } from 'ant-design-vue'
	import ipApi from '@/api/topological/ipApi'
	import planApiList from '@/api/alarm/indexApi'
	let searchFormState = reactive({})
	const formRef = ref()
	const table = ref()
	const deviceList = ref([]) // 设备
	let form = ref()
	const toolConfig = { refresh: false, height: false, columnSetting: false, striped: false }
	const columns = [
		{
			title: 'IP地址',
			dataIndex: 'ipAddress',
			sorter: true
		},
		{
			title: 'MAC地址',
			dataIndex: 'macAddress',
			sorter: true
		},
		{
			title: '来源设备',
			dataIndex: 'sortCode',
			sorter: true
		},
		{
			title: '检测属性',
			dataIndex: 'detectProperties',
			sorter: true
		},
		{
			title: '转发类型',
			dataIndex: 'forwardingType',
			sorter: true,
			width: '200px'
		},
		{
			title: '时间',
			dataIndex: 'createTime',
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
		const { date, ...params } = searchFormState
		const startDate = date?.[0]?.format?.('YYYY-MM-DD') || ''
		const endDate = date?.[1]?.format?.('YYYY-MM-DD') || ''
		return ipApi.ipPage(Object.assign(parameter, params, { startDate, endDate })).then((res) => {
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
		ipApi.ipDelete(params).then((res) => table.value.clearRefreshSelected())
	}
	const eventDeviceInfoData = () => {
		planApiList.eventDeviceInfo({}).then((res) => {
			deviceList.value = res
		})
	}
	onMounted(() => {
		eventDeviceInfoData()
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
