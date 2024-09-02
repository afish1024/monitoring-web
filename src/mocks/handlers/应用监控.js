import { $get, $post } from '../util'

export default [
	$get('/applist', applist),
	$get('/apilist', apilist),
	$get('/apptree', apptree),
	$get('/smslist', smslist),
	$get('/apptree', apptree),
	$get('/apihistorylist', apihistorylist),
	$get('/statistics', statistics),
	$get('/workorders', workorders),
	$get('/adminhealth', adminhealth),
	$get('/adminresource', adminresource)
]

function applist() {
	return {}
}
function apilist() {
	return {}
}
function apptree() {
	return {}
}
function smslist() {
	return {}
}
function apihistorylist() {
	return {}
}
function statistics() {
	return {}
}
function workorders() {
	return {}
}
function adminhealth() {
	return {}
}
function adminresource() {
	return {}
}
