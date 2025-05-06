<template>
  <div class="services">
    <!-- Services Header -->
    <section class="services-header">
      <div class="container">
        <h1 class="text-center">Наши услуги</h1>
        <p class="text-center">Комплексные решения для ваших потребностей в дизайне и строительстве</p>
      </div>
    </section>

    <!-- Services Filter -->
    <section class="services-filter">
      <div class="container">
        <div class="filter-buttons">
          <button 
            v-for="category in categories" 
            :key="category.id"
            :class="['filter-btn', { active: selectedCategory === category.id }]"
            @click="selectedCategory = category.id"
          >
            {{ category.name }}
          </button>
        </div>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="services-grid">
      <div class="container">
        <div class="services-list">
          <div 
            v-for="service in filteredServices" 
            :key="service.id"
            :id="service.id"
            class="service-item"
          >
            <div class="service-image">
              <img :src="service.image" :alt="service.title">
            </div>
            <div class="service-content">
              <h2>{{ service.title }}</h2>
              <p>{{ service.description }}</p>
              <ul class="service-features">
                <li v-for="(feature, index) in service.features" :key="index">
                  <i class="fas fa-check"></i>
                  {{ feature }}
                </li>
              </ul>
              <router-link to="/contacts" class="btn btn-primary">Заказать услугу</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="process">
      <div class="container">
        <h2 class="section-title text-center">Этапы работы</h2>
        <div class="process-steps">
          <div class="process-step" v-for="(step, index) in processSteps" :key="index">
            <div class="step-number">{{ index + 1 }}</div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const categories = ref([
  { id: 'roofing', name: 'Кровельные работы' },
  { id: 'finishing', name: 'Отделочные работы' },
  { id: 'concrete', name: 'Бетонные работы' },
  { id: 'engineering', name: 'Прокладка инженерных коммуникаций' }
])

const selectedCategory = ref('all')

const services = ref([
  {
    id: 'roofing',
    category: 'roofing',
    title: 'Кровельные работы',
    description: 'Комплексные архитектурные решения для жилых и коммерческих проектов.',
    image: new URL('@/assets/images/services/design.jpg', import.meta.url).href,
    features: [
      'Custom architectural plans', 
      '3D visualization',
      'Building code compliance',
      'Sustainable design options'
    ]
  },
  {
    id: 'finishing',
    category: 'finishing',
    title: 'Отделочные работы',
    description: 'Творческие внутренние решения, отражающие ваш стиль и удовлетворяющие вашим потребностям.',
    image: new URL('@/assets/images/services/design.jpg', import.meta.url).href,    
    features: [
      'Space planning',
      'Material selection',
      'Lighting design',
      'Furniture layout'
    ]
  },
  {
    id: 'concrete',
    category: 'concrete',
    title: 'Бетонные работы',
    description: 'Качественные строительные услуги для домов и жилых помещений.',
    image: new URL('@/assets/images/services/design.jpg', import.meta.url).href,
    features: [
      'Custom home building',
      'Home extensions',
      'Foundation work',
      'Quality materials'
    ]
  },
  {
    id: 'engineering',
    category: 'engineering',
    title: 'Прокладка инженерных коммуникаций',
    description: 'Профессиональные строительные услуги для коммерческих и промышленных проектов.',
    image: new URL('@/assets/images/services/design.jpg', import.meta.url).href,
    features: [
      'Office buildings',
      'Retail spaces',
      'Industrial facilities',
      'Project management'
    ]
  }
])

const filteredServices = computed(() => {
  if (selectedCategory.value === 'all') {
    return services.value
  }
  return services.value.filter(service => service.category === selectedCategory.value)
})

const processSteps = ref([
  {
    title: 'Обсуждение проекта',
    description: 'Мы встречаемся, чтобы понять ваши потребности, видение и требования к проекту.'
  },
  {
    title: 'Разработка и планирование',
    description: 'Наша команда создает детальные планы и дизайны на основе ваших спецификаций.'
  },
  {
    title: 'Согласование и получение разрешений',
    description: 'Мы обрабатываем все необходимые разрешения и согласования для вашего проекта.'
  },
  {
    title: 'Выполнение проекта',
    description: 'Наша команда выполняет проект с точностью и качеством.'
  },
  {
    title: 'Сдача проекта',
    description: 'Финальная проверка и передача вашего завершенного проекта.'
  }
])
</script>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';

.services {
  background-color: $light-gray;
  .services-header {
    background-color: $light-gray;
    padding: 5rem 0;
    text-align: center;

    h1 {
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.2rem;
      max-width: 600px;
      margin: 0 auto;
    }
  }

  .services-filter {
    padding: 2rem 0;
    background-color: $white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    .filter-buttons {
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }
  }

  .filter-btn {
    padding: 0.75rem 1.5rem;
    border: none;
    background: none;
    font-size: 1rem;
    cursor: pointer;
    transition: $transition;
    border-radius: 4px;

    &:hover {
      background-color: $light-gray;
    }

    &.active {
      background-color: $primary-color;
      color: $white;
    }
  }

  .services-grid {
    padding: 5rem 0;

    .services-list {
      display: grid;
      gap: 4rem;
    }
  }

  .service-item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: center;
    background: $white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    @include tablet {
      grid-template-columns: 1fr;
    }

    .service-image {
      height: 400px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .service-content {
      padding: 2rem;

      h2 {
        margin-bottom: 1rem;
      }

      p {
        margin-bottom: 1.5rem;
      }
    }

    .service-features {
      list-style: none;
      margin-bottom: 2rem;

      li {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;

        i {
          color: $primary-color;
        }
      }
    }
  }

  .process {
    padding: 5rem 0;
    background-color: $light-gray;

    .section-title {
      margin-bottom: 3rem;
    }

    &-steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
    }
  }

  .process-step {
    text-align: center;
    padding: 2rem;
    background: $white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    .step-number {
      width: 40px;
      height: 40px;
      background-color: $primary-color;
      color: $white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
      font-weight: bold;
    }

    h3 {
      margin-bottom: 1rem;
    }
  }
}
</style> 