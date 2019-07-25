const path = require('path');
const webpack = require('webpack');
//导入在内存中生成html的插件
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.jsx', '.js']
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        open: true,//自动打开浏览器
        port: 8088,
        contentBase: "src", //指定托管的根目录
        hot: true //热更新
    },
    plugins: [//配置插件的节点
        new webpack.HotModuleReplacementPlugin(),//一个热更新的模块对象,启动热更新的第三步
        new htmlWebpackPlugin({
            //创建一个在内存中生成html页面的插件
            template: path.join(__dirname, 'index.html'),//指定模板页面，将来会根据指定的页面路径，去生成内存中的页面
            filename: 'index.html'//指定在内存中生成的页面的名称
        })
    ],
    module: {//这个节点用于配置所有第三方模块的加载器
        rules: [//匹配规则
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }, //配置处理css文件的第三方loader规则
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, //配置处理less文件的第三方loader规则
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, //配置处理sass文件的第三方loader规则
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: ['url-loader?limit=1000&name=[hash:8]-[name].[ext]'] },
            //处理图片路径的loader规则
            //limit给定的值，是限制图片转为base64编码，限制值单位是byte,如果我们引用的图片，大于或等于给定的limit值，则图片不会被转为
            //base64格式的字符串，如果图片小于给定的值，则会被转为base64的字符串
            { test: /\.(ttf|eot|svg|woff)$/, use: 'url-loader' },//处理字体文件的loader
            //{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },//转换es6语法，include包含要处理的文件夹路径
            { test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ }
        ]
    }
};