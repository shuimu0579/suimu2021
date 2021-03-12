const multiProjectConfig = require('./scripts/multiProjectConfig/projectPages')
const projectEnter = require('./scripts/multiProjectConfig/projectEnter')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  transpileDependencies: ['three', 'three-orbit-controls'],
  publicPath: '/',
  outputDir: `./dist/${projectEnter.name}`,
  // productionSourceMap: true,
  pages: multiProjectConfig.pages,
  configureWebpack: config => {
    let externals = {
      //此处引号中的urlConfig必须和window.urlConfig一致
      cq_config: 'cq_config',
    }
    let optimization = {
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
    }
    if (process.env.VUE_APP_MODE === 'production') {
      config.mode = 'production'
      // 为生产环境修改配置...
      if (projectEnter.name === 'yundeePlatform') {
        //
      }
      return {
        // 开发生产共同配置
        externals,
        optimization,
      }
    } else {
      config.mode = 'development'
      return {
        // 开发生产共同配置
        externals,
        optimization,
      }
    }
  },
}
