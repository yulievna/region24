<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Проектно-строительная мастерская Регион 24</h1>
        <p class="hero-subtitle">Кровельные работы, отделочные работы, бетонные работы, прокладка инженерных комуникаций</p>
        <div class="hero-buttons">
          <router-link to="/portfolio" class="btn btn-primary">Наши работы</router-link>
          <router-link to="/contacts" class="btn btn-primary">Связаться с нами</router-link>
        </div>
      </div>
      <div class="hero-overlay"></div>
    </section>

    <!-- Key Benefits Section -->
    <section class="benefits">
      <div class="container">
        <h2 class="section-title text-center">Почему выбирают нас?</h2>
        <div class="benefits-grid">
          <div class="benefit-card" v-for="(benefit, index) in benefits" :key="index">
            <div class="benefit-icon">
              <i :class="benefit.icon"></i>
            </div>
            <h3>{{ benefit.title }}</h3>
            <p>{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Preview Section -->
    <section class="services-preview">
      <div class="container">
        <h2 class="section-title text-center">Наши услуги</h2>
        <div class="services-grid">
          <div class="service-card" v-for="(service, index) in services" :key="index">
            <div class="service-image">
              <img :src="service.image" :alt="service.title">
            </div>
            <div class="service-content">
              <h3>{{ service.title }}</h3>
              <p>{{ service.description }}</p>
              <div class="service-actions">
                <router-link :to="{ name: 'service-details', params: { id: service.id }}" class="btn btn-primary">Подробнее</router-link>
                <router-link to="/contacts" class="btn btn-secondary">Заказать услугу</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const benefits = ref([
  {
    icon: 'fas fa-medal',
    title: 'Гарантия качества',
    description: 'Мы гарантируем высокое качество работ и удовлетворение клиентов.'
  },
  {
    icon: 'fas fa-clock',
    title: 'Соблюдение сроков',
    description: 'Мы гарантируем соблюдение сроков и выполнение работ в установленные сроки.'
  },
  {
    icon: 'fas fa-handshake',
    title: 'Клиентоориентированность',
    description: 'Мы работаем в интересах клиента и стремимся предоставить лучшие решения для вашего проекта.'
  },
  {
    icon: 'fas fa-tools',
    title: 'Экспертный коллектив',
    description: 'Наша команда состоит из профессионалов, которые обладают широким спектром навыков и знаний.'
  }
])

const services = ref([
  {
    id: 'design',
    title: 'Кровельные работы',
    description: 'Мы занимаемся кровельными работами, начиная от проектирования и заканчивая монтажом и ремонтом кровельных систем.',
    image: new URL('@/assets/images/services/roof.avif', import.meta.url).href
  },
  { 
    id: 'construction',
    title: 'Отделочные работы',
    description: 'Мы занимаемся отделочными работами, начиная от проектирования и заканчивая монтажом и ремонтом отделочных систем.',
    image: new URL('@/assets/images/services/finish.avif', import.meta.url).href
  },
  {
    id: 'renovation',
    title: 'Бетонные работы',
    description: 'Мы занимаемся бетонными работами, начиная от проектирования и заканчивая монтажом и ремонтом бетонных систем.',
    image: new URL('@/assets/images/services/concrete.avif', import.meta.url).href
  },
    
  {
    id: 'renovation',
    title: 'Прокладка инженерных коммуникаций',
    description: 'Мы занимаемся прокладкой инженерных коммуникаций, начиная от проектирования и заканчивая монтажом и ремонтом инженерных коммуникаций.',
    image: new URL('@/assets/images/services/lying.avif', import.meta.url).href
  },
    
])
</script>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';
.services-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(250px, 1fr));
  gap: 2rem;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
}
.home {
  .hero {
    position: relative;
    height: 100vh;
    background-image: url('@/assets/images/hero-bg.jpg');
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: $white;

    &-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
    }

    &-content {
      position: relative;
      z-index: 1;
      max-width: 800px;
      padding: 0 2rem;
    }

    &-title {
      font-size: 4rem;
      margin-bottom: 1rem;
      @include mobile {
        font-size: 2.5rem;
      }
    }

    &-subtitle {
      font-size: 1.5rem;
      margin-bottom: 2rem;
      @include mobile {
        font-size: 1.2rem;
      }
    }

    &-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      @include mobile {
        flex-direction: column;
      }
    }
  }

  .benefits {
    padding: 5rem 0;
    background-color: $light-gray;

    .section-title {
      margin-bottom: 3rem;
    }

    &-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }
  }

  .benefit-card {
    text-align: center;
    padding: 2rem;
    background: $white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: $transition;

    &:hover {
      transform: translateY(-5px);
    }

    .benefit-icon {
      font-size: 2.5rem;
      color: $primary-color;
      margin-bottom: 1rem;
    }

    h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      word-break: break-word;
    }
  }

  .services-preview {
    padding: 5rem 0;

    .section-title {
      margin-bottom: 3rem;
    }

    &-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;

      @media (max-width: 767px) {
        grid-template-columns: 1fr;
      }
    }

    .service-card {
      background: $white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: $transition;

      &:hover {
        transform: translateY(-5px);
      }

      .service-image {
        height: 200px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: $transition;
        }
      }

      .service-content {
        padding: 2rem;

        h3 {
          margin-bottom: 1rem;
        }

        p {
          margin-bottom: 1.5rem;
        }
      }
    }
  }

  .service-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .btn {
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 500;
    transition: $transition;

    &.btn-primary {
      background-color: $primary-color;
      color: $white;

      &:hover {
        background-color: darken($primary-color, 10%);
      }
    }

    &.btn-secondary {
      background-color: $light-gray;
      color: $text-color;

      &:hover {
        background-color: darken($light-gray, 10%);
      }
    }
  }
}
</style> 