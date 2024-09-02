<template>
	<a-card
		style="width: 100%"
		:bordered="false"
		:tab-list="tabDataSource"
		:active-tab-key="noTitleKey"
		@tabChange="(key) => onTabChange(key, 'noTitleKey')"
	>
		<p v-if="noTitleKey === 'mac-ip'"><macIp /></p>
		<p v-else-if="noTitleKey === 'whiteblack'">
			<whiteblack />
		</p>
		<p v-else-if="noTitleKey === 'mac-ip-bind'">
			<macIpBind />
		</p>
		<p v-else-if="noTitleKey === 'ip-usage'">
			<ipUsage />
		</p>
		<template v-else>
			<Empty />
		</template>
	</a-card>
</template>

<script setup name="devConfig">
	import { Empty } from 'ant-design-vue'
	import macIp from './macIp.vue'
	import whiteblack from './whiteblack.vue'
	import macIpBind from './macIpBind.vue'
	import ipUsage from './ipUsage.vue'
	const key = ref('mac-ip')
	const noTitleKey = ref('mac-ip')

	const tabDataSource = [
		{ key: 'mac-ip', tab: '全网MAC-IP' },
		{ key: 'whiteblack', tab: '黑白名单配置' },
		{ key: 'mac-ip-bind', tab: 'MAC-IP绑定' },
		{ key: 'ip-usage', tab: 'IP使用情况' }
	]

	const onTabChange = (value, type) => {
		if (type === 'key') {
			key.value = value
		} else if (type === 'noTitleKey') {
			noTitleKey.value = value
		}
	}
</script>
