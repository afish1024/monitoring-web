<template>
    <a-card :bordered="false" :body-style="{ 'padding-bottom': '0px' }" class="mb-2">
		<a-form ref="formRef" name="advanced_search" :model="searchFormState" class="ant-advanced-search-form">
			<a-row :gutter="24">
				<a-col :span="4">
					<a-form-item label="" name="searchKey">
						<a-input v-model:value="searchFormState.searchKey" placeholder="请输入检测标号" allow-clear></a-input>
					</a-form-item>
				</a-col>
				<a-col :span="4">
					<a-form-item label="" name="searchKey">
						<a-input v-model:value="searchFormState.searchKey" placeholder="请输入检测人员" allow-clear></a-input>
					</a-form-item>
				</a-col>
				<a-col :span="4">
					<a-form-item label="" name="searchKey">
						<a-date-picker v-model:value="searchFormState.birthday" value-format="YYYY-MM-DD" style="width: 100%" placeholder="请输入检测日期"/>
					</a-form-item>
				</a-col>
				<a-col :span="4">
					<a-form-item label="" name="searchKey">
						<a-select
							v-model:value="searchFormState.positionId"
							:options="conclusionData"
							:field-names="{ label: 'name', value: 'id' }"
							style="width: 100%"
							placeholder="请选择检测结论"
							allow-clear
						>
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
			:row-selection="options.rowSelection"
		>
			
			<template #bodyCell="{ column, record }">
				<template v-if="column.dataIndex === 'icon'">
					<component :is="record.icon" />
				</template>
				<template v-if="column.dataIndex === 'menuType'">
					<a-tag v-if="record.menuType === 'MENU'" color="blue">
						{{ $TOOL.dictTypeData('MENU_TYPE', record.menuType) }}页
					</a-tag>
					<a-tag v-if="record.menuType === 'IFRAME'" color="purple">
						{{ $TOOL.dictTypeData('MENU_TYPE', record.menuType) }}页
					</a-tag>
					<a-tag v-if="record.menuType === 'LINK'" color="orange">
						{{ $TOOL.dictTypeData('MENU_TYPE', record.menuType) }}页
					</a-tag>
				</template>
				<template v-if="column.dataIndex === 'action'">
					<a-space>
						<a @click="form.onOpen(1)">详情</a>
						
					</a-space>
				</template>
			</template>
		</s-table>
	</a-card>
	<Form ref="form" @successful="table.refresh(true)" />


</template>
<script setup name="technologyList">
import { message } from 'ant-design-vue'
	import spaApi from '@/api/sys/resource/spaApi'
	import tool from '@/utils/tool'
	import Form from './form.vue'
	let searchFormState = reactive({})
	const formRef = ref()
	const table = ref(null)
	let form = ref()

	const conclusionData = [
      { name: '合格', value: '合格' },
      { name: '不合格', value: '不合格' },
    ];
	const toolConfig = { refresh: true, height: true, columnSetting: false, striped: false }
	const columns = [
		{
			title: '报告编号',
			dataIndex: 'title',
			width: 260
		},
		{
			title: '检测人',
			dataIndex: 'icon'
		},
		{
			title: '检测名称',
			dataIndex: 'menuType'
		},
		{
			title: '检测材质',
			dataIndex: 'path',
			ellipsis: true,
			width: 150
		},
		{
			title: '检测结论',
			dataIndex: 'component',
			ellipsis: true,
			width: 150
		},
		{
			title: '报告时间',
			dataIndex: 'component',
			ellipsis: true,
			width: 150
		},
		{
			title: '操作',
			dataIndex: 'action',
			align: 'center',
			sorter: true
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
	let categoryOptions = tool
		.dictTypeList('MENU_TYPE')
		.filter((item) => {
			// 排除
			if (item.dictValue !== 'CATALOG') {
				return item
			}
		})
		.map((item) => {
			return {
				value: item['dictValue'],
				label: item['name'] + '页'
			}
		})
	// 列表数据
	const loadData = (parameter) => {
		return spaApi.spaPage(Object.assign(parameter, searchFormState)).then((res) => {
			return res
		})
	}
	// 删除
	const removeSpa = (record) => {
		let params = [
			{
				id: record.id
			}
		]
		spaApi.spaDelete(params).then(() => {
			table.value.refresh(true)
		})
	}
	// 批量删除
	const deleteBatchSpa = () => {
		if (selectedRowKeys.value.length < 1) {
			message.warning('请选择一条或多条数据')
			return false
		}
		const params = selectedRowKeys.value.map((m) => {
			return {
				id: m
			}
		})
		spaApi.spaDelete(params).then(() => {
			table.value.clearRefreshSelected()
		})
	}
</script>


<style scoped></style>
