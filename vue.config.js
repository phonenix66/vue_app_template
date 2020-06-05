const path = require('path');
const defaultSettings = require('./src/config/index');
const name = defaultSettings.title;
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : './',
    outputDir: 'dist',
    assetsDir: 'static',
    // lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
    lintOnSave: !IS_PROD,
    // productionSourceMap：{ type:Bollean,default:true } 生产源映射
    // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
    productionSourceMap: false,
    devServer: {
        port: 9020, // 端口号
        host: 'localhost',
        https: false, // https:{type:Boolean}
        open: true, // 配置自动启动浏览器
        overlay: {
            warnings: false,
            errors: true
        }
        // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    },
    css: {
        extract: IS_PROD,
        sourceMap: false
        /*  // 是否使用css分离插件
         extract: true,
         // 开启 CSS source maps，一般不建议开启
         sourceMap: false,
         loaderOptions: {
             css: {},
             less: {
                 test: /\.less$/,
                 loader: 'less-loader', // compiles Less to CSS
                 options: {
                     lessOptions: {
                         strictMath: true,
                     },
                 }
             },
             postcss: {
                 plugins: [
                     require('postcss-px2rem')({
                         remUnit: 37.5
                     })
                 ]
             }
         } */
    },
    configureWebpack: config => {
        config.name = name;
        if (process.env.NODE_ENV === 'production') {
            config.mode = 'production';
            const optimization = {
                runtimeChunk: 'single',
                splitChunks: {
                    chunks: 'all',
                    maxInitialRequests: Infinity,
                    minSize: 20000, // 依赖包超过20000bit将被单独打包
                    cacheGroups: {
                        node_vendors: {
                            test: /[\\/]node_modules[\\/]/,
                            chunks: 'initial',
                            priority: 10,
                            name(module) {
                                // get the name. E.g. node_modules/packageName/not/this/part.js
                                // or node_modules/packageName
                                const packageName = module.context.match(
                                    /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                                )[1];
                                // npm package names are URL-safe, but some servers don't like @ symbols
                                return `npm.${packageName.replace('@', '')}`;
                            }
                        },
                        commons: {
                            name: 'chunk-commons',
                            test: path.resolve(__dirname, 'src/components'),
                            minChunks: 3,
                            priority: 5,
                            reuseExistingChunk: true
                        },
                        vantUI: {
                            name: 'chunk-vantUI',
                            priority: 20, // 数字大权重到，满足多个 cacheGroups 的条件时候分到权重高的
                            test: /[\\/]node_modules[\\/]_?vant(.*)/
                        }
                    }
                }

            };
            Object.assign(config, { optimization });
        } else {
            // 开发环境配置
            config.mode = 'development';
            const optimization2 = {
                runtimeChunk: 'single',
                splitChunks: {
                    chunks: 'all',
                    maxInitialRequests: Infinity,
                    minSize: 20000, // 依赖包超过20000bit将被单独打包
                    cacheGroups: {
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            name(module) {
                                // get the name. E.g. node_modules/packageName/not/this/part.js
                                // or node_modules/packageName
                                const packageName = module.context.match(
                                    /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                                )[1];
                                // npm package names are URL-safe, but some servers don't like @ symbols
                                return `npm.${packageName.replace('@', '')}`;
                            }
                        }
                    }
                }
            };
            Object.assign(config, {
                optimization: optimization2
            });
        }

        Object.assign(config, {
            resolve: {
                extensions: ['.js', '.vue', '.json'], // 文件优先解析后缀名顺序
                alias: {
                    '@': path.resolve(__dirname, 'src'),
                    '@components': path.resolve(__dirname, 'src/components'),
                    '@views': path.resolve(__dirname, 'src/views'),
                    '@utils': path.resolve(__dirname, 'src/utils'),
                    '@service': path.resolve(__dirname, 'src/service')
                }, // 别名配置
                plugins: []
            }
        });
    }
};
