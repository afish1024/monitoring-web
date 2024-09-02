<template>
	<a-row class="list">
		<a-col :span="6" class="bordered-r">
            <a-row :gutter="24"  justify="space-around" class="left-category">
                <a-col :span="10">
                    <div class="name">资产分类</div>
                </a-col>
                <a-col :span="10" @click="categoryCreate">
                    <div class="icon"  >
                        <plus-circle-outlined style="float:right" />
                    </div>
                </a-col>
            </a-row>
			<a-card class="aside-card" title="">
             
				<div v-if="treeData.length">
					<a-tree
						v-model:selectedKeys="selectedKeys"
						@select="handleSelect"
						:tree-data="treeData"
						:fieldNames="{ children: 'children', title: 'categoryName', key: 'id' }"
						default-expand-all
					>
						 
						<template #title="{ categoryName,id,parentId,categoryRemark }">
							
							<a-row :gutter="24">
								<a-col :span="24">
									{{categoryName}}
									<edit-outlined @click="edit(id,categoryName,parentId,categoryRemark)" v-if="id > 0"/> 
									 
									<a-popconfirm title="确定要操作吗？" @confirm="del(id)" v-if="id > 0">
                                        <delete-outlined style="padding-left: 10px;" /> 
                                    </a-popconfirm>
								</a-col>
								 
							</a-row>
						</template>
					</a-tree>
				</div>
			</a-card>
		</a-col>
		<a-col :span="18">
          
            <div class="pagetitle">
                
                <a-row :gutter="24"  justify="space-between" >
                    <a-col :span="4">
                        <div class="line"></div>
                        <div class="value">分类模板</div>
                    </a-col>

                    <!-- <a-col :span="20"  @click="modalVisible = true" >
                        <a-button type="primary" @click="modalVisible == true" style="float: right;margin-right: 10px;margin-top:5px;">
                            <template #icon><plus-outlined /></template>
                            添加字段
                        </a-button>
                    </a-col> -->
                    
                </a-row>
            </div>
              

           
			
            <a-card :bordered="false" :body-style="{ 'padding-bottom': '0px' }" class="mb-2">
                <a-form ref="formRef"  :model="searchFormState" :label-col="{ span: 9 }">
                    <div class="block-group">
                        <div class="title">基本参数</div>
                        <a-row :gutter="24" class="item">
                            <a-col :span="8">
                                <a-form-item label="资产分类">
									<a-input v-model:value="searchFormState.startIp" placeholder="" disabled></a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-item label="资产编码" name="extJson">
                                    <a-input v-model:value="searchFormState.startIp" placeholder="" disabled></a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-item label="资产名称" name="createTime">
                                    <a-space>
                                        <a-input v-model:value="searchFormState.startIp" placeholder="" disabled></a-input>
                                      
                                    </a-space>
                                </a-form-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-item label="品牌" name="createTime">
                                    <a-input v-model:value="searchFormState.startIp" placeholder="" disabled></a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-item label="规格型号" name="createTime">
                                    <a-input v-model:value="searchFormState.startIp" placeholder="" disabled></a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-item label="资产来源" name="createTime">
                                    <a-input v-model:value="searchFormState.startIp" placeholder="" disabled></a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-item label="入库日期" name="createTime">
                                    <a-input v-model:value="searchFormState.startIp" placeholder="" disabled></a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-item label="责任人" name="createTime">
                                    <a-input v-model:value="searchFormState.startIp" placeholder="" disabled></a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-item label="领用人" name="createTime">
                                    <a-input v-model:value="searchFormState.startIp" placeholder="" disabled></a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-item label="领用日期" name="createTime">
									<a-date-picker disabled/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-item label="使用人" name="createTime">
                                    <a-input v-model:value="searchFormState.startIp" placeholder="" disabled></a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-item label="借用日期" name="createTime">
                                    <a-date-picker disabled/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-item label="资产备注" name="createTime">
                                    <a-textarea v-model:value="searchFormState.startIp" placeholder="" disabled></a-textarea>
                                </a-form-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-item label="资产图片" name="createTime">
									<XnUpload 
									:uploadMode="previewUpload" 
									@uploadDone="uploadDone" 
									uploadTitle="选择文件"
									:uploadMumber="1"
									 
									>
									
									</XnUpload>
                                </a-form-item>
                            </a-col>

                        </a-row>
                    </div>
                    <div class="block-group">
                        <div class="title">维保信息</div>
                        <a-row :gutter="24" class="item">
                            <a-col :span="8">
                                <a-form-item label="购入日期">
									<a-date-picker disabled/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-item label="维保到期日期">
									<a-date-picker disabled/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-item label="维保单位">
                                    <a-input v-model:value="searchFormState.startIp" placeholder="" disabled></a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-item label="联系人">
                                    <a-input v-model:value="searchFormState.startIp" placeholder="" disabled></a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-item label="联系方式">
									<a-input v-model:value="searchFormState.startIp" placeholder="" disabled></a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-item label="维保说明">
									<a-input v-model:value="searchFormState.startIp" placeholder="" disabled></a-input>
                                </a-form-item>
                            </a-col>
                          
                        </a-row>
                      
                    </div>
                </a-form>
            </a-card>
		</a-col>
	</a-row>

    <a-modal
		title="添加字段"
		v-model:visible="modalVisible"
		:width="580"
		@cancel="modalVisible = false"
		@ok="submit"
		destroy-on-close
		append-to-body
	>
		<div>
			<a-row :gutter="24" >
				<a-col :span="24" class="mb15">
					<a-row :gutter="24">
						<a-col :span="7">
							所属信息模块
						</a-col>
						<a-col :span="16">
							<a-input  placeholder="所属信息模块" allow-clear />
						</a-col>
					</a-row>

				</a-col>
				<a-col :span="24" class="mb15">
					<a-row :gutter="24">
						<a-col :span="7">
							字段名称
						</a-col>
						<a-col :span="16">
							<a-input  placeholder="请输入资产状态" allow-clear />
						</a-col>
					</a-row>

				</a-col>
			</a-row>

			<a-row :gutter="24"  >
				<a-col :span="24" class="mb15">
					<a-row :gutter="24">
						<a-col :span="7">
							字段类型
						</a-col>
						<a-col :span="16">
							<a-input  placeholder="请输入资产状态" allow-clear />
						</a-col>
					</a-row>

				</a-col>
				<a-col :span="24" class="mb15">
					<a-row :gutter="24">
						<a-col :span="7">
							初始值
						</a-col>
						<a-col :span="16">
							<a-input  placeholder="请输入资产状态" allow-clear />
						</a-col>
					</a-row>

				</a-col>
			</a-row>

			<a-row :gutter="24">
				<a-col :span="24" class="mb15">
					<a-row :gutter="24">
						<a-col :span="7">
							不为空
						</a-col>
						<a-col :span="16">
							<a-input  placeholder="请输入资产状态" allow-clear />
						</a-col>
					</a-row>

				</a-col>
				<a-col :span="24">
					<a-row :gutter="24">
						<a-col :span="7">
							使用状态
						</a-col>
						<a-col :span="16">
							<a-input  placeholder="请输入资产状态" allow-clear />
						</a-col>
					</a-row>

				</a-col>
			</a-row>
		</div>
	</a-modal>

    <a-modal
		title="添加资产分类"
		v-model:visible="categoryModal"
		:width="580"
		:forceRender="true"
		:destroyOnClose="true"
	>
		<a-form ref="formRef" :model="formData" :rules="formRules" :label-col="{ span: 4 }">
			<a-form-item label="分类名称：" name="categoryName">
               <a-input v-model:value="formData.categoryName" placeholder="请输入分类名称" allow-clear />
           </a-form-item>
		   <a-form-item label="父级资产：" name="parentId">
			<a-tree-select
					v-model:value="formData.parentId"
					v-model:treeExpandedKeys="defaultExpandedKeys"
					style="width: 100%"
					:dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
					placeholder="请选择父级资产"
					allow-clear
					tree-default-expand-all
					:tree-data="treeData"
					:field-names="{
						children: 'children',
						label: 'categoryName',
						value: 'id'
					}"
					selectable="false"
					tree-line
					 
				>
				<template #title="{ categoryName,parentId }">
				{{parentId == '-1' ? '顶级' :categoryName }}
				</template>
			</a-tree-select>
           </a-form-item>
		   <a-form-item label="分类备注：" name="categoryRemark">
               <a-textarea v-model:value="formData.categoryRemark" placeholder="请输入分类备注" allow-clear />
           </a-form-item>
		</a-form>
		<template #footer>
           <a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
           <a-button type="primary" :loading="submitLoading" @click="onSubmit">保存</a-button>
       </template>
	</a-modal>


</template>

<script setup name="devConfig">
	import { Empty } from 'ant-design-vue'
	import listApi from '@/api/topological/listApi'
	import XnUpload from '@/components/XnUpload/index.vue'
	import { required, rules } from '@/utils/formRules'
	import '@/utils/objects'
	const submitLoading =  ref(false)
	const previewUpload= 'uploadCard'

	const defaultExpandedKeys = ref([0])
	const selectedKeys = ref([0])
	const treeData = ref([])
	const treeId = ref('')
    let searchFormState = reactive({})
    let modalVisible = ref(false)
    let categoryModal = ref(false)
	
	const del = (id)=>{
		listApi.propertyDelete([{id:id}]).then(res=>{
			getTreeData()
		})
	}
	const formRef = ref()
	// 默认要校验的
	const formRules = {
		categoryName:[required('请输入名称')] 
	}
	const formData = ref({
		categoryName:'',
		parentId:'-1',
		categoryRemark:''
	})
	const onClose = ()=>{
		
		formRef.value.resetFields()
		categoryModal.value = false
	}
	const onSubmit = ()=>{
		formRef.value
       .validate()
       .then(() => {
          	 submitLoading.value = true
        //    console.log(JSON.stringify(formData.value))
			listApi.submitForm(formData.value, !formData.value.id).then(res=>{
				getTreeData()
               submitLoading.value = false
               categoryModal.value = false
			   formRef.value.resetFields()
              // emit('successful')
           }).catch(err=>{
               submitLoading.value = false
           })
       }).finally(() => {
           submitLoading.value = false
       })
	}
    const categoryCreate = () => {
        categoryModal.value = true
    }
	const getTreeData = () => {
		listApi.categoryTree().then((res) => {
			
			 treeData.value = [
				{
					id: 0,
					parentId: '-1',
					categoryName: '全部',
					children: res
				}
			]
		})
	}
	const handleSelect = (selectedKeys,e) => {
		const type = e.node.type
		console.log(type)
		console.log(e.node.id)

		
		treeId.value  = e.node.id
	}
	onMounted(() => {
		getTreeData()
	})
	const edit = (id,categoryName,parentId,categoryRemark)=>{
		categoryModal.value = true
		formData.value.id = id
		formData.value.parentId = parentId
		formData.value.categoryName = categoryName
		formData.value.categoryRemark = categoryRemark
	}
</script>

<style lang="less" scoped>
	.list {
		background-color: #fff;

		.aside-card {
			border: 0;
		}
	}
	.bordered-r {
		border-right: 1px solid var(--border-color-split);
	}
	.table-tools {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.title {
			padding-left: 10px;
			line-height: 16px;
			font-weight: 500;
			font-size: 16px;
			border-left: 4px solid #3a6fd7;
			
		}

		.btn-group {
			margin-right: 15px;
			margin-left: 15px;
			box-sizing: border-box;
			padding: 0;
			color: #000000d9;
			font-size: 14px;
			font-variant: tabular-nums;
			line-height: 1.5715;
			list-style: none;
			font-feature-settings: 'tnum';
			display: inline-block;
			font-size: 0;
			border: 1px solid #d9d9d9;
			border-radius: 2px;
			background-color: #fff;
		}
		.btn-group .ant-btn {
			border: 0;
		}
		.btn-group .ant-btn ~ .ant-btn {
			border-left: 1px solid #d9d9d9;
		}
	}

    .pagetitle{
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #ececec;
        padding-left: 2%;
        .line{
            height: 25px;
            width: 4px;
            background-color: #0069d2;
            float: left;
            border-radius: 15px;
            margin-top: 10px;
        }
        .value{
            line-height: 50px;
            margin-left: 10px;
            font-weight: 550;
            font-size: 14px;
            cursor: pointer;
            margin-right: 30px;
        }
    }
    .block-group {
		.title {
			margin-bottom: 10px;
			line-height:20px;
			font-weight: 500;
			font-size: 16px;
			font-weight: bold;
		}
        .item{
            padding-left: 20px;
        }
	}
    .mb15{
        margin-bottom:15px;
    }
    .left-category{
        border-bottom: 1px solid var(--border-color-split);
        height: 50px;
        line-height: 50px;
        .name{
            font-size: 16px;
            padding-left: 8px;
        }
        .icon{
            width: 100%;
            height: 50px;
            padding-top: 15px;
            font-size: 18px;
            cursor: pointer;
        }
    }
	:deep(.ant-upload-select-picture-card){
		pointer-events: none;
	}
</style>
