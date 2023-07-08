const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  publicPath:"./",
  // devServer: {
  //   proxy: {
  //       '/api': {
  //         // 192.168.137.111
  //         // 172.20.10.10
  //         // 10.4.70.72
  //           target:process.env.VUE_APP_API_URL, //接口域名
  //           changeOrigin: true,             //是否跨域
  //           ws: true,                       //是否代理 websockets
  //           secure: true,                   //是否https接口
  //           pathRewrite: {                  //路径重置
  //               '^/api': ''
  //           }
  //       },
  //       '/socket.io':{
  //         target:process.env.VUE_APP_API_URL, //接口域名
  //         changeOrigin: true,             //是否跨域
  //         ws: true,                       //是否代理 websockets
  //         secure: true,                   //是否https接口
  //         pathRewrite: {                  //路径重置
  //             '^/soc': ''
  //         }
  //       }
  //   }
  // }
})
