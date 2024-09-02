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

/**
 * 列表管理
 */
export default {
	/**
	 * 视图列表树
	 */
	// 1、组织树查询接口
	orgTree: (data) => baseRequest('/biz/org/tree', data, 'get'),
	// 2、设备分类查询接口（创建设备分类数据字典）
	listForLabel: (data) => baseRequest('/dev/dict/listForLabel?dictValue=DEVICE_TYPE', data, 'get'),
	// 3、网络树查询接口
	networkTree: (data) => baseRequest('/biz/network/tree', data, 'get'),

	/**
	 * 网络
	 */
	// 1、网络列表分页查询接口
	networkPage: (data) => baseRequest('/biz/network/page', data, 'get'),
	networkDelete: (data) => baseRequest('/biz/network/delete', data, 'post'),

	/**
	 * 设备
	 */
	// 1、根据设备分类查询设备列表分页查询接口, ?deviceType=switch
	devicePage: (data) => baseRequest('/biz/device/page', data, 'get'),
	deviceDelete: (data) => baseRequest('/biz/device/delete', data, 'post'),

	/**
	 * 链路: 1. 下挂设备 2. 资源（设备信息、温度、CPU、内存等）
	 */
	// 1、链路列表分页查询接口
	linkPage: (data) => baseRequest('/biz/link/page', data, 'get'),
	// 2、根据设备id从链路查询下挂设备接口
	deviceList: (data) => baseRequest('/biz/device/deviceList?deviceId=1', data, 'get'),
	// 3、根据设备查询资源信息接口（包括设备资源信息、温度、CPU、内存）
	deviceDetail: (data) => baseRequest('/biz/device/detail?id=1', data, 'get'),
	linkDelete: (data) => baseRequest('/biz/link/delete', data, 'post'),

	resourcePage: (data) => baseRequest('/biz/resource/page', data, 'get'),

	categoryTree: (data) => baseRequest('/dev/category/tree', data, 'get'),

	submitForm(data, edit = false) {
			return baseRequest(edit ? '/biz/category/add' : '/biz/category/edit', data)
	},

	propertyDelete: (data) => baseRequest('/biz/category/delete', data, 'post'),
	
}
