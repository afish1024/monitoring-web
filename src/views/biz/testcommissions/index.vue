<template>
	<a-card :bordered="false" style="margin-bottom: 10px">
		<a-form ref="searchFormRef" name="advanced_search" class="ant-advanced-search-form" :model="searchFormState">
			<a-row :gutter="24">
				<a-col :span="4">
					<a-form-item name="applicantUser" label="">
						<a-input v-model:value="searchFormState.applicantUser" placeholder="申请人" allow-clear ></a-input>
					</a-form-item>
				</a-col>
				<a-col :span="2">
					<a-form-item name="applicantDate" label="">
						<a-date-picker v-model:value="searchFormState.applicantDate" placeholder="申请日期"/>
					</a-form-item>
				</a-col>
				<a-col :span="4">
					<a-button type="primary" @click="table.refresh(true)">
						<template #icon><SearchOutlined /></template>
						查询
					</a-button>
				
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
			:scroll="{ x:1500}" 
		>
			<template #operator class="table-operator">
				<a-space>
					<a-button type="primary" @click="form.onOpen('','add')" v-if="hasPerm('screenTestCommissionsAdd')">
						<template #icon><plus-outlined /></template>
						新增
					</a-button>
					<xn-batch-delete
						v-if="hasPerm('screenTestCommissionsBatchDelete')"
						:selectedRowKeys="selectedRowKeys"
						@batchDelete="deleteBatchScreenTestCommissions"
					/>
				</a-space>
			</template>
			<template #bodyCell="{ column, record }">
				<template v-if="column.dataIndex === 'action'">
					<a-space>
						<a @click="form.onOpen(record,'edit')" v-if="hasPerm('screenTestCommissionsEdit')">编辑</a>
						<a-divider type="vertical" v-if="hasPerm(['screenTestCommissionsEdit', 'screenTestCommissionsDelete'], 'and')" />


						<a @click="form.onOpen(record,'check')" v-if="hasPerm('screenTestCommissionsEdit')">审核</a>


						<a-divider type="vertical" v-if="hasPerm(['screenTestCommissionsEdit', 'screenTestCommissionsDelete'], 'and')" />
						<a-popconfirm title="确定要删除吗？" @confirm="deleteScreenTestCommissions(record)">
							<a-button type="link" danger size="small" v-if="hasPerm('screenTestCommissionsDelete')">删除</a-button>
						</a-popconfirm>
					</a-space>
				</template>
			</template>
		</s-table>
	</a-card>
	<Form ref="form" @successful="table.refresh(true)" />
</template>


<script setup name="testcommissions">
	import Form from './form.vue'
	import screenTestCommissionsApi from '@/api/biz/screenTestCommissionsApi'
	const table = ref()
	let form = ref()
	const toolConfig = { refresh: true, height: true, columnSetting: true, striped: false }
	let searchFormState = reactive({})

	const columns = [
		{
			title: '委托单位',
			dataIndex: 'client',
			width: 200, 
			fixed: 'left',
		},
		{
			title: '生产令号',
			dataIndex: 'productionOrderNumber',
			width: 100, 
			fixed: 'left',
		},
		{
			title: '零部件名称',
			dataIndex: 'componentComponentName',
			width: 100, 
		},
		{
			title: '零部件编号',
			dataIndex: 'partNumber',
			width: 100, 
		},
		{
			title: '检件材质',
			dataIndex: 'materialInspectionPiece',
			width: 100, 
		},
		{
			title: '检测标准',
			dataIndex: 'testingStandards',
			width: 100, 
		},
		{
			title: '分析检测项目',
			dataIndex: 'analysisTestingItems',
			width: 150, 
		},
		{
			title: '申请人员',
			dataIndex: 'applicantUser',
			width: 100, 
		},
		{
			title: '申请时间',
			dataIndex: 'applicantDate',
			width: 200, 
		},
		{
			title: '申请状态',
			dataIndex: 'applicantStatus',
			width: 100, 
		},
		{
			title: '检测人员',
			dataIndex: 'testingUser',
			width: 100, 
		},
		{
			title: '拒绝原因',
			dataIndex: 'rejectReason',
			width: 100, 
		},
		{
			title: '工序',
			dataIndex: 'productionProcesses',
			width: 100, 
		},
		{
			title: '图号',
			dataIndex: 'drawingNo',
			width: 100, 
		},
		{
			title: '数量',
			dataIndex: 'number',
			width: 100, 
		},
		{
			title: '外观质量',
			dataIndex: 'appearance',
			width: 100, 
		},
		{
			title: '检件规格',
			dataIndex: 'inspectionSpecification',
			width: 100, 
		},
		{
			title: '检测比例',
			dataIndex: 'detectionRatio',
			width: 100, 
		},
		{
			title: '验收标准',
			dataIndex: 'acceptanceCriteria',
			width: 100, 
		},
		{
			title: '申请时间',
			dataIndex: 'applicantDate',
			width: 150, 
		},
		
	]
	// 操作栏通过权限判断是否显示
	if (hasPerm(['screenTestCommissionsEdit', 'screenTestCommissionsDelete'])) {
		columns.push({
			title: '操作',
			dataIndex: 'action',
			align: 'center',
			width: '200px',
			fixed: 'right',
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
		return screenTestCommissionsApi.screenTestCommissionsPage(Object.assign(parameter, searchFormState)).then((data) => {
			return data
		})
	}
	// 重置
	const reset = () => {
		searchFormRef.value.resetFields()
		table.value.refresh(true)
	}
	// 删除
	const deleteScreenTestCommissions = (record) => {
		let params = [
			{
				id: record.id
			}
		]
		screenTestCommissionsApi.screenTestCommissionsDelete(params).then(() => {
			table.value.refresh(true)
		})
	}
	// 批量删除
	const deleteBatchScreenTestCommissions = (params) => {
		screenTestCommissionsApi.screenTestCommissionsDelete(params).then(() => {
			table.value.clearRefreshSelected()
		})
	}
</script>


<style scoped></style>
