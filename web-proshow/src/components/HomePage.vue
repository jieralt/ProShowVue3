<template>
  <div class="home">
    <h1>欢迎来到我的个人网站</h1>
    <div class="intro">
      <img src="your-photo.jpg" alt="Your Name" class="profile-photo">
      <p>这里是您的简短介绍。描述您的专业背景、技能和兴趣。</p>
    </div>
    <div class="cta">
      <router-link to="/portfolio" class="btn">查看作品集</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped>
.home {
  text-align: center;
  padding: 20px;
}
.intro {
  margin: 20px 0;
}
.profile-photo {
  width: 200px;
  border-radius: 50%;
}
.cta {
  margin-top: 20px;
}
.btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}
</style>