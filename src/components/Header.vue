<template>
  <header class="header">
    <div class="header-top">
      <div class="container">
        <div class="header-top-content">
          <div class="contact-info">
            <a href="tel:+1234567890" class="contact-item">
              <i class="fas fa-phone"></i>
              <span>+1 (234) 567-890</span>
            </a>
            <a href="mailto:info@region24.com" class="contact-item">
              <i class="fas fa-envelope"></i>
              <span>info@region24.com</span>
            </a>
          </div>
          <div class="social-links">
            <a href="#" class="social-link" target="_blank">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="social-link" target="_blank">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#" class="social-link" target="_blank">
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a href="#" class="social-link" target="_blank">
              <i class="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="header-content">
        <router-link to="/" class="logo">
          <img src="@/assets/logo.svg" alt="Region24">
        </router-link>

        <nav class="nav">
          <router-link to="/" class="nav-link">Главная</router-link>
          <router-link to="/about" class="nav-link">О нас</router-link>
          <router-link to="/services" class="nav-link">Услуги</router-link>
          <router-link to="/projects" class="nav-link">Проекты</router-link>
          <router-link to="/contacts" class="nav-link">Контакты</router-link>
        </nav>

        <div class="auth-buttons">
          <template v-if="isAuthenticated">
            <router-link to="/profile" class="btn btn-outline">
              <i class="fas fa-user"></i>
              Личный кабинет
            </router-link>
            <button @click="handleLogout" class="btn btn-text">
              <i class="fas fa-sign-out-alt"></i>
              Выйти
            </button>
          </template>
          <button v-else @click="openLoginModal" class="btn btn-primary">
            <i class="fas fa-sign-in-alt"></i>
            Войти
          </button>
        </div>
      </div>
    </div>

    <LoginModal 
      :is-open="isLoginModalOpen"
      @close="closeLoginModal"
      @login-success="handleLoginSuccess"
    />
  </header>
</template>

<script setup>
import LoginModal from './LoginModal.vue'

const isLoginModalOpen = ref(false)
const isAuthenticated = computed(() => !!localStorage.getItem('user'))

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
@import '@/assets/styles/main.scss';

.header {
  &-top {
    background-color: $primary-color;
    padding: 0.5rem 0;
    color: $white;

    &-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .contact-info {
    display: flex;
    gap: 1.5rem;

    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: $white;
      text-decoration: none;
      transition: $transition;

      &:hover {
        opacity: 0.8;
      }

      i {
        font-size: 1rem;
      }
    }
  }

  .social-links {
    display: flex;
    gap: 1rem;

    .social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: rgba($white, 0.1);
      color: $white;
      text-decoration: none;
      transition: $transition;

      &:hover {
        background-color: rgba($white, 0.2);
        transform: translateY(-2px);
      }

      i {
        font-size: 0.9rem;
      }
    }
  }

  @include mobile {
    .header-top-content {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }

    .contact-info {
      justify-content: center;
    }

    .social-links {
      justify-content: center;
    }
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}

.logo {
  img {
    height: 40px;
  }
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: $text-color;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover,
  &.router-link-active {
    color: $primary-color;
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
  transition: all 0.3s ease;
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

@media (max-width: 768px) {
  .nav {
    display: none;
  }

  .auth-buttons {
    .btn {
      padding: 0.5rem;
      
      span {
        display: none;
      }
    }
  }
}
</style> 