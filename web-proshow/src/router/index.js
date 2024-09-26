import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeMe.vue'
import About from '../views/AboutMe.vue'
import PortfolioPage from '../views/PortfolioPage.vue'
import ProjectDetail from '../views/ProjectDetail.vue'
import Contact from '../views/ContactMe.vue'

const routes = [
  { path: '/', name: 'HomeMe', component: Home },
  { path: '/about', name: 'AboutMe', component: About },
  { path: '/portfolio', name: 'Portfolio', component: PortfolioPage },
  { 
    path: '/project/:category/:id', 
    name: 'ProjectDetail', 
    component: ProjectDetail,
    props: true  // 这允许路由参数作为props传递给组件
  },
  { path: '/contact', name: 'ContactMe', component: Contact }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router