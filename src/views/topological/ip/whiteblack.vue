<template>
	<a-card :bordered="false" :body-style="{ 'padding-bottom': '0px', 'padding-top': 0 }" class="mb-2">
		<a-form class="ant-advanced-search-form">
			<div class="fieldset">
				<h2 class="title">策略配置</h2>
				<a-row :gutter="24">
					<a-col :span="8">
						<a-form-item label="生效策略">
							<a-radio-group v-model:value="strategyForm.strategyStatus">
								<a-radio value="white">白名单</a-radio>
								<a-radio value="black">黑名单</a-radio>
								<a-radio value="disable">禁用</a-radio>
							</a-radio-group>
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
						<a-form-item label="设备IP或MAC" name="ipName">
							<a-input v-model:value="searchFormState.ipName" placeholder="请输入模块名称关键词"></a-input>
						</a-form-item>
					</a-col>
					<a-col :span="8">
						<a-button type="primary" @click="getLeftTable">查询</a-button>
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
				:tool-config="leftTools"
				:row-selection="options.rowSelection"
				:size="20"
			>
				<template #bodyCell="{ column, record }">
					<template v-if="column.dataIndex === 'action'">
						<a-button type="link" @click="() => addRow('ipAddress', record)">{{ '-->' }}添加IP</a-button>
						<a-button type="link" @click="() => addRow('macAddress', record)">{{ '-->' }}添加MAC</a-button>
					</template>
				</template>
			</s-table>
		</a-card>
		<a-space class="btn-group" direction="vertical">
			<a-button type="link" :disabled="!selectedRowKeys.length" @click="() => addSelected('ipAddress')"
				>添加IP</a-button
			>
			<a-button type="link" :disabled="!selectedRowKeys.length" @click="() => addSelected('macAddress')"
				>添加MAC</a-button
			>
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
				:tool-config="leftTools"
				:size="20"
			>
				<template #bodyCell="{ column, record }">
					<template v-if="column.dataIndex === 'action'">
						<a-button type="link" @click="() => removeRow(record)">{{ '-->' }}移除</a-button>
					</template>
				</template>
			</s-table></a-card
		>
	</div>
</template>

<script setup>
	import messageApi from '@/api/dev/messageApi'
	import ipApi from '@/api/topological/ipApi'
	const formRef = ref()

	let searchFormState = reactive({})
	const leftTable = ref(null)
	const rightTable = ref(null)
	let leftDataSource = []

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
	const addRow = (field, record) => {
		const params = {
			iteam: field,
			iteamType: field === 'ipAddress' ? 'ip' : 'mac',
			listType: 'white',
			extJson: record.extJson
		}
		ipApi.whiteblackAdd(params).then((res) => {
			leftTable.value.refresh(true)
			rightTable.value.refresh(true)
		})
	}
	const removeRow = (record) => {
		ipApi.whiteblackDelete([{ id: record.id }]).then(() => rightTable.value.refresh(true))
	}
	const strategyForm = ref({ strategyStatus: 'white', monitoringCycleTime: 0 })
	const handleApply = () => {
		const formValues = strategyForm.value

		// if (!formValues.strategyStatus) {
		// 	messages.error('请选择生效策略')
		// }
		// if (formValues.monitoringCycleTime) {
		// 	messages.error('请输入监视周期')
		// }
		ipApi
			.strategyConfig({
				strategyType: 'white-black',
				strategyStatus: formValues.strategyStatus,
				monitoringCycleTime: formValues.monitoringCycleTime
			})
			.then((res) => {
				messageApi.success('操作成功')
			})
	}
	const getLeftTable = () => {
		const params = {
			ipName: searchFormState.ipName
		}
		leftData(params)
	}
	const addSelected = (type) => {
		const data = leftDataSource.records.filter((item) => selectedRowKeys.value.includes(item.id))
		data.map((item) => addRow(type, item))
	}
	const leftTools = { refresh: false, height: false, columnSetting: false, striped: false }
	const leftColumns = [
		{
			title: 'IP地址',
			dataIndex: 'ipAddress',
			width: 80
		},
		{
			title: 'MAC地址',
			dataIndex: 'macAddress',
			width: 180
		},
		{
			title: '操作',
			dataIndex: 'action',
			width: 100
		}
	]
	const rightColumns = [
		{
			title: '类型',
			dataIndex: 'iteamType'
		},
		{
			title: '操作',
			dataIndex: 'action',
			width: 80
		}
	]
	// 列表数据
	const leftData = (parameter) => {
		return ipApi.ipPage(parameter).then((res) => {
			leftDataSource = res
			return res
		})
	}
	const rightData = (parameter) => {
		return ipApi.whiteblackPage().then((res) => res)
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
			width: 100px;
			display: flex;
			justify-content: center;
		}
		.left-card {
			width: calc((100% - 100px) / 2);
		}
		.right-card {
			width: calc((100% - 100px) / 2);
		}
	}
</style>
