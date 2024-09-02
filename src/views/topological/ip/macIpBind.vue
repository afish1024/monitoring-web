<template>
	<a-card :bordered="false" :body-style="{ 'padding-bottom': '0px', 'padding-top': 0 }" class="mb-2">
		<a-form class="ant-advanced-search-form">
			<div class="fieldset">
				<h2 class="title">策略配置</h2>
				<a-row :gutter="24">
					<a-col :span="4">
						<a-form-item label="MAC-IP策略">
							<a-switch v-model:checked="strategyForm.strategyStatus" />
						</a-form-item>
					</a-col>
					<a-col :span="8">
						<a-form-item label="监视周期（分钟）">
							<a-input-number
								v-model:value="strategyForm.monitoringCycleTime"
								addon-before="-"
								addon-after="+"
							></a-input-number>
						</a-form-item>
					</a-col>
					<a-col :span="8">
						<a-button type="primary" @click="handleApply">应用</a-button>
					</a-col>
				</a-row>
			</div>
			<div class="fieldset">
				<h2 class="title">MAC-IP列表</h2>
				<a-row :gutter="24">
					<a-col :span="8">
						<a-form-item label="设备IP或MAC" name="searchKey">
							<a-input v-model:value="searchFormState.searchKey" placeholder="请输入模块名称关键词"></a-input>
						</a-form-item>
					</a-col>
					<a-col :span="8">
						<a-button type="primary" @click="handleSearch">查询</a-button>
					</a-col>
				</a-row>
			</div>
		</a-form>
	</a-card>
	<div class="table-box">
		<a-card class="left-card" :bordered="false">
			<div>
				<div class="">MAC-IP对应关系</div>
			</div>
			<s-table
				ref="leftTable"
				:columns="leftColumns"
				:data="leftData"
				:alert="options.alert.show"
				bordered
				:row-key="(record) => record.id"
				:tool-config="toolsConfig"
				:row-selection="options.rowSelection"
				:size="20"
			>
				<template #bodyCell="{ column, record }">
					<template v-if="column.dataIndex === 'action'">
						<a-button type="link" @click="() => addRow(record)">{{ '-->' }}添加MAC-IP绑定</a-button>
					</template>
				</template>
			</s-table>
		</a-card>
		<a-space class="btn-group" direction="vertical">
			<a-button type="link" @click="() => addSelected()" :disabled="!selectedRowKeys.length">添加MAC-IP绑定</a-button>
		</a-space>
		<a-card class="right-card" :bordered="false">
			<div>
				<div class="">安全策略表</div>
			</div>
			<s-table
				ref="rightTable"
				:columns="rightColumns"
				:data="rightData"
				:alert="options.alert.show"
				bordered
				:row-key="(record) => record.id"
				:tool-config="toolsConfig"
				:size="20"
			>
			</s-table
		></a-card>
	</div>
</template>

<script setup>
	import { Modal, message, notification } from 'ant-design-vue'
	import ipApi from '@/api/topological/ipApi'
	const formRef = ref()
	let leftDataSource = []

	let searchFormState = reactive({})
	const leftTable = ref(null)
	const rightTable = ref(null)
	const strategyForm = ref({ strategyStatus: true, monitoringCycleTime: 0 })

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
	const addRow = (record) => {
		const params = {
			id: record.id,
			bindingStatus: 'bound'
		}
		ipApi.ipEditBind(params).then((res) => message.success('操作成功'))
	}
	const addSelected = (type) => {
		const data = leftDataSource.records.filter((item) => selectedRowKeys.value.includes(item.id))
		data.map((item) => addRow(type, item))
	}
	const handleSearch = () => {
		const params = {
			current: 1,
			searchKey: searchFormState.iteam
		}
		leftData(params)
		rightData(params)
		// leftTable.value.loadData(null, params)
		// rightTable.value.loadData(null, params)
	}
	const toolsConfig = { refresh: false, height: false, columnSetting: false, striped: false }
	const leftColumns = [
		{
			title: 'IP地址',
			dataIndex: 'ipAddress'
		},
		{
			title: 'MAC地址',
			dataIndex: 'macAddress'
		},
		{
			title: '操作',
			dataIndex: 'action'
		}
	]
	const rightColumns = [
		{
			title: '绑定IP地址',
			dataIndex: 'ipAddress'
		},
		{
			title: '绑定MAC地址',
			dataIndex: 'macAddress'
		},
		{
			title: '操作',
			dataIndex: 'action'
		}
	]
	// 列表数据
	const leftData = (params = {}) => {
		return ipApi.ipPage({ ...params, bindingStatus: 'unbound' }).then((res) => {
			leftDataSource = res
			return res
		})
	}
	const rightData = (params = {}) => {
		return ipApi.ipPage({ ...params, bindingStatus: 'bound' }).then((res) => res)
	}
	const handleApply = () => {
		const formValues = strategyForm.value
		ipApi
			.strategyConfig({
				strategyType: 'mac-ip',
				strategyStatus: !formValues.strategyStatus ? 'disable' : 'enable',
				monitoringCycleTime: formValues.monitoringCycleTime
			})
			.then((res) => {
				message.success('操作成功')
			})
	}
</script>

<style lang="less" scoped>
	.fieldset {
		.title {
			padding-left: 10px;
			line-height: 16px;
			font-weight: 500;
			font-size: 16px;
			border-left: 4px solid #3a6fd7;
		}
	}
	.table-box {
		display: flex;
		.btn-group {
			width: 120px;
			display: flex;
			justify-content: center;
		}
		.left-card {
			width: calc((100% - 120px) / 2);
		}
		.right-card {
			width: calc((100% - 120px) / 2);
		}
	}
</style>
