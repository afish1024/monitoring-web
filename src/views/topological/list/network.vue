<template>
	<a-card :bordered="false" :body-style="{ 'padding-bottom': '0px', 'padding-top': 0 }" class="mb-2">
		<a-form ref="formRef" name="advanced_search" :model="searchFormState" class="ant-advanced-search-form">
			<a-row :gutter="24">
				<a-col :span="8">
					<a-form-item label="网络名称" name="searchKey">
						<a-input v-model:value="searchFormState.searchKey" placeholder="请输入网络"></a-input>
					</a-form-item>
				</a-col>
				<a-col :span="8">
					<a-button type="primary" @click="table.refresh(true)">查询</a-button>
				</a-col>
			</a-row>
		</a-form>
	</a-card>
	<a-card :bordered="false">
		<div class="table-tools">
			<h2 class="title">网络列表</h2>
			<div class="btn-group">
				<a-button @click="form.onOpen()">
					<template #icon><plus-outlined /></template>
				</a-button>
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
			<template #bodyCell="{ column, record }">
				<template v-if="column.dataIndex === 'displayIcon'">
					<a-image
						:width="30"
						:height="30"
						:src="server"
					/>
				</template>
				<template v-if="column.dataIndex === 'action'">
					<a-space>
						<edit-outlined @click="form.onOpen(record)" v-if="record.id != 0"/>
						<template v-if="record.id != 0">
							<a-popconfirm title="确定要删除吗？" @confirm="confirm(record)">
								<delete-outlined />
							</a-popconfirm>
						</template>
					</a-space>
				</template>
			</template> 
		</s-table>
	</a-card>
	<networkFrom ref="form" @successful="table.refresh(true)"></networkFrom>
</template>

<script setup name="sysModule">
	import { message } from 'ant-design-vue'
	import listApi from '@/api/topological/listApi'
	import networkFrom from './from.vue'
	import server from '@/assets/images/server.svg';
	import {
		ref,
		watch
	} from 'vue'
	// 接收值
	const props = defineProps({
		treeId: {
			type: Number,
			default: 0
		}
	})
	const formRef = ref()
	const table = ref()
	const form = ref()
	
	// watch(
    //   () => props.data,
    //   async () => {
    //     let record = unref(props.data);
    //     console.log(record)
    //   },
    //   { deep: true, immediate: true }
    // );
		let searchFormState = reactive({})

	const toolConfig = { refresh: false, height: false, columnSetting: false, striped: false }

	const columns = [
		{
			title: '网络名称',
			dataIndex: 'networkName',
			sorter: true
		},
		{
			title: '网络描述',
			dataIndex: 'networkDescribe',
			ellipsis:true,
			sorter: true
		},
		{
			title: '显示图标',
			dataIndex: 'displayIcon',
			sorter: true
		},
		{
			title: '设备数量',
			dataIndex: 'deviceCount',
			sorter: true
		},
		{
			title: '告警信息',
			dataIndex: 'alarmInformation',
			sorter: true,
			width: '200px'
		},
		{
			title: '操作',
			dataIndex: 'action',
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
		console.log(searchFormState)
		return listApi.networkPage(Object.assign(parameter, searchFormState)).then((res) => {
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
		listApi.networkDelete(params).then((res) => table.value.clearRefreshSelected())
	}
	const confirm = (record) => {
		let params = [
			{
			id: record.id
			}
		]
		listApi.networkDelete(params).then(() => {
			table.value.refresh(true)
		})
	}
	watch(() => props.treeId,(newVal, oldVal) => {

		searchFormState.netWorkId = newVal
		table.value.refresh(true)
		loadData({})
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
