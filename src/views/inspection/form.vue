<template>
	<a-drawer
		title="X射线数字成像检测报告"
		:width="1200"
		:visible="visible"
		:destroy-on-close="true"
		:body-style="{ paddingBottom: '80px', 'padding-top': '0px' }"
		:footer-style="{ textAlign: 'right' }"
		@close="onClose"
	>
		<table class="table1">
			<tr>
				<td class="title">报告编号</td>
				<td class="value">2054588787878</td>
				<td class="title">报告时间</td>
				<td class="value" colspan="2">21454545</td>
			</tr>
			<tr>
				<td class="title">报告编号</td>
				<td class="value">2054588787878</td>
				<td class="title">报告时间</td>
				<td class="value" colspan="2">21454545</td>
			</tr>
			<tr>
				<td class="title">报告编号</td>
				<td class="value">2054588787878</td>
				<td class="title">报告时间</td>
				<td class="value" colspan="2">21454545</td>
			</tr>
			<tr>
				<td class="title">报告编号</td>
				<td class="value">2054588787878</td>
				<td class="title">报告时间</td>
				<td class="value" colspan="2">21454545</td>
			</tr>
			<tr>
				<td class="title">报告编号</td>
				<td class="value">2054588787878</td>
				<td class="title">报告时间</td>
				<td class="value" colspan="2">21454545</td>
			</tr>
			<tr>
				<td class="title">报告编号</td>
				<td class="value">2054588787878</td>
				<td class="title">报告时间</td>
				<td class="value" colspan="2">21454545</td>
			</tr>
			<tr>
				<td class="title">报告编号</td>
				<td class="value">2054588787878</td>
				<td class="title">报告时间</td>
				<td class="value" colspan="2">21454545</td>
			</tr>
			<tr>
				<td class="title">报告编号</td>
				<td class="value">2054588787878</td>
				<td class="title">报告时间</td>
				<td class="value" colspan="2">21454545</td>
			</tr>
			<tr>
				<td class="title">焊缝长度</td>
				<td class="value">2054588787878</td>
				<td class="title"></td>
				<td class="value" colspan="2"></td>
			</tr>

			<tr>
				<td class="title" rowspan="12">检测设备及工艺参数</td>
				<td class="left-two">设备型号</td>
				<td class="left-three">CF225</td>
				<td class="title">探测器类型</td>
				<td class="">100%</td>
			</tr>
			<tr>
				<td class="left-two">焦点尺寸(mm)</td>
				<td class="left-three">1.0</td>
				<td class="title">探测规格</td>
				<td class="">2520DX</td>
			</tr>

			<tr>
				<td class="left-two">焦点尺寸(mm)</td>
				<td class="left-three">1.0</td>
				<td class="title">探测规格</td>
				<td class="">2520DX</td>
			</tr>
			<tr>
				<td class="left-two">焦点尺寸(mm)</td>
				<td class="left-three">1.0</td>
				<td class="title">探测规格</td>
				<td class="">2520DX</td>
			</tr>
			<tr>
				<td class="left-two">焦点尺寸(mm)</td>
				<td class="left-three">1.0</td>
				<td class="title">探测规格</td>
				<td class="">2520DX</td>
			</tr>
			<tr>
				<td class="left-two">焦点尺寸(mm)</td>
				<td class="left-three">1.0</td>
				<td class="title">探测规格</td>
				<td class="">2520DX</td>
			</tr>
			<tr>
				<td class="left-two">焦点尺寸(mm)</td>
				<td class="left-three">1.0</td>
				<td class="title">探测规格</td>
				<td class="">2520DX</td>
			</tr>
			<tr>
				<td class="left-two">焦点尺寸(mm)</td>
				<td class="left-three">1.0</td>
				<td class="title">探测规格</td>
				<td class="">2520DX</td>
			</tr>
			<tr>
				<td class="left-two">焦点尺寸(mm)</td>
				<td class="left-three">1.0</td>
				<td class="title">探测规格</td>
				<td class="">2520DX</td>
			</tr>
			<tr>
				<td class="left-two">焦点尺寸(mm)</td>
				<td class="left-three">1.0</td>
				<td class="title">探测规格</td>
				<td class="">2520DX</td>
			</tr>
			<tr>
				<td class="left-two">焦点尺寸(mm)</td>
				<td class="left-three">1.0</td>
				<td class="title">探测规格</td>
				<td class="">2520DX</td>
			</tr>
			<tr>
				<td class="title" >图像处理</td>
				<td class="padding-left10" colspan="4">积分降噪</td>
			</tr>
			<tr>
				<td  class="title">成像数量</td>
				<td class="padding-left10" colspan="4">总计: 29幅其中:一级29幅,三级0幅、四级0幅;一次返修R1 0幅，二次返修R2 0幅，二级0幅，三次返修R3 0幅</td>
			</tr>
			<tr>
				<td  class="title">检测结算</td>
				<td class="padding-left10">合格</td>
				<td class="padding-left10" colspan="3">一级29幅，二级0幅，符合图样和NB/T 47013.11-2015标准要求</td>
			</tr>
			<tr>
				<td class="title"  colspan="2">检测人：张三</td>
				<td class="title"  colspan="2">检测人：张三</td>
				<td class="title">审核人员</td>
			</tr>
		</table>

		<table class="table2">
			<tr>
				<td colspan="9" class="name">缺陷信息</td>
				
			</tr>
			<tr>
				<td rowspan="2">透照日期</td>
				<td rowspan="2">缺陷编号</td>
				<td rowspan="2">缺陷类型</td>
				<td>缺陷尺寸</td>
				<td>0.5-1.0mm气孔</td>
				<td>1.0-1.5mm气孔</td>
				<td>>1.5mm气孔</td>
				<td>裂纹</td>
			</tr>
			<tr>
				<td>缺陷尺寸</td>
				<td>0.5-1.0mm气孔</td>
				<td>1.0-1.5mm气孔</td>
				<td>>1.5mm气孔</td>
				<td>裂纹</td>
			</tr>
			<tr>
				<td></td>
				<td>1</td>
				<td>低凹</td>
				<td>0.8</td>
				<td>2</td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td></td>
				<td>1</td>
				<td>低凹</td>
				<td>0.8</td>
				<td>2</td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td></td>
				<td>1</td>
				<td>低凹</td>
				<td>0.8</td>
				<td>2</td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td></td>
				<td>1</td>
				<td>低凹</td>
				<td>0.8</td>
				<td>2</td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td></td>
				<td>1</td>
				<td>低凹</td>
				<td>0.8</td>
				<td>2</td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td></td>
				<td>1</td>
				<td>低凹</td>
				<td>0.8</td>
				<td>2</td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td></td>
				<td>1</td>
				<td>低凹</td>
				<td>0.8</td>
				<td>2</td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td></td>
				<td>1</td>
				<td>低凹</td>
				<td>0.8</td>
				<td>2</td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
		</table>
	</a-drawer>
</template>

<script setup>
	import userApi from '@/api/sys/userApi'
	import { required, rules } from '@/utils/formRules'
	// 默认是关闭状态
	let visible = $ref(false)

	
	// 打开抽屉
	const onOpen = (record) => {
		visible = true
		
		if (record) {
			convertFormData(record)
		}
		
	}
	// 回显数据
	const convertFormData = (record) => {
		const param = {
			id: record.id
		}
		// 查询详情
		// userApi.userDetail(param).then((data) => {
		// 	if (data.positionJson) {
		// 		const positionJsonLocal = JSON.parse(data.positionJson).map((item) => {
		// 			childOrgSelect(item)
		// 			return item
		// 		})
		// 		// 替换表单中的格式与后端查到的
		// 		data.positionJson = positionJsonLocal
		// 	}
		// 	formData.value = Object.assign(formData.value, data)
		// 	selePositionData(formData.value.orgId)
		// })
	}
	// 关闭抽屉
	const onClose = () => {
		visible = false
	}


	// 调用这个函数将子组件的一些数据和方法暴露出去
	defineExpose({
		onOpen
	})
</script>

<style scoped type="less">
	table{
		border-collapse: collapse;
		width: 1150px;
		margin-top: 2%;
		word-break: break-all;
	}
	table tr{
		height: 50px;
		line-height: 50px;
	}
	table td{
		border: 1px solid #ececec;
		overflow:hidden; 
		white-space:nowrap; 
		text-overflow:ellipsis;
	}

	.table1 .title{
		width:200px;
		text-align: center;
	}
	.table1 .value{
		padding-left: 10px;
		width: 300px;
	}
	.table1 .left-two{
		padding-left: 10px;
		width: 100px !important;
	}
	.table1 .left-three{
		padding-left: 10px;
		width: 100px;
	}
	.table2 .name{
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
