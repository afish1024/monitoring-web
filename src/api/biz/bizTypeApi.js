import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`${url}`, ...arg)
/**
 * 机构
 *
 * @author fish
 * @date 2022-09-22 22:33:20
 */
export default {
	// 添加系统接入
	submitForm(data, edit = false) {
		return request(edit ? '/biz/type/add' : '/biz/type/edit', data)
	},
	// 监控系统
    monitorSubmitForm(data, edit = false) {
		return request(edit ? '/biz/api/add' : '/biz/api/edit', data)
	},

    delMonitor(data){
        return request('/biz/api/delete', data,'post')
    },
    delApi(data){
        return request('/biz/type/delete', data,'post')
    },
    smsList(){
        return request('/biz/smstemplate/list', data,'get')
    },
    setMonitor(data){
        return request('/biz/userapptype/addUser', data,'post')
    },
    setMonitorInfo(data){
        return request('/biz/userapptype/detail', data,'get')
    },
    sendSms(data){
        return request('/biz/userapptype/userAlarmList', data,'get')
    }
}