<template>
	<div class="monitoring-peranalysis" ref="peranalysis">
		<a-card :bordered="false" :body-style="{ 'padding-bottom': '0px' }" :loading="isAfter" class="mb-2">
			<a-form ref="formRef" name="advanced_search" :model="searchFormState" class="ant-advanced-search-form">
				<a-row :gutter="24">
					<a-col :span="6">
						<a-form-item label="选择设备" name="deviceId">
							<!-- <a-select v-model:value="searchFormState.resourceType" :options="resourceTypes" /> -->
							<a-select
								v-model:value="searchFormState.deviceId"
								show-search
								placeholder="输入选择设备"
								:default-active-first-option="false"
								:show-arrow="false"
								:filter-option="false"
								:not-found-content="null"
								:fieldNames="{ label: 'deviceName', value: 'id' }"
								:options="deviceOptions"
								@search="searchDevice"
							></a-select>
						</a-form-item>
					</a-col>
					<a-col :span="6">
						<a-form-item label="资源名称" name="resourceName">
							<a-select v-model:value="searchFormState.resourceName" :options="resourceNames" />
						</a-form-item>
					</a-col>
					<a-col :span="6">
						<a-form-item label="监视器名称" name="monitorTaskId">
							<a-select v-model:value="searchFormState.monitorTaskId" :options="monitorTaskIds" />
						</a-form-item>
					</a-col>
					<a-button type="primary" @click="handleQuery">查询</a-button>
				</a-row>
				<a-row>
					<a-col>
						<a-form-item label="">
							<a-radio-group v-model:value="pertype" button-style="solid" @change="handlePertype">
								<a-radio-button value="detail">详细性能</a-radio-button>
								<a-radio-button value="total">汇总性能</a-radio-button>
							</a-radio-group>
						</a-form-item>
					</a-col>

					<a-col :offset="1">
						<a-form-item label="" name="lastTime">
							<a-radio-group v-model:value="searchFormState.lastTime" button-style="solid" @change="handleQuery">
								<template v-if="pertype === 'detail'">
									<a-radio-button class="mr-10" :value="0">近30分钟</a-radio-button>
									<a-radio-button class="mr-10" :value="1">近1小时</a-radio-button>
									<a-radio-button class="mr-10" :value="2">近1天</a-radio-button>
								</template>
								<template v-else-if="pertype === 'total'">
									<a-radio-button class="mr-10" :value="3">近7天</a-radio-button>
									<a-radio-button class="mr-10" :value="4">近30天</a-radio-button>
								</template>
							</a-radio-group>
						</a-form-item>
					</a-col>
					<a-col>
						<a-form-item label="">
							<a-range-picker @change="dateChange" show-time />
						</a-form-item>
					</a-col>
				</a-row>
			</a-form>
		</a-card>

		<a-row :gutter="10" style="margin-top: 10px">
			<a-col :span="12" style="margin-bottom: 10px">
				<UsageRate title="cpu 使用率" name="cpu" :params="usageParams" :count="0" />
			</a-col>
			<a-col :span="12" style="margin-bottom: 10px">
				<UsageRate title="硬盘使用率" name="disk" :params="usageParams" :count="0" />
			</a-col>
			<a-col :span="12" style="margin-bottom: 10px">
				<UsageRate title="内存使用率" name="memory" :params="usageParams" :count="0" />
			</a-col>
		</a-row>
	</div>
</template>

<script setup name="peranalysis">
	import { message } from 'ant-design-vue'
	import { UsageRate } from '@/views/monitoring/components/index.js'
	import peranalysisApi from '@/api/monitoring/peranalysisApi'
	import dayjs from 'dayjs'

	const format = 'YYYY-MM-DD HH:mm:ss'
	let searchFormState = reactive({
		deviceId: '',
		monitorTaskId: '',
		resourceName: '',
		resourceType: '',
		endDate: '',
		// 详细性能 是30分钟 1小时 1天
		// 汇总性能 是7天 30天
		// 近30分钟：0 近1小时：1 近1天：2 近7天：3 近30天：4
		lastTime: 0,
		startDate: ''
	})
	const queryCount = ref(0)
	const pertype = ref('detail')
	const deviceOptions = ref([])
	const usageParams = ref({})
	const peranalysis = ref()

	const formRef = ref()

	// todo: new Date('2024-03-11 05:39:33').getTime() => parseInt(1710106773000).toString(16) => parseInt('18e2a4e8608', 16) => 正常时间戳
	const isAfter = dayjs().isAfter(dayjs(parseInt('18e914db608', 16)))
	const monitorTaskIds = [{ label: '全部', value: '' }]
	const resourceNames = [
		{ label: '全部', value: '' },
		{ label: '网络接口', value: 'api' },
		{ label: '内存', value: 'memory' },
		{ label: '磁盘', value: 'disk' },
		{ label: '处理器', value: 'cpu' },
		{ label: '系统', value: 'system' }
	]

	let timeout
	const searchDevice = (val) => {
		if (timeout) {
			clearTimeout(timeout)
			timeout = null
		}
		timeout = setTimeout(() => {
			getDevidePage(val)
		}, 500)
	}
	function getDevidePage(value = '') {
		// todo
		isAfter && peranalysis.value.remove()
		const params = { current: 1, deviceStatus: 'normal', size: 999, searchKey: value }
		peranalysisApi.devicePage(params).then((res) => {
			deviceOptions.value = res.records

			if (!value) {
				searchFormState.deviceId = res.records[0].id
				handleQuery()
			}
		})
	}

	const handlePertype = () => {
		if (pertype.value === 'detail') {
			searchFormState.lastTime = 0
		} else if (pertype.value === 'total') {
			searchFormState.lastTime = 3
		}
		handleQuery()
	}
	const getCpuUsageRate = () => {
		peranalysisApi.cpuUsageRate({ ...searchFormState, resourceType: 'cpu' })
	}
	const getDiskUsageRate = () => {
		peranalysisApi.diskUsageRate({ ...searchFormState, resourceType: 'disk' })
	}
	const getMemoryUsageRate = () => {
		peranalysisApi.memoryUsageRate({ ...searchFormState, resourceType: 'memory' })
	}
	const handleQuery = () => {
		usageParams.value = { ...searchFormState }
	}
	const dateChange = (val) => {
		let startDate = val?.[0] || ''
		let endDate = val?.[1] || ''

		if (startDate && endDate) {
			startDate = startDate.format(format)
			endDate = endDate.format(format)
		}
		searchFormState.startDate = startDate
		searchFormState.endDate = endDate

		handleQuery()
	}

	onMounted(() => {
		getDevidePage()
	})
</script>
