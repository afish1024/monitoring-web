import { $get, $post } from '../util'

export default [
	$get('/alarmlist', alarmlist),
	// 业务监控
	$get('/business', business)
]

function alarmlist() {
	return {}
}
function business() {
	return {}
}
