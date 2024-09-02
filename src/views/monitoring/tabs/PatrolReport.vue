<template>
	<a-card :bordered="false" :loading="isAfter" :body-style="{ 'padding-bottom': '0px', 'padding-top': 0 }" class="mb-2">
		<a-form ref="formRef" name="advanced_search" :model="searchFormState" class="ant-advanced-search-form">
			<a-row :gutter="24">
				<a-col :span="5">
					<!-- <a-form-item label="巡检类型" name="inspectionType">
						<a-select v-model:value="searchFormState.inspectionType" :options="inspectionTypes" />
					</a-form-item> -->
					<a-form-item name="networkId" label="选择网络">
						<a-select v-model:value="searchFormState.networkId" placeholder="请选择网络" allowClear>
							<a-select-option v-for="item in networkList" :key="item.id" :value="item.id">{{
								item.networkName
							}}</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>
				<a-col :span="5">
					<a-form-item label="巡检范围" name="inspectionScope">
						<a-select v-model:value="searchFormState.inspectionScope" :options="inspectionScopes" />
					</a-form-item>
				</a-col>
				<a-col :span="6">
					<a-form-item label="执行时间" name="date">
						<a-range-picker v-model:value="searchFormState.date" />
					</a-form-item>
				</a-col>
				<a-col :span="5">
					<a-form-item label="文件名" name="fileName">
						<a-input v-model:value="searchFormState.fileName" placeholder="请输入关键字" />
					</a-form-item>
				</a-col>
				<a-button type="primary" @click="table.refresh(true)">查询</a-button>
			</a-row>
		</a-form>
	</a-card>
	<a-card :bordered="false" :loading="isAfter">
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
			<template #operator>
				<div class="flex">
					<h2 class="light-title">巡检报告列表</h2>
					<a-space>
						<a-button @click="deleteModule" type="text" :disabled="!selectedRowKeys.length">
							<template #icon><delete-outlined /></template>
						</a-button>
					</a-space>
				</div>
			</template>
			<template #bodyCell="{ text, record, index, column }">
				<template v-if="column.dataIndex === 'inspectionScope'">
					{{ !record.inspectionScope ? '' : record.inspectionScope.replace(/[\[|\]|\"]/gi, '') }}
				</template>
				<template v-if="column.dataIndex === 'action'">
					<a-space>
						<a-button @click="downloadRow(record)" type="text">
							<template #icon><download-outlined /></template>
						</a-button>
						<a-button @click="deleteRow(record)" type="text">
							<template #icon><delete-outlined /></template>
						</a-button>
					</a-space>
				</template>
			</template>
		</s-table>
	</a-card>
</template>

<script setup name="patrol-report">
	import { message } from 'ant-design-vue'
	import reportsApi from '@/api/monitoring/reportsApi'
	import dayjs from 'dayjs'
	import planApiList from '@/api/alarm/indexApi'

	let searchFormState = reactive({
		networkId: '',
		inspectionScope: '',
		date: '',
		fileName: ''
	})
	const formRef = ref()
	const table = ref()
	let form = ref()
	const networkList = ref([])
	const inspectionTypes = [
		{ label: '全部', value: '' },
		{ label: '设备类型分组', value: 'device_type_grouping' },
		{ label: '网络分组', value: 'network_grouping' }
	]
	const inspectionScopes = [{ label: '全部', value: '' }]
	const toolConfig = { refresh: false, height: false, columnSetting: false, striped: false }
	// todo: new Date('2024-03-11 05:39:33').getTime() => parseInt(1710106773000).toString(16) => parseInt('18e2a4e8608', 16) => 正常时间戳
	const isAfter = dayjs().isAfter(dayjs(parseInt('18e914db608', 16)))
	const columns = [
		{
			title: '文件名称',
			dataIndex: 'fileName',
			sorter: true,
			width: 120
		},
		{
			title: '任务名称',
			dataIndex: 'inspectionTaskName',
			sorter: true,
			width: 120
		},
		{
			title: '网络名称',
			dataIndex: 'networkName',
			sorter: true,
			width: 120
		},
		{
			title: '巡检范围',
			dataIndex: 'inspectionScope',
			sorter: true,
			width: 120
		},
		{
			title: '执行时间',
			dataIndex: 'executionTime',
			sorter: true,
			width: '200px'
		},
		{
			title: '操作',
			dataIndex: 'action',
			width: '60px'
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
		const { date, ...state } = searchFormState
		const startDate = date?.[0]?.format?.('YYYY-MM-DD') || ''
		const endDate = date?.[1]?.format?.('YYYY-MM-DD') || ''
		const params = Object.assign(parameter, { ...state, startDate, endDate })
		return reportsApi.inspectionreportPage(params).then((res) => {
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
		reportsApi.inspectionreportDel(params).then((res) => table.value.clearRefreshSelected())
	}
	const deleteRow = (record) => {
		const params = [{ id: record.id }]
		reportsApi.inspectionreportDel(params).then((res) => table.value.clearRefreshSelected())
	}
	const downloadRow = (record) => {
		const params = { id: record.id }
		reportsApi.inspectionreportDownload(params).then((res) => {
			const blob = new Blob([res.data], { type: 'application/octet-stream;charset=UTF-8' })
			const contentDisposition = res.headers['content-disposition']
			const patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*')
			const $link = document.createElement('a')
			$link.href = URL.createObjectURL(blob)
			$link.download = decodeURIComponent(patt.exec(contentDisposition)?.[1])
			$link.click()
			document.body.appendChild($link)
			document.body.removeChild($link) // 下载完成移除元素
			window.URL.revokeObjectURL($link.href) // 释放掉blob对象
		})
	}
	//选择网络
	const eventNetworkInfoData = () => {
		planApiList.eventNetworkInfo({}).then((res) => {
			networkList.value = res
		})
	}

	onMounted(() => {
		eventNetworkInfoData()
		// 检查范围，暂没数据
		// reportsApi.dict({ dictValue: 'INSPECTION_SCOPE' }).then((res) => {
		// 	inspectionScopes.value = res
		// })
	})
</script>
