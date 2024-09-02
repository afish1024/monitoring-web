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
 * ip 管理
 */
export default {
	/**
	 * 全网mac-ip: macip列表
	 */
	// 1、IP列表分页查询，搜索
	ipPage: (data) => baseRequest('/biz/ip/page', data, 'get'),
	ipDelete: (data) => baseRequest('/biz/ip/delete', data, 'post'),
	ipEdit: (data) => baseRequest('/biz/ip/edit', data, 'post'),

	/**
	 * 黑白名单配置: 配策略、配置列表、安全策略
	 */
	// 1、设置黑白名单配置接口
	whiteblackAdd: (data) => baseRequest('/biz/whiteblack/add', data, 'post'),
	// 2、黑白名单列表查询
	whiteblackPage: (data) => baseRequest('/biz/whiteblack/page', data, 'get'),
	whiteblackDelete: (data) => baseRequest('/biz/whiteblack/delete', data, 'post'),

	/**
	 * mac-ip绑定	配策略、配置列表、绑定策略表
	 */
	// 1、设置IP-MAC绑定接口
	ipEditBind: (data) => baseRequest('/biz/ip/editBind', data, 'post'),
	// 2、设置是否启用MAC-IP策略
	strategyConfig: (data) => baseRequest('/biz/strategy/config', data, 'post'),
	// 3、设置配置策略监视周期	MAC-IP绑定表
	// strategyConfig: (data) => baseRequest('/biz/strategy/config', data, 'get'),
	strategyPage: (data) => baseRequest('/biz/strategy/page', data, 'get'),
	strategyDelete: (data) => baseRequest('/biz/strategy/delete', data, 'post'),
	// strategyAdd: (data) => baseRequest('/biz/strategy/add', data, 'post'),

	/**
	 * ip使用情况	查询IP段或者ip显示每一个的IP信息
	 */
	// 1、根据IP网段查询所有的设备, ?startIp=1.1.1.1&endIp=2.2.2.2&scanning=false
	deviceList: (data) => baseRequest('/biz/ip/device/list', data, 'get'),
	// 2、查询IP使用率
	ipUsagerate: (data) => baseRequest('/biz/ip/usagerate', data, 'get'),

	/**
	 * 配置策略: 配置@mac-ip策略，监视周期设置
	 */
	// 1、添加配置策略	在mac-ip绑定页面操作
	strategyAdd: (data) => baseRequest('/biz/strategy/add', data, 'get')
}
