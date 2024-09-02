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

 const request = (url, ...arg) => baseRequest(`/biz/${url}`, ...arg)
 
 export default {
    categoryStatement(data) { // 资产分类报表
        return request('category/page', data,'get')
    },
    addedStatement(data) { // 新增资产报表
        return request('asset/base/page', data,'get')
    },
    maintainStatement(data) { // 维修到期报表
        return request('maintenance/page', data,'get')
    },
    scrapStatement(data) { // 清理报废报表
        return request('disposal/page', data,'get')
    },
    logsPage(data) { // 日志
        return request('log/page', data,'get')
    },
    categoryTree(data) { // 资产分类树
        return request('inventory/tree', data,'get')
    },


 }
  