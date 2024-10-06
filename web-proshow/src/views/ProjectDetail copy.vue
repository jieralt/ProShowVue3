<template>
  <div class="project-detail" v-if="project">
    <h1>{{ project.title }}</h1>
    <div class="project-content">
      <div class="media-container">
        <div v-if="project.type === 'image'" class="image-carousel">
          <transition-group name="fade">
            <img 
              v-for="(image, index) in project.media" 
              :key="index"
              :src="image" 
              :alt="`${project.title} - Image ${index + 1}`"
              class="carousel-image"
              v-show="index === currentImageIndex"
            >
          </transition-group>
          <div class="carousel-controls" v-if="project.media && project.media.length > 1">
            <button @click="prevImage" class="carousel-button prev">
              &lt;
            </button>
            <button @click="nextImage" class="carousel-button next">
              &gt;
            </button>
          </div>
          <div class="carousel-indicators" v-if="project.media && project.media.length > 1">
            <span 
              v-for="(_, index) in project.media" 
              :key="index" 
              :class="['indicator', { active: index === currentImageIndex }]"
              @click="setCurrentImage(index)"
            ></span>
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
  props: ['id', 'category'],
  data() {
    return {
      project: null,
      currentImageIndex: 0,
      autoplayInterval: null
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
        const response = await axios.get(`/api/projects/${this.category}/${this.id}`);
        this.project = response.data;
        if (this.project.media && !Array.isArray(this.project.media)) {
          this.project.media = [this.project.media];
        }
        console.log('Project data loaded:', this.project);
        if (this.project.media) {
          console.log('Number of media items:', this.project.media.length);
          this.startAutoplay();
        }
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    },
    nextImage() {
      if (this.project && this.project.media && this.project.media.length > 1) {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.project.media.length;
        this.restartAutoplay();
      }
    },
    prevImage() {
      if (this.project && this.project.media && this.project.media.length > 1) {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.project.media.length) % this.project.media.length;
        this.restartAutoplay();
      }
    },
    setCurrentImage(index) {
      this.currentImageIndex = index;
      this.restartAutoplay();
    },
    startAutoplay() {
      this.stopAutoplay();
      this.autoplayInterval = setInterval(() => {
        this.nextImage();
      }, 5000); // 5秒切换一次
    },
    stopAutoplay() {
      if (this.autoplayInterval) {
        clearInterval(this.autoplayInterval);
      }
    },
    restartAutoplay() {
      this.stopAutoplay();
      this.startAutoplay();
    }
  },
  beforeUnmount() {
    this.stopAutoplay();
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
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
}

.media-container {
  width: 100%;
}

.image-carousel {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
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
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}

.carousel-button {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.carousel-button:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.carousel-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background-color 0.3s;
}

.indicator.active {
  background-color: white;
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

@media (min-width: 768px) {
  .project-content {
    flex-direction: row;
  }

  .media-container {
    flex: 1;
  }

  .project-info {
    flex: 1;
  }
}
</style>