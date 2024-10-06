# 0. 一键启动
添加环境变量：
[System.Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\Users\Administrator\AppData\Local\Programs\Python\Python312", [System.EnvironmentVariableTarget]::Machine)
## 后端
cd ..; cd ProShowFlask; python.exe app.py;
python.exe app.py;
## 前端
cd ProShowVue3; cd web-proshow; npm run serve;
npm run serve

# 1. 安装 Node.js 和 npm
# 访问 https://nodejs.org 下载并安装适合您系统的版本

# 验证安装
node --version
npm --version


1. 设置Vue项目

首先,我们需要创建一个新的Vue项目。假设您已经安装了Node.js和npm,请在终端中运行以下命令:
npm install -g @vue/cli

<!-- 临时更改执行策略 -->
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
<!-- b) 永久更改执行策略(小心) -->
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
<!-- 不想更改执行策略，可以尝试直接使用Node.js运行Vue CLI -->

vue create web-proshow
cd web-proshow
npm run serve

2.创建基本结构
在src/components目录下创建以下组件:

注意名字不能为单英文单词
Header.vue
Footer.vue
HomePage.vue
PortfolioPage.vue
ProjectDetail.vue

3. 设置路由

安装Vue Router:
npm install vue-router


20240925
flask 远程接口
npm install axios


