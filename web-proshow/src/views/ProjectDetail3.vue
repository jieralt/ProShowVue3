<template>
  <div class="project-detail" v-if="project">
    <h1>{{ project.title }}</h1>
    <div class="project-content">
      <div class="media-container">
        <div v-if="project.type === 'image'" class="image-carousel">
          <img 
            v-for="(image, index) in project.media" 
            :key="index"
            :src="image" 
            :alt="`${project.title} - Image ${index + 1}`"
            :class="{ active: index === currentImageIndex }"
          >
          <div class="carousel-controls" v-if="project.media.length > 1">
            <button @click="prevImage">&lt;</button>
            <button @click="nextImage">&gt;</button>
          </div>
        </div>
        <video v-else-if="project.type === 'video'" controls>
          <source :src="project.media[0]" type="video/mp4">
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
      project: null,
      currentImageIndex: 0
    }
  },
  async created() {
    try {
      const response = await axios.get(`/api/projects/${this.$route.params.id}`);
      this.project = response.data;
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  },
  methods: {
    nextImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.project.media.length;
    },
    prevImage() {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.project.media.length) % this.project.media.length;
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

.image-carousel {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
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
  border-radius: 5px;
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