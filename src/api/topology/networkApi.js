import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`${url}`, ...arg)

export default {

    // 获取机构树
	networkList(data) {
		return request('/biz/network/page', data, 'get')
  },
}