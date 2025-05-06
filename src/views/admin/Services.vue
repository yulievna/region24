<template>
  <div class="admin-services">
    <div class="header">
      <h2>Управление услугами</h2>
      <button class="btn btn-primary" @click="showAddModal = true">
        <i class="fas fa-plus"></i> Добавить услугу
      </button>
    </div>

    <div class="services-grid">
      <div v-for="service in services" :key="service.id" class="service-card">
        <div class="service-image">
          <img :src="service.image" :alt="service.title">
        </div>
        <div class="service-content">
          <h3>{{ service.title }}</h3>
          <p class="service-description">{{ service.description }}</p>
          <div class="service-meta">
            <span class="service-price">{{ service.price }}</span>
            <span class="service-duration">{{ service.duration }}</span>
          </div>
          <div class="service-actions">
            <button class="btn btn-sm btn-primary" @click="editService(service)">
              <i class="fas fa-edit"></i> Редактировать
            </button>
            <button class="btn btn-sm btn-danger" @click="deleteService(service)">
              <i class="fas fa-trash"></i> Удалить
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Service Modal -->
    <div v-if="showAddModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ editingService ? 'Редактировать услугу' : 'Добавить услугу' }}</h3>
          <button class="close-btn" @click="showAddModal = false">&times;</button>
        </div>
        <form @submit.prevent="saveService" class="service-form">
          <div class="form-group">
            <label>Название услуги</label>
            <input type="text" v-model="serviceForm.title" required>
          </div>
          <div class="form-group">
            <label>Описание</label>
            <textarea v-model="serviceForm.description" required></textarea>
          </div>
          <div class="form-group">
            <label>Цена</label>
            <input type="text" v-model="serviceForm.price" required>
          </div>
          <div class="form-group">
            <label>Срок выполнения</label>
            <input type="text" v-model="serviceForm.duration" required>
          </div>
          <div class="form-group">
            <label>Изображение</label>
            <input type="file" @change="handleImageUpload" accept="image/*">
          </div>
          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click="showAddModal = false">
              Отмена
            </button>
            <button type="submit" class="btn btn-primary">
              {{ editingService ? 'Сохранить' : 'Добавить' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const services = ref([
  {
    id: 1,
    title: 'Кровельные работы',
    description: 'Профессиональные кровельные работы любой сложности',
    price: 'от 1000 ₽/м²',
    duration: 'от 1 дня',
    image: '/images/services/service1.jpg'
  },
  {
    id: 2,
    title: 'Отделочные работы',
    description: 'Качественная отделка помещений под ключ',
    price: 'от 2000 ₽/м²',
    duration: 'от 5 дней',
    image: '/images/services/service2.jpg'
  }
])

const showAddModal = ref(false)
const editingService = ref(null)
const serviceForm = ref({
  title: '',
  description: '',
  price: '',
  duration: '',
  image: null
})

const editService = (service) => {
  editingService.value = service
  serviceForm.value = { ...service }
  showAddModal.value = true
}

const deleteService = (service) => {
  if (confirm('Вы уверены, что хотите удалить эту услугу?')) {
    services.value = services.value.filter(s => s.id !== service.id)
  }
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Here you would typically upload the file to your server
    // and get back a URL to store in serviceForm.value.image
    serviceForm.value.image = URL.createObjectURL(file)
  }
}

const saveService = () => {
  if (editingService.value) {
    // Update existing service
    const index = services.value.findIndex(s => s.id === editingService.value.id)
    if (index !== -1) {
      services.value[index] = { ...serviceForm.value }
    }
  } else {
    // Add new service
    services.value.push({
      id: services.value.length + 1,
      ...serviceForm.value
    })
  }
  showAddModal.value = false
  editingService.value = null
  serviceForm.value = {
    title: '',
    description: '',
    price: '',
    duration: '',
    image: null
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';

.admin-services {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .service-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    .service-image {
      height: 200px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .service-content {
      padding: 1.5rem;

      h3 {
        margin: 0 0 0.5rem;
      }

      .service-description {
        color: #666;
        margin-bottom: 1rem;
      }

      .service-meta {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        font-size: 0.875rem;
        color: #666;
      }

      .service-actions {
        display: flex;
        gap: 0.5rem;
      }
    }
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;

    .modal-content {
      background: white;
      border-radius: 8px;
      width: 100%;
      max-width: 500px;
      max-height: 90vh;
      overflow-y: auto;
    }

    .modal-header {
      padding: 1rem;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        margin: 0;
      }

      .close-btn {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #666;
      }
    }

    .service-form {
      padding: 1.5rem;

      .form-group {
        margin-bottom: 1rem;

        label {
          display: block;
          margin-bottom: 0.5rem;
          color: #666;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        textarea {
          height: 100px;
          resize: vertical;
        }
      }

      .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        margin-top: 1.5rem;
      }
    }
  }
}
</style> 