<template>
	<a-drawer
		title="告警详情"
		:width="1000"
		:visible="visible"
		:destroy-on-close="true"
		:body-style="{ paddingBottom: '80px', 'padding-top': '0px' }"
		:footer-style="{ textAlign: 'right' }"
		:bordered="true"
		@close="onClose"
		class="drawerdiv"
	>
    <a-card :bordered="false" :body-style="{ 'margin-top': '5px' }" style="margin-bottom: 0px">
		<a-form ref="formRef" :model="formData" :rules="formRules"  layout="horizontal" labelAlign="left" :label-col="labelCol">
			<a-form-item label="是否确认" name="reportNumber">
				{{ formData.alarmStatusName }}
			</a-form-item>
			<a-form-item label="告警描述：" name="imageNumber">
                <a-textarea v-model:value="formData.alarmDescription"  placeholder="请输入告警描述" disabled="true"/>
			</a-form-item>
			<a-form-item label="解决方案：" name="fileName">
                <a-textarea v-model:value="formData.solutionContent"  placeholder="请输入解决方案" disabled="true" />
			</a-form-item>
		
		</a-form>
    </a-card>
		<template #footer>
			<a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
			<a-button type="primary" v-if="formData.alarmStatus == 'unconfirmed'" @click="onSubmit" :loading="submitLoading">确认告警</a-button>
		</template>
	</a-drawer>
</template>

<script setup name="mangeForm">
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
			const formDataParam = cloneDeep(formData.value)
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
