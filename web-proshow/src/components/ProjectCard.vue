<template>
  <div class="project-card">
    <img :src="project.image" :alt="project.title">
    <h3>{{ project.title }}</h3>
    <p>{{ project.description }}</p>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    project: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.project-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}

.project-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
}
</style>