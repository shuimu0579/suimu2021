const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const send = require('koa-send')
const router = new Router()
const LRU = require('lru-cache')

const microCache = new LRU({
  max: 100, // 最大缓存的数目
  maxAge: 1000 * 10, // 重要提示：条目在 10 秒后过期。
})

const isCacheable = url => {
  const urlListBySSR = [
    '/',
    '/contact',
    '/erpConnect',
    '/erpDoctor',
    '/supplychain',
    '/iotmanufacture',
    '/5gandai',
    '/bibigdata',
    '/consult',
  ]
  let isSSR = urlListBySSR.some(item => item === url)
  // 判断是否需要页面缓存
  return isSSR
}
const resolve = file => path.resolve(__dirname, file)

// 第 2 步：获得一个createBundleRenderer
const { createBundleRenderer } = require('vue-server-renderer')
const bundle = require(resolve('../dist/vue-ssr-server-bundle.json'))
const clientManifest = require(resolve('../dist/vue-ssr-client-manifest.json'))
const template = fs.readFileSync(resolve('../src/index.temp.html'), 'utf-8')
const template01 = fs.readFileSync(resolve('../dist/index.html'), 'utf-8')
const renderer = createBundleRenderer(bundle, {
  runInNewContext: false,
  template,
  clientManifest: clientManifest,
})

function renderToString(context) {
  return new Promise((resolve, reject) => {
    // 页面是走服务端还是客户端，通过context.isSSR在这里进行分发
    if (context.isSSR) {
      renderer.renderToString(context, (err, html) => {
        const { title, meta } = context.meta && context.meta.inject()
        console.log('html...', html)
        console.log('title...', title)
        console.log('meta...', meta)
        console.log('meta.text()...', meta.text())

        html = html
          .replace(/<title.*?<\/title>/g, title.text())
          .replace(/<meta.*?name="description".*?\/>/g, meta.text())

        err ? reject(err) : resolve(html)
      })
    } else {
      resolve(template01)
    }
  })
}

// 第 3 步：添加一个中间件来处理所有请求
const handleRequest = async (ctx, next) => {
  const url = ctx.request.url

  // 哪些页面是需要SSR的，在这里配置
  const urlListBySSR = [
    '/',
    '/contact',
    '/erpConnect',
    '/erpDoctor',
    '/supplychain',
    '/iotmanufacture',
    '/5gandai',
    '/bibigdata',
    '/consult',
  ]
  let isSSR = urlListBySSR.some(item => item === url)

  if (isSSR) {
    const cacheable = isCacheable(url)
    if (url.includes('.')) {
      ctx.res.setHeader('Access-Control-Allow-Origin', '*')
      return await send(ctx, url, { root: path.resolve(__dirname, '../dist') })
    }
    if (cacheable) {
      const hit = microCache.get(url)
      if (hit) {
        ctx.body = hit
        return false
        // return ctx.res.end(hit)
      }
    }
  }
  const context = {
    title: '云镝工业互联网',
    url,
    isSSR,
    isWebp: ctx.req.headers.accept.toString().indexOf('image/webp') > -1,
  }
  // 将 context 数据渲染为 HTML
  const html = await renderToString(context)
  isSSR && microCache.set(url, html) // 设置当前缓存页面的内容
  ctx.body = html
}

// 让所以的路径都进来handleRequest
router.get('/(.*)', handleRequest)
// router.get("*", handleRequest);  这样有问题，需要get(":splat*"
// router.get(":splat*", handleRequest);

// // router.get("/", handleRequest);
// router.get("/erpConnect", handleRequest);
// router.get("/erpDoctor", handleRequest);

// router.get("/supplychain", handleRequest);
// router.get("/iotmanufacture", handleRequest);
// router.get("/5gandai", handleRequest);
// router.get("/bibigdata", handleRequest);
// router.get("/consult", handleRequest);

module.exports = router
