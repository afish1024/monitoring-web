<template>
	<a-drawer
		:title="formData.id ? '编辑短信模板' : '增加短信模板'"
		:width="600"
		:visible="visible"
		:destroy-on-close="true"
		:body-style="{ paddingBottom: '80px' }"
		:footer-style="{ textAlign: 'right' }"
		@close="onClose"
		:maskClosable="false"
	>
		<a-form ref="formRef" :model="formData" :rules="formRules" layout="vertical">
			<a-form-item label="模板名称：" name="templateName">
				<a-input v-model:value="formData.templateName" placeholder="请输入模板名称" allow-clear />
			</a-form-item>
			<a-form-item label="模板ID：" name="templateCode">
				<a-input v-model:value="formData.templateCode" style="width: calc(100% - 70px)" placeholder="请输入模板ID" allow-clear />
			</a-form-item>
			<a-form-item label="模板内容：" name="templateContent">
				<a-textarea v-model:value="formData.templateContent" />
			</a-form-item>
			<a-form-item label="排序:" name="sorts">
				<a-slider v-model:value="formData.sort" :max="100" />
			</a-form-item>
		</a-form>
		<template #footer>
			<a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
			<a-button type="primary" @click="onSubmit">保存</a-button>
		</template>
		<Icon-selector ref="iconSelector" @iconCallBack="iconCallBack" />
	</a-drawer>
</template>

<script setup>
	import ColorPicker from '@/components/ColorPicker/index.vue'
	import { required } from '@/utils/formRules'
	import moduleApi from '@/api/sys/resource/moduleApi'
	import smstemplateApi from '@/api/biz/smstemplateApi'
	import IconSelector from '@/components/Selector/iconSelector.vue'
	// 默认是关闭状态
	let visible = $ref(false)
	const emit = defineEmits({ successful: null })
	const formRef = ref()
	const treeData = ref([])
	let iconSelector = ref()
	// 表单数据
	const formData = ref({})

	// 打开抽屉
	const onOpen = (record) => {
		visible = true
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
		visible = false
	}
	// 图标选择器回调
	const iconCallBack = (value) => {
		formData.value.icon = value
	}
	// 默认要校验的
	const formRules = {
		templateName: [required('请输入模块名称')],
	}
	// 验证并提交数据
	const onSubmit = () => {
		formRef.value
			.validate()
			.then(() => {
				smstemplateApi.submitForm(formData.value, !formData.value.id).then(() => {
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
