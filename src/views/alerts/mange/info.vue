<template>
	<a-drawer
		title="告警详情"
		:width="800"
		:visible="visible"
		:destroy-on-close="true"
		:body-style="{ paddingBottom: '80px', 'padding-top': '0px' }"
		:footer-style="{ textAlign: 'right' }"
		:bordered="true"
		@close="onClose"
		class="drawerdiv"
	>
    <a-card :bordered="false" :body-style="{ 'margin-top': '5px' }" style="margin-bottom: 0px">
		<a-form ref="formRef" :model="formData" :rules="formRules" layout="horizontal" :label-col="labelCol" labelAlign="left">

            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item label="网络名称" name="name">
                        <a-input v-model:value="formData.networkName" placeholder="网络名称"  disabled="true" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="设备类型" name="name">
                        <a-input v-model:value="formData.deviceTypeName" placeholder="设备类型"  disabled="true"/>
                    </a-form-item>
                </a-col>
             </a-row>

             <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item label="设备名称" name="name">
                        <a-input v-model:value="formData.deviceName" placeholder="设备名称"  disabled="true" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="设备&nbsp;IP&nbsp;&nbsp;&nbsp;" name="name">
                        <a-input v-model:value="formData.ipAddress" placeholder="设备IP"  disabled="true"/>
                    </a-form-item>
                </a-col>
             </a-row>

             <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item label="资源类型" name="name">
                        <a-input v-model:value="formData.resourceTypeName" placeholder="资源类型"  disabled="true" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="资源名称" name="name">
                        <a-input v-model:value="formData.resourceName" placeholder="资源名称"  disabled="true"/>
                    </a-form-item>
                </a-col>
             </a-row>

             <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item label="告警类型" name="name">
                        <a-input v-model:value="formData.alarmTypeName" placeholder="告警类型"  disabled="true" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="告警原因" name="name">
                        <a-input v-model:value="formData.alarmReason" placeholder="告警原因"  disabled="true" />
                    </a-form-item>
                </a-col>
             </a-row>

             <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item label="告警级别" name="name">
                        <a-input v-model:value="formData.alarmLevelName" placeholder="告警级别"  disabled="true"/>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="触&nbsp;&nbsp;发&nbsp;&nbsp;值" name="name">
                        <a-input v-model:value="formData.triggerValue" placeholder="触发值"  disabled="true" />
                    </a-form-item>
                </a-col>
             </a-row>

             <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item label="发生时间" name="name">
                        <a-input v-model:value="formData.occurrenceTime" placeholder="发生时间"  disabled="true" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="最新检测时间" name="name">
                        <a-input v-model:value="formData.latestMonitoringTime" placeholder="最新检测时间" disabled="true" />
                    </a-form-item>
                </a-col>
             </a-row>

             <a-row :gutter="16">
                <a-col :span="24">
                    <a-form-item label="是否确认" name="name">
                    {{ formData.alarmStatusName }}
                    </a-form-item>
                </a-col>
              
             </a-row>

             <a-row :gutter="16">
                <a-col :span="24">
                    <a-form-item label="告警描述" name="name">
                        <a-textarea v-model:value="formData.alarmDescription" placeholder="告警描述"  disabled="true" />
                    </a-form-item>
                </a-col>
              
             </a-row>

             <a-row :gutter="16">
                <a-col :span="24">
                    <a-form-item label="解决方案" name="name">
                        <a-textarea v-model:value="formData.solutionContent" placeholder="解决方案"  disabled="true"/>
                    </a-form-item>
                </a-col>
              
             </a-row>



		</a-form>
        </a-card>

		<template #footer>
			<a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
			<a-button type="primary" v-if="formData.alarmStatus == 'unconfirmed'" @click="onSubmit" :loading="submitLoading">确认告警</a-button>
		</template>
	</a-drawer>
</template>

<script setup name="screenImageInformationForm">
	import { cloneDeep } from 'lodash-es'
	import { required } from '@/utils/formRules'
    import alerts from '@/api/alerts/alerts'

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
			const formDataParam = {}
            formDataParam.alarmStatus = 'confirmed'
            formDataParam.id = formData.value.id
			alerts.submitForm(formDataParam, !formDataParam.id)
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
