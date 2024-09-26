<template>
  <div class="portfolio">
    <h1 class="portfolio-title">我的作品集</h1>
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
        <img :src="project.media" :alt="project.title">
        <div class="project-info">
          <h3>{{ project.title }}</h3>
          <p>{{ project.shortDescription }}</p>
          <div class="tech-tags">
            <span v-for="tech in project.technologies.slice(0, 3)" :key="tech" class="tech-tag">{{ tech }}</span>
          </div>
          <router-link :to="{ name: 'ProjectDetail', params: { id: project.id } }" class="view-project">
            查看项目
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PortfolioMe',
  data() {
    return {
      currentCategory: '全部',
      categories: ['全部'],
      projects: []
    }
  },
  async created() {
    try {
      const response = await axios.get('/api/projects');
      this.projects = response.data;
      this.categories = ['全部', ...new Set(this.projects.map(p => p.category))];
    } catch (error) {
      console.error('Error fetching projects:', error);
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

.portfolio-title {
  font-size: 2.5em;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
}

.filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.filters button {
  background-color: #f0f0f0;
  border: none;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
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
  transition: transform 0.3s ease;
  background-color: white;
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

.project-info h3 {
  margin-top: 0;
  color: #2c3e50;
}

.tech-tags {
  margin: 0.5rem 0;
}

.tech-tag {
  display: inline-block;
  background-color: #e0f2fe;
  color: #2c3e50;
  padding: 0.2rem 0.5rem;
  margin-right: 0.5rem;
  border-radius: 12px;
  font-size: 0.8em;
}

.view-project {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.view-project:hover {
  background-color: #2980b9;
}
</style>