module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : './',
    outputDir: 'dist',
    // lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
    lintOnSave: true,
    // productionSourceMap：{ type:Bollean,default:true } 生产源映射
    // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
    productionSourceMap: false,
    devServer: {
        port: 8090, // 端口号
        host: 'localhost',
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    },
    css: {
        // 是否使用css分离插件
        extract: true,
        // 开启 CSS source maps，一般不建议开启
        sourceMap: false,
        loaderOptions: {
            css: {},
            postcss: {
                plugins: [
                    require('postcss-px2rem')({
                        remUnit: 37.5
                    })
                ]
            }
        }
    }
}