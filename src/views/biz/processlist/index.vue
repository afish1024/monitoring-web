<template>
	<a-card :bordered="false" :body-style="{ 'padding-bottom': '0px' }" style="margin-bottom: 10px">
		<a-form ref="formRef" name="advanced_search" :model="searchFormState" class="ant-advanced-search-form">
			<a-row :gutter="24">
				<a-col :span="6">
					<a-form-item label="" name="productionProcessesName">
						<a-input v-model:value="searchFormState.productionProcessesName" placeholder="请输入工艺名称" allow-clear></a-input>
					</a-form-item>
				</a-col>
				<a-col :span="8">
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
		>
			<template #operator class="table-operator">
				<a-space>
					<a-button type="primary" @click="formRef.onOpen()" v-if="hasPerm('screenProcessListAdd')">
						<template #icon><plus-outlined /></template>
						新增
					</a-button>
					<xn-batch-delete
						v-if="hasPerm('screenProcessListBatchDelete')"
						:selectedRowKeys="selectedRowKeys"
						@batchDelete="deleteBatchScreenProcessList"
					/>
				</a-space>
			</template>
			<template #bodyCell="{ column, record }">
				<template v-if="column.dataIndex === 'action'">
					<a-space>
						<a @click="formRef.onOpen(record)" v-if="hasPerm('screenProcessListEdit')">编辑</a>
						<a-divider type="vertical" v-if="hasPerm(['screenProcessListEdit', 'screenProcessListDelete'], 'and')" />
						<a-popconfirm title="确定要删除吗？" @confirm="deleteScreenProcessList(record)">
							<a-button type="link" danger size="small" v-if="hasPerm('screenProcessListDelete')">删除</a-button>
						</a-popconfirm>
					</a-space>
				</template>
			</template>
		</s-table>
	</a-card>
	<Form ref="formRef" @successful="table.refresh(true)" />
</template>

<script setup name="processlist">
	import Form from './form.vue'
	import screenProcessListApi from '@/api/biz/screenProcessListApi'
	const table = ref()
	const formRef = ref()
	let searchFormState = reactive({})
	const toolConfig = { refresh: true, height: true, columnSetting: true, striped: false }
	const columns = [
		{
			title: '工艺标题',
			dataIndex: 'processTitle',
			width: 200, 
			fixed: 'left'
		},
	
		{
			title: '产品代号',
			dataIndex: 'productCode',
			width: 200, 
			fixed: 'left'
		},
		{
			title: '零部组件代号',
			dataIndex: 'componentCode',
			width: 110, 
		},
		{
			title: '工序号',
			dataIndex: 'productionProcessesCode',
			width: 200, 
		},
		{
			title: '工序名称',
			dataIndex: 'productionProcessesName',
			width: 150, 
		},
		{
			title: '材料编号',
			dataIndex: 'materialNumber',
			width: 100, 
		},
		{
			title: '检测标准',
			dataIndex: 'testingStandards',
			width: 100, 
		},
		{
			title: '验收标准',
			dataIndex: 'acceptanceCriteria',
			width: 100, 
		},
		{
			title: '部位编号',
			dataIndex: 'partNumber',
			width: 100, 
		},
		{
			title: '技术级别',
			dataIndex: 'technicalLevel',
			width: 100, 
		},
		{
			title: '检测部位',
			dataIndex: 'detectionSite',
			width: 100, 
		},
		{
			title: '检测比例',
			dataIndex: 'detectionRatio',
			width: 100, 
		},
		{
			title: '焊缝编号',
			dataIndex: 'weldNo',
			width: 100, 
		},
		{
			title: '检测比例2',
			dataIndex: 'detectionRatio2',
			width: 100, 
		},
		{
			title: '备注',
			dataIndex: 'notes',
			width: 100, 
		},
		{
			title: '设备型号',
			dataIndex: 'equipmentModel',
			width: 100, 
		},
		{
			title: '探测器类型',
			dataIndex: 'detectorType',
			width: 100, 
		},
		{
			title: '焦点尺寸',
			dataIndex: 'focusSize',
			width: 100, 
		},
		{
			title: '像素尺寸',
			dataIndex: 'pixelSize',
			width: 100, 
		},
		{
			title: '焦距',
			dataIndex: 'focalLength',
			width: 100, 
		},
		{
			title: '探测器规格',
			dataIndex: 'detectorSpecifications',
			width: 100, 
		},
		{
			title: '管电压',
			dataIndex: 'tubeVoltage',
			width: 100, 
		},
		{
			title: '滤波板',
			dataIndex: 'filterBoard',
			width: 100, 
		},
		{
			title: '管电流',
			dataIndex: 'tubeCurrent',
			width: 100, 
		},
		{
			title: '图像分辨率',
			dataIndex: 'resolution',
			width: 100, 
		},
		{
			title: '曝光时间',
			dataIndex: 'exposureTime',
			width: 100, 
		},
		{
			title: '图像灰度范围',
			dataIndex: 'imageGrayscaleRange',
			width: 150, 
		},
		{
			title: '透照方式',
			dataIndex: 'transilluminationMethod',
			width: 100, 
		},
		{
			title: '采集图像方式',
			dataIndex: 'imageCollectionMethod',
			width: 150, 
		},
		{
			title: '透照厚度',
			dataIndex: 'penetratedThickness',
			width: 100, 
		},
		{
			title: '信噪比',
			dataIndex: 'signalNoiseRatio',
			width: 100, 
		},
		{
			title: '透照区',
			dataIndex: 'transilluminationZone',
			width: 100, 
		},
		{
			title: '透照次数',
			dataIndex: 'transilluminationTimes',
			width: 100, 
		},
		{
			title: '最佳放大倍数',
			dataIndex: 'optimalMagnification',
			width: 200, 
		},
		{
			title: '像质指数',
			dataIndex: 'imageQualityIndex',
			width: 100, 
		}
	]
	// 操作栏通过权限判断是否显示
	if (hasPerm(['screenProcessListEdit', 'screenProcessListDelete'])) {
		columns.push({
			title: '操作',
			dataIndex: 'action',
			align: 'center',
			width: '150px',
			fixed: 'right',
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
		return screenProcessListApi.screenProcessListPage(Object.assign(parameter, searchFormState)).then((data) => {
			return data
		})
	}
	// 重置
	const reset = () => {
		searchFormRef.value.resetFields()
		table.value.refresh(true)
	}
	// 删除
	const deleteScreenProcessList = (record) => {
		let params = [
			{
				id: record.id
			}
		]
		screenProcessListApi.screenProcessListDelete(params).then(() => {
			table.value.refresh(true)
		})
	}
	// 批量删除
	const deleteBatchScreenProcessList = (params) => {
		screenProcessListApi.screenProcessListDelete(params).then(() => {
			table.value.clearRefreshSelected()
		})
	}
</script>
