<template>
	<a-card :bordered="false" :body-style="{ 'padding-bottom': '0px' }" style="margin-bottom: 10px">
		<a-form ref="formRef" name="advanced_search" :model="searchFormState" class="ant-advanced-search-form">
			<a-row :gutter="24">
				<a-col :span="5">
					<a-form-item label="选择网络" name="networkId">
						<a-select v-model:value="searchFormState.networkId" placeholder="请选择网络" allowClear>
							<a-select-option v-for="item in networkList" :key="item.id" :value="item.id">{{
								item.networkName
							}}</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>
				<a-col :span="5">
					<a-form-item label="选择设备" name="deviceId">
						<a-select v-model:value="searchFormState.deviceId" placeholder="请选择设备" allowClear>
							<a-select-option v-for="item in deviceList" :key="item.id" :value="item.id">{{
								item.deviceName
							}}</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>
				<a-col :span="5">
					<a-form-item label="告警类型" name="alarmType">
						<a-select v-model:value="searchFormState.alarmType" placeholder="请选择设备" allowClear>
							<a-select-option v-for="item in typsList" :key="item.id" :value="item.dictValue">{{
								item.dictLabel
							}}</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>
				<a-col :span="5">
					<a-form-item label="告警级别" name="alarmLevel">
						<a-select v-model:value="searchFormState.alarmLevel" placeholder="请选择设备" allowClear>
							<a-select-option v-for="item in levelsList" :key="item.id" :value="item.dictValue">{{
								item.dictLabel
							}}</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>
			</a-row>
			<a-row :gutter="24">
				
				<a-col :span="5">
					<a-form-item label="告警状态" name="alarmStatus">
						<a-select v-model:value="searchFormState.alarmStatus" placeholder="请选择设备" allowClear>
							<a-select-option v-for="item in statusList" :key="item.id" :value="item.dictValue">{{
								item.dictLabel
							}}</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>
				<a-col :span="5">
					<a-form-item label="设备名称" name="deviceName">
						<a-input v-model:value="searchFormState.deviceName" placeholder="请输入设备名称" allow-clear></a-input>
					</a-form-item>
				</a-col>
				
				<a-col :span="5">
					<a-button type="primary" html-type="submit" @click="table.refresh()">查询</a-button>
				</a-col>
			</a-row>
		</a-form>
	</a-card>
	<a-card :bordered="false">
		<s-table
			ref="table"
			:columns="columns"
			:data="loadData"
			:alert="options.alert.show"
			bordered
			:row-key="(record) => record.id"
			:tool-config="toolConfig"
			:scroll="{ x: 1500 }"
			:pagination="{defaultPageSize:20}"
		>
		<template #bodyCell="{ column, record }">
			<template v-if="column.dataIndex === 'alarmLevel'">
			<div class="lists-level" 
				:class="{'bg-yellow':record.alarmLevel == 'secondary',
				'bg-orage':record.alarmLevel == 'primary',
				'bg-error':record.alarmLevel =='serious',
				'bg-unknown':record.alarmLevel =='unknown',
				'bg-red':record.alarmLevel == 'disconnect'
			}" >
				{{ record.alarmLevelName }}
			</div>
				
			</template>

			<template v-if="column.dataIndex === 'alarmType'">
		
				<div >
					{{ record.alarmTypeName }}
				</div>
					
				</template>
			<template v-if="column.dataIndex === 'ipAddress'">
				{{ record.deviceName }}
				<br/>
				{{ record.ipAddress }}
			</template>

			<template v-if="column.dataIndex === 'action'">
				<a-space>
					<check-circle-outlined @click="formRef.onOpen(record)" />
					<eye-outlined @click="infoRef.onOpen(record)"  v-if="hasPerm('alertEdit')" />
					
				</a-space>
			</template>

		</template>

		</s-table>
	</a-card>
	<Form ref="formRef" @successful="table.refresh(false)" />
	<Info ref="infoRef" @successful="table.refresh(true)" />
</template>

<script setup name="processlist">
	import alerts from '@/api/alerts/alerts'
	import planApiList from '@/api/alarm/indexApi'
	import dictApi from '@/api/dev/dictApi'

	import Form from './form.vue'
	import Info from './info.vue'
	import tool from '@/utils/tool'
	const table = ref()
	const info = ref()
	const formRef = ref()
	const infoRef = ref()
	const url = ref(import.meta.env.VITE_API_BASEURL)
	let searchFormState = reactive({})
	const toolConfig = { refresh: true, height: true, striped: false }
	const networkList = ref([]) // 网络
	const deviceList = ref([]) // 设备
	const typsList = ref([]) // 告警类型
	const levelsList = ref([]) // 告警级别
	const statusList = ref([]) // 告警状态
	const columns = [
		{
			title: '告警级别',
			dataIndex: 'alarmLevel',
			width: 100,
			fixed: 'left'
		},
		{
			title: '告警类型',
			dataIndex: 'alarmType',
			width: 100,
		},
		{
			title: '告警原因',
			dataIndex: 'alarmReason',
			width: 150,
		},
		{
			title: '触发值',
			dataIndex: 'triggerValue',
			width: 150,
		},
		{
			title: '网络名称',
			dataIndex: 'networkName',
			width: 150,
		},
		{
			title: '设备名/设备IP',
			dataIndex: 'ipAddress',
			width: 150,
		},
		{
			title: '资源类型',
			dataIndex: 'resourceType',
			width: 100,
		},
		{
			title: '资源名称',
			dataIndex: 'resourceName',
			width: 150,
		}
	]

    // 操作栏通过权限判断是否显示
	if (hasPerm(['alertEdit', 'alertDelete'])) {
		columns.push({
			title: '操作',
			dataIndex: 'action',
			align: 'center',
			width: '150px'
		})
	}
    
	const selectedRowKeys = ref([])
	// 列表选择配置
	const options = {
		// columns数字类型字段加入 needTotal: true 可以勾选自动算账
		alert: {
			show: false,
			clear: () => {
				selectedRowKeys.value = ref([])
			}
		},
		rowSelection: {
			onChange: (selectedRowKey, selectedRows) => {
				selectedRowKeys.value = selectedRowKey
			}
		}
	}
	const loadData = (parameter) => {
		return alerts.alarmPage(Object.assign(parameter, searchFormState)).then((data) => {
			return data
		})
	}
	// 重置
	const reset = () => {
		searchFormRef.value.resetFields()
		table.value.refresh(true)
	}
	onMounted(()=>{
		eventNetworkInfoData()
		eventDeviceInfoData()
		searchData()
	})
	//选择网络
	const eventNetworkInfoData = ()=>{
		planApiList.eventNetworkInfo({}).then(res=>{
			networkList.value = res
		})
	}
	const eventDeviceInfoData = ()=>{
    	planApiList.eventDeviceInfo({}).then(res=>{
        	deviceList.value = res
    	})
	
	}
	const searchData = ()=>{
    	dictApi.dictListForLabel({category:'biz',dictValue:'ALARM_LEVEL'}).then((data) => {
			levelsList.value = data.value = data
		})
		dictApi.dictListForLabel({category:'biz',dictValue:'ALARM_STATUS'}).then((data) => {
		    statusList.value = data
		})
		dictApi.dictListForLabel({category:'biz',dictValue:'ALARM_TYPE'}).then((data) => {
			typsList.value = data
		})
	
	}

</script>
<style lang="less" >
.lists-level{
	color: #FFF;
	text-align: center;
	padding: 5px 0px;
	border-radius: 15px;
	width: 60px;
}
.bg-yellow{
	background-color: #f4cc61;
}
.bg-orage{
	background-color: #fd945f;
}
.bg-red{
	background-color: #f56372;
}
.bg-error{
	background-color: red;
}
.bg-unknown{
	background-color: #ececec;
}
</style>