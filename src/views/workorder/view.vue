<template>
    <a-modal
     title="工单详情"
     v-model:visible="porps.visibleShow"
     :width="1100"
     @cancel="onClose"
     :forceRender="true"
     :destroyOnClose="true"
   >
        <a-row :gutter="24">
            <a-col :span="18">
                <a-form ref="formRef" :model="formData" :rules="formRules">
                    <a-row :gutter="24">
                        <a-col :span="24">
                            <a-form-item label="工单内容">
                                {{porps.recordInfo.workerContent}}
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24">
                        <a-col :span="8">
                            <a-form-item>
                                <XnUpload 
                                    :uploadMode="previewUpload" 
                                    @uploadDone="uploadDone" 
                                    uploadTitle="选择文件"
                                    :uploadMumber="5"
                                    >
                                    </XnUpload>
                            </a-form-item>
                        </a-col>
                        <a-col :span="18">
                            <!-- <div class="firstimg">
                                <a-image
                                    :width="80"
                                    :height="80"
                                    :src="formData.imagePath"
                                    v-if="formData.imagePath"
                                >
                                </a-image>
                            </div> -->
                        </a-col>
                    </a-row>
                    <a-row :gutter="24">
                        <a-col :span="8">
                            <a-form-item label="工单回复">
                                
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24">
                        <a-col :span="24">
                            <a-form-item label="">
                                <a-radio-group v-model:value="formData.replyType">
                                    <a-radio value="1">实名</a-radio>
                                    <a-radio value="2">匿名</a-radio>
                                    <a-radio value="3">指定回复人</a-radio>
                                </a-radio-group>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24">
                        <a-col :span="24">
                            <WangEditor
                                style="width: 100%"
                                @editorContent="getEditorContent"
                                :content="formData.content"
                                
                            ></WangEditor>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24" style="margin-top: 10px;">
                        <a-col :span="24">
                            <a-button type="primary" :loading="submitLoading" @click="onSubmit">回复</a-button>
                        </a-col>
                    </a-row>
                    
                 </a-form>
            </a-col>
            <a-col :span="6">
                <a-form ref="formRef" :label-col="{ span: 7 }">
                    <a-row :gutter="24">
                        <a-col :span="24" style="font-weight: bold;">
                            工单属性
                        </a-col>
                    </a-row>
                    <a-row :gutter="24" style="margin-top: 20px;">
                        <a-col :span="24">
                            <a-form-item label="工单编号" style="margin-bottom: -4px;">
                                {{porps.recordInfo.id}}
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24" style="margin-top: 20px;">
                        <a-col :span="24">
                            <a-form-item label="优先级" style="margin-bottom: -4px;" >
                                {{porps.recordInfo.priorityName}}
                            </a-form-item>
                        </a-col>
                         
                    </a-row>
                     <a-row :gutter="24" style="margin-top: 20px;">
                        <a-col :span="24">
                            <a-form-item label="处理人" style="margin-bottom: -4px;" >
                                {{porps.recordInfo.processingUser}}
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24" style="margin-top: 20px;">
                        <a-col :span="24">
                            <a-form-item label="工单状态" style="margin-bottom: -4px;" >
                                 {{ porps.recordInfo.workerStatusName }}
                                <!-- <span v-for="(item,index) in orderList" :key="index">
                                    <span v-if="porps.recordInfo.workerStatus ==item.statusCode ">{{ item.statusName }}</span>
                                </span> -->
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24" style="margin-top: 20px;">
                        <a-col :span="24">
                            <a-form-item label="工单模板" style="margin-bottom: -4px;" >
                                {{porps.recordInfo.worderTemplateName}}
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24" style="margin-top: 20px;">
                        <a-col :span="24">
                            <a-form-item label="创建人" style="margin-bottom: -4px;" >
                                {{porps.recordInfo.createUserName}}
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24" style="margin-top: 20px;">
                        <a-col :span="24">
                            <a-form-item label="标签" style="margin-bottom: -4px;" >
                                {{porps.recordInfo.workerTag}}
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24" style="margin-top: 20px;">
                        <a-col :span="24">
                            <a-form-item label="创建时间" style="margin-bottom: -4px;" >
                                {{porps.recordInfo.createTime}}
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24" style="margin-top: 20px;">
                        <a-col :span="24">
                            <a-form-item label="更新时间" style="margin-bottom: -4px;" >
                                {{porps.recordInfo.updateTime}}
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </a-col>
        </a-row>
         <template #footer>
           <a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
           <!-- <a-button type="primary" :loading="submitLoading" @click="onSubmit">保存</a-button> -->
       </template>
   </a-modal>
</template>
<script setup name="modifyInfo">
import { message, Empty } from 'ant-design-vue'
import { required, rules } from '@/utils/formRules'
import orderApi from '@/api/workorder/orderApi'
import WangEditor from '@/components/wangEditor/BasicEditor.vue'
import XnUpload from '@/components/XnUpload/index.vue'
const previewUpload= 'uploadCard'
const porps = defineProps({
    recordInfo:{
        type:Array,
        default:()=>[]
    },
    visibleShow:{
        type:Boolean,
        default:()=>false
    },
    orderList:{
        type:Array,
        default:()=>[]
    }
})
const getEditorContent = (data) => {
    //console.log(111)
    formData.value.content = data
}
const uploadDone =(data)=>{
    console.log(data)
}
// console.log(porps.recordInfo)
const emit = defineEmits({ successful: null})
const submitLoading = ref(false)
const formRef = ref()
const formData = ref({
    workerStatus:null,
    imagePath:[],
    replyType:'1'
})

// 关闭抽屉
const onClose = () => {
   //formRef.value.resetFields()
   emit('closeview')
}
// 默认要校验的
const formRules = {
   
}
const onSubmit = ()=>{

   formRef.value
       .validate()
       .then(() => {
        //    submitLoading.value = true
           
       }).finally(() => {
           submitLoading.value = false
       })
}

</script>
<style lang="less" scoped>
:deep(.ant-upload.ant-upload-select-picture-card){
    width: 80px;
    height: 80px;
}
.firstimg{
    display: flex;
    margin-left: 10px;
}
</style>