<template>
  <div class="project-details">
    <!-- Hero Section -->
    <div class="project-hero">
      <div class="hero-content">
        <h1 class="project-title">{{ project.title }}</h1>
        <div class="project-meta">
          <span class="project-date"><i class="fas fa-calendar"></i> {{ project.date }}</span>
          <span class="project-location"><i class="fas fa-map-marker-alt"></i> {{ project.location }}</span>
        </div>
      </div>
      <div class="hero-image">
        <img :src="project.mainImage" :alt="project.title">
      </div>
    </div>

    <!-- Project Overview -->
    <div class="project-overview">
      <div class="container">
        <div class="overview-grid">
          <div class="overview-item">
            <i class="fas fa-ruler-combined"></i>
            <h3>Площадь</h3>
            <p>{{ project.specifications.area }}</p>
          </div>
          <div class="overview-item">
            <i class="fas fa-clock"></i>
            <h3>Срок выполнения</h3>
            <p>{{ project.specifications.duration }}</p>
          </div>
          <div class="overview-item">
            <i class="fas fa-tools"></i>
            <h3>Тип работ</h3>
            <p>{{ project.specifications.workType }}</p>
          </div>
          <div class="overview-item">
            <i class="fas fa-money-bill-wave"></i>
            <h3>Стоимость</h3>
            <p>{{ project.specifications.cost }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Project Description -->
    <div class="project-description">
      <div class="container">
        <h2>О проекте</h2>
        <div class="description-content">
          <p>{{ project.description }}</p>
          <div class="description-features">
            <h3>Основные особенности:</h3>
            <ul>
              <li v-for="(feature, index) in project.features" :key="index">
                <i class="fas fa-check"></i>
                {{ feature }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Project Gallery -->
    <div class="project-gallery">
      <div class="container">
        <h2>Галерея проекта</h2>
        <div class="gallery-grid">
          <div 
            v-for="(image, index) in project.images" 
            :key="index"
            class="gallery-item"
            @click="openLightbox(index)"
          >
            <img :src="image" :alt="'Фото проекта ' + (index + 1)">
          </div>
        </div>
      </div>
    </div>

    <!-- Project Process -->
    <div class="project-process">
      <div class="container">
        <h2>Этапы реализации</h2>
        <div class="process-timeline">
          <div 
            v-for="(step, index) in project.process" 
            :key="index"
            class="process-step"
          >
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="project-cta">
      <div class="container">
        <h2>Хотите реализовать похожий проект?</h2>
        <p>Свяжитесь с нами для консультации и расчета стоимости</p>
        <router-link to="/contacts" class="btn btn-primary">Заказать услугу</router-link>
      </div>
    </div>

    <!-- Lightbox -->
    <div v-if="isLightboxOpen" class="lightbox" @click="closeLightbox">
      <button class="lightbox-close" @click="closeLightbox">&times;</button>
      <button class="lightbox-nav prev" @click.stop="prevImage">&lt;</button>
      <button class="lightbox-nav next" @click.stop="nextImage">&gt;</button>
      <img :src="currentImage" :alt="project.title">
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectDetails',
  data() {
    return {
      project: {
        id: '',
        title: '',
        date: '',
        location: '',
        mainImage: '',
        description: '',
        images: [],
        features: [],
        specifications: {
          area: '',
          duration: '',
          workType: '',
          cost: ''
        },
        process: []
      },
      currentImageIndex: 0,
      isLightboxOpen: false
    }
  },
  computed: {
    currentImage() {
      return this.project.images[this.currentImageIndex]
    }
  },
  created() {
    const projectId = this.$route.params.id
    this.fetchProjectData(projectId)
  },
  methods: {
    fetchProjectData(projectId) {
      // TODO: Заменить на реальный API-запрос
      this.project = {
        id: projectId,
        title: 'Ремонт кровли жилого дома',
        date: 'Январь 2024',
        location: 'Москва, ул. Примерная, 123',
        mainImage: '/path/to/main-image.jpg',
        description: 'Комплексный ремонт кровли жилого дома с заменой кровельного покрытия, утеплением и гидроизоляцией. Проект включал в себя демонтаж старого покрытия, ремонт стропильной системы, укладку нового утеплителя и монтаж современной кровельной системы.',
        images: [
          '/path/to/image1.jpg',
          '/path/to/image2.jpg',
          '/path/to/image3.jpg',
          '/path/to/image4.jpg',
          '/path/to/image5.jpg',
          '/path/to/image6.jpg'
        ],
        features: [
          'Замена кровельного покрытия на современный материал',
          'Утепление кровли минеральной ватой',
          'Устройство гидроизоляции',
          'Ремонт водосточной системы',
          'Установка снегозадержателей',
          'Монтаж вентиляционных элементов'
        ],
        specifications: {
          area: '120 м²',
          duration: '3 недели',
          workType: 'Кровельные работы',
          cost: '850 000 ₽'
        },
        process: [
          {
            title: 'Обследование и замеры',
            description: 'Проведение детального обследования кровли, замеры и составление сметы'
          },
          {
            title: 'Подготовительные работы',
            description: 'Демонтаж старого покрытия и подготовка основания'
          },
          {
            title: 'Ремонт стропильной системы',
            description: 'Усиление и ремонт несущих конструкций кровли'
          },
          {
            title: 'Утепление и гидроизоляция',
            description: 'Укладка утеплителя и монтаж гидроизоляционного слоя'
          },
          {
            title: 'Монтаж кровельного покрытия',
            description: 'Установка нового кровельного материала и комплектующих'
          },
          {
            title: 'Финальные работы',
            description: 'Монтаж водосточной системы и уборка территории'
          }
        ]
      }
    },
    openLightbox(index) {
      this.currentImageIndex = index
      this.isLightboxOpen = true
    },
    closeLightbox() {
      this.isLightboxOpen = false
    },
    prevImage() {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.project.images.length) % this.project.images.length
    },
    nextImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.project.images.length
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';

.project-details {
  background-color: $light-gray;
}

.project-hero {
  position: relative;
  height: 60vh;
  min-height: 500px;
  display: flex;
  align-items: center;
  color: $white;
  overflow: hidden;

  .hero-content {
    position: relative;
    z-index: 2;
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    padding: 2rem;
  }

  .hero-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.project-title {
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.project-meta {
  font-size: 1.2rem;

  span {
    margin: 0 1rem;

    i {
      margin-right: 0.5rem;
    }
  }
}

.project-overview {
  background-color: $white;
  padding: 4rem 0;
  margin-top: -4rem;
  position: relative;
  z-index: 3;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
}

.overview-item {
  i {
    font-size: 2rem;
    color: $primary-color;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: $text-color;
  }
}

.project-description {
  padding: 4rem 0;
  background-color: $white;

  h2 {
    text-align: center;
    margin-bottom: 2rem;
  }
}

.description-content {
  max-width: 800px;
  margin: 0 auto;

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 2rem;
  }
}

.description-features {
  h3 {
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;

    i {
      color: $primary-color;
      margin-right: 0.5rem;
    }
  }
}

.project-gallery {
  padding: 4rem 0;
  background-color: $light-gray;

  h2 {
    text-align: center;
    margin-bottom: 2rem;
  }
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.gallery-item {
  height: 250px;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
}

.project-process {
  padding: 4rem 0;
  background-color: $white;

  h2 {
    text-align: center;
    margin-bottom: 3rem;
  }
}

.process-timeline {
  max-width: 800px;
  margin: 0 auto;
}

.process-step {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  position: relative;

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    left: 20px;
    top: 50px;
    bottom: -20px;
    width: 2px;
    background-color: $primary-color;
  }
}

.step-number {
  width: 40px;
  height: 40px;
  background-color: $primary-color;
  color: $white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.step-content {
  h3 {
    margin-bottom: 0.5rem;
  }
}

.project-cta {
  padding: 4rem 0;
  background-color: $primary-color;
  color: $white;
  text-align: center;

  h2 {
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 2rem;
    font-size: 1.2rem;
  }

  .btn {
    background-color: $white;
    color: $primary-color;
    font-size: 1.2rem;
    padding: 1rem 2rem;

    &:hover {
      background-color: darken($white, 10%);
    }
  }
}

// Lightbox styles
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.lightbox img {
  max-width: 90%;
  max-height: 90vh;
  object-fit: contain;
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  font-size: 2rem;
  padding: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  &.prev {
    left: 20px;
  }

  &.next {
    right: 20px;
  }
}

@media (max-width: 768px) {
  .project-hero {
    height: 50vh;
    min-height: 400px;
  }

  .project-title {
    font-size: 2rem;
  }

  .project-meta {
    font-size: 1rem;

    span {
      display: block;
      margin: 0.5rem 0;
    }
  }

  .gallery-grid {
    grid-template-columns: 1fr;
  }

  .process-step {
    flex-direction: column;
    gap: 1rem;

    &:not(:last-child)::after {
      left: 20px;
      top: 40px;
      bottom: -10px;
    }
  }
}
</style> 