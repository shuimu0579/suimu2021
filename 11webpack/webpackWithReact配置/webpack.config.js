const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js',
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            [
                                '@babel/plugin-transform-react-jsx',
                                // {
                                //     pragma: 'createElement',
                                // },
                            ],
                        ], // createElement01 与main.js里面 function createElement01(）对应
                    },
                },
            }, // .js和.jsx的语法解析
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }, // css的语法解析
        ],
    },
    plugins: [
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