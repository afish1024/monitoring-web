<template>
	<a-drawer
		:title="formData.id ? '编辑用户' : '增加用户'"
		:width="620"
		:visible="visible"
		:destroy-on-close="true"
		:body-style="{ paddingBottom: '80px', 'padding-top': '0px' }"
		:footer-style="{ textAlign: 'right' }"
		@close="onClose"
		:maskClosable="false"
	>
		<a-form ref="formRef" :model="formData" :rules="formRules" layout="vertical">
			<a-tabs v-model:activeKey="activeTabsKey">
				<a-tab-pane key="1" tab="基础信息" force-render>
					<a-row :gutter="16">
						<a-col :span="12">
							<a-form-item label="账号：" name="account">
								<a-input v-model:value="formData.account" placeholder="请输入账号" allow-clear />
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="姓名：" name="name">
								<a-input v-model:value="formData.name" placeholder="请输入姓名" allow-clear />
							</a-form-item>
						</a-col>
					</a-row>
					<a-row :gutter="16">
						<a-col :span="12">
							<a-form-item label="手机号：" name="phone">
								<a-input v-model:value="formData.phone" placeholder="请输入手机" allow-clear />
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="密码：" name="password">
								<a-input type="password" v-model:value="formData.password" :placeholder="!formData.id ? '请输入密码' : '不修改密码请留空'"  allow-clear />
							</a-form-item>
						</a-col>
					</a-row>
					<a-row :gutter="16">
						<!-- <a-col :span="12">
							<a-form-item label="选择部门：" name="orgId">
								<a-tree-select
									v-model:value="formData.orgId"
									style="width: 100%"
									:dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
									placeholder="请选择部门"
									allow-clear
									tree-default-expand-all
									:tree-data="treeData"
									:tree-default-expanded-keys="treeDefaultExpandedKeys"
									:field-names="{
										children: 'children',
										label: 'name',
										value: 'id'
									}"
									@change="selePositionData(formData.orgId, 0)"
								></a-tree-select>
							</a-form-item>
							
						</a-col> -->
						
						<a-col :span="12">
							<a-form-item label="邮箱：" name="email">
								<a-input v-model:value="formData.email" placeholder="请输入邮箱" allow-clear />
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="用户状态：" name="userStatus">
								<a-switch
									:loading="loading"
									:checked="formData.userStatus"
									@change="editStatus($event)"
									checked-children="开启" 
                                    un-checked-children="关闭"
								/>
							</a-form-item>
							
						</a-col>
					</a-row>
					<!-- <a-row :gutter="16">
						<a-col :span="12">
							<a-form-item label="出生日期：" name="birthday">
								<a-date-picker v-model:value="formData.birthday" value-format="YYYY-MM-DD" style="width: 100%" />
							</a-form-item>
						</a-col>
					</a-row> -->
					<a-row :gutter="16">
						
						<!-- <a-col :span="8">
							<a-form-item label="选择职位：" name="positionId">
								<a-select
									v-model:value="formData.positionId"
									:options="positionData"
									:field-names="{ label: 'name', value: 'id' }"
									style="width: 100%"
									placeholder="请选择职位"
									allow-clear
								>
								</a-select>
							</a-form-item>
						</a-col> -->
						<!-- <a-col :span="12">
							<a-form-item label="选择角色：" name="positionId">
								<a-select
									v-model:value="formData.positionId"
									:options="roleList"
									:field-names="{ label: 'name', value: 'id' }"
									style="width: 100%"
									placeholder="选择角色"
									allow-clear
								>
								</a-select>
							</a-form-item>
						</a-col> -->
					</a-row>
					<!-- <a-row :gutter="16">
						<a-col :span="8">
							<a-form-item label="员工编号：" name="empNo">
								<a-input v-model:value="formData.empNo" placeholder="请输入员工编号" allow-clear />
							</a-form-item>
						</a-col>
						<a-col :span="8">
							<a-form-item label="职级：" name="positionLevel">
								<a-input v-model:value="formData.positionLevel" placeholder="请输入职级" allow-clear />
							</a-form-item>
						</a-col>
						<a-col :span="8">
							<a-form-item label="入职日期：" name="entryDate">
								<a-date-picker v-model:value="formData.entryDate" value-format="YYYY-MM-DD" style="width: 100%" />
							</a-form-item>
						</a-col>
					</a-row> -->

					<!-- <a-form-item label="任职信息" name="positionJson">
						<a-button type="primary" class="childAddButton" @click="addDomains()">
							<PlusOutlined />
							增加任职
						</a-button>
						<a-row :gutter="10" class="form-row">
							<a-col :span="7" class="form-row-con"> 机构 </a-col>
							<a-col :span="7" class="form-row-con"> 职位 </a-col>
							<a-col :span="7" class="form-row-con"> 主管 </a-col>
							<a-col :span="3" class="form-row-con"> 操作 </a-col>
						</a-row>
						<div v-for="(positionInfo, index) in formData.positionJson" class="form-div">
							<a-row :gutter="10">
								<a-col :span="7">
									<a-form-item
										:name="['positionJson', index, 'orgId']"
										:rules="{ required: true, message: '请选择组织' }"
									>
										<a-tree-select
											v-model:value="positionInfo.orgId"
											show-search
											style="width: 100%"
											:dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
											placeholder="请选择组织"
											allow-clear
											tree-default-expand-all
											:tree-data="treeData"
											:tree-default-expanded-keys="treeDefaultExpandedKeys"
											:field-names="{ children: 'children', label: 'name', value: 'id' }"
											@select="childOrgSelect(positionInfo, 0)"
										></a-tree-select>
									</a-form-item>
								</a-col>
								<a-col :span="7">
									<a-form-item
										:name="['positionJson', index, 'positionId']"
										:rules="{ required: true, message: '请选择职位' }"
									>
										<a-select
											v-model:value="positionInfo.positionId"
											:options="childPosData(positionInfo.orgId)"
											:field-names="{ label: 'name', value: 'id' }"
											style="width: 100%"
											placeholder="请选择职位"
											allow-clear
										>
										</a-select>
									</a-form-item>
								</a-col>
								<a-col :span="7">
									<a-form-item :name="['positionJson', index, 'directorId']">
										<a-select
											v-model:value="positionInfo.directorId"
											:options="childUserData(positionInfo.orgId)"
											:field-names="{ label: 'name', value: 'id' }"
											style="width: 100%"
											placeholder="请选择主管"
											allow-clear
										>
										</a-select>
									</a-form-item>
								</a-col>
								<a-col :span="3" style="margin-top: 4px">
									<a-button size="small" type="primary" danger ghost @click="delDomains(index)">移除</a-button>
								</a-col>
							</a-row>
						</div>
					</a-form-item> -->
				</a-tab-pane>
				<!-- <a-tab-pane key="2" tab="更多信息" force-render>
					<a-row :gutter="16">
						<a-col :span="12">
							<a-form-item label="民族：" name="nation">
								<a-select v-model:value="formData.nation" placeholder="请选择民族" :options="nationOptions"> </a-select>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="籍贯：" name="nativePlace">
								<a-input v-model:value="formData.nativePlace" placeholder="请输入籍贯" allow-clear />
							</a-form-item>
						</a-col>
					</a-row>
					<a-row :gutter="16">
						<a-col :span="12">
							<a-form-item label="家庭住址：" name="homeAddress">
								<a-textarea
									v-model:value="formData.homeAddress"
									placeholder="请输入家庭住址"
									:auto-size="{ minRows: 2, maxRows: 5 }"
									allow-clear
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="通信地址：" name="mailingAddress">
								<a-textarea
									v-model:value="formData.mailingAddress"
									placeholder="请输入通信地址"
									:auto-size="{ minRows: 2, maxRows: 5 }"
									allow-clear
								/>
							</a-form-item>
						</a-col>
					</a-row>
					<a-row :gutter="16">
						<a-col :span="12">
							<a-form-item label="证件类型：" name="idCardType">
								<a-select v-model:value="formData.idCardType" placeholder="请选择证件类型" :options="idcardTypeOptions">
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="证据号码：" name="idCardNumber">
								<a-input v-model:value="formData.idCardNumber" placeholder="请输入通信地址" allow-clear />
							</a-form-item>
						</a-col>
					</a-row>
					<a-row :gutter="16">
						<a-col :span="12">
							<a-form-item label="文化程度：" name="cultureLevel">
								<a-select
									v-model:value="formData.cultureLevel"
									placeholder="请选择文化程度"
									:options="cultureLevelOptions"
								>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="政治面貌：" name="politicalOutlook">
								<a-input v-model:value="formData.politicalOutlook" placeholder="请输入政治面貌" allow-clear />
							</a-form-item>
						</a-col>
					</a-row>
					<a-row :gutter="16">
						<a-col :span="12">
							<a-form-item label="毕业学校：" name="college">
								<a-input v-model:value="formData.college" placeholder="请输入毕业学校" allow-clear />
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="学历：" name="education">
								<a-input v-model:value="formData.education" placeholder="请输入学历" allow-clear />
							</a-form-item>
						</a-col>
					</a-row>

					<a-row :gutter="16">
						<a-col :span="12">
							<a-form-item label="学制：" name="eduLength">
								<a-input v-model:value="formData.eduLength" placeholder="请输入学制" allow-clear />
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="学位：" name="degree">
								<a-input v-model:value="formData.degree" placeholder="请输入学位" allow-clear />
							</a-form-item>
						</a-col>
					</a-row>

					<a-row :gutter="16">
						<a-col :span="12">
							<a-form-item label="家庭电话：" name="homeTel">
								<a-input v-model:value="formData.homeTel" placeholder="请输入家庭电话" allow-clear />
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="办公电话：" name="officeTel">
								<a-input v-model:value="formData.officeTel" placeholder="请输入办公电话" allow-clear />
							</a-form-item>
						</a-col>
					</a-row>

					<a-row :gutter="16">
						<a-col :span="12">
							<a-form-item label="紧急联系人：" name="emergencyContact">
								<a-input v-model:value="formData.emergencyContact" placeholder="请输入紧急联系人" allow-clear />
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="紧急联系电话：" name="emergencyPhone">
								<a-input v-model:value="formData.emergencyPhone" placeholder="请输入紧急联系电话" allow-clear />
							</a-form-item>
						</a-col>
					</a-row>

					<a-row :gutter="16">
						<a-col :span="12">
							<a-form-item label="紧急联系人地址：" name="emergencyAddress">
								<a-textarea
									v-model:value="formData.emergencyAddress"
									placeholder="请输入紧急联系人地址"
									:auto-size="{ minRows: 2, maxRows: 5 }" 
									allow-clear
								/>
							</a-form-item>
						</a-col>
					</a-row>
				</a-tab-pane> -->
			</a-tabs>
		</a-form>
		<template #footer>
			<a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
			<a-button type="primary" :loading="formLoading" @click="onSubmit">保存</a-button>
		</template>
	</a-drawer>
</template>

<script setup>
	import userApi from '@/api/sys/userApi'
	import { required, rules } from '@/utils/formRules'
	import roleApi from '@/api/sys/roleApi'
	// 默认是关闭状态\
	let loading = ref(false)
	let visible = $ref(false)
	const formRef = ref()
	const activeTabsKey = ref('1')
	const { proxy } = getCurrentInstance()
	const emit = defineEmits({ successful: null })
	const formLoading = ref(false)
	const treeData = ref([])
	const treeDefaultExpandedKeys = ref([])
	const roleList = ref([])
	// 主职职位数据
	let positionData = ref([])
	// 主职主管人员数据
	let directorData = ref([])

	// 定义一个装机构跟职位的壳
	let childrenOrgPosArray = ref([])
	// 表单数据
	let formData = ref({})

	const editStatus = (e) => {
		loading.value = true
		if(e === false){
			formData.value.userStatus = false
		}else{
			formData.value.userStatus = true
		}
		setTimeout(()=>{
			loading.value = false
		},800)
		
	}
	// 打开抽屉
	const onOpen = (record) => {
		visible = true
		formData.value = {
			gender: '男',
			positionJson: [],
			userStatus:true,
			password:'',
			phone:'',
			isLogin:1
		}
		if (record) {
			convertFormData(record)
		}
		roleApi.rolePage({maxLimit:1,size:100}).then((res) => {
			roleList.value = res.records
		})
		// 机构选择器数据
		userApi.userOrgTreeSelector().then((res) => {
			if (res !== null) {
				treeData.value = res
				// 默认展开2级
				treeData.value.forEach((item) => {
					// 因为0的顶级
					if (item.parentId === '0') {
						treeDefaultExpandedKeys.value.push(item.id)
						// 取到下级ID
						if (item.children) {
							item.children.forEach((items) => {
								treeDefaultExpandedKeys.value.push(items.id)
							})
						}
					}
				})
			}
		})
	}
	// 关闭抽屉
	const onClose = () => {
		treeData.value = []
		treeDefaultExpandedKeys.value = []
		positionData.value = []
		directorData.value = []
		visible = false
	}
	// 回显数据
	const convertFormData = (record) => {
		const param = {
			id: record.id
		}
		// 查询详情
		userApi.userDetail(param).then((data) => {

			if (data.positionJson) {
				const positionJsonLocal = JSON.parse(data.positionJson).map((item) => {
					childOrgSelect(item)
					return item
				})
				// 替换表单中的格式与后端查到的
				data.positionJson = positionJsonLocal
			}
			formData.value = Object.assign(formData.value, data)
			formData.value.password = ''
			if(formData.value.userStatus == "DISABLED"){
				formData.value.userStatus = false
			}else{
				formData.value.userStatus = true
			}
			selePositionData(formData.value.orgId)
		})
	}
	// 默认要校验的
	let validatePass = async (_rule, value)=>{
		if(!formData.value.id && value == ''){
		
			return Promise.reject('请输入密码');
		}
	}
	let validatePhone = async (_rule, value)=>{
		if(value == ''){
		
			return Promise.reject('请输入手机号码');
		}else{
			let reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/; 
			if (!reg.test(formData.value.phone)) {
					
				return Promise.reject('手机号码格式不正确');
			}
    
		}
	}
	// 默认要校验的
	const formRules = {
		account: [required('请输入账号')],
		name: [required('请输入姓名')],
		password:[{
			required: true,
			validator: validatePass,
			trigger: 'blur',
      	}],
		phone:[{
			required: true,
			validator: validatePhone,
			trigger: 'blur',
		}],
		userStatus:[required('请选择用户状态')],
		//positionId: [required('请选择角色')],
		orgId: [required('请选择部门')],
	}
	// 机构选择后查询对应的职位
	const selePositionData = (orgId, type) => {
		if (orgId) {
			const param = {
				orgId: orgId
			}
			// userApi.userPositionSelector(param).then((res) => {
			// 	positionData.value = res
			// })
			// userApi.userSelector(param).then((res) => {
			// 	console.log(res)
			// 	directorData.value = res
			// })
			// 此类型代表选择的时候重置后面的职位
			if (type === 0) {
				formData.value.positionId = undefined
				formData.value.directorId = undefined
			}
		} else {
			formData.value.positionId = undefined
			formData.value.directorId = undefined
		}
	}
	// 附属职位信息增行
	const addDomains = () => {
		if (formData.value.positionJson === null) {
			formData.value.positionJson = []
		}
		formData.value.positionJson.push({
			orgId: undefined,
			positionId: undefined,
			directorId: undefined
		})
	}
	// 删减行
	const delDomains = (index) => {
		formData.value.positionJson.splice(index, 1)
	}
	// 子表行内选择机构
	const childOrgSelect = async (data, type) => {
		// 说明正在切换机构，我们就将他的后面的设置空
		if (type === 0) {
			formData.value.positionJson.filter((item) => {
				if (item.orgId === data.orgId) {
					item.positionId = undefined
					item.directorId = undefined
				}
			})
		}
		const param = {
			orgId: data.orgId
		}
		// 查询职位
		const posList = await userApi.userPositionSelector(param)
		// 查询人员
		const userList = await userApi.userSelector(param)
		const obj = {
			orgId: data.orgId,
			posList: posList,
			userList: userList
		}
		childrenOrgPosArray.value.push(obj)
	}
	// 获取行内职位数据
	const childPosData = (value) => {
		const resultData = childrenOrgPosArray.value.filter((item) => item.orgId === value)
		if (resultData.length > 0) {
			return resultData[0].posList
		}
	}
	// 获取行内用户数据
	const childUserData = (value) => {
		const resultData = childrenOrgPosArray.value.filter((item) => item.orgId === value)
		if (resultData.length > 0) {
			return resultData[0].userList
		}
	}
	// 验证并提交数据
	const onSubmit = () => {
		formRef.value.validate().then(() => {
			// 因为不切断，我下面转换数据格式，影响上面表单会报错
			formData.value.positionId = 1
			formData.value.orgId = 1
			formData.value.isLogin = 1
			let formDatas = JSON.parse(JSON.stringify(formData.value))
			if (formDatas.positionJson && formDatas.positionJson.length > 0) {
				formDatas.positionJson = JSON.stringify(formDatas.positionJson)
			} else {
				delete formDatas.positionJson
			}
			formLoading.value = true
			
			userApi
				.submitForm(formDatas, !formDatas.id)
				.then(() => {
					onClose()
					emit('successful')
				})
				.finally(() => {
					formLoading.value = false
				})
		})
	}
	// 性别
	const genderOptions = proxy.$TOOL.dictTypeList('GENDER').map((item) => {
		return {
			value: item['dictValue'],
			label: item['name']
		}
	})
	// 民族
	const nationOptions = proxy.$TOOL.dictTypeList('NATION').map((item) => {
		return {
			value: item['dictValue'],
			label: item['name']
		}
	})
	// 身份证件
	const idcardTypeOptions = proxy.$TOOL.dictTypeList('IDCARD_TYPE').map((item) => {
		return {
			value: item['dictValue'],
			label: item['name']
		}
	})
	// 文化程度
	const cultureLevelOptions = proxy.$TOOL.dictTypeList('CULTURE_LEVEL').map((item) => {
		return {
			value: item['dictValue'],
			label: item['name']
		}
	})

	// 调用这个函数将子组件的一些数据和方法暴露出去
	defineExpose({
		onOpen
	})
</script>

<style scoped type="less">
	.childAddButton {
		margin-bottom: 10px;
	}
	.form-row {
		background-color: var(--item-hover-bg);
		margin-left: 0px !important;
	}
	.form-row-con {
		padding-bottom: 5px;
		padding-top: 5px;
		padding-left: 15px;
	}
	.dashedButton {
		margin-top: 10px;
		width: 100%;
	}
	.form-div {
		padding-top: 10px;
	}
</style>
