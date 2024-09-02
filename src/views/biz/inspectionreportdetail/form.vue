<template>

	<a-drawer
		title="X射线数字成像检测报告"
		:width="1200"
		:visible="visible"
		:destroy-on-close="true"
		:body-style="{ paddingBottom: '80px', 'padding-top': '0px' }"
		:footer-style="{ textAlign: 'right' }"
		:bordered="true"
		@close="onClose"
	>

	<a-card :bordered="false" :body-style="{ 'margin-top': '5px' }" style="margin-bottom: 0px">
		<table class="table1">
			<tr>
				<td colspan="6"  class="name">X射线数字成像检测报告</td>
				
			</tr>
			<tr>
				<td class="title">报告编号</td>
				<td class="value">{{ infoData.reportNumber }}</td>
				<td class="title">报告时间</td>
				<td class="value" colspan="3">{{ infoData.reportDate }}</td>
			</tr>
			<tr>
				<td class="title">委托单位</td>
				<td class="value">{{ infoData.client }}</td>
				<td class="title">检测编号</td>
				<td class="value" colspan="3">{{ infoData.testingStandardNumber }}</td>
			</tr>
			<tr>
				<td class="title">生产令号</td>
				<td class="value">{{ infoData.productionOrderNumber }}</td>
				<td class="title">零部件名称</td>
				<td class="value" colspan="3">{{ infoData.componentName	 }}</td>
			</tr>
			<tr>
				<td class="title">零部件编号</td>
				<td class="value">{{ infoData.componentPartNumber }}</td>
				<td class="title">零部件图号</td>
				<td class="value" colspan="3">{{ infoData.componentImageNumber }}</td>
			</tr>
			<tr>
				<td class="title">检测材质</td>
				<td class="value">{{ infoData.materialInspectionPiece }}</td>
				<td class="title">检测比例</td>
				<td class="value" colspan="3">{{ infoData.detectionRatio }}</td>
			</tr>
			<tr>
				<td class="title">检测部位</td>
				<td class="value">{{ infoData.detectionSite }}</td>
				<td class="title">技术级别</td>
				<td class="value" colspan="3">{{ infoData.technicalLevel }}</td>
			</tr>

			<tr>
				<td class="title">检测标准</td>
				<td class="value">{{ infoData.testingStandards	}}</td>
				<td class="title">验收标准</td>
				<td class="value" colspan="3">{{ infoData.acceptanceCriteria }}</td>
			</tr>
			<tr>
				<td class="title">工序号</td>
				<td class="value">{{ infoData.productionProcessesCode }}</td>
				<td class="title">规格 (mm)</td>
				<td class="value" colspan="3">{{ infoData.inspectionSpecification }}</td>
			</tr>
			<tr>
				<td class="title">焊接方法</td>
				<td class="value">{{ infoData.weldMethod }}</td>
				<td class="title">焊缝编号</td>
				<td class="value" colspan="3">{{ infoData.weldNo }}</td>
			</tr>
			<tr>
				<td class="title">焊缝长度</td>
				<td class="value">{{ infoData.weldLength }}</td>
				<td class="title">拍片长度</td>
				<td class="value" colspan="3">{{ infoData.filmingLength }}</td>
			</tr>

			<tr>
				<td class="title" rowspan="12">检测设备及工艺参数</td>
				<td class="left-two">设备型号</td>
				<td class="left-three" colspan="2">{{ infoData.equipmentModel }}</td>
				<td class="title" >探测器类型</td>
				<td class=""  >{{ infoData.detectorType }}</td>
			</tr>
			<tr>
				<td class="left-two" >焦点尺寸(mm)</td>
				<td class="left-three"  colspan="2">{{ infoData.focusSize }}</td>
				<td class="title">探测器规格</td>
				<td class="">{{ infoData.detectorSpecifications }}</td>
			</tr>

			<tr>
				<td class="left-two">焦距(mm)</td>
				<td class="left-three" colspan="2">{{ infoData.focalLength }}</td>
				<td class="title">像素尺寸(mm)</td>
				<td class="">{{ infoData.pixelSize }}</td>
			</tr>
			<tr>
				<td class="left-two">管电压 (KV)</td>
				<td class="left-three" colspan="2">{{ infoData.tubeVoltage }}</td>
				<td class="title">滤波板</td>
				<td class="">{{ infoData.filterBoard }}</td>
			</tr>
			<tr>
				<td class="left-two">管电流 (mA)</td>
				<td class="left-three" colspan="2">{{ infoData.tubeCurrent }}</td>
				<td class="title">线性像质计型号</td>
				<td class="">{{ infoData.linearImageQualityIndicator }}</td>
			</tr>
			<tr>
				<td class="left-two">曝光时间 (S)</td>
				<td class="left-three" colspan="2">{{ infoData.exposureTime }}</td>
				<td class="title">双丝型像质计型号</td>
				<td class="">{{ infoData.twoLinearImageQualityIndicator }}</td>
			</tr>
			<tr>
				<td class="left-two">透照方式</td>
				<td class="left-three" colspan="2">{{ infoData.transilluminationMethod }}</td>
				<td class="title">线性像质指数</td>
				<td class="">{{ infoData.linearImageQualityIndex }}</td>
			</tr>
			<tr>
				<td class="left-two">透照厚(mm)</td>
				<td class="left-three" colspan="2">{{ infoData.penetratedThickness }}</td>
				<td class="title">双丝型像质指数</td>
				<td class="">{{ infoData.twoLinearImageQualityIndex }}</td>
			</tr>
			<tr>
				<td class="left-two">透照区</td>
				<td class="left-three" colspan="2">{{ infoData.transilluminationZone }}</td>
				<td class="title">信噪比</td>
				<td class="">{{ infoData.signalNoiseRatio }}</td>
			</tr>
			<tr>
				<td class="left-two">透照次数</td>
				<td class="left-three" colspan="2">{{ infoData.transilluminationTimes }}</td>
				<td class="title">最佳放大倍数</td>
				<td class="">{{ infoData.optimalMagnification }}</td>
			</tr>
			<tr>
				<td class="left-two">采集图像方式</td>
				<td class="left-three" colspan="2">{{ infoData.imageCollectionMethod }}</td>
				<td class="title">图像灰度范围</td>
				<td class="" >{{ infoData.imageGrayscaleRange }}</td>
			</tr>
			<tr>
				<td class="left-two">图像分辨率</td>
				<td class="left-three" colspan="5">{{ infoData.resolution }}</td>
			
			</tr>
			<tr>
				<td class="title">图像处理方式</td>
				<td class="padding-left10" colspan="5">{{ infoData.imageProcessingMethod }}</td>
			</tr>
			<tr>
				<td  class="title">成像数量</td>
				<td class="padding-left10" colspan="5">{{ infoData.imagingQuantity	 }}</td>
			</tr>
			<tr>
				<td  class="title">检测结果</td>
				<td class="padding-left10"  colspan="6">{{ infoData.detectionResult }}</td>
			</tr>
			<tr>
				<td  class="title">备注</td>
				<td class="padding-left10"  colspan="6">{{ infoData.notes }}</td>
			</tr>
			<tr>
				<td class="title">检测人员</td>
				<td class="title">{{ infoData.testingUser }}</td>
				<td class="title" >评定人员</td>
				<td class="title" colspan="3">{{ infoData.id }}</td>
			</tr>
		</table>
	</a-card>

	<a-card :bordered="false" :body-style="{ 'margin-top': '10px' }" style="margin-bottom: 10px">
			<table class="table2">
				<tr>
					<td colspan="4" class="name">图像信息</td>
					
				</tr>
				<tr class="imginfo">
					<td style="width: 118px;">报告编号</td>
					<td style="text-align: left;text-indent:0.2cm;width: 200px;" >{{ infoData.reportNumber }}</td>
					<td style="width: 118px;">图像编号</td>
					<td> <template v-if="data.length != 0">{{ data[0].imageNumber }}</template> </td>
				</tr>
			</table>
			<a-table
				:columns="columns"
				:data-source="data"
				bordered
				size="middle"
				:scroll="{ x: 700, y: 240 }"
				:customRow="rowClick"
			/>
		</a-card>

		<a-modal v-model:visible="visibleimg" title="参数" @ok="handleOk">
			<div>
				图片文件查看
			</div>
		</a-modal>
	</a-drawer>
</template>

<script setup name="screenInspectionReportDetailForm">
	import { cloneDeep } from 'lodash-es'
	import { required } from '@/utils/formRules'
	import screenInspectionReportDetailApi from '@/api/biz/screenInspectionReportDetailApi'
	import screenImageInformationApi  from  '@/api/biz/screenImageInformationApi'
	import { onMounted,ref } from 'vue'

	// 抽屉状态
	const emit = defineEmits({ successful: null })
	const formRef = ref()
	// 表单数据
	const formData = ref({})
	const submitLoading = ref(false)
	let infoData = ref({})
	let data = ref([])
	
	const visible = ref(false)
	const visibleimg = ref(false)
	// 打开抽屉
	const onOpen = (record) => {
		visible.value = true
		if (record) {
			let recordData = cloneDeep(record)
			screenInspectionReportDetailApi.screenInspectionReportDetailDetail({id:record.id}).then((data) => {
				infoData.value = data
			})
			screenImageInformationApi.screenImageInformationPage({reportNumber:record.reportNumber}).then((res) => {
				data.value = res.records
			
			})
		}
	}	


	
	const handleOk = (e) => {
		visibleimg.value = false;
    }

	const rowClick = (record, index) => {
      return {
        onClick: (event) => {
        // 判断点击的列数为4的时候展示弹窗
           console.log(event.target.cellIndex)
		   visibleimg.value = true
        }
      }
    }

	// 关闭抽屉
	const onClose = () => {
	
		formData.value = {}
		visible.value = false
	}
	
	// 抛出函数
	defineExpose({
		onOpen
	})

	const columns = [
      {
        title: '序号',
        dataIndex: 'reportNumber',
        key: 'reportNumber',
        width: 54,
		align:'center',
      },
	  {
        title: '文件名',
        dataIndex: 'fileName',
        key: 'fileName',
        width: 200,
      },
	  {
        title: '缺陷情况',
        dataIndex: 'defectSituation',
        key: 'defectSituation',
        width: 200,
      },
	  {
        title: '级别',
        dataIndex: 'level',
        key: 'level',
        width: 50,
      },
	];

</script>

<style scoped type="less">
	div /deep/  .ant-table-thead > tr > th{
		background-color: #FFF !important;
	}
table{
		border-collapse: collapse;
		width: 1100px;
		margin-top: 2%;
		word-break: break-all;
	}
	.table2{
		width: 1100px;
	}
	table tr{
		height: 50px;
		line-height: 50px;
	}
	table td{
		border: 1px solid #F0F0F2;
		overflow:hidden; 
		white-space:nowrap; 
		text-overflow:ellipsis;
	}
		.imginfo td{
		border-left:1px solid F0F0F2;
		border-right:1px solid F0F0F2;
		border-bottom: none;
	}

	.table1 .title{
		width:100px;
		text-align: center;
	}
	.table1 .value{
		padding-left: 10px;
		width: 300px;
	}
	.table1 .left-two{
		padding-left: 10px;
		width: 15% !important;
	}
	.table1 .left-three{
		padding-left: 10px;
		width: 20%;
	}
	.name{
		height: 65px;
		list-style: 65px;
		font-weight: 600;
		text-align: center;
		font-size: 20px;
	}
	.table2 td{
		text-align: center;
		height: 50px;
		line-height: 50px;
	}
	.padding-left10{
		padding-left: 10px;
	}
	
</style>
