<template>
  <header class="main-header">
    <div class="header-top">
      <div class="container">
        <div class="contact-info">
          <div class="phone">
            <i class="fas fa-phone"></i>
            8(900) 123-23-32
          </div>
          <div class="email">
            <i class="fas fa-envelope"></i>
            region24@mail.ru
          </div>
        </div>
      </div>
    </div>
    <nav class="nav">
      <div class="container">
        <router-link to="/" class="logo">
          <img src="@/assets/images/logo.svg" alt="Регион 24" class="logo-img">
        </router-link>
        <BurgerMenu :is-active="isMenuOpen" @toggle="toggleMenu" />
        <div class="nav-links">
          <router-link to="/">Главная</router-link>
          <router-link to="/services">Услуги</router-link>
          <router-link to="/projects">Наши работы</router-link>
          <router-link to="/about">О нас</router-link>
          <router-link to="/contacts">Контакты</router-link>
        </div>
        <div class="auth-buttons">
          <template v-if="isAuthenticated">
            <router-link to="/profile" class="btn btn-outline">
              <i class="fas fa-user"></i>
              <span>Личный кабинет</span>
            </router-link>
            <button @click="handleLogout" class="btn btn-text">
              <i class="fas fa-sign-out-alt"></i>
              <span>Выйти</span>
            </button>
          </template>
          <button v-else @click="openLoginModal" class="btn btn-primary">
            <i class="fas fa-sign-in-alt"></i>
            <span>Войти</span>
          </button>
        </div>
      </div>
    </nav>
    <div class="mobile-nav" :class="{ 'nav-open': isMenuOpen }">
      <router-link to="/" class="nav-item" @click="closeMenu">Главная</router-link>
      <router-link to="/services" class="nav-item" @click="closeMenu">Услуги</router-link>
      <router-link to="/projects" class="nav-item" @click="closeMenu">Наши работы</router-link>
      <router-link to="/about" class="nav-item" @click="closeMenu">О нас</router-link>
      <router-link to="/contacts" class="nav-item" @click="closeMenu">Контакты</router-link>
    </div>
    <div class="menu-overlay" :class="{ 'overlay-open': isMenuOpen }" @click="closeMenu"></div>
    <LoginModal 
      :is-open="isLoginModalOpen"
      @close="closeLoginModal"
      @login-success="handleLoginSuccess"
    />
  </header>
</template>

<script setup>
import { ref } from 'vue'
import BurgerMenu from './BurgerMenu.vue'
import LoginModal from './LoginModal.vue'

const isMenuOpen = ref(false)
const isLoginModalOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const openLoginModal = () => {
  isLoginModalOpen.value = true
}

const closeLoginModal = () => {
  isLoginModalOpen.value = false
}

const handleLoginSuccess = () => {
  // Handle login success
}

const handleLogout = () => {
  localStorage.removeItem('user')
  if (window.location.pathname === '/profile') {
    window.location.href = '/'
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.main-header {
  background: #7395AE;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  color: $white;
}

.header-top {
  background-color: #557A95;
  padding: 0.5rem 0;
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .contact-info {
    display: flex;
    justify-content: flex-start;
    gap: 2rem;
  }

  .phone, .email {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: white;
    text-decoration: none;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.8;
    }

    i {
      font-size: 1rem;
    }
  }
}

.nav {
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    .logo-img {
      height: 40px;
      width: auto;
    }
  }

  .nav-links {
    display: flex;
    gap: 2rem;

    a {
      color: white;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
      position: relative;

      &:after {
        position: absolute;
        content: '';
        bottom: -5px;
        display: block;
        height: 2px;
        background: white;
        width: 0;
        transition: 0.3s;
        left: 50%;
        transform: translateX(-50%);
      }

      &:hover:after {
        width: 100%;
      }

      &.router-link-active {
        &:after {
          width: 100%;
        }
      }
    }
  }
}

.mobile-nav {
  display: none;
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;

  &.overlay-open {
    opacity: 1;
    visibility: visible;
  }
}

.auth-buttons {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: $transition;
  text-decoration: none;

  i {
    font-size: 1rem;
  }
}

.btn-primary {
  background-color: $primary-color;
  color: $white;
  border: none;

  &:hover {
    background-color: darken($primary-color, 10%);
  }
}

.btn-outline {
  border: 1px solid $primary-color;
  color: $primary-color;
  background: none;

  &:hover {
    background-color: $primary-color;
    color: $white;
  }
}

.btn-text {
  background: none;
  border: none;
  color: $text-color;

  &:hover {
    color: $primary-color;
  }
}

@media (max-width: 767px) {
  .main-header {
    .header-top {
      display: none;
    }

    .nav {
      .container {
        padding: 0.5rem 1rem;
      }

      .nav-links {
        display: none;
      }
    }

    .mobile-nav {
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 250px;
      background: #7395AE;
      padding: 2rem;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      z-index: 100;

      &.nav-open {
        transform: translateX(0);
      }

      .nav-item {
        color: white;
        text-decoration: none;
        padding: 1rem 0;
        font-weight: 500;
        text-align: center;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
</style> 