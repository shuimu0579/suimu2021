// https: //vue-loader.vuejs.org/guide/#manual-setup    vue-loader 的配置

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './main.js',
    output: {
        filename: 'bundle.js',
    },
    module: {
        rules: [{
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
                        ], // createElement01 与main.js里面 function createElement01(）对应
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