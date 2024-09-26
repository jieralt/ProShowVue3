const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');

const app = express();

// 使用 history 模式的中间件
app.use(history());

// 提供静态文件
app.use(express.static(path.join(__dirname, 'dist')));

const port = process.env.PORT || 7777;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// 运行 npm run build:prod 后的输出。
// server.js 文件的完整内容。
// 运行 npm start 后的输出。