<template>
	<xn-form-container
		:title="formData.id ? '编辑图像信息表' : '增加图像信息表'"
		:width="700"
		:visible="visible"
		:destroy-on-close="true"
		@close="onClose"
	>
		<a-form ref="formRef" :model="formData" :rules="formRules" layout="vertical">
			<a-form-item label="报告编号：" name="reportNumber">
				<a-input v-model:value="formData.reportNumber" placeholder="请输入报告编号" allow-clear />
			</a-form-item>
			<a-form-item label="图像编号：" name="imageNumber">
				<a-input v-model:value="formData.imageNumber" placeholder="请输入图像编号" allow-clear />
			</a-form-item>
			<a-form-item label="文件名：" name="fileName">
				<a-input v-model:value="formData.fileName" placeholder="请输入文件名" allow-clear />
			</a-form-item>
			<a-form-item label="缺陷情况：" name="defectSituation">
				<a-input v-model:value="formData.defectSituation" placeholder="请输入缺陷情况" allow-clear />
			</a-form-item>
			<a-form-item label="级别：" name="level">
				<a-input v-model:value="formData.level" placeholder="请输入级别" allow-clear />
			</a-form-item>
			<a-form-item label="创建人：" name="createUserId">
				<a-input v-model:value="formData.createUserId" placeholder="请输入创建人" allow-clear />
			</a-form-item>
			<a-form-item label="修改人：" name="modifyUserId">
				<a-input v-model:value="formData.modifyUserId" placeholder="请输入修改人" allow-clear />
			</a-form-item>
			<a-form-item label="修改时间：" name="modifyTime">
				<a-date-picker v-model:value="formData.modifyTime" value-format="YYYY-MM-DD HH:mm:ss" show-time placeholder="请选择修改时间" style="width: 100%" />
			</a-form-item>
		</a-form>
		<template #footer>
			<a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
			<a-button type="primary" @click="onSubmit" :loading="submitLoading">保存</a-button>
		</template>
	</xn-form-container>
</template>

<script setup name="screenImageInformationForm">
	import { cloneDeep } from 'lodash-es'
	import { required } from '@/utils/formRules'
	import screenImageInformationApi from '@/api/biz/screenImageInformationApi'
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
			screenImageInformationApi
				.screenImageInformationSubmitForm(formDataParam, !formDataParam.id)
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
