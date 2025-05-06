<template>
  <div class="admin-layout">
    <header class="admin-header">
      <div class="header-content">
        <button class="menu-toggle" @click="toggleSidebar" :class="{ 'active': isSidebarOpen }">
          <span class="burger-line"></span>
          <span class="burger-line"></span>
          <span class="burger-line"></span>
        </button>
        <div class="header-title">
          <h1>{{ pageTitle }}</h1>
        </div>
        <div class="admin-user">
          <span>{{ adminName }}</span>
        </div>
      </div>
    </header>

    <aside class="admin-sidebar" :class="{ 'sidebar-open': isSidebarOpen }">
      <div class="admin-logo">
        <img src="/images/logo.svg" alt="Регион 24" class="logo-img">
        <span>Панель управления</span>
        <button class="close-sidebar" @click="toggleSidebar">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <nav class="admin-nav">
        <router-link to="/admin" class="nav-item" @click="closeSidebar">
          <i class="fas fa-tachometer-alt"></i>
          <span>Дашборд</span>
        </router-link>
        <router-link to="/admin/projects" class="nav-item" @click="closeSidebar">
          <i class="fas fa-project-diagram"></i>
          <span>Проекты</span>
        </router-link>
        <router-link to="/admin/services" class="nav-item" @click="closeSidebar">
          <i class="fas fa-tools"></i>
          <span>Услуги</span>
        </router-link>
        <router-link to="/admin/applications" class="nav-item" @click="closeSidebar">
          <i class="fas fa-envelope"></i>
          <span>Заявки</span>
        </router-link>
        <button class="nav-item logout" @click="handleLogout">
          <i class="fas fa-sign-out-alt"></i>
          <span>Выйти</span>
        </button>
      </nav>
    </aside>

    <div class="sidebar-overlay" :class="{ 'overlay-open': isSidebarOpen }" @click="closeSidebar"></div>

    <main class="admin-main">
      <div class="admin-content">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isSidebarOpen = ref(false)

const adminName = ref('Администратор')

const pageTitle = computed(() => {
  const titles = {
    '/admin': 'Дашборд',
    '/admin/projects': 'Управление проектами',
    '/admin/services': 'Управление услугами',
    '/admin/applications': 'Заявки'
  }
  return titles[route.path] || 'Панель управления'
})

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}

const handleLogout = () => {
  closeSidebar()
  localStorage.removeItem('admin-token')
  router.push('/admin/login')
}
</script>

<style lang="scss" scoped>
.admin-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.admin-header {
  background: white;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .menu-toggle {
    background: none;
    border: none;
    width: 30px;
    height: 30px;
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
    z-index: 201;

    .burger-line {
      width: 100%;
      height: 2px;
      background-color: #2c3e50;
      margin: 3px 0;
      transition: all 0.3s ease;
    }

    &.active {
      .burger-line {
        &:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }
        &:nth-child(2) {
          opacity: 0;
        }
        &:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }
      }
    }
  }

  .header-title {
    flex: 1;
    text-align: center;
    padding: 0 1rem;

    h1 {
      font-size: 1.25rem;
      margin: 0;
      color: #2c3e50;
    }
  }

  .admin-user {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
}

.admin-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  background: #2c3e50;
  color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 200;

  &.sidebar-open {
    transform: translateX(0);
  }

  .admin-logo {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 1rem;
    position: relative;

    .logo-img {
      width: 40px;
      height: 40px;
    }

    .close-sidebar {
      position: absolute;
      right: 1rem;
      background: none;
      border: none;
      color: white;
      font-size: 1.25rem;
      cursor: pointer;
      display: none;
    }
  }

  .admin-nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1rem;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    &.router-link-active {
      background: rgba(255, 255, 255, 0.2);
    }

    &.logout {
      margin-top: auto;
      background: none;
      border: none;
      cursor: pointer;
      color: #e74c3c;

      &:hover {
        background: rgba(231, 76, 60, 0.1);
      }
    }

    i {
      width: 20px;
      text-align: center;
    }
  }
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 150;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;

  &.overlay-open {
    opacity: 1;
    visibility: visible;
  }
}

.admin-main {
  flex: 1;
  background: #f5f6fa;
  margin-top: 60px;
  padding: 1rem;
}

.admin-content {
  max-width: 1200px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .admin-layout {
    flex-direction: row;
  }

  .admin-header {
    position: fixed;
    top: 0;
    left: 250px;
    right: 0;
    padding: 1rem 2rem;

    .menu-toggle {
      display: none;
    }

    .header-title h1 {
      font-size: 1.5rem;
    }
  }

  .admin-sidebar {
    position: fixed;
    transform: translateX(0);
    top: 0;
    left: 0;
    bottom: 0;
    width: 250px;

    .admin-logo .close-sidebar {
      display: none;
    }
  }

  .sidebar-overlay {
    display: none;
  }

  .admin-main {
    margin-left: 250px;
    margin-top: 0;
    padding: 2rem;
  }
}
</style> 