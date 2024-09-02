<template>
	<a-spin :spinning="loadSpinning">
		<a-form ref="formRef" :model="formData" :rules="formRules" layout="vertical" :label-col="labelCol">
		<table>
			<tr>
				<td  width="50">序号</td>
				<td>指标</td>
				<td width="50">类型</td>
				<td>分值</td>
				<td>阈值</td>
				<td>指标</td>
				<td  width="50">类型</td>
				<td>分值</td>
				<td>阈值</td>
			</tr>
			<tr>
				<td>1</td>
				<td>网络接口监控</td>
				<td>严重</td>
				<td><a-input v-model:value="formData.operationalSeriousScore" placeholder="请输入分值" type="number" @change="inputChange('operational')" /></td>
				<td><a-input v-model:value="formData.operationalSeriousThreshold" placeholder="请输入阈值" type="number"  @change="inputChange('operational')"/></td>
				
				<td >ping状态监控</td>
				<td >严重</td>
				<td><a-input v-model:value="formData.pingIcmpSeriousScore" placeholder="请输入分值" type="number" @change="inputChange('pingIcmp')" /></td>
				<td><a-input v-model:value="formData.pingIcmpSeriousThreshold" placeholder="请输入阈值" type="number" @change="inputChange('pingIcmp')" /></td>
				
			</tr>


			<tr>
				<td rowspan="3">2</td>
				<td rowspan="3">网口输入流量监控</td>
				<td>严重</td>
				<td><a-input v-model:value="formData.wkrcSeriousScore" placeholder="请输入分值" type="number"  @change="inputChange('wkrc')" /></td>
				<td><a-input v-model:value="formData.wkrcSeriousThreshold" placeholder="请输入阈值" type="number" @change="inputChange('wkrc')" /></td>
				
				<td rowspan="3">网口输出流量监控</td>
				<td >严重</td>
				<td><a-input v-model:value="formData.wkscSeriousScore" placeholder="请输入分值" type="number"  @change="inputChange('wksc')" /></td>
				<td><a-input v-model:value="formData.wkscSeriousThreshold" placeholder="请输入阈值" type="number" @change="inputChange('wksc')" /></td>
				
			</tr>
			<tr>
				<td>主要</td>
				<td><a-input v-model:value="formData.wkrcPrimaryScore" placeholder="请输入分值" type="number"   @change="inputChange('wkrc')"/></td>
				<td><a-input v-model:value="formData.wkrcPrimaryThreshold" placeholder="请输入阈值" type="number"  @change="inputChange('wkrc')" /></td>
				
			
				<td >主要</td>
				<td><a-input v-model:value="formData.wkscPrimaryScore" placeholder="请输入分值" type="number" @change="inputChange('wksc')" /></td>
				<td><a-input v-model:value="formData.wkscPrimaryThreshold" placeholder="请输入阈值" type="number" @change="inputChange('wksc')"  /></td>
				
			</tr>

			<tr>
				<td>次要</td>
				<td><a-input v-model:value="formData.wkrcSecondaryScore" placeholder="请输入分值" type="number"  @change="inputChange('wkrc')"/></td>
				<td><a-input v-model:value="formData.wkrcSecondaryThreshold" placeholder="请输入阈值" type="number"  @change="inputChange('wkrc')" /></td>
				
			
				<td >次要</td>
				<td><a-input v-model:value="formData.wkscSecondaryScore" placeholder="请输入分值" type="number"  @change="inputChange('wksc')" /></td>
				<td><a-input v-model:value="formData.wkscSecondaryThreshold" placeholder="请输入阈值" type="number" @change="inputChange('wksc')"  /></td>
				
			</tr>

			<tr>
				<td rowspan="3">3</td>
				<td rowspan="3">网口入站丢包数监控</td>
				<td>严重</td>
				<td><a-input v-model:value="formData.wkrzdbSeriousScore" placeholder="请输入分值" type="number"  @change="inputChange('wkrzdb')" /></td>
				<td><a-input v-model:value="formData.wkrzdbSeriousThreshold" placeholder="请输入阈值" type="number"  @change="inputChange('wkrzdb')" /></td>
				
				<td rowspan="3">网口带宽监控</td>
				<td >严重</td>
				<td><a-input v-model:value="formData.speedSeriousScore" placeholder="请输入分值" type="number"  @change="inputChange('speed')" /></td>
				<td><a-input v-model:value="formData.speedSeriousThreshold" placeholder="请输入阈值" type="number" @change="inputChange('speed')"  /></td>
				
			</tr>
				<tr>
				<td>主要</td>
				<td><a-input v-model:value="formData.wkrzdbPrimaryScore" placeholder="请输入分值" type="number"  @change="inputChange('wkrzdb')" /></td>
				<td><a-input v-model:value="formData.wkrzdbPrimaryThreshold" placeholder="请输入阈值" type="number"  @change="inputChange('wkrzdb')" /></td>
				
			
				<td >主要</td>
				<td><a-input v-model:value="formData.speedPrimaryScore" placeholder="请输入分值" type="number"  @change="inputChange('speed')" /></td>
				<td><a-input v-model:value="formData.speedPrimaryThreshold" placeholder="请输入阈值" type="number" @change="inputChange('speed')"  /></td>
				
			</tr>

			<tr>
				<td>次要</td>
				<td><a-input v-model:value="formData.wkrzdbSecondaryScore" placeholder="请输入分值" type="number" @change="inputChange('wkrzdb')"  /></td>
				<td><a-input v-model:value="formData.wkrzdbSecondaryThreshold" placeholder="请输入阈值" type="number" @change="inputChange('wkrzdb')"  /></td>
				
			
				<td >次要</td>
				<td><a-input v-model:value="formData.speedSecondaryScore" placeholder="请输入分值" type="number"  @change="inputChange('speed')" /></td>
				<td><a-input v-model:value="formData.speedSecondaryThreshold" placeholder="请输入阈值" type="number"  @change="inputChange('speed')"  /></td>
				
			</tr>

			<tr>
				<td rowspan="3">4</td>
				<td rowspan="3">网口出站丢包数监控</td>
				<td>严重</td>
				<td><a-input v-model:value="formData.qutboundSeriousScore" placeholder="请输入分值" type="number"  @change="inputChange('qutbound')"  /></td>
				<td><a-input v-model:value="formData.qutboundSeriousThreshold" placeholder="请输入阈值" type="number" @change="inputChange('qutbound')"  /></td>
				
				<td rowspan="3">ping丢包率监控</td>
				<td >严重</td>
				<td><a-input v-model:value="formData.lossSeriousScore" placeholder="请输入分值" type="number"  @change="inputChange('loss')"  /></td>
				<td><a-input v-model:value="formData.lossSeriousThreshold" placeholder="请输入阈值" type="number"  @change="inputChange('loss')"  /></td>
				
			</tr>
				<tr>
				<td>主要</td>
				<td><a-input v-model:value="formData.qutboundPrimaryScore" placeholder="请输入分值" type="number"  @change="inputChange('qutbound')"  /></td>
				<td><a-input v-model:value="formData.qutboundPrimaryThreshold" placeholder="请输入阈值" type="number" @change="inputChange('qutbound')"  /></td>
				
			
				<td >主要</td>
				<td><a-input v-model:value="formData.lossPrimaryScore" placeholder="请输入分值" type="number"  @change="inputChange('loss')" /></td>
				<td><a-input v-model:value="formData.lossPrimaryThreshold" placeholder="请输入阈值" type="number"  @change="inputChange('loss')"  /></td>
				
			</tr>

			<tr>
				<td>次要</td>
				<td><a-input v-model:value="formData.qutboundSecondaryScore" placeholder="请输入分值" type="number"  @change="inputChange('qutbound')" /></td>
				<td><a-input v-model:value="formData.qutboundSecondaryThreshold" placeholder="请输入阈值" type="number" @change="inputChange('qutbound')"  /></td>
				
			
				<td >次要</td>
				<td><a-input v-model:value="formData.lossSecondaryScore" placeholder="请输入分值" type="number"  @change="inputChange('loss')"  /></td>
				<td><a-input v-model:value="formData.lossSecondaryThreshold" placeholder="请输入阈值" type="number" @change="inputChange('loss')"  /></td>
				
			</tr>

			<tr>
				<td rowspan="3">5</td>
				<td rowspan="3">ping响应时间监控</td>
				<td>严重</td>
				<td><a-input v-model:value="formData.timeSeriousScore" placeholder="请输入分值" type="number" @change="inputChange('time')"  /></td>
				<td><a-input v-model:value="formData.timeSeriousThreshold" placeholder="请输入阈值" type="number" @change="inputChange('time')"  /></td>
				
				<td rowspan="3">CPU使用率监控</td>
				<td >严重</td>
				<td><a-input v-model:value="formData.cpuSeriousScore" placeholder="请输入分值" type="number"  @change="inputChange('cpu')"  /></td>
				<td><a-input v-model:value="formData.cpuSeriousThreshold" placeholder="请输入阈值" type="number" @change="inputChange('cpu')"  /></td>
				
			</tr>
				<tr>
				<td>主要</td>
				<td><a-input v-model:value="formData.timePrimaryScore" placeholder="请输入分值" type="number"  @change="inputChange('time')"  /></td>
				<td><a-input v-model:value="formData.timePrimaryThreshold" placeholder="请输入阈值" type="number"   @change="inputChange('time')" /></td>
				
			
				<td >主要</td>
				<td><a-input v-model:value="formData.cpuPrimaryScore" placeholder="请输入分值" type="number"  @change="inputChange('cpu')" /></td>
				<td><a-input v-model:value="formData.cpuPrimaryThreshold" placeholder="请输入阈值" type="number"  @change="inputChange('cpu')" /></td>
				
			</tr>

			<tr>
				<td>次要</td>
				<td><a-input v-model:value="formData.timeSecondaryScore" placeholder="请输入分值" type="number"  @change="inputChange('time')"  /></td>
				<td><a-input v-model:value="formData.timeSecondaryThreshold" placeholder="请输入阈值" type="number"  @change="inputChange('time')"  /></td>
				
			
				<td >次要</td>
				<td><a-input v-model:value="formData.cpuSecondaryScore" placeholder="请输入分值" type="number"  @change="inputChange('cpu')"  /></td>
				<td><a-input v-model:value="formData.cpuSecondaryThreshold" placeholder="请输入阈值" type="number"  @change="inputChange('cpu')" /></td>
				
			</tr>


			<tr>
				<td rowspan="3">6</td>
				<td rowspan="3">内存使用率监控</td>
				<td>严重</td>
				<td  colspan="3"><a-input v-model:value="formData.memorySeriousScore" placeholder="请输入分值" type="number"  @change="inputChange('memory')"  /></td>
				<td  colspan="3"><a-input v-model:value="formData.memorySeriousThreshold" placeholder="请输入阈值" type="number"  @change="inputChange('memory')" /></td>
				
			</tr>
				<tr>
				<td>主要</td>
				<td colspan="3"><a-input v-model:value="formData.memoryPrimaryScore" placeholder="请输入分值" type="number"  @change="inputChange('memory')" /></td>
				<td colspan="3"><a-input v-model:value="formData.memoryPrimaryThreshold" placeholder="请输入阈值" type="number"  @change="inputChange('memory')" /></td>
				
			</tr>

			<tr>
				<td>次要</td>
				<td  colspan="3"><a-input v-model:value="formData.memorySecondaryScore" placeholder="请输入分值" type="number"  @change="inputChange('memory')"  /></td>
				<td  colspan="3"><a-input v-model:value="formData.memorySecondaryThreshold" placeholder="请输入阈值" type="number"  @change="inputChange('memory')"  /></td>
				
			</tr>
			
		</table>
		
		</a-form>
	</a-spin>
</template>


<script setup name="alarmConfig">
	import { cloneDeep } from 'lodash-es'
	import configApi from '@/api/dev/configApi'
	import monitortemplateApi from '@/api/dev/monitortemplateApi'
	
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
	monitortemplateApi.configPage(param).then((data) => {
		loadSpinning.value = false

		let records = data.records
		if (records) {
			records.forEach((item) => {
			
				if(item.collectKey == 'Operational status'){ // 网络接口监控
					var obj = JSON.parse(item.defaultThreshold)
					formData.value.operationalSeriousScore = obj.serious.score
					formData.value.operationalSeriousThreshold = obj.serious.threshold
					formData.value.operationalId = item.id
				}

				if(item.collectKey == 'Bits received'){ // 网口输入流量监控
					var obj = JSON.parse(item.defaultThreshold)
					formData.value.wkrcId = item.id

					formData.value.wkrcPrimaryScore = obj.primary.score
					formData.value.wkrcPrimaryThreshold = obj.primary.threshold
					formData.value.wkrcSeriousScore = obj.serious.score
					formData.value.wkrcSeriousThreshold = obj.serious.threshold
					formData.value.wkrcSecondaryScore = obj.secondary.score
					formData.value.wkrcSecondaryThreshold = obj.secondary.threshold
					
				}

				if(item.collectKey == 'Bits sent'){ // 网口输出流量监控
					var obj = JSON.parse(item.defaultThreshold)
					formData.value.wkscId = item.id

					formData.value.wkscPrimaryScore = obj.primary.score
					formData.value.wkscPrimaryThreshold = obj.primary.threshold
					formData.value.wkscSeriousScore = obj.serious.score
					formData.value.wkscSeriousThreshold = obj.serious.threshold
					formData.value.wkscSecondaryScore = obj.secondary.score
					formData.value.wkscSecondaryThreshold = obj.secondary.threshold
					
				}

				if(item.collectKey == 'Inbound packets discarded'){ // 	网口入站丢包数监控
					var obj = JSON.parse(item.defaultThreshold)
					formData.value.wkrzdbId = item.id

					formData.value.wkrzdbPrimaryScore = obj.primary.score
					formData.value.wkrzdbPrimaryThreshold = obj.primary.threshold
					formData.value.wkrzdbSeriousScore = obj.serious.score
					formData.value.wkrzdbSeriousThreshold = obj.serious.threshold
					formData.value.wkrzdbSecondaryScore = obj.secondary.score
					formData.value.wkrzdbSecondaryThreshold = obj.secondary.threshold
					
				}

				if(item.collectKey == 'Speed'){ // 	网口带宽监控
					var obj = JSON.parse(item.defaultThreshold)
					formData.value.speedId = item.id

					formData.value.speedPrimaryScore = obj.primary.score
					formData.value.speedPrimaryThreshold = obj.primary.threshold
					formData.value.speedSeriousScore = obj.serious.score
					formData.value.speedSeriousThreshold = obj.serious.threshold
					formData.value.speedSecondaryScore = obj.secondary.score
					formData.value.speedSecondaryThreshold = obj.secondary.threshold
					
				}


				if(item.collectKey == 'Outbound packets discarded'){ // 	网口出站丢包数监控
					var obj = JSON.parse(item.defaultThreshold)
					formData.value.qutboundId = item.id

					formData.value.qutboundPrimaryScore = obj.primary.score
					formData.value.qutboundPrimaryThreshold = obj.primary.threshold
					formData.value.qutboundSeriousScore = obj.serious.score
					formData.value.qutboundSeriousThreshold = obj.serious.threshold
					formData.value.qutboundSecondaryScore = obj.secondary.score
					formData.value.qutboundSecondaryThreshold = obj.secondary.threshold
					
				}

				if(item.collectKey == 'ICMP ping'){ // 	ping状态监控
					var obj = JSON.parse(item.defaultThreshold)
					formData.value.pingIcmpId = item.id

					formData.value.pingIcmpSeriousScore = obj.serious.score
					formData.value.pingIcmpSeriousThreshold = obj.serious.threshold
					
				}

				if(item.collectKey == 'ICMP loss'){ // 	ping丢包率监控
					var obj = JSON.parse(item.defaultThreshold)
					formData.value.lossId = item.id

					formData.value.lossPrimaryScore = obj.primary.score
					formData.value.lossPrimaryThreshold = obj.primary.threshold
					formData.value.lossSeriousScore = obj.serious.score
					formData.value.lossSeriousThreshold = obj.serious.threshold
					formData.value.lossSecondaryScore = obj.secondary.score
					formData.value.lossSecondaryThreshold = obj.secondary.threshold
					
				}

				if(item.collectKey == 'ICMP response time'){ // 	ping响应时间监控
					var obj = JSON.parse(item.defaultThreshold)
					formData.value.timeId = item.id

					formData.value.timePrimaryScore = obj.primary.score
					formData.value.timePrimaryThreshold = obj.primary.threshold
					formData.value.timeSeriousScore = obj.serious.score
					formData.value.timeSeriousThreshold = obj.serious.threshold
					formData.value.timeSecondaryScore = obj.secondary.score
					formData.value.timeSecondaryThreshold = obj.secondary.threshold
					
				}

				if(item.collectKey == 'Board: CPU utilization'){ // 	CPU使用率监控
					var obj = JSON.parse(item.defaultThreshold)
					formData.value.cpuId = item.id

					formData.value.cpuPrimaryScore = obj.primary.score
					formData.value.cpuPrimaryThreshold = obj.primary.threshold
					formData.value.cpuSeriousScore = obj.serious.score
					formData.value.cpuSeriousThreshold = obj.serious.threshold
					formData.value.cpuSecondaryScore = obj.secondary.score
					formData.value.cpuSecondaryThreshold = obj.secondary.threshold
					
				}


				if(item.collectKey == 'Board: Memory utilization'){ // 	内存使用率监控
					var obj = JSON.parse(item.defaultThreshold)
					formData.value.memoryId = item.id
					
					formData.value.memoryPrimaryScore = obj.primary.score
					formData.value.memoryPrimaryThreshold = obj.primary.threshold
					formData.value.memorySeriousScore = obj.serious.score
					formData.value.memorySeriousThreshold = obj.serious.threshold
					formData.value.memorySecondaryScore = obj.secondary.score
					formData.value.memorySecondaryThreshold = obj.secondary.threshold
					
				}

			})	
		} else {
			message.warning('表单项不存在，请初始化数据库')
		}

	})
	const inputChange = (type) => {
		
		var params = {};
		if(type == 'operational'){ // 网络接口监控	
			var jsonValue = {
				serious: {score:formData.value.operationalSeriousScore,threshold:formData.value.operationalSeriousThreshold}
			}
			params.id = formData.value.operationalId
		}

		if(type == 'pingIcmp'){ // ping状态监控	
			var jsonValue = {
				serious: {score:formData.value.pingIcmpSeriousScore,threshold:formData.value.pingIcmpSeriousThreshold}
			}
			params.id = formData.value.pingIcmpId
		}

		if(type == 'wkrc'){ // 网口输入流量监控	
			var jsonValue = {
				serious: {score:formData.value.wkrcSeriousScore,threshold:formData.value.wkrcSeriousThreshold},
				primary: {score:formData.value.wkrcPrimaryScore,threshold:formData.value.wkrcPrimaryThreshold},
				secondary: {score:formData.value.wkrcSecondaryScore,threshold:formData.value.wkrcSecondaryThreshold}
			}
			params.id = formData.value.wkrcId
		}

		if(type == 'wksc'){ // 网口输出流量监控	
			var jsonValue = {
				serious: {score:formData.value.wkscSeriousScore,threshold:formData.value.wkscSeriousThreshold},
				primary: {score:formData.value.wkscPrimaryScore,threshold:formData.value.wkscPrimaryThreshold},
				secondary: {score:formData.value.wkscSecondaryScore,threshold:formData.value.wkscSecondaryThreshold}
			}
			params.id = formData.value.wkscId
		}


		if(type == 'wkrzdb'){ // 网口入站丢包数监控	
			var jsonValue = {
				serious: {score:formData.value.wkrzdbSeriousScore,threshold:formData.value.wkrzdbSeriousThreshold},
				primary: {score:formData.value.wkrzdbPrimaryScore,threshold:formData.value.wkrzdbPrimaryThreshold},
				secondary: {score:formData.value.wkrzdbSecondaryScore,threshold:formData.value.wkrzdbSecondaryThreshold}
			}
			params.id = formData.value.wkrzdbId
		}


		if(type == 'speed'){ // 网口带宽监控	
			var jsonValue = {
				serious: {score:formData.value.speedSeriousScore,threshold:formData.value.speedSeriousThreshold},
				primary: {score:formData.value.speedPrimaryScore,threshold:formData.value.speedPrimaryThreshold},
				secondary: {score:formData.value.speedSecondaryScore,threshold:formData.value.speedSecondaryThreshold}
			}
			params.id = formData.value.speedId
		}

		if(type == 'qutbound'){ // 网口出站丢包数监控	
			var jsonValue = {
				serious: {score:formData.value.qutboundSeriousScore,threshold:formData.value.qutboundSeriousThreshold},
				primary: {score:formData.value.qutboundPrimaryScore,threshold:formData.value.qutboundPrimaryThreshold},
				secondary: {score:formData.value.qutboundSecondaryScore,threshold:formData.value.qutboundSecondaryThreshold}
			}
			params.id = formData.value.qutboundId
		}

		if(type == 'loss'){ // ping丢包率监控
			var jsonValue = {
				serious: {score:formData.value.lossSeriousScore,threshold:formData.value.lossSeriousThreshold},
				primary: {score:formData.value.lossPrimaryScore,threshold:formData.value.lossPrimaryThreshold},
				secondary: {score:formData.value.lossSecondaryScore,threshold:formData.value.lossSecondaryThreshold}
			}
			params.id = formData.value.lossId
		}

		if(type == 'time'){ // ping响应时间监控
			var jsonValue = {
				serious: {score:formData.value.timeSeriousScore,threshold:formData.value.timeSeriousThreshold},
				primary: {score:formData.value.timePrimaryScore,threshold:formData.value.timePrimaryThreshold},
				secondary: {score:formData.value.timeSecondaryScore,threshold:formData.value.timeSecondaryThreshold}
			}
			params.id = formData.value.timeId
		}


		if(type == 'cpu'){ // CPU使用率监控
			var jsonValue = {
				serious: {score:formData.value.cpuSeriousScore,threshold:formData.value.cpuSeriousThreshold},
				primary: {score:formData.value.cpuPrimaryScore,threshold:formData.value.cpuPrimaryThreshold},
				secondary: {score:formData.value.cpuSecondaryScore,threshold:formData.value.cpuSecondaryThreshold}
			}
			params.id = formData.value.cpuId
		}

		if(type == 'memory'){ // 内存使用率监控
			var jsonValue = {
				serious: {score:formData.value.memorySeriousScore,threshold:formData.value.memorySeriousThreshold},
				primary: {score:formData.value.memoryPrimaryScore,threshold:formData.value.memoryPrimaryThreshold},
				secondary: {score:formData.value.memorySecondaryScore,threshold:formData.value.memorySecondaryThreshold}
			}
			params.id = formData.value.memoryId
		}

		params.defaultThreshold =  JSON.stringify(jsonValue);
		submitLoading.value = true
		monitortemplateApi.configEdit(params).then((data) => {
			submitLoading.value = false
		})
		.finally(() => {
			submitLoading.value = false
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
	border: 1px solid #cdcccc;
	overflow:hidden;
	white-space:nowrap;
	text-overflow:ellipsis;
	text-align: center;

}
table td input{
	width: 80%;
}

</style>