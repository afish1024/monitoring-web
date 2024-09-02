import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`${url}`, ...arg)
/**
 * 拓扑图
 *
 * 
 * @date 2022-09-22 22:33:20
 */
export default {
	// 获取机构树
	viewTree(data) {
		return request('/biz/network/tree', data, 'get')
  },
  
  	// 获取拓扑图
  topology(data) {
		return request('/biz/network/topology', data, 'get')
  },
  
  // 编辑
  topologyedit(data) {
    return request('/biz/device/batchEdit', data, 'post')
  },

  // 编辑
  topologynetwork(data) {
    return request('/biz/network/batchEdit', data, 'post')
  },
      
  deviceTree(data) {
		return request('/biz/device/tree', data, 'get')
	},
	deviceTreeList(data) {
		return request('/dev/dict/listForLabel', data, 'get')
  },
  
  // 删除
  delLink(data) {
    return request('/biz/link/delete', data, 'post')
  },

  // 删除
  editLink(data) {
    return request('/biz/link/edit', data, 'post')
  },

   // 删除
  getport(data) {
    return request('/biz/port/list', data, 'get')
  },

  getportdetail(data) {
    return request('/biz/port/detail', data, 'get')
  },
  getportAlarm(data) {
    return request('/biz/alarm/listForPort', data, 'get')
  },

  portPacketLossInbound(data) {
    return request('/biz/monitortask/portPacketLossInbound', data, 'get')
  },

  portBitsReceived(data) {
    return request('/biz/monitortask/portBitsReceived', data, 'get')
  },

  portBitsSent(data) {
    return request('/biz/monitortask/portBitsSent', data, 'get')
  },

  commandIp(data) {
    return request('/biz/securityrightclick/command', data, 'post')
  },

  commandList(data) {
    return request('/biz/securityrightclick/list?deviceType=switch', data, 'get')
  },

  getPortLevel(data) {
    return request('/biz/port/listByDeviceIdForDisplay', data, 'get')
  },
  editLink(data) {
    return request('/biz/link/edit', data, 'post')
  },

  addLink(data) {
    return request('/biz/link/add', data, 'post')
  },
  networkData(data){
    return request('/biz/network/list', data, 'get')
  }
}
