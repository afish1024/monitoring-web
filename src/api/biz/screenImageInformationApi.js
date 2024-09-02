import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/biz/imageinformation/` + url, ...arg)

/**
 * 图像信息表Api接口管理器
 *
 * @author fish
 * @date  2023/06/27 09:56
 **/
export default {
	// 获取图像信息表分页
	screenImageInformationPage(data) {
		return request('page', data, 'get')
	},
	// 获取图像信息表列表
	screenImageInformationList(data) {
		return request('list', data, 'get')
	},
	// 提交图像信息表表单 edit为true时为编辑，默认为新增
	screenImageInformationSubmitForm(data, edit = false) {
		return request(edit ? 'add' : 'edit', data)
	},
	// 删除图像信息表
	screenImageInformationDelete(data) {
		return request('delete', data)
	},
	// 获取图像信息表详情
	screenImageInformationDetail(data) {
		return request('detail', data, 'get')
	}
}
