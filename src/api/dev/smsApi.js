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

const request = (url, ...arg) => baseRequest(`/dev/sms/${url}`, ...arg)
/**
 * 短信
 *
 * @author fish
 * @date 2022-09-22 22:33:20
 */
export default {
	// 获取短信分页
	smsPage(data) {
		return request('page', data, 'get')
	},
	// 发送短信——阿里云
	smsSendAliyun(data) {
		return request('sendAliyun', data)
	},
	// 发送短信——腾讯云
	smsSendTencent(data) {
		return request('sendTencent', data)
	},
	// 删除短信
	smsDelete(data) {
		return request('delete', data)
	},
	// 获取短信详情
	smsDetail(data) {
		return request('detail', data, 'get')
	}
}
