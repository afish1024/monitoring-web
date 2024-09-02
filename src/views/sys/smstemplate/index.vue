<template>
	<a-card :bordered="false" :body-style="{ 'padding-bottom': '0px' }" class="mb-2">
		<a-form ref="formRef" name="advanced_search" :model="searchFormState" class="ant-advanced-search-form">
			<a-row :gutter="24">
				<a-col :span="8">
					<a-form-item label="模板名称" name="searchKey">
						<a-input v-model:value="searchFormState.searchKey" placeholder="请输入模板名称"></a-input>
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
					<a-button type="primary" @click="form.onOpen()" v-if="hasPerm('smsAdd')" >
						<template #icon><plus-outlined /></template>
						新增短信模板
					</a-button>
				</a-space>
			</template>
			<template v-slot:bodyCell="{text, record, index, column}">
				<template v-if="column.dataIndex === 'id'">
					{{index+1 }}
				</template>
				<template v-if="column.dataIndex === 'icon'">
					<a-tag :color="record.color">
						<component :is="record.icon" />
					</a-tag>
				</template>
				<template v-if="column.dataIndex === 'action'">
					<a-space>
						<a @click="form.onOpen(record)"  v-if="hasPerm('smsEdit')" >编辑</a>
						<a-divider type="vertical"  v-if="hasPerm(['smsEdit', 'smsDelete'], 'and')" />
						<a-popconfirm title="确定要删除此模块吗？" @confirm="deleteModule(record)"  v-if="hasPerm('smsDelete')" >
							<a-button type="link" danger size="small">删除</a-button>
						</a-popconfirm>
					</a-space>
				</template>
			</template>
		</s-table>
	</a-card>
	<Form ref="form" @successful="table.refresh(true)" />
</template>

<script setup name="sysModule">
	import { message } from 'ant-design-vue'
	import Form from './form.vue'
	import smstemplateApi from '@/api/biz/smstemplateApi'
	let searchFormState = reactive({})
	const formRef = ref()
	const table = ref()
	let form = ref()
	const toolConfig = { refresh: true, height: true, columnSetting: false, striped: false }
	const columns = [
		{
			title: '序号',
			dataIndex: 'id'
		},
		{
			title: '模板名称',
			dataIndex: 'templateName'
		},
		{
			title: '模板ID',
			dataIndex: 'templateCode',
			sorter: true
		},
		{
			title: '模板内容',
			dataIndex: 'templateContent',
			sorter: true
		},
		{
			title: '排序',
			dataIndex: 'sort',
			sorter: true
		},
		{
			title: '更新时间',
			dataIndex: 'updateTime',
			sorter: true
		}
	]

	// 操作栏通过权限判断是否显示
	if (hasPerm(['smsEdit'],['smsDelete'])) {
		columns.push({
			title: '操作',
			dataIndex: 'action',
			align: 'center',
			width: '200px'
		})
	}

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
		
		return smstemplateApi.temPage(Object.assign(parameter, searchFormState)).then((res) => {
			return res
		})
	}
	// 删除
	const deleteModule = (record) => {
		let params = [
			{
				id: record.id
			}
		]
		smstemplateApi.temDelete(params).then(() => {
			table.value.refresh(true)
		})
	}
	// 批量删除
	const deleteBatchModule = () => {
		if (selectedRowKeys.value.length < 1) {
			message.warning('请选择一条或多条数据')
			return false
		}
		const params = selectedRowKeys.value.map((m) => {
			return {
				id: m
			}
		})
		moduleApi.moduleDelete(params).then(() => {
			table.value.clearRefreshSelected()
		})
	}
</script>
