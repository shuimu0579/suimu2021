const multiProjectConfig = require('./scripts/multiProjectConfig/projectPages')
const projectEnter = require('./scripts/multiProjectConfig/projectEnter')
const TerserPlugin = require('terser-webpack-plugin')

const { platformId } = require('./scripts/multiProjectConfig/projectPlatformId')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const nodeExternals = require('webpack-node-externals')
const merge = require('lodash.merge')
const TARGET_NODE = process.env.WEBPACK_TARGET === 'node'
const target = TARGET_NODE ? 'server' : 'client'
const isDev = process.env.NODE_ENV !== 'production'

const defaultConfig = {
  transpileDependencies: ['three', 'three-orbit-controls'],
  publicPath: '/',
  outputDir: `./dist/${projectEnter.name}`,
  // productionSourceMap: true,
  pages: multiProjectConfig.pages,
  configureWebpack: {
    externals: {
      //此处引号中的urlConfig必须和window.urlConfig一致
      cq_config: 'cq_config',
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'], // 移除console
            },
          },
        }),
      ],
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '-',
        name: true,
        cacheGroups: {
          three: {
            name: 'three',
            test: /[\\/]node_modules[\\/]three[\\/]/,
            priority: -10,
          },
          vue: {
            name: 'vue',
            test: /[\\/]node_modules[\\/]vue[\\/]/,
            priority: -10,
          },
          vuex: {
            name: 'vuex',
            test: /[\\/]node_modules[\\/]vuex[\\/]/,
            priority: -10,
          },
          'vue-router': {
            name: 'vue-router',
            test: /[\\/]node_modules[\\/]vue-router[\\/]/,
            priority: -10,
          },
          'element-ui': {
            name: 'element-ui',
            test: /[\\/]node_modules[\\/]element-ui[\\/]/,
            priority: -10,
          },
          vendors: {
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -20,
          },
        },
      },
      runtimeChunk: {
        name: 'manifest',
      },
    },
  },
}
const yundeeSSRConfig = {
  // publicPath: isDev ? 'http://127.0.0.1:8080' : 'http://127.0.0.1:3000',
  publicPath: '/',
  devServer: {
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  css: {
    extract: process.env.NODE_ENV === 'production',
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

module.exports = platformId === 'yundee' ? yundeeSSRConfig : defaultConfig
