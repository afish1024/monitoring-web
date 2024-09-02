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

const request = (url, ...arg) => baseRequest(`/biz/asset/${url}`, ...arg)

export default {
   
    totalStatistics(data) {  // 总计数据统计
      return request('homepage/totalStatistics', data,'get')
    },
    categoryStatisticsTop(data) { 
        return request('homepage/categoryStatisticsTop', data,'get')
    },
    brand(data) { 
        return request('homepage/brandStatistics', data,'get')
    },
    member(data) { 
        return request('homepage/membersResponsibleAssetsNumberTop', data,'get')
    },

    inventoryPage(data) { // 资产清单分页
        return request('base/page', data,'get')
    },


    inventoryDelete(data) { // 资产清单删除
        return request('base/delete', data)
    },

    inventoryEdit(data) { // 资产清单编辑
        return request('base/edit', data)
    },

    inventoryAdd(data) { // 资产清单新增
        return request('base/add', data)
    },

    inventoryDetail(data) { // 资产清单详情
        return request('base/detail', data,'get')
    },

 
    logsPage(data) { // 资产模板
        return request('templatefield/page', data,'get')
    },

}
 