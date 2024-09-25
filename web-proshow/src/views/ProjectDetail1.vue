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
        <h2>项目描述</h2>
        <p>{{ project.fullDescription }}</p>
        <h2>使用的技术</h2>
        <ul>
          <li v-for="tech in project.technologies" :key="tech">{{ tech }}</li>
        </ul>
        <h2>项目时间线</h2>
        <p>开始时间: {{ project.startDate }}</p>
        <p>完成时间: {{ project.endDate }}</p>
        <h2>项目成果</h2>
        <p>{{ project.outcomes }}</p>
      </div>
    </div>
    <div class="related-projects" v-if="relatedProjects.length">
      <h2>相关项目</h2>
      <div class="related-projects-grid">
        <div v-for="relatedProject in relatedProjects" :key="relatedProject.id" class="related-project-card">
          <img :src="relatedProject.media" :alt="relatedProject.title">
          <h3>{{ relatedProject.title }}</h3>
          <router-link :to="'/project/' + relatedProject.id">查看详情</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectDetail',
  data() {
    return {
      project: null,
      relatedProjects: []
    }
  },
  created() {
    // 在实际应用中，您需要从API获取项目详情
    // 这里我们模拟从某个数据源获取项目
    this.project = {
      id: this.$route.params.id,
      title: '高精度机械臂',
      type: 'image',
      media: 'https://via.placeholder.com/800x600',
      fullDescription: '这是一个先进的机械臂项目，具有高精度和灵活性。该机械臂采用最新的传感器技术和控制算法，可以执行复杂的操作任务。它的应用范围包括精密制造、医疗手术辅助、以及空间探索等领域。',
      technologies: ['机器视觉', '深度学习', '精密控制', '3D打印'],
      startDate: '2023年3月1日',
      endDate: '2024年2月28日',
      outcomes: '该项目成功开发出一款精度达到0.01mm的机械臂，已申请3项专利，并在国际机器人展览会上获得最佳创新奖。'
    }
    
    // 模拟获取相关项目
    this.relatedProjects = [
      { id: 2, title: '智能家居3D模型', media: 'https://via.placeholder.com/300x200' },
      { id: 4, title: '自动化生产线模拟', media: 'https://via.placeholder.com/300x200' }
    ]
  }
}
</script>

<style scoped>
.project-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
}

h1 {
  font-size: 2.5em;
  color: #333;
  margin-bottom: 30px;
}

.project-content {
  display: flex;
  gap: 40px;
  margin-bottom: 40px;
}

.media-container {
  flex: 1;
}

.media-container img,
.media-container video {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.project-info {
  flex: 1;
}

h2 {
  font-size: 1.5em;
  color: #444;
  margin-top: 20px;
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  margin-bottom: 5px;
}

.related-projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.related-project-card {
  background-color: #f5f5f5;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.related-project-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.related-project-card h3 {
  padding: 10px;
  margin: 0;
}

.related-project-card a {
  display: block;
  padding: 10px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  text-align: center;
}
</style>