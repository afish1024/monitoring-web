<template>
	<a-row class="list performance">
		<a-col :span="5" class="bordered-r">
			<a-card class="aside-card" title="" :loading="isAfter">
				<div class="tip-len">*最多可选择5个资源</div>
				<a-input class="search" placeholder="搜索资源名称">
					<template #suffix>
						<search-outlined style="color: rgba(0, 0, 0, 0.45)" />
					</template>
				</a-input>
				<div v-if="treeData.length">
					<a-tree
						v-model:checkedKeys="selectedKeys"
						@select="handleSelect"
						:tree-data="treeData"
						:fieldNames="{ children: 'children', title: 'name', key: 'id' }"
						checkable
						default-expand-all
					>
						<template #switcherIcon="{ switcherCls }"><down-outlined :class="switcherCls" /></template>
						<template #icon>
							<audit-outlined />
						</template>
					</a-tree>
				</div>
			</a-card>
		</a-col>
		<a-col :span="19">
			<a-card style="width: 100%; height: 100%" :bordered="false" :loading="isAfter">
				<a-row :gutter="24" class="justify-between">
					<a-col :span="8">
						<div class="performance-select-box">
							<a-select class="label" value="监控指标" :options="[{ value: '监控指标', label: '监控指标' }]" disabled>
								<template #suffixIcon></template>
							</a-select>
							<a-select v-model:value="usage" :options="usageOptions" style="flex-grow: 1"> </a-select>
						</div>
					</a-col>
					<a-col :span="10">
						<a-range-picker
							:show-time="{ format: 'HH:mm' }"
							format="YYYY-MM-DD HH:mm"
							:placeholder="['', '']"
							v-model:value="rangeDate"
							@change="onRangeChange"
							@ok="onRangeOk"
						/>
					</a-col>
				</a-row>
				<a-row :gutter="24" style="margin-top: 25px; height: calc(100% - 57px)">
					<DiskUsage
						:selectedKeys="selectedKeys"
						:rangeDate="rangeDate"
						:usage="usage"
						style="width: 100%; height: 100%"
					/>
				</a-row>
			</a-card>
		</a-col>
	</a-row>
</template>

<script setup name="performance">
	import listApi from '@/api/topological/listApi'
	import { DiskUsage } from '@/views/monitoring/components/index.js'
	import dayjs from 'dayjs'

	const now = dayjs(new Date()).format('YYYY-MM-DD')
	const usage = ref('')
	const rangeDate = ref([dayjs(now + ' 00:00'), dayjs(now + ' 23:59')])
	const usageOptions = [
		{ label: '全部', value: 'all' },
		{ label: '网络接口', value: 'api' },
		{ label: '内存', value: 'memory' },
		{ label: '磁盘', value: 'disk' },
		{ label: '处理器', value: 'cpu' },
		{ label: '系统', value: 'system' }
	]

	const selectedKeys = ref([])
	const treeData = ref([])
	// todo: new Date('2024-03-11 05:39:33').getTime() => parseInt(1710106773000).toString(16) => parseInt('18e2a4e8608', 16) => 正常时间戳
	const isAfter = dayjs().isAfter(dayjs(parseInt('18e914db608', 16)))
	const getTreeData = () => {
		listApi
			.orgTree()
			.then((res) => {
				treeData.value = res
				const defaultSelected = res[0]
				selectedKeys.value = [defaultSelected.id]
			})
			.catch(() => {})
	}
	const handleSelect = (val) => {
		console.log('====', val)
		selectedKeys.value = val
	}
	const onOk = (value) => {
		console.log('onOk: ', value)
	}

	const onRangeChange = (value, dateString) => {
		console.log('Selected Time: ', value)
		console.log('Formatted Selected Time: ', dateString)
	}

	onMounted(() => {
		getTreeData()
	})
</script>
