<template>
	<a-drawer
		title="预览"
		:width="1200"
		:visible="visible"
		:destroy-on-close="true"
		:body-style="{ 'padding-top': '0px' }"
		@close="onClose"
	>
		<a-spin :spinning="loadingSpinning">
			<a-tabs v-model:activeKey="codeTypeActiveKey" @change="codeTypeChange">
				<a-tab-pane v-for="codeType in codeTypeArray" :key="codeType.codeTypeKey" :tab="codeType.codeTypeTitle" force-render>
					<a-tabs v-model:activeKey="typeListActiveKey" tab-position="left" hide-add type="card">
						<a-tab-pane v-for="pan in codeType.codeTypeList" :key="pan.codeFileName" :tab="pan.codeFileName">
							<div style="height: calc(100vh - 160px); overflow: auto">
								<a-textarea ref="textareaRef" v-model:value="pan.codeFileContent" :autoSize="true" />
							</div>
						</a-tab-pane>
					</a-tabs>
				</a-tab-pane>
			</a-tabs>
		</a-spin>
	</a-drawer>
</template>

<script setup name="genPreview">
	import { message } from 'ant-design-vue'
	import genBasicApi from '@/api/gen/genBasicApi'
	// 默认是关闭状态
	const visible = ref(false)
	const codeTypeActiveKey = ref()
	const typeListActiveKey = ref()
	const loadingSpinning = ref(true)
	const codeTypeArray = ref([])

	// 打开抽屉
	const onOpen = (record) => {
		visible.value = true
		const param = {
			id: record.id
		}
		genBasicApi.basicPreviewGen(param).then((data) => {
			if (data) {
				codeTypeArray.value = [
					{
						codeTypeKey: 'frontend',
						codeTypeTitle: '前端代码',
						codeTypeList: data.genBasicCodeFrontendResultList
					},
					{
						codeTypeKey: 'backend',
						codeTypeTitle: '后端代码',
						codeTypeList: data.genBasicCodeBackendResultList
					},
					{
						codeTypeKey: 'sqlend',
						codeTypeTitle: 'SQL文件',
						codeTypeList: data.genBasicCodeSqlResultList
					}
				]
			} else {
				message.warning('预览失败：请检查问题或反馈')
			}
		}).finally(() => {
			loadingSpinning.value = false
		})
	}
	// 关闭抽屉
	const onClose = () => {
		visible.value = false
	}
	// 切换标签
	const codeTypeChange = (value) => {
		typeListActiveKey.value = codeTypeArray.value.find((f) => f.codeTypeKey === value).codeTypeList[0].codeFileName
	}
	defineExpose({
		onOpen
	})
</script>
