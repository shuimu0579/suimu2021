const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const nodeExternals = require('webpack-node-externals')
const merge = require('lodash.merge')
const TARGET_NODE = process.env.WEBPACK_TARGET === 'node'
const target = TARGET_NODE ? 'server' : 'client'
const isDev = process.env.NODE_ENV !== 'production'

const yundeeSSRConfig = {
  // publicPath: isDev ? 'http://127.0.0.1:8080' : 'http://127.0.0.1:3000',
  // publicPath: '/',
  publicPath: isDev ? '/' : '/dist', //publicPath为`/dist` 这句相当重要
  devServer: {
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  css: {
    extract: process.env.NODE_ENV === 'production',
    sourceMap: true,
  },
  configureWebpack: () => ({
    // 将 entry 指向应用程序的 server / client 文件
    entry: `./src/entry-${target}.js`,
    // 对 bundle renderer 提供 source map 支持
    devtool: TARGET_NODE ? false : 'source-map',
    // lintOnSave: false,
    target: TARGET_NODE ? 'node' : 'web',
    node: TARGET_NODE ? undefined : false,
    output: {
      libraryTarget: TARGET_NODE ? 'commonjs2' : undefined,
    },
    // https://webpack.js.org/configuration/externals/#function
    // https://github.com/liady/webpack-node-externals
    // 外置化应用程序依赖模块。可以使服务器构建速度更快，
    // 并生成较小的 bundle 文件。
    externals: TARGET_NODE
      ? nodeExternals({
          // 不要外置化 webpack 需要处理的依赖模块。
          // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
          // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
          allowlist: [/\.css$/],
        })
      : undefined,

    optimization: {
      splitChunks: TARGET_NODE ? false : undefined,
    },
    plugins: [
      TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin(),
    ],
  }),
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        return merge(options, {
          optimizeSSR: false,
        })
      })
    config.module
      .rule('images')
      .use('url-loader')
      .tap(options => {
        options = {
          limit: 1024,
          fallback: 'file-loader?name=img/[path][name].[ext]',
        }
        return options
      })
    // config.module
    //   .rule(/\.(woff|woff2|eot|ttf|otf)$/)
    //   .use('url-loader')
    //   .tap(options => {
    //     options = {
    //       name: '[name].[ext]',
    //       outputPath: './font'
    //     }
    //     return options
    //   })
    // 热更新
    if (TARGET_NODE) {
      config.plugins.delete('hmr')
    }
  },
}

module.exports = yundeeSSRConfig
