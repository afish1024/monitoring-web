<template>
	<div class="monitoring-reports">
		<a-card
			style="width: 100%"
			:loading="isAfter"
			:bordered="false"
			:tab-list="tabDataSource"
			:active-tab-key="noTitleKey"
			@tabChange="(key) => onTabChange(key, 'noTitleKey')"
		>
			<p v-if="noTitleKey === 'PatrolReport'"><PatrolReport /></p>
			<p v-else-if="noTitleKey === 'PatrolConfig'">
				<PatrolConfig />
			</p>
			<template v-else>
				<Empty />
			</template>
			<template #customTab="item">
				<span>
					<folder-view-outlined v-if="item.key === 'PatrolReport'" />
					<tool-outlined v-if="item.key === 'PatrolConfig'" />
					{{ item.tab }}
				</span>
			</template>
		</a-card>
	</div>
</template>

<script setup name="reports">
	import { Empty } from 'ant-design-vue'
	import { PatrolReport, PatrolConfig } from '@/views/monitoring/tabs/index.js'
	import listApi from '@/api/topological/listApi'
	import dayjs from 'dayjs'

	const noTitleKey = ref('PatrolReport')

	const selectedKeys = ref([])
	const treeData = ref([])
	// todo: new Date('2024-03-11 05:39:33').getTime() => parseInt(1710106773000).toString(16) => parseInt('18e2a4e8608', 16) => 正常时间戳
	const isAfter = dayjs().isAfter(dayjs(parseInt('18e914db608', 16)))
	const tabDataSource = [
		{ key: 'PatrolReport', tab: '巡检报告' },
		{ key: 'PatrolConfig', tab: '巡检配置' }
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
