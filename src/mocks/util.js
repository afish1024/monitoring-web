import { http, HttpResponse } from 'msw'

const baseUrl = 'https://monitoring.itbox.fun' // import.meta.env.VITE_API_BASEURL // 'http://47.94.5.174:9087'
const pythonUrl = 'https://monitoring.itbox.fun' // import.meta.env.VITE_API_PYTHON_BASEURL //  'http://8.136.191.114:9084'

// msw api: https://mswjs.io/docs/api/http
export const $get = (url, markData) => {
	return http.get(baseUrl + url, ({ params, cookies, request }) => {
		// const { id } = params // 获取 /user/:id
		return HttpResponse.json(markData({ params, cookies, request }))
	})
}

export const $post = (url, markData) => {
	return http.post(baseUrl + url, async ({ params, cookies, request }) => {
		// const info = await request.formData()
		// info.get('username')
		return HttpResponse.json(markData({ params, cookies, request }))
	})
}
export const $pyGet = (url, markData) => {
	return http.get(pythonUrl + url, ({ params, cookies, request }) => {
		return HttpResponse.json(markData({ params, cookies, request }))
	})
}
export const $pyPost = (url, markData) => {
	return http.post(pythonUrl + url, ({ params, cookies, request }) => {
		return HttpResponse.json(markData({ params, cookies, request }))
	})
}
