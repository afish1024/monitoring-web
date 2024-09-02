<template>
	<a-row class="list">
		<a-col :span="5" class="bordered-r">
			<a-card class="aside-card" title="视图列表">
				<div v-if="treeData.length">
					<a-tree
						v-model:selectedKeys="selectedKeys"
						@select="handleSelect"
						:tree-data="treeData"
						:fieldNames="{ children: 'children', title: 'name', key: 'id' }"
						default-expand-all
					>
						<template #switcherIcon="{ switcherCls }"><down-outlined :class="switcherCls" /></template>
						<template #icon="{ key, selected }">
							<audit-outlined />
						</template>
					</a-tree>
				</div>
			</a-card>
		</a-col>
		<a-col :span="19">
			<a-card
				style="width: 100%"
				:bordered="false"
				:tab-list="tabDataSource"
				:active-tab-key="noTitleKey"
				@tabChange="(key) => onTabChange(key, 'noTitleKey')"
			>
				<p v-if="noTitleKey === 'network'"><network :treeId="treeId"/></p>
				<p v-else-if="noTitleKey === 'device'">
					<device  :treeId="treeId" />
				</p>
				<p v-else-if="noTitleKey === 'link'">
					<linkPage />
				</p>
				<p v-else-if="noTitleKey === 'resource'">
					<resource />
				</p>
				<template v-else>
					<Empty />
				</template>
				<template #customTab="item">
					<span>
						<global-outlined v-if="item.key === 'network'" />
						<hdd-outlined v-if="item.key === 'device'" />
						<share-alt-outlined v-if="item.key === 'link'" />
						<appstore-outlined v-if="item.key === 'resource'" />
						{{ item.tab }}
					</span>
				</template>
			</a-card>
		</a-col>
	</a-row>
</template>

<script setup name="devConfig">
	import { Empty } from 'ant-design-vue'
	import network from './network.vue'
	import device from './device.vue'
	import resource from './resource.vue'
	import linkPage from './link.vue'
	import listApi from '@/api/topological/listApi'
	const key = ref('network')
	const noTitleKey = ref('network')
	const pageParams = ref([])
	const selectedKeys = ref([])
	const treeData = ref([])
	const treeId = ref('')
	const tabDataSource = [
		{ key: 'network', tab: '网络' },
		{ key: 'device', tab: '设备' },
		{ key: 'link', tab: '链路' },
		{ key: 'resource', tab: '资源' }
	]

	const onTabChange = (value, type) => {
		if (type === 'key') {
			key.value = value
		} else if (type === 'noTitleKey') {
			noTitleKey.value = value
		}
	}
	const getTreeData = () => {
		listApi.networkTree().then((res) => {
			if(res){
				treeData.value = res
				const defaultSelected = res[0]
				selectedKeys.value = [defaultSelected.id]
			}else{
				treeData.value = []
			}
			
		})
	}
	const handleSelect = (selectedKeys,e) => {
		const type = e.node.type
		console.log(type)
		console.log(e.node.id)

		if(type == "equipment"){
			noTitleKey.value = 'device'
		}else if(type == "intranet"){
			noTitleKey.value = 'network'
		}

		pageParams.value.id = e.node.id
		treeId.value  = e.node.id
	}
	onMounted(() => {
		getTreeData()
	})
</script>

<style lang="less" scoped>
	.list {
		background-color: #fff;

		.aside-card {
			border: 0;
		}
	}
	.bordered-r {
		border-right: 1px solid var(--border-color-split);
	}
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
