<template>
	<a-spin :spinning="loadSpinning">
		<a-form ref="formRef" :model="formData" :rules="formRules" layout="vertical" :label-col="labelCol">
		<table>
			<tr>
				<td>序号</td>
				<td>指标</td>
				<td>分值</td>
				<td>阈值</td>
				<td>指标</td>
				<td>分值</td>
				<td>阈值</td>
			</tr>
			<tr>
				<td>1</td>
				<td>CPU</td>
				<td><a-input v-model:value="formData.scoreValueCpu" placeholder="请输入分值" type="number" /></td>
				<td><a-input v-model:value="formData.thresholdValueCpu" placeholder="请输入阈值" type="number" /></td>
				<td>内存</td>
				<td><a-input v-model:value="formData.scoreValueNc" placeholder="请输入分值" type="number" /></td>
				<td><a-input v-model:value="formData.thresholdValueNc" placeholder="请输入阈值" type="number" /></td>
			</tr>
			<tr>
				<td>2</td>
				<td>请求超时</td>
				<td><a-input v-model:value="formData.scoreValueCS" placeholder="请输入分值" type="number" /></td>
				<td><a-input v-model:value="formData.thresholdValueCS" placeholder="请输入阈值" type="number" /></td>
				<td>Ping丢包次数				</td>
				<td><a-input v-model:value="formData.scoreValueDbcs" placeholder="请输入分值" type="number" /></td>
				<td><a-input v-model:value="formData.thresholdValueDbcs" placeholder="请输入阈值" type="number" /></td>
			</tr>
			<tr>
				<td>3</td>
				<td>端口失效次数				</td>
				<td><a-input v-model:value="formData.scoreValueSxcs" placeholder="请输入分值" type="number" /></td>
				<td><a-input v-model:value="formData.thresholdValueSxcs" placeholder="请输入阈值" type="number" /></td>
				<td>网络访问不到				</td>
				<td><a-input v-model:value="formData.scoreValueWl" placeholder="请输入分值" type="number" /></td>
				<td><a-input v-model:value="formData.thresholdValueWl" placeholder="请输入阈值" type="number" /></td>
			</tr>
			<tr>
				<td>4</td>
				<td>硬盘空间
				</td>
				<td><a-input v-model:value="formData.scoreValueYpkj" placeholder="请输入分值" type="number" /></td>
				<td><a-input v-model:value="formData.thresholdValueYpkj" placeholder="请输入阈值" type="number" /></td>
				<td>数据库报错
				</td>
				<td><a-input v-model:value="formData.scoreValueSjkbc" placeholder="请输入分值" type="number" /></td>
				<td><a-input v-model:value="formData.thresholdValueSjkbc" placeholder="请输入阈值" type="number" /></td>
			</tr>
			<tr>
				<td>5</td>
				<td>服务接口报错
				</td>
				<td><a-input v-model:value="formData.scoreValueJkbc" placeholder="请输入分值" type="number" /></td>
				<td><a-input v-model:value="formData.thresholdValueJkbc" placeholder="请输入阈值" type="number" /></td>
				<td>页面报错
				</td>
				<td><a-input v-model:value="formData.scoreValueYmbc" placeholder="请输入分值" type="number" /></td>
				<td><a-input v-model:value="formData.thresholdValueYmbc" placeholder="请输入阈值" type="number" /></td>
			</tr>
			<tr>
				<td>6</td>
				<td>容器异常
				</td>
				<td><a-input v-model:value="formData.scoreValueRqyc" placeholder="请输入分值" type="number" /></td>
				<td><a-input v-model:value="formData.thresholdValueRqyc" placeholder="请输入阈值" type="number" /></td>
				<td>虚拟机异常
				</td>
				<td><a-input v-model:value="formData.scoreValueXnjyc" placeholder="请输入分值" type="number" /></td>
				<td><a-input v-model:value="formData.thresholdValueXnjyc" placeholder="请输入阈值" type="number" /></td>
			</tr>
			<tr>
				<td>7</td>
				<td>运维异常                         
				</td>
				<td><a-input v-model:value="formData.scoreValueYwyc" placeholder="请输入分值" type="number" /></td>
				<td><a-input v-model:value="formData.thresholdValueYwyc" placeholder="请输入阈值" type="number" /></td>
				<td>升级异常
				</td>
				<td><a-input v-model:value="formData.scoreValueSjyc" placeholder="请输入分值" type="number" /></td>
				<td><a-input v-model:value="formData.thresholdValueSjyc" placeholder="请输入阈值" type="number" /></td>
			</tr>
			<tr>
				<td>8</td>
				<td>自动重启
				</td>
				<td><a-input v-model:value="formData.scoreValueZdqd" placeholder="请输入分值" type="number" /></td>
				<td><a-input v-model:value="formData.thresholdValueZdqd" placeholder="请输入阈值" type="number" /></td>
				<td>安全警告
				</td>
				<td><a-input v-model:value="formData.scoreValueAqjg" placeholder="请输入分值" type="number" /></td>
				<td><a-input v-model:value="formData.thresholdValueAqjg" placeholder="请输入阈值" type="number" /></td>
			</tr>
		</table>
		
		
			
		<a-row :gutter="16">
			<a-col :span="24">
				<a-form-item>
					<a-button type="primary" :loading="submitLoading" @click="onSubmit()">保存</a-button>
					<a-button style="margin-left: 10px" @click="() => formRef.resetFields()">重置</a-button>
				</a-form-item>
			</a-col>
		</a-row>
		</a-form>
	</a-spin>
</template>


<script setup name="alarmConfig">
	import { cloneDeep } from 'lodash-es'
	import configApi from '@/api/dev/configApi'
	const loadSpinning = ref(true)
	loadSpinning.value = false
	const formData = ref({})
	const formRef = ref()
	const param = {
		category: 'ALERT_CONFIG'
	}
	// 默认要校验的
	const formRules = {
	}
	const submitLoading = ref(false)
	configApi.configList(param).then((data) => {
		loadSpinning.value = false
		if (data) {
			data.forEach((item) => {
				if(item.configKey == 'SYS_ALERT_CONFIG_CPU'){
					var obj = JSON.parse(item.configValue)
					formData.value.scoreValueCpu = obj.scoreValue
					formData.value.thresholdValueCpu = obj.thresholdValue
				}
				if(item.configKey == 'SYS_ALERT_REQUEST_TIMEOUT'){
					var obj = JSON.parse(item.configValue)
					formData.value.scoreValueCS = obj.scoreValue
					formData.value.thresholdValueCS = obj.thresholdValue
				}
				if(item.configKey == 'SYS_ALERT_NUMBER_PORT_FAILURES'){
					var obj = JSON.parse(item.configValue)
					formData.value.scoreValueSxcs = obj.scoreValue
					formData.value.thresholdValueSxcs = obj.thresholdValue
				}
				if(item.configKey == 'SYS_ALERT_HARD_DISK_SPACE'){
					var obj = JSON.parse(item.configValue)
					formData.value.scoreValueYpkj = obj.scoreValue
					formData.value.thresholdValueYpkj = obj.thresholdValue
				}
				if(item.configKey == 'SYS_ALERT_SERVICE_INTERFACE_ERROR'){
					var obj = JSON.parse(item.configValue)
					formData.value.scoreValueJkbc = obj.scoreValue
					formData.value.scoreValueJkbc = obj.thresholdValue
				}
				if(item.configKey == 'SYS_ALERT_CONTAINER_EXCEPTION'){
					var obj = JSON.parse(item.configValue)
					formData.value.scoreValueRqyc = obj.scoreValue
					formData.value.thresholdValueRqyc = obj.thresholdValue
				}
				if(item.configKey == 'SYS_ALERT_OPERATION_EXCEPTION'){
					var obj = JSON.parse(item.configValue)
					formData.value.scoreValueYwyc = obj.scoreValue
					formData.value.thresholdValueYwyc = obj.thresholdValue
				}
				if(item.configKey == 'SYS_ALERT_AUTOMATIC_RESTART'){
					var obj = JSON.parse(item.configValue)
					formData.value.scoreValueZdqd = obj.scoreValue
					formData.value.thresholdValueZdqd = obj.thresholdValue
				}
				if(item.configKey == 'SYS_ALERT_MEMORY'){
					var obj = JSON.parse(item.configValue)
					formData.value.scoreValueNc = obj.scoreValue
					formData.value.thresholdValueNc = obj.thresholdValue
				}
				if(item.configKey == 'SYS_ALERT_PING_PACKET_LOSS_TIMES'){
					var obj = JSON.parse(item.configValue)
					formData.value.scoreValueDbcs = obj.scoreValue
					formData.value.thresholdValueDbcs = obj.thresholdValue
				}
				if(item.configKey == 'SYS_ALERT_NETWORK_NOT_AVAILABLE'){
					var obj = JSON.parse(item.configValue)
					formData.value.scoreValueWl = obj.scoreValue
					formData.value.thresholdValueWl = obj.thresholdValue
				}
				if(item.configKey == 'SYS_ALERT_DATABASE_ERROR'){
					var obj = JSON.parse(item.configValue)
					formData.value.scoreValueSjkbc = obj.scoreValue
					formData.value.thresholdValueSjkbc = obj.thresholdValue
				}
				if(item.configKey == 'SYS_ALERT_PAGE_ERROR'){
					var obj = JSON.parse(item.configValue)
					formData.value.scoreValueYmbc = obj.scoreValue
					formData.value.thresholdValueYmbc = obj.thresholdValue
				}
				if(item.configKey == 'SYS_ALERT_VIRTUAL_MACHINE_EXCEPTION'){
					var obj = JSON.parse(item.configValue)
					formData.value.scoreValueXnjyc = obj.scoreValue
					formData.value.thresholdValueXnjyc = obj.thresholdValue
				}
				if(item.configKey == 'SYS_ALERT_UPGRADE_EXCEPTION'){
					var obj = JSON.parse(item.configValue)
					formData.value.scoreValueSjyc = obj.scoreValue
					formData.value.thresholdValueSjyc = obj.thresholdValue
				}
				if(item.configKey == 'SYS_ALERT_SAFETY_WARNING'){
					var obj = JSON.parse(item.configValue)
					formData.value.scoreValueAqjg = obj.scoreValue
					formData.value.thresholdValueAqjg = obj.thresholdValue
				}
			})
		} else {
			message.warning('表单项不存在，请初始化数据库')
		}

	})

	// 验证并提交数据
	const onSubmit = () => {
		formRef.value
			.validate()
			.then(() => {
				submitLoading.value = true
				let submitParam = cloneDeep(formData.value)
				console.log(submitParam)
				var cpures  = {}
				cpures.scoreValue = submitParam.scoreValueCpu
				cpures.thresholdValue = submitParam.thresholdValueCpu
				var TIMEOUT = {
					scoreValue:submitParam.scoreValueCS,
					thresholdValue:submitParam.thresholdValueCS,
				}
				var FAILURES = {
					scoreValue:submitParam.scoreValueSxcs,
					thresholdValue:submitParam.thresholdValueSxcs,
				}
				var SPACE = { // 硬盘空间
					scoreValue:submitParam.scoreValueYpkj,
					thresholdValue:submitParam.thresholdValueYpkj,
				}
				var INTERFACE = { // 服务接口报错
					scoreValue:submitParam.scoreValueJkbc,
					thresholdValue:submitParam.thresholdValueJkbc,
				}
				var EXCEPTION = { // 容器异常
					scoreValue:submitParam.scoreValueRqyc,
					thresholdValue:submitParam.thresholdValueRqyc,
				}
				var OPERATION = { // 运维异常
					scoreValue:submitParam.scoreValueYwyc,
					thresholdValue:submitParam.thresholdValueYwyc,
				}
				var RESTART = { // 自动重启
					scoreValue:submitParam.scoreValueZdqd,
					thresholdValue:submitParam.thresholdValueZdqd,
				}
				var MEMORY = { // 内存
					scoreValue:submitParam.scoreValueNc,
					thresholdValue:submitParam.thresholdValueNc,
				}
				var TIMES = { // Ping丢包次数
					scoreValue:submitParam.scoreValueDbcs,
					thresholdValue:submitParam.thresholdValueDbcs,
				}
				var Wl = { // 网络访问不到
					scoreValue:submitParam.scoreValueWl,
					thresholdValue:submitParam.thresholdValueWl,
				}
				var DATABASE = { // 数据库报错
					scoreValue:submitParam.scoreValueSjkbc,
					thresholdValue:submitParam.thresholdValueSjkbc,
				}
				var PAGE = { // 页面报错
					scoreValue:submitParam.scoreValueYmbc,
					thresholdValue:submitParam.thresholdValueYmbc,
				}
				var EXCEPTION = { // 虚拟机异常
					scoreValue:submitParam.scoreValueXnjyc,
					thresholdValue:submitParam.thresholdValueXnjyc,
				}
				var UPGRADE = { // 升级异常
					scoreValue:submitParam.scoreValueSjyc,
					thresholdValue:submitParam.thresholdValueSjyc,
				}
				var SAFETY = { // 安全警告
					scoreValue:submitParam.scoreValueAqjg,
					thresholdValue:submitParam.thresholdValueAqjg,
				}

				
				let param = []
				param.push({ // CPU
					configKey: 'SYS_ALERT_CONFIG_CPU',
					configValue: JSON.stringify(cpures)
				})
				param.push({ // 请求超时
					configKey: 'SYS_ALERT_REQUEST_TIMEOUT',
					configValue: JSON.stringify(TIMEOUT)
				})
				param.push({ // 端口失效次数
					configKey: 'SYS_ALERT_NUMBER_PORT_FAILURES',
					configValue: JSON.stringify(FAILURES)
				})
				param.push({ // 硬盘空间
					configKey: 'SYS_ALERT_HARD_DISK_SPACE',
					configValue: JSON.stringify(SPACE)
				})
				param.push({ // 服务接口报错
					configKey: 'SYS_ALERT_SERVICE_INTERFACE_ERROR',
					configValue: JSON.stringify(INTERFACE)
				})
				param.push({ // 容器异常
					configKey: 'SYS_ALERT_CONTAINER_EXCEPTION',
					configValue: JSON.stringify(EXCEPTION)
				})
				param.push({ // 运维异常
					configKey: 'SYS_ALERT_OPERATION_EXCEPTION',
					configValue: JSON.stringify(OPERATION)
				})
				param.push({ // 自动重启
					configKey: 'SYS_ALERT_AUTOMATIC_RESTART',
					configValue: JSON.stringify(RESTART)
				})
				param.push({ // 内存
					configKey: 'SYS_ALERT_MEMORY',
					configValue: JSON.stringify(MEMORY)
				})
				param.push({ // Ping丢包次数
					configKey: 'SYS_ALERT_PING_PACKET_LOSS_TIMES',
					configValue: JSON.stringify(TIMES)
				})
				param.push({ // 网络访问不到
					configKey: 'SYS_ALERT_NETWORK_NOT_AVAILABLE',
					configValue: JSON.stringify(Wl)
				})
				param.push({ // 数据库报错
					configKey: 'SYS_ALERT_DATABASE_ERROR',
					configValue: JSON.stringify(DATABASE)
				})
				param.push({ // 页面报错
					configKey: 'SYS_ALERT_PAGE_ERROR',
					configValue: JSON.stringify(PAGE)
				})
				param.push({ // 虚拟机异常
					configKey: 'SYS_ALERT_VIRTUAL_MACHINE_EXCEPTION',
					configValue: JSON.stringify(EXCEPTION)
				})
				param.push({ // 升级异常
					configKey: 'SYS_ALERT_UPGRADE_EXCEPTION',
					configValue: JSON.stringify(UPGRADE)
				})
				param.push({ // 安全警告
					configKey: 'SYS_ALERT_SAFETY_WARNING',
					configValue: JSON.stringify(SAFETY)
				})
				configApi
					.configEditForm(param)
					.then(() => {})
					.finally(() => {
						submitLoading.value = false
					})

			})
			.catch((msg) => {
				console.log(msg)
			})
	}
</script>
<style type="less" scoped>
table{
	border-collapse: collapse;
	width: 1100px;
	margin-top: 2%;
	word-break: break-all;
	margin-bottom: 2%;
}
table tr{
	height: 50px;
	line-height: 30px;
}
table td{
	border: 1px solid #F0F0F2;
	overflow:hidden;
	white-space:nowrap;
	text-overflow:ellipsis;
	text-align: center;

}
table td input{
	width: 80%;
}

</style>