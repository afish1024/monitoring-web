<template>
	<a-upload
		v-if="props.uploadMode === 'defaults'"
		v-model:file-list="fileList"
		name="file"
		:action="action"
		:headers="headers"
		:maxCount="props.uploadMumber"
		@change="handleChange"
	>
		<a-button>
			<upload-outlined></upload-outlined>
			上传
		</a-button>
	</a-upload>

	<a-upload-dragger
		v-if="props.uploadMode === 'drag'"
		v-model:fileList="fileList"
		name="file"
		:multiple="true"
		:action="action"
		:headers="headers"
		:maxCount="props.uploadMumber"
		@change="handleChange"
	>
		<p class="ant-upload-drag-icon">
			<inbox-outlined></inbox-outlined>
		</p>
		<p class="ant-upload-text">单击或拖动文件到此区域上传</p>
		<p class="ant-upload-hint"></p>
	</a-upload-dragger>
	<a-upload
	v-if="props.uploadMode === 'uploadCard'"
	v-model:fileList="fileList"
	name="file"
	:action="action"
	:headers="headers"
	:maxCount="props.uploadMumber"
	list-type="picture-card"
	@preview="handlePreview"
	:show-upload-list="false"
	@change="handleChange"
	:accept="props.uploadAccept"
	>
	<div class="firstimg" v-if="props.imageUrl">
		<img :src="props.imageUrl" style="height: 104px; width: 104px" />
		<div class="mask">
			<plus-outlined  style="color: #fff; position: absolute; left: 42px;top: 42px;font-size: 20px;"/>
			<span >重新上传</span>
		</div>
	</div>
	<div v-if="fileList.length < 8 && !props.imageUrl">
        <plus-outlined />
        <div style="margin-top: 8px">{{props.uploadTitle}}</div>
      </div>
	</a-upload>
	
	<a-modal :visible="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
</template>

<script setup name="uploadIndex">
	import tool from '@/utils/tool'
	import sysConfig from '@/config/index'
	const fileList = ref([])
	const emit = defineEmits({ uploadDone: null })
	const headers = ref({
		token: tool.data.get('TOKEN')
	})
	const props = defineProps({
		action: {
			type: String,
			default: '/dev/file/uploadDynamicReturnUrl',
			required: false
		},
		// 上传方式 defaults || drag
		uploadMode: {
			type: String,
			default: 'defaults',
			required: false
		},
		// 上传数量
		uploadMumber: {
			type: Number,
			default: 1,
			required: false
		},
		uploadAccept:{
			default: 'image/png, image/jpeg, image/jpg, image/gif',
			required: false
		},
		// 上传标题
		uploadTitle: {
			type: String,
			default: 'Upload',
			required: false
		},
		imageUrl:{
			type: String,
			default: '',
			required: false
		}
	})
	const action = sysConfig.API_URL + props.action

	const handleChange = () => {
		
		const file = fileList.value[0]
		if (file.status === 'done' && file.response && file.response.code === 200) {

			emit('uploadDone', file.response.data)
		}
		//let result = []
		// for (let a = 0; a < props.uploadMumber; a++) {
		// 	const file = fileList.value[a]
		// 	console.log(a)
		// 	if (file.status === 'done' && file.response && file.response.code === 200) {
		// 		result.push(file.response.data)
		// 		if(result){
		// 			fileList.value = []
		// 		}
		// 	}
		// }
		// if (result.length > 0) {
		// 	emit('uploadDone', result)
		// }
	}
</script>
<style lang="less" scoped>
.firstimg{
    position: relative;
    //right: 10%;
    //left: 245px;
    // bottom: 5%;
    // overflow: hidden;
    // border: 1px dashed var(--border-color-base);
    // border-radius: 8px;
}
.mask {
        /* 隐藏遮罩层 */
    top:0;
    display: none;
    position: absolute;
    width: 104px;
    height: 104px;
    background-color: rgba(12,13,15,0.5);
    border-radius: 8px;
}
.firstimg:hover .mask {
    /* 而是显示元素 */
    display: block;
	span{
		font-size: 12px;
		position: absolute;
		left: 25px;
		top: 65px;
		color: #fff;
	}
}
</style>
