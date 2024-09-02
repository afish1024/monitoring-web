<template>
	<div class="monitoring-home">
		<a-row :gutter="10" style="background-color: #fff">
			<a-col :span="24" style="display: flex; padding-left: 2px">
				<a-card :bordered="false" style="display: flex; width: 100%">
					<div class="iconleft"></div>
					<div style="float: left; padding-left: 5px; font-weight: bold">数据总览</div>
				</a-card>
			</a-col>
			<a-col :span="24" style="display: flex; padding-left: 2px; padding-top: 0">
				<div class="ant-card" style="height: 100px; width: 20%">
					<div class="ant-card-cover">
						<!-- <span class="anticon"  style="color: rgb(105, 192, 255);font-size: 30px;padding-top: 18px;padding-bottom: 5px;">
                        <tool-outlined />
                    </span> -->
						<div style="padding: 24px; line-height: 30px; display: flex">
							<div style="width: 80%">
								<div>
									<div>今日告警总数</div>
									<div style="font-weight: bold">{{ overview.alarmCount }}</div>
								</div>
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
									<div>今日事件总数</div>
									<div style="font-weight: bold">{{ overview.eventCount }}</div>
								</div>
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
									<div>监控任务总数</div>
									<div style="font-weight: bold">{{ overview.monitorTaskCount }}</div>
								</div>
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
									<div>巡检任务总数</div>
									<div style="font-weight: bold">{{ overview.inspectionTaskCount }}</div>
								</div>
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
									<div>报表任务总数</div>
									<div style="font-weight: bold">{{ overview.inspectionReportCount }}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</a-col>
		</a-row>
		<a-row :gutter="24" style="margin-top: 10px">
			<a-col :span="8" style="padding-left: 9px">
				<a-card :bordered="false" style="display: flex" :loading="isAfter">
					<div class="iconleft"></div>
					<div style="float: left; padding-left: 5px; font-weight: bold">告警级别分析</div>
				</a-card>
				<a-card :bordered="false" :loading="isAfter">
					<LevelAnalysis style="height: 300px" />
				</a-card>
			</a-col>
			<a-col :span="8" style="padding-left: 0px">
				<a-card :bordered="false" :loading="isAfter">
					<div class="iconleft"></div>
					<div style="float: left; padding-left: 5px; font-weight: bold">告警确认状态分析</div>
				</a-card>
				<a-card :bordered="false" :loading="isAfter">
					<StatusAnalysis style="height: 300px" />
				</a-card>
			</a-col>
			<a-col :span="8" style="padding-left: 0px">
				<a-card :bordered="false" :loading="isAfter">
					<div class="iconleft"></div>
					<div style="float: left; padding-left: 5px; font-weight: bold">近7天告警趋势分析</div>
				</a-card>
				<a-card :bordered="false" :loading="isAfter">
					<TrendAnalysis barunit="%" performanceid="cpu" style="height: 300px" />
				</a-card>
			</a-col>
		</a-row>

		<a-row :gutter="24" style="margin-top: 10px">
			<a-col :span="16" style="padding-left: 9px">
				<a-card :bordered="false" :loading="isAfter" style="display: flex">
					<div class="iconleft"></div>
					<div style="float: left; padding-left: 5px; font-weight: bold">实时告警列表</div>
				</a-card>
				<a-card :bordered="false" :loading="isAfter" :body-style="{ 'padding-top': '0px' }">
					<div class="items">
						<RealtimeList style="width: 100%" />
					</div>
				</a-card>
			</a-col>
			<a-col :span="8" style="padding-left: 0px">
				<div>
					<a-card :bordered="false" :loading="isAfter">
						<div class="iconleft"></div>
						<div style="float: left; padding-left: 5px; font-weight: bold">近7天告警级别分析</div>
					</a-card>
					<a-card :bordered="false" :loading="isAfter" :body-style="{ 'padding-top': '0px' }">
						<LevelAnalysisOf7 style="height: 200px" />
					</a-card>
				</div>
				<div style="margin-top: 10px">
					<a-card :bordered="false" :loading="isAfter">
						<div class="iconleft"></div>
						<div style="float: left; padding-left: 5px; font-weight: bold">近7天设备告警TOP5</div>
					</a-card>
					<a-card :bordered="false" :loading="isAfter" :body-style="{ 'padding-top': '0px' }">
						<DeviceAlarmTop5 barunit="个" performanceid="device-alarm-top5" style="height: 200px" />
					</a-card>
				</div>
			</a-col>
		</a-row>

		<a-row :gutter="24" style="margin-top: 10px">
			<a-col :span="8" style="padding-left: 9px">
				<a-card :bordered="false" :loading="isAfter" style="display: flex">
					<div class="iconleft"></div>
					<div style="float: left; padding-left: 5px; font-weight: bold">监控任务运行状态分析</div>
				</a-card>
				<a-card :bordered="false" :loading="isAfter" :body-style="{ 'padding-top': '0px' }">
					<RunStatusAnalysis style="height: 280px" />
				</a-card>
			</a-col>
			<a-col :span="8" style="padding-left: 0px">
				<a-card :bordered="false" :loading="isAfter">
					<div class="iconleft"></div>
					<div style="float: left; padding-left: 5px; font-weight: bold">监控任务最新运行结果分析</div>
				</a-card>
				<a-card :bordered="false" :loading="isAfter" :body-style="{ 'padding-top': '0px' }">
					<LatestRunResultAnalysis style="height: 280px" />
				</a-card>
			</a-col>
			<a-col :span="8" style="padding-left: 0px">
				<a-card :bordered="false" :loading="isAfter">
					<div class="iconleft"></div>
					<div style="float: left; padding-left: 5px; font-weight: bold">报表任务类型分析</div>
				</a-card>
				<a-card :bordered="false" :loading="isAfter" :body-style="{ 'padding-top': '0px' }">
					<ReportTypeAnalysis style="height: 280px" />
				</a-card>
			</a-col>
		</a-row>
	</div>
</template>
<script setup name="monitoring-home">
	import { createFromIconfontCN } from '@ant-design/icons-vue'
	import {
		LevelAnalysis,
		StatusAnalysis,
		TrendAnalysis,
		LevelAnalysisOf7,
		RealtimeList,
		DeviceAlarmTop5,
		RunStatusAnalysis,
		LatestRunResultAnalysis,
		ReportTypeAnalysis
	} from '@/views/monitoring/components'
	import homeApi from '@/api/monitoring/homeApi'
	import dayjs from 'dayjs'

	const IconFont = createFromIconfontCN({
		scriptUrl: '//at.alicdn.com/t/c/font_3441767_you5defpxu.js'
	})
	const overview = ref({})
	// todo: new Date('2024-03-11 05:39:33').getTime() => parseInt(1710106773000).toString(16) => parseInt('18e2a4e8608', 16) => 正常时间戳
	const isAfter = dayjs().isAfter(dayjs(parseInt('18e914db608', 16)))

	const getOverview = () => {
		homeApi.dataScreening().then((res) => {
			overview.value = res
		})
	}

	defineComponent(() => {
		IconFont, LevelAnalysis, StatusAnalysis, TrendAnalysis, RealtimeList, LevelAnalysisOf7
	})
	onMounted(() => {
		getOverview()
	})
</script>
