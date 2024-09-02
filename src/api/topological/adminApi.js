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
 * 拓扑管理
 */
export default {
	/**
	 * 网络拓扑图
	 */
	// 1、组织树接口
	orgTree: (data) => baseRequest('/biz/org/tree', data, 'get'),
	// 2、根据组织查询网络列表全查接口
	networkList: (data) => baseRequest('/biz/network/list', data, 'get'),
	// 3、设备（交换机）链路查询接口
	// 4、根据设备查询端口接口
	portList: (data) => baseRequest('/biz/port/list?deviceId=1', 'get'),
	// 5、命令下发接口
	// 6、根据网络ID查询设备拓扑图
	deviceTree: (data) => baseRequest('/biz/device/tree?deviceId=1', 'get'),
	// 7、添加网络接口
	networkAdd: (data) => baseRequest('/biz/network/add', data,  'post'),
	// 8、删除设备
	deviceDelete: (data) => baseRequest('/biz/device/delete', 'del'),
	// 9、编辑网络接口
	networkEdit: (data) => baseRequest('/biz/network/edit',  data, 'post'),
	/**
	 * 设备概览：设基本信息、状态、告健康度、任务信息、资漂逻辑类型统计
	 */
	// 1、设备详情接口
	deviceDetail: (data) => baseRequest('/biz/device/detail?id=1'),
	// 2、设备健康度
	deviceDetail2: (data) => baseRequest('/biz/device/detail?id=1'),
	// 3、设备任务信息查询
	taskDetail: (data) => baseRequest('/biz/device/task/detail'),
	// 4、查询告警信息
	alarmPage: (data) => baseRequest('/biz/alarm/page?deviceId=1'),
	// 5、查询性能分析
	portPage: (data) => baseRequest('/biz/port/page?deviceId=1'),
	// 6、设备资源逻辑信息
	resourceDetail: (data) => baseRequest('/biz/resource/detail?deviceId=1'),

	/**
	 * 实时告警：单台设备告警列表
	 */
	// 1、告警信息查询接口
	// alarmPage: (data) => baseRequest('/biz/alarm/page?deviceId=1'),
	// 2、告警信息统计
	alarmLevel: (data) => baseRequest('/biz/device/alarm/level?deviceId=1'),
	// 3、告警类型统计
	alarmType: (data) => baseRequest('/biz/device/alarm/type?deviceId=1'),

	/**
	 * 性能分析: 1.网口丢包率 2.网口输入带宽 3.网口输入流量
	 */
	// 1、性能信息查询接口
	portDetail: (data) => baseRequest('/biz/port/detail?id=1'), // （PERFORMANCE_INFORMATION）

	/**
	 * 事件分析: 单台设备件分析
	 */
	// 1、事件分析查询接口
	eventPage: (data) => baseRequest('/biz/event/page'),

	/**
	 * 设备日志: 单台设备操作日志, dev操作日志表
	 */
	// 1、设备操作日志查询接口
	logPage: (data) => baseRequest('/dev/log/page?category=OPERATE_DEVICE'),
	// 2、添加日志
	logAdd: (data) => baseRequest('/dev/log/add')

	/**
	 * 静态信息: 产品基本信息、优势出厂信息
	 */
	// 1、查询设备详情接口（基本信息，出场信息）
	// deviceDetail: (data) => baseRequest('/biz/device/detail?id=1'),
}
