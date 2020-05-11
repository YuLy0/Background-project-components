const merge=require('webpack-merge');
const path=require('path');
let webpack=require('webpack');
const common=require('./webpack.common.js');
module.exports=merge(common,{
    devtool:'inline-soure-map',
    mode:'development',
    devServer:{
        historyApiFallback: true,
        contentBase:path.resolve(__dirname, '../dist'),
        inline: true,
        open:true,
        compress: true,
        hot:true
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
    ],
})