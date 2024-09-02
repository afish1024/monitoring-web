<template>
    <a-drawer
		:title="formData.id ? '编辑监控系统' : '增加监控系统'"
		:width="500"
		:visible="visible"
		:destroy-on-close="true"
		:body-style="{ paddingBottom: '80px' }"
		:footer-style="{ textAlign: 'right' }"
		@close="onClose"
		:maskClosable="false"
	>
        <a-form ref="formRef" :model="formData"  layout="vertical"> <!--  :rules="formRules"-->
            <a-form-item label="系统名称：" name="name" :rules="[{ required: true, message: '请输入系统名称' }]" >
				<a-input v-model:value="formData.name" placeholder="请输入系统名称" allow-clear />
			</a-form-item>
            <!-- <a-form-item label="系统类别值:" name="type">
				<a-slider v-model:value="formData.type" :max="100" />
			</a-form-item> -->
            <a-form-item label="是否AUTH验证：" name="isauth" :rules="[{ required: true, message: '请选择AUTH验证' }]">
                <a-radio-group v-model:value="formData.isauth" @change="radioMonitor($event)">
                    <a-radio :value="1">是</a-radio>
                    <a-radio :value="0">否</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="AUTH类别：" name="authtype"  :rules="[{ required: formData.isauth == 1 ? true :false, message: '请选择AUTH类别' }]" >
                <a-select v-model:value="formData.authtype" placeholder="请选择" allowClear>
                    <a-select-option v-for="item in authTypeList" :key="item.value" :value="item.value">
                    {{item.key}}
                    </a-select-option>
                </a-select>
            </a-form-item>
			<a-form-item label="AUTH鉴权：" name="authResponseType" :rules="[{ required: formData.isauth == 1 ? true :false, message: '请选择AUTH鉴权' }]">
                <a-select v-model:value="formData.authResponseType" placeholder="请选择" allowClear @change="authResponse($event)">
                    <a-select-option v-for="item in authResponseTypeList" :key="item.value" :value="item.value" >
                    {{item.key}}
                    </a-select-option>
                </a-select>
            </a-form-item>
			<a-form-item label="JSON数据" v-if="formData.authResponseData">
                <a-textarea
				disabled
                    v-model:value="formData.authResponseData"
                    :auto-size="{ minRows: 3, maxRows: 5 }"
                    />
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
			<a-form-item label="接口执行间隔时间(秒)：" name="intervalTime">
                <a-input v-model:value="formData.intervalTime" placeholder="请输入接口执行间隔时间" min="1" type="number" />
            </a-form-item>
			<a-form-item label="排序值:" name="sort">
				<a-slider v-model:value="formData.sort" :max="100" />
			</a-form-item>
            <!-- <a-form-item label="图标：" name="icon">
				<a-input v-model:value="formData.icon" style="width: calc(100% - 66px)" placeholder="请选择图标" allow-clear @click="iconSelector.showIconModal(formData.icon)"/>
				<a-button type="primary" @click="iconSelector.showIconModal(formData.icon)">选择</a-button>
			</a-form-item> :action="goodsInfo.action"-->
			<!-- <a-form-item label="健康图片：" name="imageNormal">
				<a-upload
					v-model:file-list="formData.imageNormal"
					class="avatar-uploader"
					list-type="picture-card"
					:show-upload-list="false"
					:custom-request="customRequest"
					accept="image/png, image/jpeg, image/jpg"
				>
					<img v-if="imageNormal" :src="imageNormal" alt="avatar" style="height: 104px; width: 104px" />
					<div v-else>
						<plus-outlined />
						<div class="ant-upload-text">上传</div>
					</div>
				</a-upload>
			</a-form-item> -->
			<a-form-item label="健康图片：" name="imageNormal">
				<XnUpload 
				:uploadMode="previewUpload" 
				@uploadDone="uploadDoneNormal" 
				uploadTitle="上传图片"
				:imageUrl="formData.imageNormal"
				>
				</XnUpload>
				<!-- <div class="firstimg">
					<a-image
						:width="104"
						:height="104"
						:src="formData.imageNormal"
						v-if="formData.imageNormal"
					>
					</a-image>
				</div> -->
        	</a-form-item>
			<a-form-item label="异常图片：" name="imageAbnormal">
				<XnUpload 
				:uploadMode="previewUpload" 
				@uploadDone="uploadDoneAbnormal" 
				uploadTitle="上传图片"
				:imageUrl="formData.imageAbnormal"
				>
				</XnUpload>
				<!-- <div class="firstimg">
					<a-image
						:width="104"
						:height="104"
						:src="formData.imageAbnormal"
						v-if="formData.imageAbnormal"
					>
					</a-image>
				</div> -->
        	</a-form-item>
        </a-form>
        <template #footer>
			<a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
			<a-button type="primary" :loading="submitLoading" @click="onSubmit">保存</a-button>
		</template>
		<Icon-selector ref="iconSelector" @iconCallBack="iconCallBack" />
    </a-drawer>

</template>
<script setup>
	import { required, rules } from '@/utils/formRules'
    import IconSelector from '@/components/Selector/iconSelector.vue'
	import bizTypeApi from '@/api/biz/bizTypeApi'
	import indexApi from '@/api/python/indexApi'
	import XnUpload from '@/components/XnUpload/index.vue'
	const previewUpload= 'uploadCard'
    // 默认是关闭状态
	let loading = ref(false)
	let visible = $ref(false)
	const emit = defineEmits({ successful: null })
	const formRef = ref()
    const submitLoading = ref(false)
	let iconSelector = ref()
	const authResponseTypeList = ref()
	// 表单数据，也就是默认给一些数据
	const formData = ref({})
	const imageNormal = ref('')
	const imageAbnormal = ref('')
    const radioMonitor = (e) =>{
        formData.value.isauth = e.target.value
		if( e.target.value == 0){
			console.log(e.target.value)
			formRef.value.clearValidate("authtype")
			formRef.value.clearValidate("authResponseType")
		}
		
    }
	const authResponse = (e)=>{
		formData.value.authResponseType = e
		if(e > 0){
			authResponseTypeList.value.map(item=>{
				if(item.value == e){
					formData.value.authResponseData = item.data
				}
			})
		}
	}
	const uploadDoneNormal = (data)=>{
		console.log(data)
		formData.value.imageNormal = data[0]
	}
	const uploadDoneAbnormal = (data)=>{
		console.log(data)
		formData.value.imageAbnormal = data[0]
	}
	const customRequest = (data) => {
		formData.value.imageNormal = ref([])
		getBase64(data.file)
			.then((res) => {
				// console.log(res)
				imageNormal.value = res
				formData.value.imageNormal.push(res)
			})
			.catch((err) => {})
	}
	// 文件转base64，用于显示图片
	const getBase64 = (file) => {
		return new Promise((resolve, reject) => {
			// FileReader类就是专门用来读文件的
			const reader = new FileReader()
			reader.readAsDataURL(file)
			// 成功和失败返回对应的信息，reader.result一个base64，可以直接使用
			reader.onload = () => resolve(reader.result)
			// 失败返回失败的信息
			reader.onerror = (error) => reject(error)
		})
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
    const authTypeList = ref([])
    // 打开抽屉
	const onOpen = (record) => {
		visible = true
		formData.value = {
			menuType: 'MENU',
			//type: 1,
            isauth:1,
            authtype:null,
			sort:1,
			monitorStatus:true,
			authResponseType:null,
			authResponseData:''
		}
		if (record) {
			record.isauth = parseInt(record.isauth)
			record.app_type = record.type
			record.id = record._id
			record.sort = record.sort ? parseInt(record.sort):0 
			record.monitorStatus = record.monitorStatus == 1 ? true :false
			record.icon = record.icon == null ? record.icon = undefined :record.icon
			record.authResponseType = record.authResponseType == '0' ? null :record.authResponseType
			formData.value = Object.assign({}, record)
			
		}
		indexApi.sysConfig().then((res)=>{
			authTypeList.value = res.auth_types
			authResponseTypeList.value = res.auth_responses
			if(typeof(record)!='undefined' && typeof(record.authResponseType)!='undefined' && record.authResponseType > 0 ){
				authResponseTypeList.value.map(item=>{
					if(item.value == record.authResponseType){
						console.log(JSON.stringify(item.data, null, '\t'))
						formData.value.authResponseData = item.data
						
					}
				})
			}
		})
	}
    // 图标选择器回调
	const iconCallBack = (value) => {
		formData.value.icon = value
	}
    // 默认要校验的
	let formRules = {
		name: [required('请输入系统监控名称')],
        type:[required('请填写类别值')],
        isauth:[required('请选择')],
        //authtype:[required('请选择AUTH验证')],
	}
	// 关闭抽屉
	const onClose = () => {
		formRef.value.resetFields()
		imageNormal.value = ''
		imageAbnormal.value = ''
		formData.value.imageNormal = ref([])
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
				//console.log(formData.value.monitorStatus);
				bizTypeApi.submitForm(formData.value, !formData.value.id).then(() => {
					submitLoading.value = false
					visible = false
					emit('successful')
				})
			}).catch((e) => {
				//console.log(e)
				submitLoading.value = false
			})
	}
    // 调用这个函数将子组件的一些数据和方法暴露出去
	defineExpose({
		onOpen
	})
</script>
<style lang="less" scoped>
.firstimg{
    position: absolute;
    left: 27%;
    bottom: 7%;
    overflow: hidden;
    border: 1px dashed var(--border-color-base);
}
</style>