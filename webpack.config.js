const path=require('path')
const webpack=require('webpack')
const HtmlWebpackPlugin=require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports={
    entry:'./src/index.js',
    devtool: 'source-map',
    output:{
        filename:'[name].js',
        path:path.resolve('dist/assets'),
        publicPath: '/'
    },
    devServer:{
        contentBase:'dist/assets',
        publicPath: '/',
        historyApiFallback: true,
        inline: true
    },
    module:{
      rules:[
        {
            test:/\.js$/,
            exclude:/(node_modules)/,
            use:{
                loader:"babel-loader"
            }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader',],
          },
        {
          test:/\.less$/,
          exclude: /\.module\.less$/,
          use: [
            { loader: "style-loader" },
            { loader: "css-loader" },
            {
              loader: "postcss-loader",//自动加前缀
              options: {
                plugins: [
                  require('autoprefixer')({browsers:['last 5 version']})
                ]
              }
            },
            {  
              loader: "less-loader",
              options: {
                module: true, //开启css模块化
                javascriptEnabled: true
              }, 
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            { loader: "style-loader" },
            { loader: "css-loader", },
            { loader: "sass-loader" },
            { loader: "postcss-loader",
                options: {
                  plugins: [
                    require('autoprefixer')({browsers: ['last 5 version']})
                  ]
                }
            }
          ]
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                  name: "images/[name].[ext]",
                  limit: 1000  //是把小于1000B的文件打成Base64的格式，写入JS
              }
            }
          ]
        },
        {
          test: /\.(woff|svg|eot|woff2|tff)$/,
          use: 'url-loader',
          exclude: /node_modules/
        },
      ]  
    },
    plugins:[
      new HtmlWebpackPlugin({
          template:'./src/index.html',
          hash:true,
      }),
      // new MiniCssExtractPlugin({
      //   filename: 'css/[name].[chunkhash:8].css',
      // }),
    ]
}