<template>
  <div id="app">
    <header>
      <nav>
        <div class="logo">Jieralt</div>
        <button class="nav-toggle" @click="toggleNav" aria-label="toggle navigation">
          <span class="hamburger"></span>
        </button>
        <ul :class="{ 'nav-open': navOpen }">
          <li><router-link to="/" @click="closeNav">首页</router-link></li>
          <li><router-link to="/about" @click="closeNav">关于我</router-link></li>
          <li><router-link to="/portfolio" @click="closeNav">作品集</router-link></li>
          <li><router-link to="/contact" @click="closeNav">联系我</router-link></li>
        </ul>
      </nav>
    </header>

    <main>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </main>

    

    <footer>
      <div class="social-links">
        <a href="https://github.com/jieralt" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i></a>
        <a href="https://gitee.com/jieralt" target="_blank" rel="noopener noreferrer">
          <i class="fab fa-git-alt"></i>
        </a>
        <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin"></i></a>
        <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer"><i class="fab fa-twitter"></i></a>
      </div>
      <p>&copy; {{ currentYear }} Jieralt. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      navOpen: false,
      currentYear: new Date().getFullYear()
    }
  },
  methods: {
    toggleNav() {
      this.navOpen = !this.navOpen;
    },
    closeNav() {
      this.navOpen = false;
    }
  },
  watch: {
    $route(to) {
      document.title = to.meta.title ? `${to.meta.title} - Your Name` : '作品历史';
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

body {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 1rem;
}

nav a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

nav a:hover, nav a.router-link-active {
  color: #3498db;
}

main {
  flex-grow: 1;
}

footer {
  background-color: #34495e;
  color: white;
  text-align: center;
  padding: 1rem;
}

.social-links {
  margin-bottom: 1rem;
}

.social-links a {
  color: white;
  font-size: 1.5rem;
  margin: 0 0.5rem;
  transition: color 0.3s;
}

.social-links a:hover {
  color: #3498db;
}

.nav-toggle {
  display: none;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .nav-toggle {
    display: block;
    background: none;
    border: none;
    cursor: pointer;
  }

  .hamburger {
    display: block;
    width: 30px;
    height: 3px;
    background: white;
    position: relative;
  }

  .hamburger::before,
  .hamburger::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 3px;
    background: white;
  }

  .hamburger::before {
    top: -8px;
  }

  .hamburger::after {
    bottom: -8px;
  }

  nav ul {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #2c3e50;
    padding: 1rem;
  }

  nav ul.nav-open {
    display: flex;
  }
}
</style>