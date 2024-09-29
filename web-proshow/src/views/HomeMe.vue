<template>
  <div class="home">
    <div class="hero">
      <h1 class="glitch" data-text="Your Name">Jieralt</h1>
      <p class="subtitle">Web Developer | Designer | Innovator</p>
      <div class="cta-buttons">
        <router-link to="/portfolio" class="btn">查看作品</router-link>
        <router-link to="/contact" class="btn btn-outline">联系我</router-link>
      </div>
    </div>
    <div class="skills">
      <h2>技能专长</h2>
      <div class="skill-icons">
        <i class="fab fa-html5" title="HTML5"></i>
        <i class="fab fa-css3-alt" title="CSS3"></i>
        <i class="fab fa-js-square" title="JavaScript"></i>
        <i class="fab fa-vue" title="Vue.js"></i>
        <i class="fab fa-react" title="React"></i>
        <i class="fab fa-node" title="Node.js"></i>
      </div>
    </div>
    <!-- <div class="featured-work">
      <h2>精选作品</h2>
      <div class="work-grid">
        <div class="work-item" v-for="work in featuredWorks" :key="work.id">
          <img :src="work.image" :alt="work.title">
          <div class="work-info">
            <h3>{{ work.title }}</h3>
            <p>{{ work.description }}</p>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'HomeMe',
  data() {
    return {
      featuredWorks: [
        { id: 1, title: '项目 A', description: '创新的Web应用', image: 'https://via.placeholder.com/300x200' },
        { id: 2, title: '项目 B', description: '响应式网站设计', image: 'https://via.placeholder.com/300x200' },
        { id: 3, title: '项目 C', description: '移动应用开发', image: 'https://via.placeholder.com/300x200' },
      ]
    }
  }
}
</script>

<style scoped>
.home {
  text-align: center;
}

.hero {
  height: 50vh;
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, #3498db, #8e44ad);
  color: white;
}

.glitch {
  font-size: 5rem;
  font-weight: bold;
  text-transform: uppercase;
  position: relative;
  text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff,
    0.025em 0.04em 0 #fffc00;
  animation: glitch 725ms infinite;
}

.glitch span {
  position: absolute;
  top: 0;
  left: 0;
}

.glitch span:first-child {
  animation: glitch 500ms infinite;
  clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
  transform: translate(-0.04em, -0.03em);
  opacity: 0.75;
}

.glitch span:last-child {
  animation: glitch 375ms infinite;
  clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
  transform: translate(0.04em, 0.03em);
  opacity: 0.75;
}

@keyframes glitch {
  0% {
    text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff,
      0.025em 0.04em 0 #fffc00;
  }
  15% {
    text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff,
      0.025em 0.04em 0 #fffc00;
  }
  16% {
    text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff,
      -0.05em -0.05em 0 #fffc00;
  }
  49% {
    text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff,
      -0.05em -0.05em 0 #fffc00;
  }
  50% {
    text-shadow: 0.05em 0.035em 0 #00fffc, 0.03em 0 0 #fc00ff,
      0 -0.04em 0 #fffc00;
  }
  99% {
    text-shadow: 0.05em 0.035em 0 #00fffc, 0.03em 0 0 #fc00ff,
      0 -0.04em 0 #fffc00;
  }
  100% {
    text-shadow: -0.05em 0 0 #00fffc, -0.025em -0.04em 0 #fc00ff,
      -0.04em -0.025em 0 #fffc00;
  }
}

.subtitle {
  font-size: 1.5rem;
  margin-top: 1rem;
}

.cta-buttons {
  margin-top: 2rem;
}

.btn {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  margin: 0 0.5rem;
  background-color: #2ecc71;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #27ae60;
}

.btn-outline {
  background-color: transparent;
  border: 2px solid white;
}

.btn-outline:hover {
  background-color: white;
  color: #3498db;
}

.skills, .featured-work {
  padding: 4rem 2rem;
}

.skill-icons {
  font-size: 3rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.skill-icons i {
  transition: transform 0.3s;
}

.skill-icons i:hover {
  transform: scale(1.2);
}

.work-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.work-item {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.work-item img {
  width: 100%;
  height: auto;
  transition: transform 0.3s;
}

.work-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 1rem;
  transform: translateY(100%);
  transition: transform 0.3s;
}

.work-item:hover img {
  transform: scale(1.1);
}

.work-item:hover .work-info {
  transform: translateY(0);
}
</style>