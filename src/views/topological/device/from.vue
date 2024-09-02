<template>
    <a-drawer
		:title="formData.id ? '编辑设备' : '新增设备'"
		:width="700"
		:visible="visible"
		:destroy-on-close="true"
		:body-style="{ paddingBottom: '80px' }"
		:footer-style="{ textAlign: 'right' }"
        :maskClosable="false"
		@close="onClose"
	>
        <a-form ref="formRef" :model="formData" :rules="formRules" layout="vertical">
            
                    <div style="font-weight: bold;border-bottom: 1px solid #eee;padding-bottom: 5px;">
                        基本配置信息
                    </div>
                    <a-form-item label="设备名称：" name="deviceName">
                        <a-input v-model:value="formData.deviceName" placeholder="请输入设备名称" allow-clear />
                    </a-form-item>
                    <a-form-item label="设备分类：" name="deviceType">
                        <a-select v-model:value="formData.deviceType" placeholder="设备分类" allowClear>
                            <a-select-option v-for="item in props.deviceList" :key="item.dictValue" :value="item.dictValue" >
                            {{item.dictLabel}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="设备组：" name="groupId">

                        <a-checkbox-group v-model:value="formData.groupId" style="width: 100% ">
                            <a-checkbox 
                            :value="item.key" 
                            v-for="(item,index) in tool.deviceGroupList()" 
                            :key="index"
                            
                            >
                            {{item.value}}
                        </a-checkbox>
                       
                        </a-checkbox-group>
                    </a-form-item>
                    <a-form-item label="选择模板：" name="dictValue">
                        <a-select v-model:value="formData.dictValue" placeholder="请选择模板" allowClear>
                            <a-select-option v-for="item in deviceTemp" :key="item.dictValue" :value="item.dictValue">{{
                                item.dictLabel
                            }}</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="设备IP：" name="ipAddress">
                        <a-input v-model:value="formData.ipAddress" placeholder="请输入设备IP" allow-clear />
                    </a-form-item>
                   
                    <div style="font-weight: bold;border-bottom: 1px solid #eee;padding-bottom: 5px;">
                        设备链接配置信息
                    </div>
                    <a-form-item label="所属网络" name="startPointNetwork">
                        <a-select v-model:value="formData.startPointNetwork" placeholder="请选择网络" allowClear @change="changeNetwork($event)" labelInValue>
                            <a-select-option v-for="item in networkList" :key="item.networkName" :value="item.id">{{
                                item.networkName
                            }}</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="连接设备" name="startPointDevice" v-if="deviceLinkShow">
                        <a-select v-model:value="formData.startPointDevice" placeholder="请选择连接设备" allowClear @change="changeDevice($event)" labelInValue>
                            <a-select-option v-for="item in linkDeviceList" :key="item.deviceName" :value="item.id">{{
                                item.deviceName
                            }}</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="连接设备端口" name="startPointPortId" v-if="devicePointPortId">
                        <a-select v-model:value="formData.startPointPortId" placeholder="选择连接设备端口" show-search allowClear labelInValue @change="onChangePort2">
                            <a-select-option v-for="item in devicePortList" :key="item.portNumber" :value="item.id">{{
                                item.portNumber
                            }}</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="槽位数" name="slotNumber">
                        <a-input-number id="inputNumber" v-model:value="formData.slotNumber" :min="kcnum"  style="width: 100%;" :disabled="formData.id ? true:false" type="number" @change="changeSoltCount($event)" @blur="blurSoltCount($event)"/>
                    </a-form-item>
                    <a-form-item label="子卡数" name="subCardNumber">
                        <a-input-number id="inputNumber" v-model:value="formData.subCardNumber" :min="zknum"  style="width: 100%;" :disabled="formData.id ? true:false" type="number" @change="changeCardNumber($event)" @blur="blurCardNumber($event)"/>
                    </a-form-item>
                    <a-form-item label="本机端口数" name="portsNumber">
                        <a-input-number id="inputNumber" v-model:value="formData.portsNumber" :min="bjport"  style="width: 100%;" @change="changePortCount($event)" @blur="blurPortCount($event)" :disabled="formData.id ? true:false" type="number"/>

                    </a-form-item>
                    <a-form-item label="选择本机端口" name="endPointPort">
                        <a-select v-model:value="formData.endPointPort"  placeholder="选择本机端口" show-search allowClear>
                            <a-select-option v-for="item in portList" :key="item.id" :value="item.id">{{
                                item.value
                            }}</a-select-option>
                        </a-select>
                    </a-form-item>
                    <div style="font-weight: bold;border-bottom: 1px solid #eee;padding-bottom: 5px;">
                        SNMP配置信息
                    </div>
                    <a-form-item label="团体名称：" name="community">
                        <a-input v-model:value="formData.community" placeholder="请输入团体名称" allow-clear />
                    </a-form-item>
                    <a-form-item label="主机Port：" name="devicePort">
                        <a-input v-model:value="formData.devicePort" placeholder="请输入主机Port" allow-clear />
                    </a-form-item>
                    <a-form-item label="SNMP版本：" name="snmpVersion">
                        <a-select v-model:value="formData.snmpVersion" placeholder="请选择SNMP版本" allowClear>
                            <a-select-option v-for="item in snmpVersionList" :key="item.dictValue" :value="item.dictValue">{{
                                item.dictLabel
                            }}</a-select-option>
                        </a-select>
                    </a-form-item>
                    <div style="font-weight: bold;border-bottom: 1px solid #eee;padding-bottom: 5px;">
                        SSH/Telnet信息配置
                    </div>
                    <a-form-item label="账号：" name="account">
                        <a-input autocomplete="off" v-model:value="formData.account" placeholder="请输入账号" allow-clear />
                    </a-form-item>
                    <a-form-item label="SSH密码：" name="sshPassword" :rules="[{ required: formData.id ? false :true, message: '请填写SSH密码' }]">
                        <a-input-password autocomplete="off" v-model:value="formData.sshPassword" :placeholder="formData.id ? '不修改密码请留空' :'请输入密码' " allow-clear />
                    </a-form-item>
                    <a-form-item label="Telnet密码：" name="telnetPassword" :rules="[{ required: formData.id ? false :true, message: '请填写Telnet密码' }]">
                        <a-input-password  autocomplete="off" v-model:value="formData.telnetPassword" :placeholder="formData.id ? '不修改密码请留空' :'请输入密码' " allow-clear />
                    </a-form-item>
                    <a-form-item label="是否核心设备：" name="deviceTag" v-if="!formData.id">
                        <a-radio-group v-model:value="formData.deviceTag">
                            <a-radio value="third">否</a-radio>
                            <a-radio value="core">是</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item label="监控状态：" name="monitorStatus">
                        <a-switch
                            :loading="loading"
                            :checked="formData.monitorStatus"
                            @change="editStatus($event)"
                            checked-children="已监控" 
                            un-checked-children="未监控"
                        />
                    </a-form-item>
                    <a-form-item label="设备排序值:" name="deviceSort">
                        <a-slider v-model:value="formData.deviceSort" :max="100" />
                    </a-form-item>
                    <a-form-item label="产品优势" name="product_advantages ">
                        <a-textarea
                            v-model:value="formData.product_advantages "
                            placeholder="请输入产品优势"
                            :auto-size="{ minRows: 3, maxRows: 5 }"
                            />
                    </a-form-item>
                    <a-form-item label="出厂信息" name="factory_information ">
                        <a-textarea
                            v-model:value="formData.factory_information "
                            placeholder="请输入出厂信息"
                            :auto-size="{ minRows: 3, maxRows: 5 }"
                            />
                    </a-form-item>
                    <a-form-item label="设备描述" name="remark">
                        <a-textarea
                            v-model:value="formData.remark"
                            placeholder="请输入设备描述"
                            :auto-size="{ minRows: 3, maxRows: 5 }"
                            />
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
import planApiList from '@/api/alarm/indexApi'
import dictApi from '@/api/dev/dictApi'
import tool from '@/utils/tool'
const networkList = ref([]) // 网络
const devicePortList = ref([])
const bjport = ref(48)
const kcnum = ref(1)
const zknum = ref(1)
const props = defineProps({
    deviceList:{
        type:Array,
        default:()=>[]
    }
})
const portStringList = ()=>{
    for(var i=0;i<Number(formData.value.slotNumber);i++){
       for(var j=0;j<Number(formData.value.subCardNumber);j++){
          for(var l=0;l<Number(formData.value.portsNumber);l++){
            portList.value.push({
                id:i+'/'+j+'/'+l,
                value:i+'/'+j+'/'+l,
            })
          }
       }
    }
}
const onChangePort2 = (e) => {
    if(e == undefined){
        return false
    }
    formData.value.startPointPortId = e.value
    formData.value.startPointPortName = e.key
}
//子卡
const changeCardNumber = (e)=>{
    portList.value = []
    formData.value.subCardNumber = e
    portStringList()
}
const blurCardNumber =(e)=>{
    portList.value = []
    if(e.target.value == 0 || !e.target.value){
        formData.value.subCardNumber = zknum.value
    }else{
        formData.value.subCardNumber = e.target.value
    }
    portStringList()
}
//卡槽
const changeSoltCount = (e)=>{
    portList.value = []
    formData.value.slotNumber = e
    portStringList()
}
const blurSoltCount = (e)=>{
    portList.value = []
    if(e.target.value == 0 || !e.target.value){
        formData.value.slotNumber = kcnum.value
    }else{
        formData.value.slotNumber = e.target.value
    }
    portStringList()
}
//本机端口
const changePortCount = (e)=>{
    portList.value = []
    console.log(e)
    formData.value.portsNumber = e
    // for(var i=0;i<Number(formData.value.portsNumber)+Number(1);i++){
    //     portList.value.push({
    //         id:i,
    //         value:i
    //     })
    // }
    portStringList()
}
const blurPortCount = (e)=>{
    portList.value = []
    console.log(e.target.value)
    if(e.target.value == 0 || !e.target.value){
        formData.value.portsNumber = bjport.value
    }else{
        formData.value.portsNumber = e.target.value
    }
    
    // for(var i=0;i<Number(formData.value.portsNumber)+Number(1);i++){
    //     portList.value.push({
    //         id:i,
    //         value:i
    //     })
    // }
    portStringList()
}
const changeNetwork = (e)=>{
    console.log(e)
    if(e == undefined){
        return false
    }
    linkDeviceList.value = []
    formData.value.startPointDevice = null
    formData.value.startPointNetwork = e.value
    formData.value.networkId = e.value
    formData.value.startPointNetworkName = e.key
    deviceApi.deviceList({networkId:e.value}).then(res=>{
        console.log(res)
        if(res.length > 0){
            linkDeviceList.value = res
            deviceLinkShow.value = true
        }else{
            deviceLinkShow.value = false
        }
    })
}

const changeDevice = (e)=>{
    if(e == undefined){
        return false
    }
    devicePortList.value = []
    formData.value.startPointPortId = null
    formData.value.startPointDevice = e.value
    formData.value.startPointDeviceName = e.key
    deviceApi.portList({deviceId:e.value}).then(res=>{
        
        if(res.length > 0){
            console.log(res)
            res.map((item)=>{
                // console.log(item.portNumber)
                item.num = item.portNumber.split("/").pop();
                // if(item.portType == 'g' && item.portNumber!='0/0/0'){
                //     item.portNumber = item.portNumber.split("/").pop();
                //     devicePortList.value.push(item)
                // }
                devicePortList.value.push(item)
            })
            devicePortList.value.sort(function(a, b){
                return a.num - b.num
            })
            devicePointPortId.value = true
        }else{
            devicePointPortId.value = false
        }
    })
}
const deviceTemp = ref([])
const deviceLinkShow = ref(false)
const devicePointPortId = ref(false)
const activeTabsKey = ref('1')
const portList = ref([])
const linkDeviceList = ref([])
const snmpVersionList = ref([])
let visible = $ref(false)
const emit = defineEmits({ successful: null })
const formRef = ref()
const submitLoading = ref(false)
// 表单数据，也就是默认给一些数据
const formData = ref({
    id:'',
    startPointNetwork:null,
    startPointDevice:null,
    startPointPortId:null,
    endPointPort:null,
    
})
const loading = ref(false)
const editStatus = (e) => {
	loading.value = true
    if(e === false){
        formData.value.monitoringStatus = false
        formData.value.monitorStatus = false
    }else{
        formData.value.monitoringStatus = true
        formData.value.monitorStatus = true
    }
    setTimeout(()=>{
        loading.value = false
    },800)
    
}
let validateDeviceName = async (_rule, value)=>{
    if(value == ''){
    
        return Promise.reject('请输入设备名称');
    }else{
        let reg = /[\u4E00-\u9FA5]/g; 
        
        if (reg.test(value)) {
                
            return Promise.reject('禁止输入中文');
        }

    }
}
//选择网络

// 默认要校验的
const formRules = {
    deviceName: [
        {
			required: true,
			validator: validateDeviceName,
			trigger: 'blur',
		}
    ],
    deviceType:[required('请选择设备分类')],
    groupId:[required('请选择设备组')],
    ipAddress:[required('IP地址不能为空')],
    startPointNetwork:[required('请选择网络')],
    endPointPort:[required('请选择本机端口')],
    startPointDevice:[required('请选择连接设备')],
    startPointPortId:[required('请选择连接设备端口')],
    account:[required('请填写SSH账号')],
    portsNumber:[required('请选输入本机端口数')],
    dictValue:[required('请选选择模板')],
    slotNumber:[required('请选输入槽位数')],
    subCardNumber:[required('请选输入子卡数')],
    // sshPassword:[required('请填写SSH密码')],
    // telnetPassword:[required('请填写Telnet密码')],
}
const onOpen = (record) => {
    visible = true
    activeTabsKey.value = '1'
    if (record) {
        if(record.monitoringStatus == 'monitored'){
            record.monitoringStatus = true
            record.monitorStatus = true
        }else{
            record.monitoringStatus = false
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
        record.startPointNetwork = record.networkId
        record.dictValue = record.templateIds
        record.portsNumber = record.portsNumber ? record.portsNumber : bjport.value
        
        if(record.startPointDevice){
            deviceApi.deviceList({networkId:record.startPointNetwork}).then(res=>{
                console.log(res)
                if(res.length > 0){
                    linkDeviceList.value = res
                    deviceLinkShow.value = true
                }else{
                    deviceLinkShow.value = false
                }
            })
        }
        if(record.startPointPortId){
            deviceApi.portList({deviceId:record.startPointDevice}).then(res=>{
        
                if(res.length > 0){
                    console.log(res)
                    res.map((item)=>{
                        // console.log(item.portNumber)
                        
                        item.num = item.portNumber.split("/").pop();
                        // if(item.portType == 'g' && item.portNumber!='0/0/0'){
                        //     item.portNumber = item.portNumber.split("/").pop();
                        //     devicePortList.value.push(item)
                        // }
                        devicePortList.value.push(item)
                    })
                    devicePortList.value.sort(function(a, b){
                        return a.num - b.num
                    })
                    devicePointPortId.value = true
                }else{
                    devicePointPortId.value = false
                }
            })
        }
        if(record.deviceDescribe && record.deviceDescribe!=''){
           const testString = /^[{\[](.*)[}\]]$/.test(record.deviceDescribe)
            if(testString){
                const info = JSON.parse(record.deviceDescribe)
                record.product_advantages = info.product_advantages
                record.factory_information = info.factory_information
            }
            
        }
        formData.value = Object.assign({}, record)
        console.log(formData.value)
    }else{
        formData.value = {deviceTag:'third',endPointPort:null,account:null,portsNumber:bjport.value,slotNumber:1,subCardNumber:1}
    }
    planApiList.eventNetworkInfo({}).then(res=>{
			networkList.value = res
		})
    // for(var i=0;i<Number(formData.value.portsNumber)+Number(1);i++){
    //     portList.value.push({
    //         id:i,
    //         value:i
    //     })
    // }
    portStringList()
    dictApi.dictListForLabel({dictValue:'SNMP_VERSION'}).then((data) => {
        snmpVersionList.value = data
		})
    dictApi.dictListForLabel({dictValue:'DEVICE_TEMPLATE'}).then((data) => {
        deviceTemp.value = data
    })
}
// 关闭抽屉
const onClose = () => {
    formRef.value.resetFields()
    portList.value = []
    devicePortList.value = []
    linkDeviceList.value = []
    deviceLinkShow.value = false
    devicePointPortId.value = false
    snmpVersionList.value = []
    visible = false
}
// 验证并提交数据
const onSubmit = () => {
    
    
    formRef.value
        .validate()
        .then(() => {
            submitLoading.value = true
            if(formData.value.monitorStatus== true){
                formData.value.monitoringStatus = 'monitored'
            }else{
                formData.value.monitoringStatus = 'not_monitored'
            }
            formData.value.deviceKey = formData.value.deviceName
            formData.value.deviceDescribe = JSON.stringify({
                product_advantages:formData.value.product_advantages,
                factory_information:formData.value.factory_information,
            })
            // console.log(formData.value.deviceDescribe)
            if(!formData.value.id){
                formData.value.templateId = [String(formData.value.dictValue)] 
            }else{
                formData.value.addTemplates = [String(formData.value.dictValue)] 
            }
            deviceApi.submitForm(formData.value, !formData.value.id).then(() => {
					submitLoading.value = false
					visible = false
					emit('successful')
				})
        }).finally(() => {
            submitLoading.value = false
        })
}
// 调用这个函数将子组件的一些数据和方法暴露出去
defineExpose({
    onOpen
})
</script>