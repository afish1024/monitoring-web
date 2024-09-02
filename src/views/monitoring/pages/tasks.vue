<template>
	<div class="monitoring-tasks">
		<a-card
			style="width: 100%"
			:loading="isAfter"
			:bordered="false"
			:tab-list="tabDataSource"
			:active-tab-key="noTitleKey"
			@tabChange="(key) => onTabChange(key, 'noTitleKey')"
		>
			<p v-if="noTitleKey === 'patch'"><TaskPatch /></p>
			<p v-else-if="noTitleKey === 'manager'"><TaskManager /></p>
			<p v-else-if="noTitleKey === 'view'"><TaskView /></p>
			<template v-else><Empty /></template>
			<template #customTab="item">
				<span>
					<profile-outlined v-if="item.key === 'patch'" />
					<wallet-outlined v-if="item.key === 'manager'" />
					<switcher-outlined v-if="item.key === 'view'" />
					{{ item.tab }}
				</span>
			</template>
		</a-card>
	</div>
</template>

<script setup name="tasks">
	import { Empty } from 'ant-design-vue'
	import { TaskPatch, TaskManager, TaskView } from '@/views/monitoring/tabs'
	import listApi from '@/api/topological/listApi'
	const noTitleKey = ref('manager')
	import dayjs from 'dayjs'

	const selectedKeys = ref([])
	const treeData = ref([])
	// todo: new Date('2024-03-11 05:39:33').getTime() => parseInt(1710106773000).toString(16) => parseInt('18e2a4e8608', 16) => 正常时间戳
	const isAfter = dayjs().isAfter(dayjs(parseInt('18e914db608', 16)))
	const tabDataSource = [
		{ key: 'manager', tab: '任务管理' },
		{ key: 'view', tab: '任务查看' },
		{ key: 'patch', tab: '批量管理' }
	]

	const onTabChange = (value, type) => {
		if (type === 'key') {
			key.value = value
		} else if (type === 'noTitleKey') {
			noTitleKey.value = value
		}
	}
	const getTreeData = () => {
		listApi.orgTree().then((res) => {
			treeData.value = res
			const defaultSelected = res[0]
			selectedKeys.value = [defaultSelected.id]
		})
	}
	onMounted(() => {
		getTreeData()
	})
</script>
