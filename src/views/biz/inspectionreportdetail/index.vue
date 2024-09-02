<template>
	<a-card :bordered="false" :body-style="{ 'padding-bottom': '0px' }" style="margin-bottom: 10px">
		<a-form ref="formRef" name="advanced_search" :model="searchFormState" class="ant-advanced-search-form">
			<a-row :gutter="24">
				<a-col :span="4">
					<a-form-item label="" name="testingStandardNumber">
						<a-input v-model:value="searchFormState.testingStandardNumber" placeholder="报告编号" allow-clear></a-input>
					</a-form-item>
				</a-col>
				<a-col :span="4">
					<a-form-item label="" name="testingUser">
						<a-input v-model:value="searchFormState.testingUser" placeholder="检测人员" allow-clear></a-input>
					</a-form-item>
				</a-col>
				<a-col :span="2">
					<a-form-item name="reportDate" label="">
						<a-date-picker v-model:value="searchFormState.reportDate" placeholder="报告时间"  allow-clear/>
					</a-form-item>
				</a-col>
				<a-col :span="4">
					<a-form-item name="detectionResult">
						<a-select v-model:value="searchFormState.detectionResult" placeholder="请选择检测结论"  allow-clear>
							<a-select-option value="合格">合格</a-select-option>
							<a-select-option value="不合格">不合格</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>
				<a-col :span="8">
					<a-button type="primary" html-type="submit" @click="table.refresh()">查询</a-button>
				</a-col>
			</a-row>
		</a-form>
	</a-card>
	<a-card :bordered="false">
		<s-table
			ref="table"
			:columns="columns"
			:data="loadData"
			:alert="options.alert.show"
			bordered
			:row-key="(record) => record.id"
			:tool-config="toolConfig"
			:scroll="{x:1500}" 
			
		>
			<template #bodyCell="{ column, record }">
				<template v-if="column.dataIndex === 'action'">
					<a-space>
						<a @click="formRef.onOpen(record)" v-if="hasPerm('screenInspectionReportDetailEdit')">详情</a>
						
					</a-space>
				</template>
			</template>
		</s-table>

	</a-card>
	<Form ref="formRef" @successful="table.refresh(true)" />


</template>

<script setup name="inspectionreportdetail">
	import Form from './form.vue'
	import screenInspectionReportDetailApi from '@/api/biz/screenInspectionReportDetailApi'
	const table = ref()
	const formRef = ref()
	let searchFormState = reactive({})
	const toolConfig = { refresh: true, height: true, columnSetting: true, striped: false }
	const columns = [
		{
			title: '报告编号',
			dataIndex: 'testingStandardNumber',
			width: 200, 
			fixed: 'left'
		},
		{
			title: '检测人',
			dataIndex: 'testingUser',
			width: 200, 
		},
		{
			title: '零部件名称',
			dataIndex: 'componentName',
			width: 100, 
		},
		{
			title: '检测材质',
			dataIndex: 'materialInspectionPiece',
			width: 100, 
		},
		{
			title: '检测结论',
			dataIndex: 'detectionResult',
			width: 100, 
		},
		{
			title: '报告时间',
			dataIndex: 'reportDate',
			width: 100, 
		},
	]
	
	// 操作栏通过权限判断是否显示
	if (hasPerm(['screenInspectionReportDetailEdit', 'screenInspectionReportDetailDelete'])) {
		columns.push({
			title: '操作',
			dataIndex: 'action',
			align: 'center',
			width: '150px'
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
		return screenInspectionReportDetailApi.screenInspectionReportDetailPage(Object.assign(parameter, searchFormState)).then((data) => {
			return data
		})
	}
	// 重置
	const reset = () => {
		searchFormRef.value.resetFields()
		table.value.refresh(true)
	}
	// 删除
	const deleteScreenInspectionReportDetail = (record) => {
		let params = [
			{
				id: record.id
			}
		]
		screenInspectionReportDetailApi.screenInspectionReportDetailDelete(params).then(() => {
			table.value.refresh(true)
		})
	}
	// 批量删除
	const deleteBatchScreenInspectionReportDetail = (params) => {
		screenInspectionReportDetailApi.screenInspectionReportDetailDelete(params).then(() => {
			table.value.clearRefreshSelected()
		})
	}


</script>
