<template>
  <div class="portfolio">
    <h1>我的作品集</h1>
    <div class="filters">
      <button 
        v-for="category in categories" 
        :key="category"
        @click="currentCategory = category"
        :class="{ active: currentCategory === category }"
      >
        {{ category }}
      </button>
    </div>
    <div class="projects">
      <div 
        v-for="project in filteredProjects" 
        :key="project.id" 
        class="project-card"
      >
        <img :src="project.image" :alt="project.title">
        <div class="project-info">
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
          <router-link :to="{ name: 'ProjectDetail', params: { id: project.id } }" class="view-project">
            查看项目
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PortfolioMe',
  data() {
    return {
      currentCategory: '全部',
      categories: ['全部', '网页设计', '应用开发', 'UI/UX设计','数据库'],
      projects: [
        { id: 101, title: '响应式企业网站', category: '数据库', image: 'https://via.placeholder.com/300x200', description: '为某科技公司设计的现代化响应式网站。' },
        { id: 11, title: '响应式企业网站', category: '网页设计', image: 'https://via.placeholder.com/300x200', description: '为某科技公司设计的现代化响应式网站。' },
        { id: 12, title: '电商App', category: '应用开发', image: 'https://via.placeholder.com/300x200', description: '功能齐全的移动电商应用，支持在线支付和实时跟踪。' },
        { id: 13, title: '健康监测仪表板', category: 'UI/UX设计', image: 'https://via.placeholder.com/300x200', description: '直观的用户界面设计，用于展示和分析健康数据。' },
        { id: 14, title: '教育平台', category: '网页设计', image: 'https://via.placeholder.com/300x200', description: '在线学习平台，支持课程管理和学生互动。' },
        { id: 15, title: '社交媒体App', category: '应用开发', image: 'https://via.placeholder.com/300x200', description: '创新的社交媒体应用，专注于短视频分享。' },
        { id: 16, title: '智能家居控制界面', category: 'UI/UX设计', image: 'https://via.placeholder.com/300x200', description: '直观易用的智能家居控制界面设计。' },
        { id: 17, title: '智能家居控制界面', category: 'UI/UX设计', image: 'https://via.placeholder.com/300x200', description: '直观易用的智能家居控制界面设计。' },
      ]
    }
  },
  computed: {
    filteredProjects() {
      if (this.currentCategory === '全部') {
        return this.projects;
      }
      return this.projects.filter(project => project.category === this.currentCategory);
    }
  }
}
</script>

<style scoped>
.portfolio {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.filters {
  margin-bottom: 2rem;
  text-align: center;
}

.filters button {
  background-color: #f0f0f0;
  border: none;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.filters button.active {
  background-color: #3498db;
  color: white;
}

.projects {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.project-card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.project-card:hover {
  transform: translateY(-5px);
}

.project-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.project-info {
  padding: 1rem;
}

.view-project {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.view-project:hover {
  background-color: #2980b9;
}
</style>