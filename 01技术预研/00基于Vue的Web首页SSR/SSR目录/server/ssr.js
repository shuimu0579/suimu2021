const Koa = require('koa')
const koaStatic = require('koa-static')
const koaMount = require('koa-mount')
const compress = require('koa-compress')
const path = require('path')

const resolve = file => path.resolve(__dirname, file)
const app = new Koa()

const isDev = process.env.NODE_ENV !== 'production'
// const isDev = false
const router = isDev ? require('./dev.ssr') : require('./server')

// 开放目录
app.use(koaMount('/dist', koaStatic(resolve('../dist'))))
app.use(koaMount('/public', koaStatic(resolve('../public'))))
// 开启gzip压缩
const options = { threshold: 2048 }
app.use(compress(options))
app.use(router.routes()).use(router.allowedMethods())

const port = process.env.PORT || 3020 // build时候3000被占用 用3020端口试试

app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})

module.exports = app
