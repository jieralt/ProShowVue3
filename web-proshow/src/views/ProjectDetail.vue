<template>
  <div class="project-detail" v-if="project">
    <h1>{{ project.title }}</h1>
    <div class="project-content">
      <div class="media-container">
        <img v-if="project.type === 'image'" :src="project.media" :alt="project.title">
        <video v-else-if="project.type === 'video'" controls>
          <source :src="project.media" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="project-info">
        <div class="tech-tags">
          <span v-for="tech in project.technologies" :key="tech" class="tech-tag">{{ tech }}</span>
        </div>
        <div class="project-timeline">
          <p><strong>开始时间:</strong> {{ project.startDate }}</p>
          <p><strong>完成时间:</strong> {{ project.endDate }}</p>
        </div>
        <div class="project-description" v-html="project.fullDescription"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProjectDetail',
  data() {
    return {
      project: null
    }
  },
  async created() {
    try {
      const response = await axios.get(`/api/projects/${this.$route.params.id}`);
      this.project = response.data;
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  }
}
</script>

<style scoped>
.project-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 2.5em;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
}

.project-content {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.media-container {
  flex: 1;
}

.media-container img,
.media-container video {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.project-info {
  flex: 1;
}

.tech-tags {
  margin-bottom: 1rem;
}

.tech-tag {
  display: inline-block;
  background-color: #e0f2fe;
  color: #2c3e50;
  padding: 0.3rem 0.7rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 15px;
  font-size: 0.9em;
}

.project-timeline {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}

.project-description {
  line-height: 1.6;
}

.project-description h1,
.project-description h2,
.project-description h3 {
  color: #2c3e50;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.project-description ul,
.project-description ol {
  padding-left: 1.5rem;
}

.project-description p {
  margin-bottom: 1rem;
}
</style>