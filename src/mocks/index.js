/**
 * msw 使用
 * 1. 安装
 * 2. npx msw init public/ 在 public 文件夹中生成一个 Service Worker 脚本：mockServiceWorker.js
 * 3. npm start 正常使用
 */
// 1. import the library
// import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'

console.log('=== index ===')
// 使用示例
// import { handlers } from './handlers'
import sys from './handlers/sys'
import biz from './handlers/biz'
import dev from './handlers/dev'

// 2. Describe network behavior with request handlers.
export const worker = setupWorker(...sys, ...biz, ...dev)

console.log('====== mock')

// 3. Start request interception by starting the Service Worker.
// worker.start({
// 	// 	// 对于没有 mock 的接口直接通过，避免异常
// 	onUnhandledRequest: 'bypass'
// })

// Network 的 Response Headers 的 x-powered-by: msw
