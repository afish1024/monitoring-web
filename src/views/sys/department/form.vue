<template>
    <a-drawer
		:title="formData.id ? '编辑部门' : '增加部门'"
		:width="500"
		:visible="visible"
		:destroy-on-close="true"
		:body-style="{ paddingBottom: '80px' }"
		:footer-style="{ textAlign: 'right' }"
		@close="onClose"
	>   
        <a-form ref="formRef" :model="formData" :rules="formRules" layout="vertical">
            <a-form-item label="上级部门：" name="parentId">
                <a-select v-model:value="formData.parentId" placeholder="请选择上级部门" allowClear>
                    <a-select-option v-for="item in departmentList" :key="item.id" :value="item.id">
                    {{item.name}}
                    </a-select-option>
                </a-select>
			</a-form-item>
            <a-form-item label="部门名称：" name="departmentName">
                <a-input v-model:value="formData.departmentName" placeholder="请输入部门名称"  allow-clear />
            </a-form-item>
        </a-form>
        <template #footer>
			<a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
			<a-button type="primary" :loading="submitLoading" @click="onSubmit">保存</a-button>
		</template>
    </a-drawer>
</template>
<script setup name="departmentForm">
import { required ,rules} from '@/utils/formRules'
import { message } from 'ant-design-vue'
onMounted(()=>{
    dataList()
})
// 定义emit事件
const emit = defineEmits({ successful: null })
const submitLoading = ref(false)
const departmentList = ref([])
// 默认是关闭状态
let visible = $ref(false)
const formRef = ref()
// 表单数据，也就是默认给一些数据
const formData = ref({})
// 关闭抽屉
const onClose = () => {
    visible = false
    formRef.value.resetFields()
    submitLoading.value = false
    
}
// 默认要校验的
// let validatePass = async (_rule, value)=>{
//     console.log(value)
//     if(value === undefined){
    
//         return Promise.reject('请输入手机号码');
//     }
// }
// 默认要校验的
const formRules = {
    parentId: [required('请选则上级部门')],
    departmentName: [required('请填写部门名称')],
    // phone:[
    //   {
    //     required: true,
    //     validator: validatePass,
    //     trigger: 'blur',
    //   }
    // ]
    
}
const dataList = () =>{
    departmentList.value.unshift({id:0,name:'顶级'})
}
// 打开抽屉
const onOpen = (record) => {
    visible = true
    if (record) {
        formData.value = record
    }
}
const onSubmit = () =>{
    formRef.value
			.validate()
			.then(() => {
                //console.log(formData.value);return;
                // managerApi.submitForm(formData.value, !formData.value.id).then(() => {
                //     submitLoading.value = false
                //     visible = false
                //     emit('successful')
                // })
			})
			.catch(() => {
				submitLoading.value = false
			})
}
defineExpose({
    onOpen
})
</script>