import { $get, $post } from '../util'

export default [
	$get('/hostlist', hostlist),
	$get('/hostsms', hostsms),
	$get('/hosts', hosts),
	$get('/hosthistory', hosthistory),
	$get('/hoststatistics', hoststatistics),
	// $get('/hostlist', hostlist),
]

function hostlist() {
	return {}
}
function hostsms() {
	return {}
}
function hosts() {
	return {}
}
function hosthistory() {
	return {}
}
function hoststatistics() {
	return {}
}
function test() {
	return {}
}
