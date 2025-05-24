<template>
  <div class="app">
    <MainHeader />
    <main class="main-content">
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import MainHeader from '@/components/MainHeader.vue'
import Footer from '@/components/Footer.vue'
</script>

<style lang="scss">
@import '@/assets/styles/main.scss';

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style> 