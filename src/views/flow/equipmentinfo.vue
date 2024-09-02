<template>
    <a-drawer
		title="设备流量信息"
		:width="1500"
		:visible="visible"
		:destroy-on-close="true"
		:body-style="{ paddingBottom: '80px' }"
		:footer-style="{ textAlign: 'right' }"
        :maskClosable="false"
		@close="onClose"
	>
        <a-row class="list">
            <a-col :span="24" >
                <a-card
				style="width: 100%"
				:bordered="false"
				:tab-list="tabDataSource"
				:active-tab-key="noTitleKey"
				@tabChange="(key) => onTabChange(key, 'noTitleKey')"
			>
				<p v-if="noTitleKey === 'network'"><network :treeId="treeId"/></p>
				<p v-else-if="noTitleKey === 'device'">
					<device  :treeId="treeId" />
				</p>
				<p v-else-if="noTitleKey === 'link'">
					<linkPage />
				</p>
				<p v-else-if="noTitleKey === 'resource'">
					<resource />
				</p>
				<template v-else>
					<Empty />
				</template>
				<template #customTab="item">
					<span>
						<global-outlined v-if="item.key === 'network'" />
						<hdd-outlined v-if="item.key === 'device'" />
						<share-alt-outlined v-if="item.key === 'link'" />
						<appstore-outlined v-if="item.key === 'resource'" />
						{{ item.tab }}
					</span>
				</template>
			</a-card>

            </a-col>
        </a-row>
    </a-drawer>

</template>
<script setup name="deviceFrom">
import { required, rules } from '@/utils/formRules'
import deviceApi from '@/api/topological/deviceApi'
import planApiList from '@/api/alarm/indexApi'
import dictApi from '@/api/dev/dictApi'
import tool from '@/utils/tool'

const loading = ref(false)
let visible = $ref(false)
const tabDataSource = [
    { key: 'basicoverview', tab: '基础概述' },
    { key: 'flow', tab: '流量' },
    { key: 'api', tab: '接口' },
    { key: 'resource', tab: '应用' },
    { key: 'network', tab: '服务' },
    { key: 'device', tab: '协议' },
    { key: 'link', tab: '接口' },
    { key: 'resource', tab: '源目的地' },
    { key: 'resource', tab: '会话' },
]
// 默认要校验的
const formRules = {
 
}
const onOpen = (record) => {
    visible = true
   
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