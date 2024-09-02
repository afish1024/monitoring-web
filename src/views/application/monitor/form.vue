<template>
    <a-drawer
		:title="formData.id ? '编辑接口' : '增加接口'"
		:width="500"
		:visible="visible"
		:destroy-on-close="true"
		:body-style="{ paddingBottom: '80px' }"
		:footer-style="{ textAlign: 'right' }"
        :maskClosable="false"
		@close="onClose"
	>
        <a-form ref="formRef" :model="formData" :rules="formRules" layout="vertical">
            <a-form-item label="接口名称：" name="name">
				<a-input v-model:value="formData.name" placeholder="请输入接口名称" allow-clear />
			</a-form-item>
            <a-form-item label="系统名称：" name="appType">
                <a-select v-model:value="formData.appType" placeholder="请选择系统名称" allowClear>
                    <a-select-option v-for="item in appnameList" :key="item.type" :value="item.type">
                    {{item.name}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="模块名称：" name="pname">
				<a-input v-model:value="formData.pname" placeholder="请输入模块名称" allow-clear />
			</a-form-item>
            <a-form-item label="接口地址：" name="url">
				<a-input v-model:value="formData.url" placeholder="请输入接口地址" allow-clear />
			</a-form-item>
            <a-form-item label="请求方式：" name="method">
                <a-radio-group v-model:value="formData.method" @change="radioMonitor($event)">
                    <a-radio value="get">GET</a-radio>
                    <a-radio value="post">POST</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="请求鉴权：" name="isauth">
                <a-radio-group v-model:value="formData.isauth" @change="radioAuth($event)">
                    <a-radio :value="1">是</a-radio>
                    <a-radio :value="0">否</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="监控状态：" name="monitorStatus">
				<a-switch
					:loading="loading"
					:checked="formData.monitorStatus"
					@change="editStatus($event)"
                    checked-children="开启" 
                    un-checked-children="关闭"
				/>
			</a-form-item>
            <!-- <a-form-item label="监控间隔时间：" name="intervalTime">
                <a-input v-model:value="formData.intervalTime" placeholder="请输入监控间隔时间" type="number" />
            </a-form-item> -->
			<a-form-item label="排序值:" name="sort">
				<a-slider v-model:value="formData.sort" :max="100" />
			</a-form-item>
            <a-form-item label="请求登录：" name="islogin">
                <a-radio-group v-model:value="formData.islogin" @change="radioLogin($event)">
                    <a-radio :value="1">是</a-radio>
                    <a-radio :value="0">否</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="header(JSON格式)" name="headers">
                <a-textarea
                    v-model:value="formData.headers"
                    placeholder="请输入header(JSON格式)"
                    :auto-size="{ minRows: 3, maxRows: 5 }"
                    />
            </a-form-item>
            <a-form-item label="body(JSON格式)" name="body">
                <a-textarea
                    v-model:value="formData.body"
                    placeholder="请输入body(JSON格式)"
                    :auto-size="{ minRows: 3, maxRows: 5 }"
                    />
            </a-form-item>
            <a-form-item label="form-data(JSON格式)" name="formdata">
                <a-textarea
                    v-model:value="formData.formdata"
                    placeholder="请输入form-data(JSON格式)"
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
<script setup>
import { required, rules } from '@/utils/formRules'
import indexApi from '@/api/python/indexApi'
import bizTypeApi from '@/api/biz/bizTypeApi'
let loading = ref(false)
let visible = $ref(false)
const emit = defineEmits({ successful: null })
const formRef = ref()
const submitLoading = ref(false)
const appnameList = ref([])
// 表单数据，也就是默认给一些数据
const formData = ref({
    id:''
})
const radioMonitor = (e) =>{
    formData.value.method = e.target.value
}
const radioAuth = (e) =>{
    formData.value.isauth = e.target.value
}
const radioLogin= (e) =>{
    formData.value.islogin = e.target.value
}
const editStatus = (e) => {
    loading.value = true
    if(e === false){
        formData.value.monitorStatus = false
    }else{
        formData.value.monitorStatus = true
    }
    setTimeout(()=>{
        loading.value = false
    },800)
    
}
// 打开抽屉
const onOpen = (record) => {
    visible = true
    formData.value = {
        method:'get',
        isauth:1,
        islogin:1,
        monitorStatus:true,
        sort:1
    }
    if (record) {
        record.isauth = parseInt(record.isauth)
        record.islogin = parseInt(record.islogin)
        record.appType = record.app
        record.id = record._id
        record.sort = record.sort ? parseInt(record.sort):0 
        record.monitorStatus = record.monitorStatus == 1 ? true :false
        formData.value = Object.assign({}, record)
    }
    indexApi.monitorTree().then((res) => {
        appnameList.value = res.records
    })
}
// 默认要校验的
const formRules = {
    name: [required('请输入接口名称')],
    appType:[required('请选择系统名称')],
    url:[required('请输入接口地址')],
    method:[required('请选择请求方式')],
    isauth:[required('请选择鉴权')],
    islogin:[required('请选择登录')],
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
            if(formData.value.monitorStatus == true){
                formData.value.monitorStatus = 1
            }else{
                formData.value.monitorStatus = 0
            }
            bizTypeApi.monitorSubmitForm(formData.value, !formData.value.id).then(() => {
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