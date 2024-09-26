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
        <div class="image-carousel">
          <img 
            v-for="(image, index) in project.media" 
            :key="index"
            :src="image" 
            :alt="project.title"
            :class="{ active: index === currentImageIndices[project.id] }"
          >
          <div class="carousel-controls" v-if="project.media.length > 1">
            <button @click="prevImage(project.id)">&lt;</button>
            <button @click="nextImage(project.id)">&gt;</button>
          </div>
        </div>
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
      projects: [],
      currentImageIndices: {}
    }
  },
  async created() {
    try {
      const response = await axios.get('/api/projects');
      this.projects = response.data;
      this.categories = ['全部', ...new Set(this.projects.map(p => p.category))];
      this.projects.forEach(project => {
        this.currentImageIndices[project.id] = 0;
      });
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
  },
  methods: {
    nextImage(projectId) {
      const project = this.projects.find(p => p.id === projectId);
      this.currentImageIndices[projectId] = (this.currentImageIndices[projectId] + 1) % project.media.length;
    },
    prevImage(projectId) {
      const project = this.projects.find(p => p.id === projectId);
      this.currentImageIndices[projectId] = (this.currentImageIndices[projectId] - 1 + project.media.length) % project.media.length;
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

.image-carousel {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.image-carousel img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.image-carousel img.active {
  opacity: 1;
}

.carousel-controls {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.carousel-controls button {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
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