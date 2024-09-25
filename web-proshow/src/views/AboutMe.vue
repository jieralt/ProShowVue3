<template>
  <div class="about">
    <h1>关于我</h1>
    <div class="content">
      <div class="profile">
        <img src="https://via.placeholder.com/200" alt="Your Name" class="profile-img">
        <h2>蒋 杰</h2>
        <p class="title">Web Developer &amp; Designer</p>
      </div>
      <div class="bio">
        <!-- <p>在这里写上您的个人简介。描述您的专业背景、技能和激情。展示您的个性和独特之处。</p> -->
        
        <p>世事一场大梦，人生几度秋凉。</p>
        <h3>技能</h3>
        <ul class="skills-list">
          <li v-for="skill in skills" :key="skill">{{ skill }}</li>
        </ul>
        <h3>教育背景</h3>
        <ul class="education-list">
          <li v-for="edu in education" :key="edu.degree">
            <strong>{{ edu.degree }}</strong> - {{ edu.school }}, {{ edu.year }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutMe',
  data() {
    return {
      skills: ['HTML/CSS', 'JavaScript', 'Vue.js', 'React', 'Node.js', 'Python', 'UI/UX Design'],
      education: [
        { degree: '信息与计算科学科学学士', school: '青岛大学', year: '2016 - 2020' },
        { degree: 'Web开发证书', school: 'YY编程学院', year: '2021' }
      ]
    }
  }
}
</script>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.content {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
}

.profile {
  text-align: center;
}

.profile-img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.title {
  color: #666;
  font-style: italic;
}

.bio {
  flex: 1;
}

.skills-list, .education-list {
  list-style-type: none;
  padding: 0;
}

.skills-list li {
  display: inline-block;
  background-color: #3498db;
  color: white;
  padding: 0.5rem 1rem;
  margin: 0.25rem;
  border-radius: 20px;
}

.education-list li {
  margin-bottom: 0.5rem;
}
</style>