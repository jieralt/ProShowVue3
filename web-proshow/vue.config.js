const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 7777,
    // disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7778',  // 使用 IP 地址而不是 localhost
        // target: 'http://0156.227.235.202:7778',
        changeOrigin: true
      },
      '/static': {
        target: 'http://127.0.0.1:7778',  // 同样更新这里
        // target: 'http://0.0.0.0:7778',  // 同样更新这里        
        // target: 'http://156.227.235.202:7778',  // 同样更新这里
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