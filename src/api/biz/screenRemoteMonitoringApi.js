import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/biz/remotemonitoring/` + url, ...arg)

/**
 * 远程监控表Api接口管理器
 *
 * @author fish
 * @date  2023/06/22 13:12
 **/
export default {
	// 获取远程监控表分页
	screenRemoteMonitoringPage(data) {
		return request('page', data, 'get')
	},
	// 获取远程监控表列表
	screenRemoteMonitoringList(data) {
		return request('list', data, 'get')
	},
	// 提交远程监控表表单 edit为true时为编辑，默认为新增
	screenRemoteMonitoringSubmitForm(data, edit = false) {
		return request(edit ? 'add' : 'edit', data)
	},
	// 删除远程监控表
	screenRemoteMonitoringDelete(data) {
		return request('delete', data)
	},
	// 获取远程监控表详情
	screenRemoteMonitoringDetail(data) {
		return request('detail', data, 'get')
	}
}
