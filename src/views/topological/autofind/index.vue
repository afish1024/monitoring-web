<template>
	<a-card :bordered="false" :body-style="{ 'padding-bottom': '0px' }" class="mb-2">
		<a-form ref="formRef" name="advanced_search" :model="searchFormState" class="ant-advanced-search-form">
			<div class="block-group">
				<div class="title">基本参数</div>
				<a-row :gutter="24">
					<a-col :span="12">
						<a-form-item label="所属网络">
							<a-select v-model:value="searchFormState.area" :options="areas" />
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="补充发现方法" name="extJson">
							<a-select v-model:value="searchFormState.area" :options="areas" />
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="网段范围" name="createTime">
							<a-space>
								<a-input v-model:value="searchFormState.startIp" placeholder=""></a-input>
								<span> - </span>
								<a-input v-model:value="searchFormState.endIp" placeholder=""></a-input>
							</a-space>
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="启用代理" name="createTime">
							<a-switch v-model:checked="searchFormState.proxy" />
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="配置链路参数" name="createTime">
							<a-switch v-model:checked="searchFormState.scanning" />
						</a-form-item>
					</a-col>
				</a-row>
			</div>
			<div class="block-group">
				<div class="title">基本参数</div>
				<a-row :gutter="24" v-for="(item, index) in dataSource" :key="item.id">
					<a-col :span="5">
						<a-form-item label="协议类型">
							<a-select v-model:value="item.type" :options="areas" />
						</a-form-item>
					</a-col>
					<a-col :span="5">
						<a-form-item label="读口令">
							<a-input-password v-model:value="item.ready" placeholder="" />
						</a-form-item>
					</a-col>
					<a-col :span="5">
						<a-form-item label="写口令">
							<a-input-password v-model:value="item.write" placeholder="" />
						</a-form-item>
					</a-col>
					<a-col :span="5">
						<a-form-item label="端口号">
							<a-input v-model:value="item.port" placeholder="" />
						</a-form-item>
					</a-col>
					<template v-if="index === 0">
						<a-button shape="circle" @click="handleAdd"> + </a-button>
					</template>
					<template v-else>
						<a-button shape="circle" @click="() => handleRemove(item, index)"> - </a-button>
					</template>
				</a-row>
				<a-row style="justify-content: right">
					<a-button type="primary" @click="visible = true">
						<template #icon><SearchOutlined /></template>
						开始发现
					</a-button>
				</a-row>
			</div>
		</a-form>
	</a-card>
	<a-modal v-model:visible="visible" title="" width="75%" :footter="null" @ok="handleOk">
		<template #title>
			<div ref="modalTitleRef" style="width: 100%; cursor: move">Draggable Modal</div>
		</template>
		<template #footer>
			<div></div>
		</template>
		<a-steps :current="0">
			<a-step>
				<!-- <span slot="title">Finished</span> -->
				<template #title>设备发现</template>
				<template #description>
					<span></span>
				</template>
				<template #icon>
					<redo-outlined />
				</template>
			</a-step>
			<a-step title="资源发现" sub-title="等待中" description="" />
			<a-step title="监控任务" sub-title="等待中" description="" />
			<a-step title="链路发现" sub-title="等待中" description="" />
		</a-steps>
		<div class="mt-15">
			<a-radio-group v-model:value="modalRadio" button-style="solid">
				<a-radio-button value="1">已发现设备</a-radio-button>
				<a-radio-button value="0">未发现设备</a-radio-button>
			</a-radio-group>
		</div>
		<div>
			<s-table
				ref="modalTable"
				:columns="columns"
				:data="loadData"
				bordered
				:row-key="(record) => record.id"
				:tool-config="toolConfig"
			>
			</s-table>
		</div>
	</a-modal>
</template>

<script setup name="sysModule">
	import ipApi from '@/api/topological/ipApi'
	let searchFormState = reactive({})
	const formRef = ref()
	const visible = ref(false)
	const modalRadio = ref('1')
	const modalTable = ref()
	const areas = []
	const dataSource = ref([])
	const toolConfig = { refresh: false, height: false, columnSetting: false, striped: false }
	const columns = [
		{
			title: '设备名称',
			dataIndex: 'deviceName',
			sort: true,
			width: 80
		},
		{
			title: '设备IP',
			dataIndex: '',
			sorter: true,
			width: 80
		},
		{
			title: '父网络',
			dataIndex: '',
			sorter: true,
			width: 100
		},
		{
			title: '设备类型',
			dataIndex: 'deviceType',
			sorter: true,
			width: 100
		},
		{
			title: 'MAC地址',
			dataIndex: '',
			sorter: true,
			width: 100
		},
		{
			title: '发现状态',
			dataIndex: '',
			sorter: true,
			width: 100
		},
		{
			title: '资源数量',
			dataIndex: '',
			sorter: true,
			width: 100
		},
		{
			title: '任务数量',
			dataIndex: '',
			sorter: true,
			width: 100
		},
		{
			title: '链路数量',
			dataIndex: '',
			sorter: true,
			width: 100
		}
	]
	const handleAdd = () => {
		const id = new Date().getTime()
		dataSource.value.push({
			type: '',
			ready: '',
			write: '',
			port: '',
			id
		})
	}
	const handleRemove = (item, index) => {
		dataSource.value.splice(index, 1)
	}
	const loadData = () => {
		return Promise.resolve([])
	}
	onMounted(handleAdd)
</script>

<style lang="less" scoped>
	.mt-15 {
		margin-top: 15px;
	}
	.block-group {
		.title {
			padding-left: 10px;
			margin-bottom: 10px;
			line-height: 16px;
			font-weight: 500;
			font-size: 16px;
			border-left: 4px solid #3a6fd7;
		}
	}
</style>
