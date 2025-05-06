<template>
  <div class="admin-login">
    <div class="login-container">
      <div class="login-header">
        <img src="@/assets/images/logo2.svg" alt="Регион 24" class="logo-img">
        <h1>Вход в панель управления</h1>
      </div>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">Имя пользователя</label>
          <input 
            type="text" 
            id="username" 
            v-model="username" 
            required
            placeholder="Введите имя пользователя"
          >
        </div>
        <div class="form-group">
          <label for="password">Пароль</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            required
            placeholder="Введите пароль"
          >
        </div>
        <button type="submit" class="btn btn-primary">Войти</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const username = ref('')
const password = ref('')

const handleLogin = () => {
  // For demo purposes, accept any username/password
  localStorage.setItem('admin-token', 'demo-token')
  const redirectPath = route.query.redirect || '/admin'
  router.push(redirectPath)
}
</script>

<style lang="scss" scoped>
.admin-login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f6fa;
  padding: 2rem;
}

.login-container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;

  .logo-img {
    width: 80px;
    height: 80px;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 1.5rem;
    color: #2c3e50;
    margin: 0;
  }
}

.login-form {
  .form-group {
    margin-bottom: 1.5rem;

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #666;
    }

    input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.3s ease;

      &:focus {
        outline: none;
        border-color: #7395AE;
      }
    }
  }

  .btn {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
  }
}
</style> 