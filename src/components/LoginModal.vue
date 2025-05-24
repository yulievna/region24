<template>
  <div v-if="isOpen" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <button class="modal-close" @click="closeModal">&times;</button>
      <h2>Вход в личный кабинет</h2>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            required 
            placeholder="Введите ваш email"
          >
        </div>
        <button type="submit" class="btn btn-primary" :disabled="isLoading">
          {{ isLoading ? 'Вход...' : 'Войти' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      email: '',
      isLoading: false
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    async handleLogin() {
      this.isLoading = true
      try {
        // TODO: Заменить на реальный API-запрос
        await new Promise(resolve => setTimeout(resolve, 1000))
        localStorage.setItem('user', JSON.stringify({ email: this.email }))
        this.$emit('login-success')
        this.closeModal()
      } catch (error) {
        console.error('Ошибка входа:', error)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: $white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  position: relative;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: $text-color;
  transition: $transition;

  &:hover {
    color: $primary-color;
  }
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: $text-color;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: $transition;

  &:focus {
    outline: none;
    border-color: $primary-color;
  }
}

.submit-button {
  width: 100%;
  padding: 0.75rem;
  background-color: $primary-color;
  color: $white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: $transition;

  &:hover {
    background-color: darken($primary-color, 10%);
  }
}
</style> 