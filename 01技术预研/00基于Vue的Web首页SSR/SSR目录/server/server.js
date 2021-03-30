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
  template: fs.readFileSync(
    resolve('../src/projects/yundeePlatform/index.temp.html'),
    'utf-8'
  ),
  clientManifest: clientManifest,
  // directives: {
  //     example(vnode, directiveMeta) {
  //         // 基于指令绑定元数据(metadata)转换 vnode
  //     },
  // },
})

function renderToString(context) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      const { title, meta } = context.meta && context.meta.inject()
      console.log('meta...', meta)
      console.log('meta.text()...', meta.text())

      html = html
        .replace(/<title.*?<\/title>/g, title.text())
        .replace(/<meta.*?name="description".*?\/>/g, meta.text())

      err ? reject(err) : resolve(html)
    })
  })
}

// 第 3 步：添加一个中间件来处理所有请求
const handleRequest = async (ctx, next) => {
  const url = ctx.request.url
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

// router.get("*", handleRequest);  这样有问题，需要get(":splat*"
router.get(':splat*', handleRequest)

// router.get("/", handleRequest);
router.get('/supplychain', handleRequest)
// router.get("/test", handleRequest);
// router.get("/testId", handleRequest);

module.exports = router
