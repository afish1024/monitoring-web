<template>
	<a-card
		style="width: 100%"
		:bordered="false"
		:tab-list="tabListNoTitle"
		:active-tab-key="noTitleKey"
		@tabChange="(key) => onTabChange(key, 'noTitleKey')"
	>
		<p v-if="noTitleKey === 'sysConfig'">
			<SysConfig />
		</p>
		<p v-else-if="noTitleKey === 'emailConfig'">
			<EmailConfig />
		</p>
		<p v-else-if="noTitleKey === 'smsConfig'">
			<SmsConfig />
		</p>
		<p v-else-if="noTitleKey === 'fileConfig'">
			<FileConfig />
		</p>
		<p v-else-if="noTitleKey === 'thirdConfig'">
			<ThirdConfig />
		</p>
		<p v-else-if="noTitleKey === 'otherConfig'">
			<other-config />
		</p>
		<p v-else-if="noTitleKey === 'alarmConfig'">
			<alarmConfig />
		</p>
		<p v-else-if="noTitleKey === 'alertConfig'">
			<alertConfig />
		</p>
	</a-card>
</template>

<script setup name="devConfig">
	import { Empty } from 'ant-design-vue'
	import SysConfig from './sysConfig.vue'
	import EmailConfig from './emailConfig/index.vue'
	import SmsConfig from './smsConfig/index.vue'
	import FileConfig from './fileConfig/index.vue'
	import ThirdConfig from './thirdConfig/index.vue'
	import otherConfig from './otherConfig/index.vue'
	import alertConfig from './alertConfig.vue'
	import alarmConfig from './alarmConfig.vue'
	const key = ref('sysConfig')
	const noTitleKey = ref('sysConfig')

	const tabListNoTitle = [
		{
			key: 'sysConfig',
			tab: '系统配置'
		},
	
	
	]

	if (hasPerm(['smsConfig'])) {
		tabListNoTitle.push({
			key: 'smsConfig',
			tab: '短信配置'
		})
	}
	if (hasPerm(['alarmConfig'])) {
		tabListNoTitle.push({
			key: 'alarmConfig',
			tab: '健康度指标配置'
		})
	}

	tabListNoTitle.push({
		key: 'fileConfig',
		tab: '文件上传'
	})
	const onTabChange = (value, type) => {
		if (type === 'key') {
			key.value = value
		} else if (type === 'noTitleKey') {
			noTitleKey.value = value
		}
	}
</script>
