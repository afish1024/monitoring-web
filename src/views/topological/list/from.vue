<template>
    <a-drawer
		:title="formData.id ? '编辑网络' : '新增网络'"
		:width="500"
		:visible="visible"
		:destroy-on-close="true"
		:body-style="{ paddingBottom: '80px' }"
		:footer-style="{ textAlign: 'right' }"
        :maskClosable="false"
		@close="onClose"
	>
        <a-form ref="formRef" :model="formData" :rules="formRules" layout="vertical">
            <a-form-item label="父节点：" name="parentId">
                <a-select v-model:value="formData.parentId" placeholder="父节点" allowClear>
                    <a-select-option v-for="item in networList" :key="item.id" :value="item.id" >
                    {{item.networkName}}
                    </a-select-option>
                </a-select>
			</a-form-item>
            <a-form-item label="网络名称：" name="networkName">
				<a-input v-model:value="formData.networkName" placeholder="请输入网络名称" allow-clear />
			</a-form-item>
            <a-form-item label="网络状态：" name="networkStatus">
                <a-select v-model:value="formData.networkStatus" placeholder="网络状态" allowClear>
                    <a-select-option v-for="item in networkStatusList" :key="item.dictValue" :value="item.dictValue" >
                    {{item.dictLabel}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="网络类型：" name="networkType">
                <a-select v-model:value="formData.networkType" placeholder="网络类型" allowClear>
                    <a-select-option value="intranet">企业网络</a-select-option>
                    <a-select-option value="equipment">终端设备</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="网络描述：" name="networkDescribe">
                <a-textarea
                    v-model:value="formData.networkDescribe"
                    :auto-size="{ minRows: 3, maxRows: 5 }"
                    />
			</a-form-item>
            <!-- <a-form-item label="网络位置：" name="networkLocation">
				<a-input v-model:value="formData.networkLocation" placeholder="请输入网络位置" allow-clear />
			</a-form-item> -->
        </a-form>
        <template #footer>
			<a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
			<a-button type="primary" :loading="submitLoading" @click="onSubmit">保存</a-button>
		</template>
    </a-drawer>
</template>
<script setup name="deviceFrom">
import { required, rules } from '@/utils/formRules'
import deviceApi from '@/api/topological/deviceApi'
import indexApi from '@/api/alarm/indexApi'
import dictApi from '@/api/dev/dictApi'
import adminApi from '@/api/topological/adminApi'

import tool from '@/utils/tool'
const props = defineProps({
    deviceList:{
        type:Array,
        default:()=>[]
    }
})
let visible = $ref(false)
const emit = defineEmits({ successful: null })
const formRef = ref()
const networkStatusList = ref([])
const networList = ref([])
const submitLoading = ref(false)
// 表单数据，也就是默认给一些数据
const formData = ref({
    id:null
})
const loading = ref(false)
const editStatus = (e) => {
	loading.value = true
    if(e === false){
        formData.value.managementStatus = false
        formData.value.monitorStatus = false
    }else{
        formData.value.managementStatus = true
        formData.value.monitorStatus = true
    }
    setTimeout(()=>{
        loading.value = false
    },800)
    
}
// 默认要校验的
const formRules = {
    parentId:[required('请选择父节点')],
    networkName:[required('请输入网络名称')],
    networkStatus:[required('请选择网络状态')],
    // networkLocation:[required('请输入网络位置')],
}
const onOpen = (record) => {
    visible = true
    if (record) {
        if(record.managementStatus == 'enable'){
            record.managementStatus = true
            record.monitorStatus = true
        }else{
            record.managementStatus = false
            record.monitorStatus = false
        }
        if(record.deviceSort == null){
            record.deviceSort = 0
        }
        if(record.groupIds && record.groupIds!=''){
            record.groupId = record.groupIds.split(',')
        }else{
            record.groupId = []
        }
        record.networkType = record.type
        formData.value = Object.assign({}, record)
    }else{
        formData.value = {}
    }
    searchData()
    networkList()
}
const searchData = ()=>{
    dictApi.dictListForLabel({category:'biz',dictValue:'NETWORK_STATUS'}).then((data) => {
        networkStatusList.value = data
    })
}
const networkList = ()=>{
    indexApi.eventNetworkInfo({}).then((data) => {
        networList.value = data
        if(formData.value.id){
            networList.value = data.filter(item => item.id != formData.value.id)
        }
    })
}

// 关闭抽屉
const onClose = () => {
    formRef.value.resetFields()
    visible = false
}
// 验证并提交数据
const onSubmit = () => {
    
    formRef.value
        .validate()
        .then(() => {
            submitLoading.value = true
            
            if(formData.value.id){
                adminApi.networkEdit(formData.value).then(() => {
                    submitLoading.value = false
                    visible = false
                    emit('successful')
                })
            }else{
                adminApi.networkAdd(formData.value).then(() => {
                    submitLoading.value = false
                    visible = false
                    emit('successful')
                })
            }
        }).finally(() => {
            submitLoading.value = false
        })
}
// 调用这个函数将子组件的一些数据和方法暴露出去
defineExpose({
    onOpen
})
</script>