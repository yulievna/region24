<template>
  <div class="service-details">
    <div class="service-header">
      <h1 class="service-title">{{ service.title }}</h1>
      <div class="service-image">
        <img :src="service.image" :alt="service.title">
      </div>
    </div>

    <div class="service-content">
      <div class="service-description">
        <h2>Описание услуги</h2>
        <p>{{ service.description }}</p>
      </div>

      <div class="service-features">
        <h2>Преимущества</h2>
        <ul>
          <li v-for="(feature, index) in service.features" :key="index">
            {{ feature }}
          </li>
        </ul>
      </div>

      <CompletedProjects :projects="service.projects" />
      
      <ServiceCalculator :serviceTypes="[service]" />
    </div>
  </div>
</template>

<script>
import CompletedProjects from '@/components/CompletedProjects.vue'
import ServiceCalculator from '@/components/ServiceCalculator.vue'

export default {
  name: 'ServiceDetails',
  components: {
    CompletedProjects,
    ServiceCalculator
  },
  data() {
    return {
      service: {
        id: '',
        title: '',
        description: '',
        image: '',
        features: [],
        projects: []
      }
    }
  },
  created() {
    // Здесь будет логика получения данных об услуге по ID из параметров маршрута
    const serviceId = this.$route.params.id
    // TODO: Заменить на реальный API-запрос
    this.fetchServiceData(serviceId)
  },
  methods: {
    fetchServiceData(serviceId) {
      // Временные данные для демонстрации
      this.service = {
        id: serviceId,
        title: 'Название услуги',
        description: 'Подробное описание услуги...',
        image: '/path/to/image.jpg',
        features: [
          'Преимущество 1',
          'Преимущество 2',
          'Преимущество 3'
        ],
        projects: [
          {
            id: 1,
            title: 'Проект 1',
            description: 'Описание проекта 1',
            image: '/path/to/project1.jpg',
            date: '2024',
            location: 'Москва'
          },
          // Добавьте больше проектов по необходимости
        ]
      }
    }
  }
}
</script>

<style scoped>
.service-details {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.service-header {
  margin-bottom: 3rem;
}

.service-title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1.5rem;
}

.service-image {
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 8px;
}

.service-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.service-content {
  display: grid;
  gap: 4rem;
}

.service-description,
.service-features {
  max-width: 800px;
}

h2 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1.5rem;
}

.service-description p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
}

.service-features ul {
  list-style: none;
  padding: 0;
}

.service-features li {
  font-size: 1.1rem;
  color: #666;
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.service-features li::before {
  content: "•";
  color: #4CAF50;
  position: absolute;
  left: 0;
}

@media (max-width: 768px) {
  .service-details {
    padding: 1rem;
  }

  .service-title {
    font-size: 2rem;
  }

  .service-image {
    height: 300px;
  }
}
</style> 