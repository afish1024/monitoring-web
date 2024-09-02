<template>
	<a-card :bordered="false">
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
			<template #operator class="table-operator">
				<a-space>
					<a-button type="primary" @click="formRef.onOpen()" v-if="hasPerm('screenImageInformationAdd')">
						<template #icon><plus-outlined /></template>
						新增
					</a-button>
					<xn-batch-delete
						v-if="hasPerm('screenImageInformationBatchDelete')"
						:selectedRowKeys="selectedRowKeys"
						@batchDelete="deleteBatchScreenImageInformation"
					/>
				</a-space>
			</template>
			<template #bodyCell="{ column, record }">
				<template v-if="column.dataIndex === 'action'">
					<a-space>
						<a @click="formRef.onOpen(record)" v-if="hasPerm('screenImageInformationEdit')">编辑</a>
						<a-divider type="vertical" v-if="hasPerm(['screenImageInformationEdit', 'screenImageInformationDelete'], 'and')" />
						<a-popconfirm title="确定要删除吗？" @confirm="deleteScreenImageInformation(record)">
							<a-button type="link" danger size="small" v-if="hasPerm('screenImageInformationDelete')">删除</a-button>
						</a-popconfirm>
					</a-space>
				</template>
			</template>
		</s-table>
	</a-card>
	<Form ref="formRef" @successful="table.refresh(true)" />
</template>

<script setup name="imageinformation">
	import Form from './form.vue'
	import screenImageInformationApi from '@/api/biz/screenImageInformationApi'
	const table = ref()
	const formRef = ref()
	const toolConfig = { refresh: true, height: true, columnSetting: true, striped: false }
	const columns = [
		{
			title: '报告编号',
			dataIndex: 'reportNumber'
		},
		{
			title: '图像编号',
			dataIndex: 'imageNumber'
		},
		{
			title: '文件名',
			dataIndex: 'fileName'
		},
		{
			title: '缺陷情况',
			dataIndex: 'defectSituation'
		},
		{
			title: '级别',
			dataIndex: 'level'
		},
		{
			title: '创建人',
			dataIndex: 'createUserId'
		},
		{
			title: '修改人',
			dataIndex: 'modifyUserId'
		},
		{
			title: '修改时间',
			dataIndex: 'modifyTime'
		},
	]
	// 操作栏通过权限判断是否显示
	if (hasPerm(['screenImageInformationEdit', 'screenImageInformationDelete'])) {
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
			show: true,
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
		return screenImageInformationApi.screenImageInformationPage(parameter).then((data) => {
			return data
		})
	}
	// 重置
	const reset = () => {
		searchFormRef.value.resetFields()
		table.value.refresh(true)
	}
	// 删除
	const deleteScreenImageInformation = (record) => {
		let params = [
			{
				id: record.id
			}
		]
		screenImageInformationApi.screenImageInformationDelete(params).then(() => {
			table.value.refresh(true)
		})
	}
	// 批量删除
	const deleteBatchScreenImageInformation = (params) => {
		screenImageInformationApi.screenImageInformationDelete(params).then(() => {
			table.value.clearRefreshSelected()
		})
	}
</script>
