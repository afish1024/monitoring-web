import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/biz/inspectionreportdetail/` + url, ...arg)

/**
 * 检测单详情表Api接口管理器
 *
 * @author fish
 * @date  2023/06/22 13:08
 **/
export default {
	// 获取检测单详情表分页
	screenInspectionReportDetailPage(data) {
		return request('page', data, 'get')
	},
	// 获取检测单详情表列表
	screenInspectionReportDetailList(data) {
		return request('list', data, 'get')
	},
	// 提交检测单详情表表单 edit为true时为编辑，默认为新增
	screenInspectionReportDetailSubmitForm(data, edit = false) {
		return request(edit ? 'add' : 'edit', data)
	},
	// 删除检测单详情表
	screenInspectionReportDetailDelete(data) {
		return request('delete', data)
	},
	// 获取检测单详情表详情
	screenInspectionReportDetailDetail(data) {
		return request('detail', data, 'get')
	}
}
