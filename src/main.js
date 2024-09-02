import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import './style/index.less'
import snowy from './snowy'
import i18n from './locales'
import router from './router'
import store from './store'
import App from './App.vue'
import DataV from '@kjgl77/datav-vue3';
import bus from '@/utils/bus.js'

import { worker } from './mocks'

worker.start({
	// 	// 对于没有 mock 的接口直接通过，避免异常
	onUnhandledRequest: 'bypass'
})

const app = createApp(App)
app.use(store)
app.use(router)
app.use(Antd)
app.use(i18n)
app.use(snowy)
app.use(DataV)
app.config.globalProperties.$bus = bus
// 挂载app
app.mount('#app')
