<template>
  <div class="app-container">
    <DynamicBackgroundLayout>
      <main>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </main>
    </DynamicBackgroundLayout>
  </div>
</template>

<script>
import DynamicBackgroundLayout from './components/DynamicBackgroundLayout.vue'

export default {
  name: 'App',
  components: {
    DynamicBackgroundLayout
  }
}
</script>

<style scoped>
.app-container {
  width: 100%;
  height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>