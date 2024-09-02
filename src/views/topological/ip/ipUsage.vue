<template>
	<a-card :bordered="false" :body-style="{ 'padding-bottom': '0px', 'padding-top': '0px' }" class="mb-2">
		<a-form class="ant-advanced-search-form">
			<a-row :gutter="24">
				<a-col :span="12">
					<a-form-item label="网段范围">
						<a-space>
							<a-input v-model:value="searchFormState.startIp" placeholder=""></a-input>
							<span> - </span>
							<a-input v-model:value="searchFormState.endIp" placeholder=""></a-input>
						</a-space>
					</a-form-item>
				</a-col>
				<a-col :span="8" v-if="false">
					<a-form-item label="实时扫描">
						<a-switch v-model:checked="searchFormState.scanning" />
					</a-form-item>
				</a-col>
				<a-button type="primary" @click="handleSearchForm">查询</a-button>
			</a-row>
		</a-form>
	</a-card>
	<div class="table-tools">
		<h2 class="title">IP使用情况</h2>
		<div class="circle-group">
			<div class="circle unUseCount">已使用</div>
			<div class="circle useCount">未使用</div>
			<div class="circle unknown">未知</div>
		</div>
	</div>
	<a-card size="small">
		<template #title>
			<div class="show-condition">
				<div>{{ searchFormState.startIp + ' - ' + searchFormState.endIp }}</div>
				<div>
					IP共{{ usagerate.sumCount }}个<span class="count"
						>（已使用{{ usagerate.useCount }}，未使用{{ usagerate.unUseCount }}，未知{{ usagerate.unknown }}）</span
					>
				</div>
				<div style="width: 280px">IP使用率 <a-progress :percent="usagerate.usageRate" /></div>
			</div>
		</template>
		<!-- <template #extra><a href="#">more</a></template> -->
		<div class="data-list" v-if="dataList.length">
			<!-- <template v-for="(item, index) in dataList" :key="item.id"
				><div :class="'squart normal ' + Object.values(item)" :title="Object.keys(item)">{{ index + 1 }}</div></template
			> -->
			<a-tooltip v-for="(item, index) in dataList" :key="item.ip" :title="item.ip">
				<div class="squart" :style="{ background: item.color }">{{ index + 1 }}</div>
			</a-tooltip>
		</div>
		<a-empty v-else />
	</a-card>
</template>

<script setup name="sysModule">
	import ipApi from '@/api/topological/ipApi'
	import { message } from 'ant-design-vue'
	let searchFormState = reactive({
		startIp: '1.1.1.1',
		endIp: '1.1.1.100',
		scanning: false
	})
	const dataList = ref([])
	const usagerate = ref({})
	const formRef = ref()
	const table = ref()
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
			dataIndex: 'createTime',
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
	const regexIp = /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/
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
		ipApi.ipUsagerate().then((res) => {
			usagerate.value = {
				...(res || {}),
				usageRate: (res?.usageRate || '').replace('%', '')
			}
		})
	}
	const handleSearchForm = () => {
		const { scanning, ...state } = searchFormState
		if (!regexIp.test(state.startIp) || !regexIp.test(state.endIp)) {
			return message.error('请输入有效的 ip 网段')
		}
		ipApi.deviceList(state).then((res) => {
			const { list, ...counts } = res
			const unknown = counts.sumCount - counts.useCount - counts.unUseCount || 0
			const usageRate = (counts?.usageRate || '').replace('%', '')
			usagerate.value = { ...counts, unknown, usageRate }
			dataList.value = list.map((item) => {
				let ip = ''
				let color = ''
				try {
					ip = Object.keys(item)?.[0] || ''
				} catch (e) {
					//
				}
				if (item[ip] === true) {
					color = 'green'
				} else if (item[ip] === false) {
					color = 'red'
				} else {
					color = '#1890ff'
				}
				return {
					ip,
					color
				}
			})
		})
	}
	onMounted(() => {
		handleSearchForm()
		// loadData()
	})
</script>

<style lang="less" scoped>
	.table-tools {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 8px;
		.title {
			padding-left: 10px;
			line-height: 16px;
			font-weight: 500;
			font-size: 16px;
			border-left: 4px solid #3a6fd7;
		}
		.circle-group {
			display: flex;
			align-items: center;
		}
		.circle {
			margin-left: 12px;
			position: relative;
			padding-left: 12px;

			&::before {
				content: '';
				display: block;
				width: 8px;
				height: 8px;
				border-radius: 50%;
				position: absolute;
				top: 50%;
				margin-top: -4px;
				left: 0;
			}
		}
		.useCount::before {
			background-color: red;
		}
		.unUseCount::before {
			background-color: green;
		}
		.unknown::before {
			background-color: #1890ff;
		}
	}
	.show-condition {
		display: flex;
		gap: 50px;
		.count {
			color: #abc;
		}
	}
	.data-list {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 5px;
		.squart {
			width: 32px;
			height: 32px;
			line-height: 32px;
			border-radius: 2px;
			text-align: center;
			color: #fff;
			font-size: 12px;
			// background-color: #1890ff;
			// &.false {
			// 	background-color: red;
			// }
			// &.true {
			// 	background-color: green;
			// }
		}
	}
</style>
