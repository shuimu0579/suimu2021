// https: //vue-loader.vuejs.org/guide/#manual-setup    vue-loader 的配置

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
const path = require('path')
console.log(Renderer)
console.log(path)

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              [
                '@babel/plugin-transform-react-jsx',
                {
                  pragma: 'createElement',
                },
              ],
            ],
          },
        },
      }, // .js和.jsx的语法解析
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      }, // .vue 的语法解析
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      }, // css的语法解析
    ],
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html', // 模板文件
      inject: 'body', // js的script注入到body底部
    }),
  ],
  mode: 'development',
  optimization: {
    minimize: false,
  },
}
