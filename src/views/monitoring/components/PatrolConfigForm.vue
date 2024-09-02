<template>
	<a-drawer
		:title="formData.id ? '编辑巡检任务' : '增加巡检任务'"
		:width="600"
		:visible="visible"
		:destroy-on-close="true"
		:body-style="{ paddingBottom: '80px' }"
		:footer-style="{ textAlign: 'right' }"
		@close="onClose"
	>
		<a-form ref="formRef" :model="formData" :rules="formRules">
			<a-row>
				<h2 class="sub-title" style="font-size: 14px">基本参数</h2>
				<a-col :span="24">
					<a-form-item label="任务名称" name="inspectionTaskName" :wrapperCol="{ span: 9 }">
						<a-input v-model:value="formData.inspectionTaskName" placeholder="请输入任务名称" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="24">
					<a-form-item label="巡检周期" name="inspectionCycle" :wrapperCol="{ span: 18 }">
						<a-input
							v-model:value="formData.inspectionCycle"
							style="width: calc(100% - 70px)"
							placeholder="请输入巡检周期"
							allow-clear
						>
							<template #addonAfter>
								<span style="color: #1890ff">每{{ formData.inspectionCycle }}小时执行一次</span>
							</template>
						</a-input>
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="巡检类型" name="inspectionType">
						<a-select v-model:value="formData.inspectionType" :options="inspectionTypes" />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="巡检范围:" name="inspectionScope">
						<a-select v-model:value="formData.inspectionScope" mode="multiple" :options="inspectionScopes" />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="邮箱地址:" name="emailAddress">
						<a-input v-model:value="formData.emailAddress" style="width: 100%" />
					</a-form-item>
				</a-col>
				<!-- <a-col :span="12">
					<a-form-item label="资源名称" name="resourceName">
						<a-input v-model:value="formData.resourceName" placeholder="请输入资源名称" style="width: 100%" />
					</a-form-item>
				</a-col> -->
			</a-row>
			<a-row>
				<h2 class="sub-title" style="font-size: 14px">巡检指标</h2>
				<a-col :span="24">
					<a-form-item label="告警指标:" name="alarmIndicators" :wrapperCol="{ span: 9 }">
						<a-select v-model:value="formData.alarmIndicators" :options="alarmIndicators" />
					</a-form-item>
				</a-col>
			</a-row>
		</a-form>
		<template #footer>
			<a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
			<a-button type="primary" @click="onSubmit">保存</a-button>
		</template>
		<Icon-selector ref="iconSelector" @iconCallBack="iconCallBack" />
	</a-drawer>
</template>

<script setup>
	import { required } from '@/utils/formRules'
	import reportsApi from '@/api/monitoring/reportsApi'
	import IconSelector from '@/components/Selector/iconSelector.vue'

	// 默认是关闭状态
	let visible = ref(false)
	const emit = defineEmits({ successful: null })
	const formRef = ref()
	const treeData = ref([])
	let iconSelector = ref()
	// 表单数据
	const formData = ref({})

	const inspectionTypes = [
		{ label: '全部', value: '' },
		{ label: '设备类型分组', value: 'device_type_grouping' },
		{ label: '网络分组', value: 'network_grouping' }
	]
	const inspectionScopes = [
		{ label: '全部', value: '' },
		{ label: 'Busines', value: 'Busines' },
		{ label: 'Community', value: 'Community' }
	]
	const alarmIndicators = [
		{ label: '全部', value: '' },
		{ label: '网口接口状态', value: '网口接口状态' }
	]

	// 打开抽屉
	const onOpen = (record) => {
		const scopes = record?.inspectionScope || []
		visible.value = true
		formData.value = {
			sortCode: 99
		}
		if (record) {
			let val = []
			inspectionScopes.forEach((item) => {
				if (item.value && scopes.includes(item.value)) {
					val.push(item.value)
				}
			})
			record.inspectionScope = val
			formData.value = Object.assign({}, record)
		}
	}
	// 关闭抽屉
	const onClose = () => {
		formRef.value.resetFields()
		visible.value = false
	}
	// 图标选择器回调
	const iconCallBack = (value) => {
		formData.value.icon = value
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
				inspectionTaskName: '',
				inspectionType: '',
				inspectionScope: '',
				alarmIndicators: '',
				performanceIndicators: '',
				taskStatus: '',
				inspectionCycle: '',
				emailAddress: '',
				extJson: '',
				...(formData.value || {}),
				...res
			}
			params.inspectionScope = params.inspectionScope.toString()
			console.log('====', params)
			const fn = reportsApi[formData.value.id ? 'inspectiontaskEdit' : 'inspectiontaskAdd']
			fn(params).then(() => {
				onClose()
				emit('successful')
			})
		})
	}

	// 调用这个函数将子组件的一些数据和方法暴露出去
	defineExpose({
		onOpen
	})
</script>
