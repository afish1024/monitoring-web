import { $get, $post } from '../util'

export default [
	// ?current=1&bindingStatus=unbound, bindingStatus=bound
	$get('/biz/ip/page', ipPage),
	$get('/biz/whiteblack/page', whiteblackPage),
	$get('/biz/network/tree', networkTree),
	// ?startIp=1.1.1.1&endIp=2.2.2.2&scanning=false
	$get('/biz/ip/device/list', deviceList),
	$get('/biz/ip/usagerate', ipUsagerate),
	$get('/biz/org/tree', orgTree),
	$get('/biz/smstemplate/page', smstemplate)
]

function ipPage() {
	return {
		code: 200,
		msg: '操作成功',
		data: {
			records: [
				{
					deleteFlag: 'NOT_DELETE',
					createTime: '2023-12-01 15:49:52',
					createUser: null,
					updateTime: '2023-12-15 14:56:47',
					updateUser: '1543837863788879871',
					id: '1',
					ipName: 'IP1',
					ipAddress: '1.1.1.1',
					macAddress: '01-80-C2-00-00-00',
					detectProperties: null,
					forwardingType: null,
					ipStatus: 'used',
					deviceId: '1',
					bindingStatus: 'bound',
					extJson: null,
					scanning: 'false'
				},
				{
					deleteFlag: 'NOT_DELETE',
					createTime: '2023-12-29 15:49:57',
					createUser: null,
					updateTime: null,
					updateUser: null,
					id: '2',
					ipName: 'IP2',
					ipAddress: '2.2.2.2',
					macAddress: '01-80-C2-FF-FF-FF',
					detectProperties: null,
					forwardingType: null,
					ipStatus: 'unused',
					deviceId: '2',
					bindingStatus: null,
					extJson: null,
					scanning: 'false'
				}
			],
			total: 2,
			size: 20,
			current: 1,
			orders: [],
			optimizeCountSql: true,
			searchCount: true,
			maxLimit: null,
			countId: null,
			pages: 1
		}
	}
}
function whiteblackPage() {
	return {
		code: 200,
		msg: '操作成功',
		data: {
			records: [
				{
					deleteFlag: 'NOT_DELETE',
					createTime: '2023-12-15 13:59:48',
					createUser: '1543837863788879871',
					updateTime: null,
					updateUser: null,
					id: '1735540134956613633',
					iteam: '3.3.3.3',
					iteamType: 'ip',
					listType: 'white',
					extJson: null
				}
			],
			total: 1,
			size: 20,
			current: 1,
			orders: [],
			optimizeCountSql: true,
			searchCount: true,
			maxLimit: null,
			countId: null,
			pages: 1
		}
	}
}
function networkTree() {
	return {
		code: 200,
		msg: '操作成功',
		data: [
			{
				id: '1',
				parentId: '0',
				weight: 0,
				name: '全网络',
				networkName: '全网络',
				networkDescribe: '全网络',
				networkStatus: 'normal',
				networkType: '',
				sysOrgId: '1',
				deleteFlag: 'NOT_DELETE',
				children: [
					{
						id: '2',
						parentId: '1',
						weight: 0,
						name: '网络2',
						networkName: '网络2',
						networkDescribe: '网络2',
						networkStatus: 'normal',
						networkType: '',
						sysOrgId: '1',
						deviceList: [
							{
								id: '1',
								deviceName: '交换机1',
								deviceDescribe: '{"product_advantages":"产品优势","factory_information":"出厂信息"}',
								deviceStatus: 'normal',
								deviceType: 'switch',
								displayIcon: '',
								ipAddress: '10.10.10.10',
								networkId: '2',
								taskInformation:
									'{"pause_count": 1, "pause_ratio": 0.5, "total_count": 3, "normal_count": 3, "normal_ratio": 0.5, "abnormal_count": 1, "abnormal_ratio": 0.5}',
								resourceLogicInformation:
									'{"api_count": 10, "api_usage": 10, "cpu_count": 10, "cpu_usage": 10, "memory_count": 10, "memory_usage": 10}',
								deleteFlag: 'NOT_DELETE',
								createTime: '2023-12-14 22:01:05',
								updateTime: '2023-12-14 22:01:20'
							},
							{
								id: '2',
								deviceName: '交换机2',
								deviceDescribe: '{"product_advantages":"产品优势","factory_information":"出厂信息"}',
								deviceStatus: 'normal',
								deviceType: 'server',
								ipAddress: '20.20.20.20',
								networkId: '2',
								taskInformation:
									'{"pause_count": 1, "pause_ratio": 0.5, "total_count": 3, "normal_count": 3, "normal_ratio": 0.5, "abnormal_count": 1, "abnormal_ratio": 0.5}',
								resourceLogicInformation:
									'{"api_count": 20, "api_usage": 20, "cpu_count": 20, "cpu_usage": 20, "memory_count": 20, "memory_usage": 20}',
								deleteFlag: 'NOT_DELETE',
								createTime: '2023-12-14 22:01:05',
								updateTime: '2023-12-14 22:01:20'
							},
							{
								id: '3',
								deviceName: '交换机3',
								deviceDescribe: '{"product_advantages":"产品优势","factory_information":"出厂信息"}',
								deviceStatus: 'normal',
								deviceType: 'switch',
								ipAddress: '30.30.30.30',
								networkId: '2',
								taskInformation:
									'{"pause_count": 1, "pause_ratio": 0.5, "total_count": 3, "normal_count": 3, "normal_ratio": 0.5, "abnormal_count": 1, "abnormal_ratio": 0.5}',
								resourceLogicInformation:
									'{"api_count": 30, "api_usage": 30, "cpu_count": 30, "cpu_usage": 30, "memory_count": 30, "memory_usage": 30}',
								deleteFlag: 'NOT_DELETE',
								createTime: '2023-12-14 22:01:05',
								updateTime: '2023-12-14 22:01:20'
							},
							{
								id: '4',
								deviceName: '交换机4',
								deviceDescribe: '{"product_advantages":"产品优势","factory_information":"出厂信息"}',
								deviceStatus: 'normal',
								deviceType: 'switch',
								ipAddress: '40.40.40.40',
								networkId: '2',
								taskInformation:
									'{"pause_count": 1, "pause_ratio": 0.5, "total_count": 3, "normal_count": 3, "normal_ratio": 0.5, "abnormal_count": 1, "abnormal_ratio": 0.5}',
								resourceLogicInformation:
									'{"api_count": 40, "api_usage": 40, "cpu_count": 40, "cpu_usage": 40, "memory_count": 40, "memory_usage": 40}',
								deleteFlag: 'NOT_DELETE',
								createTime: '2023-12-14 22:01:05',
								updateTime: '2023-12-14 22:01:20'
							},
							{
								id: '5',
								deviceName: '交换机5',
								deviceDescribe: '{"product_advantages":"产品优势","factory_information":"出厂信息"}',
								deviceStatus: 'normal',
								deviceType: 'switch',
								ipAddress: '50.50.50.50',
								networkId: '2',
								taskInformation:
									'{"pause_count": 1, "pause_ratio": 0.5, "total_count": 3, "normal_count": 3, "normal_ratio": 0.5, "abnormal_count": 1, "abnormal_ratio": 0.5}',
								resourceLogicInformation:
									'{"api_count": 50, "api_usage": 50, "cpu_count": 50, "cpu_usage": 50, "memory_count": 50, "memory_usage": 50}',
								deleteFlag: 'NOT_DELETE',
								createTime: '2023-12-14 22:01:05',
								updateTime: '2023-12-14 22:01:20'
							},
							{
								id: '6',
								deviceName: '交换机6',
								deviceDescribe: '{"product_advantages":"产品优势","factory_information":"出厂信息"}',
								deviceStatus: 'normal',
								deviceType: 'switch',
								ipAddress: '60.60.60.60',
								networkId: '2',
								taskInformation:
									'{"pause_count": 1, "pause_ratio": 0.5, "total_count": 3, "normal_count": 3, "normal_ratio": 0.5, "abnormal_count": 1, "abnormal_ratio": 0.5}',
								resourceLogicInformation:
									'{"api_count": 60, "api_usage": 60, "cpu_count": 60, "cpu_usage": 60, "memory_count": 60, "memory_usage": 60}',
								deleteFlag: 'NOT_DELETE',
								createTime: '2023-12-14 22:01:05',
								updateTime: '2023-12-14 22:01:20'
							}
						],
						deleteFlag: 'NOT_DELETE'
					},
					{
						id: '3',
						parentId: '1',
						weight: 0,
						name: '网络3',
						networkName: '网络3',
						networkDescribe: '网络3',
						networkStatus: 'normal',
						networkType: '',
						sysOrgId: '1',
						deleteFlag: 'NOT_DELETE'
					},
					{
						id: '4',
						parentId: '1',
						weight: 0,
						name: '网络4',
						networkName: '网络4',
						networkDescribe: '网络4',
						networkStatus: 'normal',
						networkType: '',
						sysOrgId: '1',
						deleteFlag: 'NOT_DELETE'
					},
					{
						id: '5',
						parentId: '1',
						weight: 0,
						name: '网络5',
						networkName: '网络5',
						networkDescribe: '网络5',
						networkStatus: 'normal',
						networkType: '',
						sysOrgId: '1',
						deleteFlag: 'NOT_DELETE'
					},
					{
						id: '6',
						parentId: '1',
						weight: 0,
						name: '网络6',
						networkName: '网络6',
						networkDescribe: '网络6',
						networkStatus: 'normal',
						networkType: '',
						sysOrgId: '1',
						deleteFlag: 'NOT_DELETE'
					}
				]
			}
		]
	}
}
function deviceList() {
	return { code: 200, msg: '操作成功', data: [] }
}
function ipUsagerate() {
	return { code: 500, msg: '服务器异常', data: null }
}
function orgTree() {
	return {}
}
function smstemplate() {
	return {
		"code": 200,
		"msg": "操作成功",
		"data": {
			"records": [],
			"total": 0,
			"size": 20,
			"current": 1,
			"orders": [],
			"optimizeCountSql": true,
			"searchCount": true,
			"maxLimit": null,
			"countId": null,
			"pages": 0
		}
	}
}
