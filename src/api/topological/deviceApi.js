/**
 *  Copyright [2022] [https://www.xiaonuo.vip]
 *	Snowy采用APACHE LICENSE 2.0开源协议，您在使用过程中，需要注意以下几点：
 *	1.请不要删除和修改根目录下的LICENSE文件。
 *	2.请不要删除和修改Snowy源码头部的版权声明。
 *	3.本项目代码可免费商业使用，商业使用请保留源码和相关描述文件的项目出处，作者声明等。
 *	4.分发源码时候，请注明软件出处 https://www.xiaonuo.vip
 *	5.不可二次分发开源参与同类竞品，如有想法可联系团队xiaonuobase@qq.com商议合作。
 *	6.若您的项目无法满足以上几点，需要更多功能代码，获取Snowy商业授权许可，请在官网购买授权，地址为 https://www.xiaonuo.vip
 */
import { baseRequest } from '@/utils/request'
const request = (url, ...arg) => baseRequest(`${url}`, ...arg)
/**
 * 设备管理
 */
export default {
	/**
	 * 设备分类树、点击分类展示点击分类的列表信息、支持批量操作
	 */
	// 1、根据分类查询设备列表接口, ?deviceType=switch
	devicePage: (data) => baseRequest('/biz/device/page', data, 'get'),
  deviceDelete: (data) => baseRequest('/biz/device/delete', data, 'post'),

  // 1、设备详情接口
  detail: (data) => baseRequest('/biz/device/detail', data, 'get'),
  // 1、/biz/device/detail?id=1
   // 3、设备任务信息查询
  taskDetail: (data) => baseRequest('/biz/device/task/detail', data, 'get'),

   // 2、设备健康度
  resource: (data) => baseRequest('/biz/device/resource/detail', data, 'get'),


  // 1、告警信息查询接口
  alarm: (data) => baseRequest('/biz/alarm/page', data, 'get'),
   // 1、告警信息查询接口
  alarmLevel: (data) => baseRequest('/biz/device/alarm/level', data, 'get'),
    // 1、告警信息查询接口
  alarmType: (data) => baseRequest('/biz/device/alarm/type', data, 'get'),

  // 1、性能分析
  performance: (data) => baseRequest('/biz/device/port/detail', data, 'get'),

  // 1、/biz/port/detail?id=1  （PERFORMANCE_INFORMATION）
  dict: (data) => baseRequest('/dev/dict/listForLabel?dictValue=ALARM_TYPE ', data, 'get'),

  // 1、日志
  getlog: (data) => baseRequest('/biz/operationlog/page', data, 'get'),

	deviceDelete: (data) => baseRequest('/biz/device/delete', data, 'post'),
	// 提交表单 edit为true时为编辑，默认为新增
	submitForm(data, edit = false) {
		return request(edit ? '/biz/device/add' : '/biz/device/edit', data)
  },
  
  // 1、网口入站丢包数监控
  portPacketLossInbound: (data) => baseRequest('/biz/monitortask/portPacketLossInbound', data, 'get'),
  // 2、网口出站丢包数监控
  portPacketLossOutbound: (data) => baseRequest('/biz/monitortask/portPacketLossOutbound', data, 'get'),
  // 3、网口输入输出带宽
  portSpeedRate: (data) => baseRequest('/biz/monitortask/portSpeedRate', data, 'get'),
  // 4、网口输入流量
  portBitsReceived: (data) => baseRequest('/biz/monitortask/portBitsReceived', data, 'get'),
  // 5、网口输出流量
  portBitsSent: (data) => baseRequest('/biz/monitortask/portBitsSent', data, 'get'),
  // 根据设备查询端口
  portList: (data) => baseRequest('/biz/port/list', data, 'get'),

  deviceList: (data) => baseRequest('/biz/device/list', data, 'get'),

  portDeviceList: (data) => baseRequest('/biz/port/listByDeviceId', data, 'get'),
}

