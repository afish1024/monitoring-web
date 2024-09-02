<template>
    <a-drawer
		:title="formData.id ? '编辑链路' : '新增链路'"
		:width="500"
		:visible="visible"
		:destroy-on-close="true"
		:body-style="{ paddingBottom: '80px' }"
		:footer-style="{ textAlign: 'right' }"
        :maskClosable="false"
		@close="onClose"
	>
        <a-form ref="formRef" :model="formData" :rules="formRules" layout="vertical">
            <a-form-item label="起点网络：" name="startPointNetwork">
                <a-select v-model:value="formData.startPointNetworkName"   placeholder="起点网络" show-search @change="onChangeNetwork" labelInValue>
                    <a-select-option v-for="item in networList" :key="item.id" :value="item.networkName"   >
                        {{ item.networkName }}
                    </a-select-option>
                </a-select>
			</a-form-item>
            <a-form-item label="起点设备：" name="startPointDevice">
                <a-select  v-model:value="formData.startPointDeviceName"  placeholder="起点设备" show-search labelInValue @change="onChangeEquipment">
                    <a-select-option v-for="item in equipment" :key="item.id" :value="item.deviceName" >
                    {{item.deviceName}}
                    </a-select-option>
                </a-select>
			</a-form-item>
        
            <a-form-item label="起点接口：" name="startPointPortId">
                <a-select  v-model:value="formData.startPointPortName"  placeholder="起点接口"  show-search labelInValue @change="onChangePort">
                    <a-select-option v-for="item in port" :key="item.id" :value="item.portName" >
                    {{item.portName}}
                    </a-select-option>
                </a-select>
			</a-form-item>
            <a-form-item label="终点网络：" name="endPointNetwork">
                <a-select v-model:value="formData.endPointNetworkName"   placeholder="终点网络"   show-search  @change="onChangeNetwork2" labelInValue>
                    <a-select-option v-for="item in networList" :key="item.id" :value="item.networkName" >
                    {{item.networkName}}
                    </a-select-option>
                </a-select>
			</a-form-item>
            <a-form-item label="终点设备：" name="endPointDevice">
                <a-select v-model:value="formData.endPointDeviceName"   placeholder="终点设备" show-search labelInValue @change="onChangeEquipment2">
                    <a-select-option v-for="item in equipmentEnd" :key="item.id" :value="item.deviceName" >
                    {{item.deviceName}}
                    </a-select-option>
                </a-select>
			</a-form-item>
            <a-form-item label="终点接口：" name="endPointPortId">
                <a-select v-model:value="formData.endPointPortName"   placeholder="终点接口" show-search labelInValue @change="onChangePort2">
                    <a-select-option v-for="item in portEnd" :key="item.id" :value="item.portName" >
                    {{item.portName}}
                    </a-select-option>
                </a-select>
			</a-form-item>
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
import topologyApi from '@/api/topology/topologyApi'

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
const networList = ref([]) // 网络
const equipment = ref([]) // 设备
const port = ref([]) // 端口
const equipmentEnd = ref([]) // 设备
const portEnd = ref([]) // 端口
const submitLoading = ref(false)
// 表单数据，也就是默认给一些数据
const formData = ref({
    id:null
})
const loading = ref(false)
const onChangeNetwork = (e) => {
    equipment.value = [];
    formData.value.startPointNetwork = e.key
    formData.value.startPointNetworkName = e.value

    formData.value.startPointDevice = ''
    formData.value.startPointDeviceName = ''
    equipmentList(e.key,'start') // 起点设备
}

const onChangeEquipment = (e) => {
    
    port.value = [];
    formData.value.startPointDevice = e.key
    formData.value.startPointDeviceName = e.value
    formData.value.startPointPortId = ''
    formData.value.startPointPortName =  ''
    portList(e.key,'start') // 起点接口
}


const onChangePort = (e) => {
    formData.value.startPointPortId = e.key
    formData.value.startPointPortName = e.value
}



const onChangeNetwork2 = (e) => {
    equipmentEnd.value = [];
    formData.value.endPointNetwork = e.key
    formData.value.endPointNetworkName = e.value

    formData.value.endPointDevice = ''
    formData.value.endPointDeviceName = ''
    equipmentList(e.key,'end') // 起点设备
}

const onChangeEquipment2 = (e) => {
    portEnd.value = [];
    formData.value.endPointDevice = e.key
    formData.value.endPointDeviceName = e.value

    formData.value.endPointPortId = ''
    formData.value.endPointPortName =  ''
    portList(e.key,'end') // 起点接口
}


const onChangePort2 = (e) => {
    formData.value.endPointPortId = e.key
    formData.value.endPointPortName = e.value
}


// 默认要校验的
const formRules = {
    startPointNetwork:[required('请选择起点网络')],
    startPointDevice:[required('请选择起点设备')],
    startPointPortId:[required('请选择起点端口')],
    endPointNetwork:[required('请选择终点网络')],
    endPointDevice:[required('请选择终点设备')],
    endPointPortId:[required('请选择终点端口')],
}
const onOpen = (record) => {
    visible = true
    if (record) {
       
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


const portList = (e,type)=>{
    topologyApi.getport({'deviceId':e}).then((data) => {
        if(type == 'start'){
            port.value = data
        }else{
            portEnd.value = data
        }
    })
}

const equipmentList = (e,type)=>{
    indexApi.eventDeviceInfo({'networkId':e}).then((data) => {
        console.log(type)
        if(type == 'start'){
            equipment.value = data
        }else{
            equipmentEnd.value = data
        }
    })
}

const networkList = ()=>{
    indexApi.eventNetworkInfo({}).then((data) => {
        networList.value = data
        if(formData.value.id){
            networList.value = data.filter(item => item.id != formData.value.id)
        }
        if(formData.value.startPointNetwork){
            equipmentList(formData.value.startPointNetwork,'start')
        }
        if(formData.value.startPointDevice){
            portList(formData.value.startPointDevice,'start')
        }

        if(formData.value.endPointNetwork){
            equipmentList(formData.value.endPointNetwork,'end')
        }
        if(formData.value.endPointDevice){
            portList(formData.value.endPointDevice,'end')
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
            console.log(formData.value)
            if(formData.value.id){
                topologyApi.editLink(formData.value).then(() => {
                    submitLoading.value = false
                    visible = false
                    emit('successful')
                })
            }else{
                topologyApi.addLink(formData.value).then(() => {
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