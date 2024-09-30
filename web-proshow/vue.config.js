const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: process.env.VUE_APP_PORT || 7777,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_URL || 'http://127.0.0.1:7778',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'  // 这行确保 /api 前缀被保留
        }
      },
      '/static': {
        target: process.env.VUE_APP_STATIC_URL || 'http://127.0.0.1:7778',
        changeOrigin: true
      }
    }
  }
})

// 开发环境: npm run serve
// 生产环境服务: npm run serve:prod
// 构建测试环境: npm run build:staging
// 构建生产环境: npm run build:prod
// 这样，您就可以轻松地在不同环境之间切换，而无需手动更改配置文件。如果您需要进一步的帮助或有任何问题，请随时告诉我。




