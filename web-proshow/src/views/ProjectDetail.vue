<template>
  <div class="project-detail" v-if="project">
    <h1>{{ project.title }}</h1>
    <div class="project-content">
      <div class="left-column">
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
        
        <!-- 源文件下载部分 -->
        <div v-if="project.sourceFiles && project.sourceFiles.length > 0" class="source-files">
          <h3>项目源文件</h3>
          <div class="download-buttons">
            <a 
              v-for="(file, index) in project.sourceFiles" 
              :key="index" 
              @click.prevent="downloadFile(file)"
              href="#"
              class="download-button"
            >
              <font-awesome-icon icon="download" /> {{ file.name }}
            </a>
          </div>
        </div>
      </div>
      
      <div class="right-column">
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
        // 处理 sourceFile 字段
        if (this.project.sourceFile) {
          this.project.sourceFiles = Array.isArray(this.project.sourceFile) 
            ? this.project.sourceFile.map(this.processSourceFile)
            : [this.processSourceFile(this.project.sourceFile)];
        }
        console.log('Project data loaded:', this.project);
        if (this.project.media && this.project.media.length > 1) {
          console.log('Number of media items:', this.project.media.length);
          this.startAutoplay();
        }
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    },
    processSourceFile(file) {
      if (typeof file === 'string') {
        return {
          name: this.getFileName(file),
          path: file
        };
      }
      return file;
    },
    getFileName(path) {
      return path.split('/').pop();
    },
    async downloadFile(file) {
      try {
        const response = await axios.get(`/api/download/${file.path}`, {
          responseType: 'blob'
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file.name);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error downloading file:', error);
        alert('文件下载失败，请稍后再试。');
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
  display: grid;
  grid-template-columns: minmax(300px, 2fr) 3fr;
  gap: 2rem;
}

.left-column {
  position: sticky;
  top: 2rem;
  align-self: start;
}

.media-container {
  width: 100%;
  margin-bottom: 1rem;
}

.image-carousel {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 75%; /* 4:3 aspect ratio */
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

.right-column {
  overflow-y: auto;
  max-height: calc(100vh - 4rem);
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

.source-files {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 10px;
}

.source-files h3 {
  margin-bottom: 1rem;
}

.download-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.download-button {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.download-button:hover {
  background-color: #0056b3;
}

.download-button svg {
  margin-right: 0.5rem;
}

@media (max-width: 768px) {
  .project-content {
    grid-template-columns: 1fr;
  }

  .left-column {
    position: static;
  }

  .right-column {
    max-height: none;
  }
}
</style>