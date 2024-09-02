<template>
	<a-row :gutter="10">
		<a-col :span="24" style="display: flex; padding-left: 2px">
			<div class="ant-card" style="height: 100px; width: 20%">
				<div class="ant-card-cover">
					<!-- <span class="anticon"  style="color: rgb(105, 192, 255);font-size: 30px;padding-top: 18px;padding-bottom: 5px;">
                        <tool-outlined />
                    </span> -->
					<div style="padding: 24px; line-height: 30px; display: flex">
						<div style="width: 80%">
							<div>
								<span>网络数：</span>
								<span>{{ fromData.totalInfo.networksCount ? fromData.totalInfo.networksCount : 0 }}</span>
							</div>

							<div>
								<span>资源数：</span>
								<span>{{ fromData.totalInfo.resourcesCount ? fromData.totalInfo.resourcesCount : 0 }}</span>
							</div>
						</div>

						<div class="network">
							<global-outlined class="icon" />
						</div>
					</div>
				</div>
			</div>
			<div class="ant-card" style="height: 100px; width: 20%; margin-left: 10px">
				<div class="ant-card-cover">
					<!-- <span class="anticon"  style="color: rgb(105, 192, 255);font-size: 30px;padding-top: 18px;padding-bottom: 5px;">
                        <tool-outlined />
                    </span> -->
					<div style="padding: 24px; line-height: 30px; display: flex">
						<div style="width: 80%">
							<div>
								<span>设备数：</span>
								<span>{{ fromData.totalInfo.devicesCount ? fromData.totalInfo.devicesCount : 0 }}</span>
							</div>

							<div>
								<span>掉线设备数：</span>
								<span>{{
									fromData.totalInfo.disconnectedDeviceCount ? fromData.totalInfo.disconnectedDeviceCount : 0
								}}</span>
							</div>
						</div>

						<div class="device">
							<icon-font type="icon-shebeiguanli" class="icon" />
						</div>
					</div>
				</div>
			</div>
			<div class="ant-card" style="height: 100px; width: 20%; margin-left: 10px">
				<div class="ant-card-cover">
					<!-- <span class="anticon"  style="color: rgb(105, 192, 255);font-size: 30px;padding-top: 18px;padding-bottom: 5px;">
                        <tool-outlined />
                    </span> -->
					<div style="padding: 24px; line-height: 30px; display: flex">
						<div style="width: 80%">
							<div>
								<span>连接数：</span>
								<span>{{ fromData.totalInfo.connectionCount ? fromData.totalInfo.connectionCount : 0 }}</span>
							</div>

							<div>
								<span>断开连接数：</span>
								<span>{{ fromData.totalInfo.disconnectedCount ? fromData.totalInfo.disconnectedCount : 0 }}</span>
							</div>
						</div>

						<div class="connect">
							<icon-font type="icon-envir-rely" class="icon" />
						</div>
					</div>
				</div>
			</div>
			<div class="ant-card" style="height: 100px; width: 20%; margin-left: 10px">
				<div class="ant-card-cover">
					<!-- <span class="anticon"  style="color: rgb(105, 192, 255);font-size: 30px;padding-top: 18px;padding-bottom: 5px;">
                        <tool-outlined />
                    </span> -->
					<div style="padding: 24px; line-height: 30px; display: flex">
						<div style="width: 80%">
							<div>
								<span>告警数：</span>
								<span>{{ fromData.totalInfo.alarmCount ? fromData.totalInfo.alarmCount : 0 }}</span>
							</div>

							<div>
								<span>未确认告警数：</span>
								<span>{{
									fromData.totalInfo.unconfirmedAlarmCount ? fromData.totalInfo.unconfirmedAlarmCount : 0
								}}</span>
							</div>
						</div>

						<div class="alarm">
							<icon-font type="icon-gaojing" class="icon" />
						</div>
					</div>
				</div>
			</div>
			<div class="ant-card" style="height: 100px; width: 20%; margin-left: 10px">
				<div class="ant-card-cover">
					<!-- <span class="anticon"  style="color: rgb(105, 192, 255);font-size: 30px;padding-top: 18px;padding-bottom: 5px;">
                        <tool-outlined />
                    </span> -->
					<div style="padding: 24px; line-height: 30px; display: flex">
						<div style="width: 80%">
							<div>
								<span>任务数：</span>
								<span>{{ fromData.totalInfo.taskCount ? fromData.totalInfo.taskCount : 0 }}</span>
							</div>

							<div>
								<span>异常任务数：</span>
								<span>{{ fromData.totalInfo.abnormalTaskCount ? fromData.totalInfo.abnormalTaskCount : 0 }}</span>
							</div>
						</div>

						<div class="task">
							<icon-font type="icon-renwuguanli-" class="icon" />
						</div>
					</div>
				</div>
			</div>
		</a-col>
	</a-row>
	<a-row :gutter="24" style="margin-top: 10px">
		<a-col :span="12" style="padding-left: 9px">
			<a-card :bordered="false" style="display: flex">
				<div class="iconleft"></div>
				<div style="float: left; padding-left: 5px; font-weight: bold">全网健康率</div>
			</a-card>
			<a-card :bordered="false">
				<div class="health">
					<div class="yuan">
						<div class="score">
							<a-progress :percent="fromData.deviceLineRate" type="dashboard" :width="120" stroke-color="#2d5e0a">
								<template #format="percent">
									<span>{{ fromData.deviceLineRate }}%</span>
								</template>
							</a-progress>
						</div>
						<div class="title">设备在线率</div>
					</div>
					<div class="yuan">
						<div class="score">
							<a-progress :percent="fromData.deviceHealthRate" type="dashboard" :width="120" stroke-color="#2d5e0a">
								<template #format="percent">
									<span>{{ fromData.deviceHealthRate }}%</span>
								</template>
							</a-progress>
						</div>
						<div class="title">设备健康率</div>
					</div>
					<div class="yuan">
						<div class="score">
							<a-progress :percent="fromData.linkConnectivityRate" type="dashboard" :width="120" stroke-color="#2d5e0a">
								<template #format="percent">
									<span>{{ fromData.linkConnectivityRate }}%</span>
								</template>
							</a-progress>
						</div>
						<div class="title">链路连通率</div>
					</div>
				</div>
			</a-card>
		</a-col>
		<a-col :span="12" style="padding-left: 0px">
			<a-card :bordered="false">
				<div class="iconleft"></div>
				<div style="float: left; padding-left: 5px; font-weight: bold">全网设备逻辑类型统计</div>
			</a-card>
			<a-card :bordered="false">
				<BingZhuangTu05
					:innerRadius="0.74"
					style="height: 200px"
					:total="fromData.deviceTotal"
					:datalist="fromData.deviceStatistics"
					v-if="fromData.deviceTotal > 0 && fromData.deviceStatistics.length > 0"
				/>
			</a-card>
		</a-col>
	</a-row>
	<a-row :gutter="24" style="margin-top: 10px">
		<a-col :span="12" style="padding-left: 9px">
			<a-card :bordered="false" style="display: flex">
				<div class="iconleft"></div>
				<div style="float: left; padding-left: 5px; font-weight: bold">全网资源类型</div>
			</a-card>
			<a-card :bordered="false">
				<BingZhuangTu05
					:innerRadius="0.74"
					nameid="resourceType"
					style="height: 200px"
					:total="fromData.resourceTotal"
					:datalist="fromData.resourceList"
					v-if="fromData.resourceTotal > 0 && fromData.resourceList.length > 0"
				/>
			</a-card>
		</a-col>
		<a-col :span="12" style="padding-left: 0px">
			<a-card :bordered="false">
				<div class="iconleft"></div>
				<div style="float: left; padding-left: 5px; font-weight: bold">全网告警级别统计</div>
			</a-card>
			<a-card :bordered="false">
				<BingZhuangTu04
					:innerRadius="0.74"
					style="height: 200px"
					nameid="alarmLevel"
					:datalist="fromData.alarmLevelList"
					v-if="fromData.alarmLevelList.length > 0"
				/>
			</a-card>
		</a-col>
	</a-row>
</template>
<script setup name="network">
	import { createFromIconfontCN } from '@ant-design/icons-vue'
	// import BingZhuangTu05 from '@/components/Chart/g2BingZhuangTu/BingZhuangTu05.vue'
	import homeApi from '@/api/home/indexApi'
	const IconFont = createFromIconfontCN({
		scriptUrl: '//at.alicdn.com/t/c/font_3441767_you5defpxu.js'
	})
	defineComponent(() => {
		IconFont
	})
	onMounted(() => {
		totalStatistics()
		networkStatistics()
	})
	const fromData = ref({
		totalInfo: {},
		deviceLineRate: 0,
		deviceHealthRate: 0,
		linkConnectivityRate: 0,
		deviceStatistics: [],
		deviceTotal: 0,
		alarmLevelList: [],
		resourceTotal: 0,
		resourceList: []
	})
	const totalStatistics = () => {
		homeApi.totalHomeStatistics({ createTime: '', dateType: '', searchValue: '' }).then((res) => {
			fromData.value.totalInfo = res
		})
	}
	const networkStatistics = () => {
		homeApi.networkHomeStatistics().then((res) => {
			// console.log(res.deviceOnlineRate.split(".")[0])
			if (res.deviceOnlineRate) {
				var deviceOnlineRate = res.deviceOnlineRate.split('.')[0]
			} else {
				var deviceOnlineRate = 0
			}
			if (res.deviceHealthRate) {
				var deviceHealthRate = res.deviceHealthRate.split('.')[0]
			} else {
				var deviceHealthRate = 0
			}
			if (res.linkConnectivityRate) {
				var linkConnectivityRate = res.linkConnectivityRate.split('.')[0]
			} else {
				var linkConnectivityRate = 0
			}
			fromData.value.deviceLineRate = deviceOnlineRate
			fromData.value.deviceHealthRate = deviceHealthRate
			fromData.value.linkConnectivityRate = linkConnectivityRate

			fromData.value.deviceTotal =
				typeof res.deviceLogicTypeStatistics != 'undefined' ? res.deviceLogicTypeStatistics.total : 0

			if (typeof res.deviceLogicTypeStatistics.list != 'undefined' && res.deviceLogicTypeStatistics.list.length > 0) {
				res.deviceLogicTypeStatistics.list.map((item) => {
					if (item.name && item.name != '') {
						fromData.value.deviceStatistics.push({ type: item.name, value: item.value })
					}
				})
			}

			if (typeof res.alarmLevelStatistics.list != 'undefined' && res.alarmLevelStatistics.list.length > 0) {
				res.alarmLevelStatistics.list.map((item) => {
					fromData.value.alarmLevelList.push({ type: item.name, value: item.value })
				})
			}

			fromData.value.resourceTotal =
				typeof res.resourceTypeStatistics != 'undefined' ? res.resourceTypeStatistics.total : 0

			if (typeof res.resourceTypeStatistics.list != 'undefined' && res.resourceTypeStatistics.list.length > 0) {
				res.resourceTypeStatistics.list.map((item) => {
					fromData.value.resourceList.push({ type: item.name, value: item.value })
				})
			}
		})
	}
</script>
<style lang="less" scoped>
	.network {
		width: 22%;
		font-size: 20px;
		padding-top: 15px;
		background-color: rgb(45 94 10);
		border-radius: 100%;
		overflow: hidden;
		height: 100%;
		position: relative;
		top: 10px;
	}
	.device {
		width: 22%;
		font-size: 20px;
		padding-top: 15px;
		background-color: #5140b4;
		border-radius: 100%;
		overflow: hidden;
		height: 100%;
		position: relative;
		top: 10px;
	}
	.connect {
		width: 22%;
		font-size: 20px;
		padding-top: 15px;
		background-color: #1890ff;
		border-radius: 100%;
		overflow: hidden;
		height: 100%;
		position: relative;
		top: 10px;
	}
	.alarm {
		width: 22%;
		font-size: 20px;
		padding-top: 15px;
		background-color: #ff7d18;
		border-radius: 100%;
		overflow: hidden;
		height: 100%;
		position: relative;
		top: 10px;
	}
	.task {
		width: 22%;
		font-size: 20px;
		padding-top: 15px;
		background-color: #185eff;
		border-radius: 100%;
		overflow: hidden;
		height: 100%;
		position: relative;
		top: 10px;
	}
	.icon {
		display: flex;
		justify-content: center;
		position: relative;
		color: #fff;
		bottom: 7px;
	}
	.iconleft {
		width: 4px;
		height: 25px;
		background-color: #0069d2;
		float: left;
	}
	:deep(.ant-card-body) {
		padding: 10px;
	}
	.health {
		height: 200px;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 16px;
		.yuan {
			float: left;
			width: 33%;
			.score {
				width: 100%;
				text-align: center;
			}
			.title {
				font-size: 12px;
				text-align: center;
			}
		}
	}
</style>
