<template>
	<a-form ref="phoneLoginFormRef" :model="phoneFormData" :rules="formRules">
		<a-form-item name="phone">
			<a-input v-model:value="phoneFormData.phone" :placeholder="$t('login.phonePlaceholder')" size="large">
				<template #prefix>
					<mobile-outlined style="color: rgba(0, 0, 0, 0.25)" />
				</template>
			</a-input>
		</a-form-item>
		<a-form-item name="phoneValidCode">
			<a-row :gutter="8">
				<a-col :span="17">
					<a-input
						v-model:value="phoneFormData.phoneValidCode"
						:placeholder="$t('login.smsCodePlaceholder')"
						size="large"
					>
						<template #prefix>
							<mail-outlined style="color: rgba(0, 0, 0, 0.25)" />
						</template>
					</a-input>
				</a-col>
				<a-col :span="7">
					<a-button size="large" style="width: 100%" @click="getPhoneValidCode" :disabled="state.smsSendBtn">{{
						(!state.smsSendBtn && $t('login.getSmsCode')) || state.time + ' s'
					}}</a-button>
				</a-col>
			</a-row>
		</a-form-item>
		<a-form-item>
			<a-button type="primary" style="width: 100%" :loading="islogin" round size="large" @click="submitLogin">{{
				$t('login.signIn')
			}}</a-button>
		</a-form-item>
	</a-form>
	<a-modal
		v-model:visible="visible"
		:width="400"
		:title="$t('login.machineValidation')"
		@cancel="handleCancel"
		@ok="handleOk"
	>
		<a-form ref="phoneLoginFormModalRef" :model="phoneFormModalData" :rules="formModalRules">
			<a-form-item name="validCode">
				<a-row :gutter="8">
					<a-col :span="17">
						<a-input
							v-model:value="phoneFormModalData.validCode"
							:placeholder="$t('login.validLaceholder')"
							size="large"
						>
							<template #prefix>
								<verified-outlined style="color: rgba(0, 0, 0, 0.25)" />
							</template>
						</a-input>
					</a-col>
					<a-col :span="7">
						<img
							:src="validCodeBase64"
							style="border: 1px solid var(--border-color-split); cursor: pointer; width: 100%; height: 40px"
							@click="getPhonePicCaptcha"
						/>
					</a-col>
				</a-row>
			</a-form-item>
		</a-form>
	</a-modal>
</template>

<script setup name="smsLoginForm">
	import { message } from 'ant-design-vue'
	import { nextTick } from 'vue'
	import tool from '@/utils/tool'
	import router from '@/router'
	import { required, rules } from '@/utils/formRules'
	import loginApi from '@/api/auth/loginApi'
	import userCenterApi from '@/api/sys/userCenterApi'
	import dictApi from '@/api/dev/dictApi'
	const phoneLoginFormRef = ref()
	const phoneFormData = ref({})
	const islogin = ref(false)
	let state = ref({
		time: 60,
		smsSendBtn: false
	})
	let formRules = ref({})
	const phoneValidCodeReqNo = ref('')

	// 点击获取短信验证码
	const getPhoneValidCode = () => {
		formRules.value.phone = [required('请输入11位手机号'), rules.phone]
		delete formRules.value.phoneValidCode
		phoneLoginFormRef.value.validate().then(() => {
			// 显示弹框
			visible.value = true
			// 获取内部图片验证码
			getPhonePicCaptcha()
		})
	}
	// 点击登录按钮
	const submitLogin = async () => {
		formRules.value.phone = [required('请输入11位手机号'), rules.phone]
		formRules.value.phoneValidCode = [required('请输入短信验证码'), rules.number]

		const validate = await phoneLoginFormRef.value.validate().catch(() => {})
		if (!validate) return false

		phoneFormData.value.validCode = phoneFormData.value.phoneValidCode
		// delete phoneFormData.value.phoneValidCode
		phoneFormData.value.validCodeReqNo = phoneValidCodeReqNo.value

		islogin.value = true
		const token = await loginApi.loginByPhone(phoneFormData.value).finally(() => {
			islogin.value = false
		})

		tool.data.set('TOKEN', token)
		// 获取登录的用户信息
		const loginUser = await loginApi.getLoginUser()
		tool.data.set('USER_INFO', loginUser)

		// 获取用户的菜单
		const menu = await userCenterApi.userLoginMenu().catch(() => {
			islogin.value = false
			return
		})
		islogin.value = false
		const indexMenu = menu[0].children[0].path
		tool.data.set('MENU', menu)
		// 重置系统默认应用
		tool.data.set('SNOWY_MENU_MODULE_ID', menu[0].id)
		router.replace({
			path: indexMenu
		})
		message.success('登录成功')
		nextTick(() => {
			dictApi.dictTree().then((data) => {
				// 设置字典到store中
				tool.data.set('DICT_TYPE_TREE_DATA', data)
			})
		})
	}

	// 弹框的
	const visible = ref(false)
	const phoneLoginFormModalRef = ref()
	const phoneFormModalData = ref({})
	const validCodeBase64 = ref('')
	const validCodeReqNo = ref('')
	const formModalRules = {
		validCode: [required('请输入图形验证码'), rules.lettersNum]
	}
	const getPhonePicCaptcha = () => {
		loginApi.getPicCaptcha().then((data) => {
			validCodeBase64.value = data.validCodeBase64
			phoneFormModalData.value.validCodeReqNo = data.validCodeReqNo
		})
	}
	const handleCancel = () => {
		visible.value = false
	}
	const handleOk = () => {
		// 获取到里面的验证码，并发送短信
		phoneLoginFormModalRef.value.validate().then(() => {
			visible.value = false
			// 发送短信，首先拿到刚刚输入的手机号
			phoneFormModalData.value.phone = phoneFormData.value.phone
			// 禁用发送按钮，并设置为倒计时
			state.value.smsSendBtn = true
			const interval = window.setInterval(() => {
				if (state.value.time-- <= 0) {
					state.value.time = 60
					state.value.smsSendBtn = false
					window.clearInterval(interval)
				}
			}, 1000)
			const hide = message.loading('验证码发送中..', 0)

			loginApi
				.getPhoneValidCode(phoneFormModalData.value)
				.then((data) => {
					phoneValidCodeReqNo.value = data
					visible.value = false
					setTimeout(hide, 500)
					phoneFormModalData.value.validCode = ''
				})
				.catch(() => {
					setTimeout(hide, 100)
					clearInterval(interval)
					state.value.smsSendBtn = false
				})
		})
	}
</script>

<style scoped></style>
