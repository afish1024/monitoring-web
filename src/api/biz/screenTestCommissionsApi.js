import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/biz/testcommissions/` + url, ...arg)

/**
 * 检测委托单表Api接口管理器
 *
 * @author fish
 * @date  2023/06/22 10:40
 **/
export default {
	// 获取检测委托单表分页
	screenTestCommissionsPage(data) {
		return request('page', data, 'get')
	},
	// 获取检测委托单表列表
	screenTestCommissionsList(data) {
		return request('list', data, 'get')
	},
	// 提交检测委托单表表单 edit为true时为编辑，默认为新增
	screenTestCommissionsSubmitForm(data, edit = false) {
		return request(edit ? 'add' : 'edit', data)
	},
	// 删除检测委托单表
	screenTestCommissionsDelete(data) {
		return request('delete', data)
	},
	// 获取检测委托单表详情
	screenTestCommissionsDetail(data) {
		return request('detail', data, 'get')
	}
}
