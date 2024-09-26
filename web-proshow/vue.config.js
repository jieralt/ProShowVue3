const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3000,
    // disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',  // 使用 IP 地址而不是 localhost
        changeOrigin: true
      },
      '/static': {
        target: 'http://127.0.0.1:5000',  // 同样更新这里
        changeOrigin: true
      }
    }
  }
})

// module.exports = {
//   transpileDependencies: true,
//   devServer: {
//     port: 3000,
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5000',
//         changeOrigin: true,
//         ws: true,
//       }
//     }
//   }
// }