<template>
	<a-drawer
		:title="formData.id ? '编辑监控任务' : '增加监控任务'"
		:width="600"
		:visible="visible"
		:destroy-on-close="true"
		:body-style="{ paddingBottom: '80px' }"
		:footer-style="{ textAlign: 'right' }"
		@close="onClose"
	>
		<a-form ref="formRef" :model="formData" :rules="formRules">
			<a-row>
				<a-col :span="11">
					<a-form-item label="监视器名称" name="monitorName">
						<a-input v-model:value="formData.monitorName" placeholder="请输入监视器名称" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="11" :offset="1">
					<a-form-item label="监视器类型" name="monitorType">
						<a-select v-model:value="formData.monitorType" :options="monitorTypes" />
					</a-form-item>
				</a-col>
				<a-col :span="11">
					<a-form-item label="运行设备名称" name="deviceId">
						<a-select
							v-model:value="formData.deviceId"
							show-search
							placeholder="请选择运行设备名称"
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
				<a-col :span="11" :offset="1">
					<a-form-item label="运行设备IP">
						<a-input :value="tran(formData.deviceId, deviceOptions)" placeholder="请选择运行设备名称" disabled />
					</a-form-item>
				</a-col>
				<a-col :span="11">
					<a-form-item label="监视资源类型" name="resourceType">
						<a-select v-model:value="formData.resourceType" :options="resourceTypes" />
					</a-form-item>
				</a-col>
				<a-col :span="11" :offset="1">
					<a-form-item label="运行间隔（秒）" name="defaultRunInterval">
						<a-input v-model:value="formData.defaultRunInterval" placeholder="请输入运行间隔" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="11">
					<a-form-item label="阀值" name="defaultThreshold">
						<a-input v-model:value="formData.defaultThreshold" placeholder="请输入阀值" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="11" :offset="1">
					<a-form-item label="监视器描述" name="monitorDescribe">
						<a-input v-model:value="formData.monitorDescribe" placeholder="请输入监视器描述" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="11">
					<a-form-item label="资源名称" name="resourceName">
						<a-input v-model:value="formData.resourceName" placeholder="请输入资源名称" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>
		</a-form>
		<template #footer>
			<a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
			<a-button type="primary" @click="onSubmit">保存</a-button>
		</template>
	</a-drawer>
</template>

<script setup>
	import { required } from '@/utils/formRules'
	import tasksApi from '@/api/monitoring/tasksApi'
	import peranalysisApi from '@/api/monitoring/peranalysisApi'

	// 默认是关闭状态
	let visible = ref(false)
	const emit = defineEmits({ successful: null })
	const formRef = ref()
	// 表单数据
	const formData = ref({})
	const deviceOptions = ref([])

	const resourceTypes = [
		{ label: '全部', value: '' },
		{ label: '网络接口', value: 'api' },
		{ label: '内存', value: 'memory' },
		{ label: '磁盘', value: 'disk' },
		{ label: '处理器', value: 'cpu' },
		{ label: '系统', value: 'system' }
	]
	const monitorTypes = [
		{ label: '全部', value: '' },
		{ label: '故障', value: 'fault' },
		{ label: '性能', value: 'performance' }
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
		const params = { current: 1, deviceStatus: 'normal', size: 999, searchKey: value }
		peranalysisApi.devicePage(params).then((res) => {
			deviceOptions.value = res.records

			if (!value) {
				// searchFormState.deviceId = res.records[0].id
			}
		})
	}
	const tran = (val, options) => {
		const item = options.find((item) => item?.id === val)

		return item?.ipAddress || ''
	}

	// 打开抽屉
	const onOpen = (record) => {
		visible.value = true
		formData.value = {
			sortCode: 99
		}
		if (record) {
			formData.value = Object.assign({}, record)
		}
	}
	// 关闭抽屉
	const onClose = () => {
		formRef.value.resetFields()
		visible.value = false
	}

	// 默认要校验的
	const formRules = {
		inspectionTaskName: [required('请输入任务名称')],
		inspectionCycle: [required('请输入巡检周期')],
		inspectionType: [required('请选择巡检类型')],
		inspectionScope: [required('请选择巡检范围')]
	}

	// 验证并提交数据
	const onSubmit = () => {
		formRef.value.validate().then((res) => {
			const params = {
				resourceName: '',
				resourceType: '',
				monitorName: '',
				monitorType: '',
				runningStatus: '',
				defaultRunInterval: '',
				defaultThreshold: '',
				monitorDescribe: '',
				lastRunningStatus: '',
				deviceCount: 0,
				deviceId: '',
				resourceId: '',
				extJson: '',
				...(formData.value || {}),
				...res
			}
			const fn = tasksApi[formData.value.id ? 'edit' : 'add']
			fn(params).then(() => {
				onClose()
				emit('successful')
			})
		})
	}

	onMounted(() => {
		getDevidePage()
	})

	// 调用这个函数将子组件的一些数据和方法暴露出去
	defineExpose({
		onOpen
	})
</script>
