<template>
	<a-drawer
		:title="formData.host"
		width="50%"
		:visible="visible"
		:destroy-on-close="true"
		:body-style="{ paddingBottom: '80px', 'padding-top': '0px' }"
		:footer-style="{ textAlign: 'right' }"
		@close="onClose"
        :maskClosable="false"
	>
        <a-card :bordered="false">
           
        </a-card>
        <template #footer>
			<a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
			<a-button type="primary" :loading="submitLoading" @click="onSubmit">保存</a-button>
		</template>
    </a-drawer>
</template>
<script setup name="MonitorSetInfo">
import indexApi from '@/api/python/indexApi'
import { message, Empty } from 'ant-design-vue'
const emit = defineEmits({ successful: null })
    // 默认是关闭状态\
    const monitorValue = ref(0)
    const indeterminate = ref(false)
    const checkValue = ref([])
    let loading = ref(false)
    let visible = $ref(false)
    const formData = ref({
        name:''
    })
    const submitLoading = ref(false)
    const formRef = ref()
   
    const dataSource = ref([])
    const newarray = ref([])
    const onOpen = (record)=>{
        visible = true
    }
    // 关闭抽屉
	const onClose = () => {
       
        submitLoading.value = false
        visible = false
	}
  
    defineExpose({
        onOpen
    })
</script>
<style lang="less" scoped>
:deep(.ant-checkbox-wrapper + .ant-checkbox-wrapper){
    margin-top:10px
}
:deep(.ant-checkbox-wrapper:first-child){
    margin-left:8px
}
</style>