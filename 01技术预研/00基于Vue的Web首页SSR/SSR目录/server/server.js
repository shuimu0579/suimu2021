const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const send = require('koa-send')
const router = new Router()
const LRU = require('lru-cache') //不需要放在package.json里面，但是需要在本地npm install

const microCache = new LRU({
  max: 100, // 最大缓存的数目
  maxAge: 1000 * 10, // 重要提示：条目在 10 秒后过期。
})

const isCacheable = url => {
  // 判断是否需要页面缓存
  if (url && url === '/') {
    return url
  } else {
    return false
  }
}
const resolve = file => path.resolve(__dirname, file)

// 第 2 步：获得一个createBundleRenderer
const { createBundleRenderer } = require('vue-server-renderer')
const bundle = require(resolve('../dist/vue-ssr-server-bundle.json'))
const clientManifest = require(resolve('../dist/vue-ssr-client-manifest.json'))

const renderer = createBundleRenderer(bundle, {
  runInNewContext: false,
  template: fs.readFileSync(resolve('../src/index.temp.html'), 'utf-8'),
  clientManifest: clientManifest,
})

function renderToString(context) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      // console.log(html)
      err ? reject(err) : resolve(html)
    })
  })
}

// 第 3 步：添加一个中间件来处理所有请求
const handleRequest = async (ctx, next) => {
  const url = ctx.path
  const cacheable = isCacheable(url)
  if (url.includes('.')) {
    ctx.res.setHeader('Access-Control-Allow-Origin', '*')
    return await send(ctx, url, { root: path.resolve(__dirname, '../dist') })
  }
  if (cacheable) {
    const hit = microCache.get(url)
    if (hit) {
      return ctx.res.end(hit)
    }
  }
  const context = {
    title: '云镝工业互联网',
    url,
    isWebp: ctx.req.headers.accept.toString().indexOf('image/webp') > -1,
  }
  // 将 context 数据渲染为 HTML
  const html = await renderToString(context)
  microCache.set(url, html) // 设置当前缓存页面的内容
  ctx.body = html
}
router.get(':splat*', handleRequest) // 用':splat*' 替代 ‘*’

module.exports = router
