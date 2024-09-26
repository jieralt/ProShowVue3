<template>
  <div class="project-detail" v-if="project">
    <h1>{{ project.title }}</h1>
    <div class="project-content">
      <div class="media-container">
        <div v-if="project.type === 'image'" class="image-carousel">
          <transition-group name="fade">
            <img 
              v-for="image in currentImages" 
              :key="image"
              :src="image" 
              :alt="`${project.title} - Image`"
              class="carousel-image"
            >
          </transition-group>
          <div class="carousel-controls" v-if="project.media.length > 1">
            <button @click="prevImage" class="carousel-button">
              &lt;
              <span class="click-feedback"></span>
            </button>
            <button @click="nextImage" class="carousel-button">
              &gt;
              <span class="click-feedback"></span>
            </button>
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
  computed: {
    currentImages() {
      if (this.project && this.project.media) {
        return [this.project.media[this.currentImageIndex]];
      }
      return [];
    }
  },
  mounted() {
    console.log('Component mounted');
    this.loadProjectData();
  },
  methods: {
    async loadProjectData() {
      try {
        console.log('Fetching project data...');
        const response = await axios.get(`/api/projects/${this.$route.params.id}`);
        this.project = response.data;
        console.log('Project data loaded:', this.project);
        console.log('Number of media items:', this.project.media.length);
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    },
    nextImage() {
      console.log('Next image called');
      this.currentImageIndex = (this.currentImageIndex + 1) % this.project.media.length;
      console.log('New index:', this.currentImageIndex);
    },
    prevImage() {
      console.log('Previous image called');
      this.currentImageIndex = (this.currentImageIndex - 1 + this.project.media.length) % this.project.media.length;
      console.log('New index:', this.currentImageIndex);
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

.carousel-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-controls {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.carousel-button {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
}

.click-feedback {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s;
}

.carousel-button:active .click-feedback {
  width: 100px;
  height: 100px;
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>