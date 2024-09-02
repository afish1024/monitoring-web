<template>
	<a-drawer
		:title="formData.id ? '编辑工序清单表' : '增加工序清单表'"
		:width="800"
		:visible="visible"
		:destroy-on-close="true"
		:body-style="{ paddingBottom: '80px', 'padding-top': '0px' }"
		:footer-style="{ textAlign: 'right' }"
		@close="onClose"
	>
		<a-form ref="formRef" :model="formData" :rules="formRules" layout="vertical">
			<a-row :gutter="16">
				<a-col :span="24">
					<div class="title"><more-outlined />工艺信息</div>
				</a-col>
			</a-row>
			<a-row :gutter="16">
				<a-col :span="24">
					<a-form-item label="工艺标题：" name="processTitle">
						<a-input v-model:value="formData.processTitle" placeholder="请输入工艺标题" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row :gutter="16">
				<a-col :span="12">
					<a-form-item label="产品代号：" name="productCode">
						<a-input v-model:value="formData.productCode" placeholder="请输入产品代号" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="零部组件代号：" name="componentCode">
						<a-input v-model:value="formData.componentCode" placeholder="请输入零部组件代号" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>

			<a-row :gutter="16">
				<a-col :span="12">
					<a-form-item label="工序号：" name="productionProcessesCode">
						<a-input v-model:value="formData.productionProcessesCode" placeholder="请输入工序号" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="工序文件编号：" name="productionProcessesName">
						<a-input v-model:value="formData.productionProcessesName" placeholder="请输入工序文件编号" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>

			<a-row :gutter="16">
				<a-col :span="12">
					<a-form-item label="工序名称：" name="productionProcessesName">
						<a-input v-model:value="formData.productionProcessesName" placeholder="请输入工序名称" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="材料编号：" name="materialNumber">
						<a-input v-model:value="formData.materialNumber" placeholder="请输入材料编号" allow-clear />
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
					<a-form-item label="验收标准：" name="acceptanceCriteria">
						<a-input v-model:value="formData.acceptanceCriteria" placeholder="请输入验收标准" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>	
			<a-row :gutter="16">
				<a-col :span="12">
					<a-form-item label="部位编号：" name="partNumber">
						<a-input v-model:value="formData.partNumber" placeholder="请输入部位编号" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="技术级别：" name="technicalLevel">
						<a-input v-model:value="formData.technicalLevel" placeholder="请输入技术级别" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row :gutter="16">
				<a-col :span="12">
					<a-form-item label="检测部位：" name="detectionSite">
						<a-input v-model:value="formData.detectionSite" placeholder="请输入检测部位" allow-clear />
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
					<a-form-item label="规格(mm)：" name="detectionSite">
						<a-input v-model:value="formData.detectionSite" placeholder="请输入规格" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="焊接方法：" name="detectionRatio">
						<a-input v-model:value="formData.detectionRatio" placeholder="请输入焊接方法" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>


			<a-row :gutter="16">
				<a-col :span="12">
					<a-form-item label="焊缝编号：" name="weldNo">
						<a-input v-model:value="formData.weldNo" placeholder="请输入焊缝编号" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="焊接长度(mm)：" name="detectionRatio2">
						<a-input v-model:value="formData.detectionRatio2" placeholder="请输入焊接长度" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row :gutter="16">
				<a-col :span="24">
					<a-form-item label="备注：" name="notes">
						<a-input v-model:value="formData.notes" placeholder="请输入备注" allow-clear />
					</a-form-item>
				</a-col>
				
			</a-row>
			<a-row :gutter="16">
				<a-col :span="24">
					<div class="title"><more-outlined />成像条件</div>
				</a-col>
			</a-row>
			<a-row :gutter="16">
				<a-col :span="12">
					<a-form-item label="设备型号：" name="equipmentModel">
						<a-input v-model:value="formData.equipmentModel" placeholder="请输入设备型号" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="探测器类型：" name="detectorType">
						<a-input v-model:value="formData.detectorType" placeholder="请输入探测器类型" allow-clear />
					</a-form-item>
				</a-col>
				
			</a-row>		
			<a-row :gutter="16">
				<a-col :span="12">	
					<a-form-item label="焦点尺寸：" name="focusSize">
						<a-input v-model:value="formData.focusSize" placeholder="请输入焦点尺寸" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					
					<a-form-item label="探测器规格：" name="detectorSpecifications">
						<a-input v-model:value="formData.detectorSpecifications" placeholder="请输入探测器规格" allow-clear />
					</a-form-item>
				</a-col>
				
			</a-row>
			<a-row :gutter="16">
				<a-col :span="12">			
					<a-form-item label="焦距：" name="focalLength">
						<a-input v-model:value="formData.focalLength" placeholder="请输入焦距" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="像素尺寸：" name="pixelSize">
						<a-input v-model:value="formData.pixelSize" placeholder="请输入像素尺寸" allow-clear />
					</a-form-item>
				</a-col>
				
			</a-row>
			<a-row :gutter="16">
				<a-col :span="12">	
					<a-form-item label="管电压：" name="tubeVoltage">
						<a-input v-model:value="formData.tubeVoltage" placeholder="请输入管电压" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="滤波板：" name="filterBoard">
						<a-input v-model:value="formData.filterBoard" placeholder="请输入滤波板" allow-clear />
					</a-form-item>
				</a-col>
				
			</a-row>
			<a-row :gutter="16">
				<a-col :span="12">			
					<a-form-item label="管电流：" name="tubeCurrent">
						<a-input v-model:value="formData.tubeCurrent" placeholder="请输入管电流" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="线性像质计型号：" name="resolution">
						<a-input v-model:value="formData.resolution" placeholder="请输入线性像质计型号" allow-clear />
					</a-form-item>

					<!-- <a-form-item label="图像分辨率：" name="resolution">
						<a-input v-model:value="formData.resolution" placeholder="请输入图像分辨率" allow-clear />
					</a-form-item> -->
				</a-col>
			</a-row>
			<a-row :gutter="16">
				<a-col :span="12">	
					<a-form-item label="曝光时间：" name="exposureTime">
						<a-input v-model:value="formData.exposureTime" placeholder="请输入曝光时间" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="双线性像质计型号：" name="imageGrayscaleRange">
						<a-input v-model:value="formData.imageGrayscaleRange" placeholder="请输入双线性像质计型号" allow-clear />
					</a-form-item>

				</a-col>
				
			</a-row>
			<a-row :gutter="16">
				<a-col :span="12">	
					<a-form-item label="透照方式：" name="transilluminationMethod">
						<a-input v-model:value="formData.transilluminationMethod" placeholder="请输入透照方式" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="线性质指数：" name="imageCollectionMethod">
						<a-input v-model:value="formData.imageCollectionMethod" placeholder="请输入线性质指数式" allow-clear />
					</a-form-item>

				</a-col>
				
			</a-row>
			<a-row :gutter="16">
				<a-col :span="12">						
					<a-form-item label="透照厚度：" name="penetratedThickness">
						<a-input v-model:value="formData.penetratedThickness" placeholder="请输入透照厚度" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">

					<a-form-item label="双线性质指数：" name="signalNoiseRatio">
						<a-input v-model:value="formData.signalNoiseRatio" placeholder="请输入双线性质指数" allow-clear />
					</a-form-item>
				</a-col>
				
			</a-row>
			<a-row :gutter="16">
				<a-col :span="12">	
					<a-form-item label="透照区：" name="transilluminationZone">
						<a-input v-model:value="formData.transilluminationZone" placeholder="请输入透照区" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="信噪比：" name="signalNoiseRatio">
						<a-input v-model:value="formData.signalNoiseRatio" placeholder="请输入信噪比" allow-clear />
					</a-form-item>

					
				</a-col>
				
			</a-row>
			<a-row :gutter="16">
				<a-col :span="12">	
					<a-form-item label="透照次数：" name="transilluminationTimes">
						<a-input v-model:value="formData.transilluminationTimes" placeholder="请输入透照次数" allow-clear />
					</a-form-item>
					
				</a-col>
				<a-col :span="12">
					<a-form-item label="最佳放大倍数：" name="optimalMagnification">
						<a-input v-model:value="formData.optimalMagnification" placeholder="请输入最佳放大倍数" allow-clear />
					</a-form-item>

					<!-- <a-form-item label="像质指数：" name="imageQualityIndex">
						<a-input v-model:value="formData.imageQualityIndex" placeholder="请输入像质指数" allow-clear />
					</a-form-item> -->
				</a-col>
				
			</a-row>

			<a-row :gutter="16">
				<a-col :span="12">	
					<a-form-item label="采集图像方式：" name="imageCollectionMethod">
						<a-input v-model:value="formData.imageCollectionMethod" placeholder="请输入采集图像方式" allow-clear />
					</a-form-item>
					
				</a-col>
				<a-col :span="12">
					<a-form-item label="图像灰度范围：" name="imageGrayscaleRange">
						<a-input v-model:value="formData.imageGrayscaleRange" placeholder="请输入图像灰度范围" allow-clear />
					</a-form-item>	
				</a-col>
				
			</a-row>


		</a-form>
		<template #footer>
			<a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
			<a-button type="primary" @click="onSubmit" :loading="submitLoading">保存</a-button>
		</template>
	</a-drawer>
</template>

<script setup name="screenProcessListForm">
	import { cloneDeep } from 'lodash-es'
	import { required } from '@/utils/formRules'
	import screenProcessListApi from '@/api/biz/screenProcessListApi'
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
			screenProcessListApi
				.screenProcessListSubmitForm(formDataParam, !formDataParam.id)
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

<style scoped>
.title{
	font-size: 16px;
	height: 40px;
	line-height: 40px;
}
</style>

