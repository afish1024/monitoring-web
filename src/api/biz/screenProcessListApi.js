import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/biz/processlist/` + url, ...arg)

/**
 * 工序清单表Api接口管理器
 *
 * @author fish
 * @date  2023/06/22 13:10
 **/
export default {
	// 获取工序清单表分页
	screenProcessListPage(data) {
		return request('page', data, 'get')
	},
	// 获取工序清单表列表
	screenProcessListList(data) {
		return request('list', data, 'get')
	},
	// 提交工序清单表表单 edit为true时为编辑，默认为新增
	screenProcessListSubmitForm(data, edit = false) {
		return request(edit ? 'add' : 'edit', data)
	},
	// 删除工序清单表
	screenProcessListDelete(data) {
		return request('delete', data)
	},
	// 获取工序清单表详情
	screenProcessListDetail(data) {
		return request('detail', data, 'get')
	}
}
