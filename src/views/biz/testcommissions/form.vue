<template>
	<a-drawer
	    :title="title"
		:width="800"
		:visible="visible"
		:destroy-on-close="true"
		:body-style="{ paddingBottom: '80px', 'padding-top': '20px' }"
		:footer-style="{ textAlign: 'right' }"
		@close="onClose"
	>

		<a-form ref="formRef" :model="formData" :rules="formRules" layout="vertical">
			<a-row :gutter="16">
				<a-col :span="12">

					<a-form-item label="委托单位：" name="client">
						<a-input v-model:value="formData.client" placeholder="请输入委托单位" allow-clear />
					</a-form-item>
				</a-col>	
				<a-col :span="12">
				
					<a-form-item label="工序：" name="productionProcesses">
						<a-input v-model:value="formData.productionProcesses" placeholder="请输入工序" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>

			<a-row :gutter="16">
				<a-col :span="12">
					<a-form-item label="生产令号：" name="productionOrderNumber">
						<a-input v-model:value="formData.productionOrderNumber" placeholder="请输入生产令号" allow-clear />
					</a-form-item>
				
				</a-col>	
				<a-col :span="12">
					<a-form-item label="图号：" name="drawingNo">
						<a-input v-model:value="formData.drawingNo" placeholder="请输入图号" allow-clear />
					</a-form-item>
				
					
				</a-col>
			</a-row>
			<a-row :gutter="16">
				<a-col :span="12">
					<a-form-item label="零部件名称：" name="componentComponentName">
						<a-input v-model:value="formData.componentComponentName" placeholder="请输入零部件名称" allow-clear />
					</a-form-item>
				
				</a-col>	
				<a-col :span="12">
					
					<a-form-item label="数量：" name="number"  :rules="[{ type: 'number', min: 0, max: 999 }]">
						<a-input-number  v-model:value="formData.number" placeholder="请输入数量" allow-clear />
					</a-form-item>
					
				</a-col>
			</a-row>
			<a-row :gutter="16">
				<a-col :span="12">
					<a-form-item label="零部件编号：" name="partNumber">
						<a-input v-model:value="formData.partNumber" placeholder="请输入零部件编号" allow-clear />
					</a-form-item>

				</a-col>	
				<a-col :span="12">
					<a-form-item label="外观质量：" name="appearance">
						<a-input v-model:value="formData.appearance" placeholder="请输入外观质量" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>

			<a-row :gutter="16">
				<a-col :span="12">
					<a-form-item label="检件材质：" name="materialInspectionPiece">
						<a-input v-model:value="formData.materialInspectionPiece" placeholder="请输入检件材质" allow-clear />
					</a-form-item>
				</a-col>	
				<a-col :span="12">
					<a-form-item label="检件规格：" name="materialInspectionPiece">
						<a-input v-model:value="formData.materialInspectionPiece" placeholder="请输入检件规格" allow-clear />
					</a-form-item>
				
				</a-col>
			</a-row>

			<a-row :gutter="16">
				<a-col :span="12">
					<a-form-item label="检测标准：" name="testingStandards">
						<a-input v-model:value="formData.testingStandards" placeholder="请输入检测标准" allow-clear />
					</a-form-item>
				</a-col>	
				<a-col :span="12">
					<a-form-item label="检测比例：" name="detectionRatio">
						<a-input v-model:value="formData.detectionRatio" placeholder="请输入检测比例" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>			

			<a-row :gutter="16">
				<a-col :span="12">
					
					<a-form-item label="分析检测项目：" name="analysisTestingItems">
						<a-input v-model:value="formData.analysisTestingItems" placeholder="请输入分析检测项目" allow-clear />
					</a-form-item>
				</a-col>	
				<a-col :span="12">
					<a-form-item label="验收标准：" name="acceptanceCriteria">
						<a-input v-model:value="formData.acceptanceCriteria" placeholder="请输入验收标准" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>	

			<a-row :gutter="16">
				<a-col :span="12">
					<a-form-item label="申请人员：" name="applicantUser">
						<a-input v-model:value="formData.applicantUser" placeholder="请输入申请人员" allow-clear />
					</a-form-item>
				</a-col>	

				<a-col :span="12" v-if="formData.id">
					<a-form-item label="申请时间：" name="applicantDate">
						<a-date-picker 
							format="YYYY-MM-DD HH:mm:ss"
							v-model:value="formData.applicantDate"
							placeholder="请输入申请时间"
							allow-clear

						/>

					</a-form-item>
				</a-col>
			</a-row>
			<template v-if="formData.id">
				<a-row :gutter="16">
					<a-col :span="12">
						<a-form-item label="申请状态：" name="applicantStatus">
							<a-select
								v-model:value="formData.applicantStatus"
								:options="categoryOptions"
								style="width: 100%"
								placeholder="请选择状态"
							>
							</a-select>
						</a-form-item>


					</a-col>	
					<a-col :span="12">
						<a-form-item label="检测人员：" name="testingUser">
							<a-input v-model:value="formData.testingUser" placeholder="请输入检测人员" allow-clear />
						</a-form-item>
					</a-col>
				</a-row>

				<a-row :gutter="16" v-if="formData.applicantStatus == 2">
					<a-col :span="24">
						<a-form-item label="拒绝原因：" name="rejectReason" >
							<a-textarea
								v-model:value="formData.rejectReason"
								placeholder="请输入拒绝原因"
								:auto-size="{ minRows:2, maxRows:2}"
							/>
						</a-form-item>


					</a-col>	
				</a-row>	
			</template>	
		</a-form>
		<template #footer>
			<a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
			<a-button type="primary" @click="onSubmit" :loading="submitLoading">保存</a-button>
		</template>
	</a-drawer>
</template>

<script setup name="screenTestCommissionsForm">
	import { cloneDeep } from 'lodash-es'
	import { required } from '@/utils/formRules'
	import screenTestCommissionsApi from '@/api/biz/screenTestCommissionsApi'
	// 抽屉状态
	let visible = $ref(false)
	const formRef = ref()
	const emit = defineEmits({ successful: null })
	// 表单数据
	const formData = ref({})
	const submitLoading = ref(false)
	let title = ref('增加检测委托单') //formData.id ? '编辑检测委托单表' : '增加检测委托单表'

	const categoryOptions = [{
		value : 1,
		label : '通过检测'
	},{
		value : 0,
		label : '待审核'
	},{
		value : 2,
		label : '拒绝检测'
	}]


	// 打开抽屉
	const onOpen = (record,type) => {
		visible = true
		console.log(type)
		if(type == 'edit'){
			title.value = '编辑检测委托单'
		}else if(type == 'check'){
			title.value = '审核检测委托单'
		}

		if (record) {
			let recordData = cloneDeep(record)
			formData.value = Object.assign({}, recordData)
		}
	}
	// 关闭抽屉
	const onClose = () => {
		formRef.value.resetFields()
		formData.value = {}
		visible = false
	}
	// 默认要校验的
	const formRules = {
	}
	// 验证并提交数据
	const onSubmit = () => {
		formRef.value.validate().then(() => {
			submitLoading.value = true
			const formDataParam = cloneDeep(formData.value)
			screenTestCommissionsApi
				.screenTestCommissionsSubmitForm(formDataParam, !formDataParam.id)
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
