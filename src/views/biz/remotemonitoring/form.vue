<template>
	<!-- <xn-form-container
		:title="formData.id ? '编辑远程监控表' : '增加远程监控表'"
		:width="700"
		:visible="visible"
		:destroy-on-close="true"
		@close="onClose"
	> -->

	<a-drawer
		:title="formData.id ? '编辑远程监控表' : '增加远程监控表'"
		:width="700"
		:visible="visible"
		:destroy-on-close="true"
		:body-style="{ paddingBottom: '80px', 'padding-top': '20px' }"
		:footer-style="{ textAlign: 'right' }"
		@close="onClose"
	>


		<a-form ref="formRef" :model="formData" :rules="formRules" layout="vertical">
			<a-form-item label="设备名称：" name="deviceName">
				<a-input v-model:value="formData.deviceName" placeholder="请输入设备名称" allow-clear />
			</a-form-item>
			<a-form-item label="操作系统：" name="operatingSystem">
				<a-input v-model:value="formData.operatingSystem" placeholder="请输入操作系统" allow-clear />
			</a-form-item>
			<a-form-item label="设备IP：" name="deviceIp">
				<a-input v-model:value="formData.deviceIp" placeholder="请输入设备IP" allow-clear />
			</a-form-item>
			<a-form-item label="连接序号：" name="connectionNumber">
				<a-input v-model:value="formData.connectionNumber" placeholder="请输入连接序号" allow-clear />
			</a-form-item>
			<a-form-item label="连接密码：" name="connectionPassword">
				<a-input v-model:value="formData.connectionPassword" placeholder="请输入连接密码" allow-clear />
			</a-form-item>
			<a-form-item label="创建人：" name="createUserId">
				<a-input v-model:value="formData.createUserId" placeholder="请输入创建人" allow-clear />
			</a-form-item>
			<!-- <template v-if="formData.id">
				<a-form-item label="修改人：" name="modifyUserId">
					<a-input v-model:value="formData.modifyUserId" placeholder="请输入修改人" allow-clear />
				</a-form-item>
				<a-form-item label="修改时间：" name="modifyTime">
					<a-date-picker v-model:value="formData.modifyTime" value-format="YYYY-MM-DD HH:mm:ss" show-time placeholder="请选择修改时间" style="width: 100%" />
				</a-form-item>
			</template> -->
		</a-form>
		<template #footer>
			<a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
			<a-button type="primary" @click="onSubmit" :loading="submitLoading">保存</a-button>
		</template>
	</a-drawer>
</template>

<script setup name="screenRemoteMonitoringForm">
	import { cloneDeep } from 'lodash-es'
	import { required } from '@/utils/formRules'
	import screenRemoteMonitoringApi from '@/api/biz/screenRemoteMonitoringApi'
	// 抽屉状态
	const visible = ref(false)
	const emit = defineEmits({ successful: null })
	const formRef = ref()
	// 表单数据
	const formData = ref({})
	const submitLoading = ref(false)

	// 打开抽屉
	const onOpen = (record) => {
		visible.value = true
		if (record) {
			let recordData = cloneDeep(record)
			formData.value = Object.assign({}, recordData)
		}
	}
	// 关闭抽屉
	const onClose = () => {
		formRef.value.resetFields()
		formData.value = {}
		visible.value = false
	}
	// 默认要校验的
	const formRules = {
	}
	// 验证并提交数据
	const onSubmit = () => {
		formRef.value.validate().then(() => {
			submitLoading.value = true
			const formDataParam = cloneDeep(formData.value)
			screenRemoteMonitoringApi
				.screenRemoteMonitoringSubmitForm(formDataParam, !formDataParam.id)
				.then(() => {
					onClose()
					emit('successful')
				})
				.finally(() => {
					submitLoading.value = false
				})
		})
	}
	// 抛出函数
	defineExpose({
		onOpen
	})
</script>
