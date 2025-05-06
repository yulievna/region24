<template>
  <div class="portfolio">
    <!-- Portfolio Header -->
    <section class="portfolio-header">
      <div class="container">
        <h1 class="text-center">Наши работы</h1>
        <p class="text-center">Посмотрите наши завершенные проекты и истории успеха</p>
      </div>
    </section>

    <!-- Portfolio Filter -->
    <section class="portfolio-filter">
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

    <!-- Portfolio Grid -->
    <section class="portfolio-grid">
      <div class="container">
        <div class="projects-grid">
          <div 
            v-for="project in filteredProjects" 
            :key="project.id"
            class="project-card"
            @click="openProjectModal(project)"
          >
            <div class="project-image">
              <img :src="project.image" :alt="project.title">
              <div class="project-overlay">
                <h3>{{ project.title }}</h3>
                <p>{{ project.category }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Project Modal -->
    <div v-if="selectedProject" class="modal" @click="closeProjectModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeProjectModal">
          <i class="fas fa-times"></i>
        </button>
        <div class="modal-body">
          <div class="modal-image">
            <img :src="selectedProject.image" :alt="selectedProject.title">
          </div>
          <div class="modal-info">
            <h2>{{ selectedProject.title }}</h2>
            <p class="project-category">{{ selectedProject.category }}</p>
            <div class="project-details">
              <p><strong>Location:</strong> {{ selectedProject.location }}</p>
              <p><strong>Year:</strong> {{ selectedProject.year }}</p>
              <p><strong>Duration:</strong> {{ selectedProject.duration }}</p>
            </div>
            <p class="project-description">{{ selectedProject.description }}</p>
            <div class="project-features">
              <h3>Key Features</h3>
              <ul>
                <li v-for="(feature, index) in selectedProject.features" :key="index">
                  {{ feature }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const categories = ref([
  { id: 'all', name: 'Все проекты' },
  { id: 'concrete', name: 'Бетонные работы' },
  { id: 'finishing', name: 'Отделочные работы' },
  { id: 'roofing', name: 'Кровельные работы' },
  { id: 'engineering', name: 'Прокладка инженерных коммуникаций' }
])

const selectedCategory = ref('all')
const selectedProject = ref(null)

const projects = ref([
  {
    id: 1,
    title: 'Modern Luxury Home',
    category: 'residential',
    location: 'Downtown Area',
    year: '2023',
    duration: '12 months',
    description: 'A stunning modern luxury home featuring clean lines, open spaces, and sustainable materials.',
    image: new URL('@/assets/images/services/design.jpg', import.meta.url).href,
    features: [
      'Open floor plan',
      'Smart home integration',
      'Energy-efficient design',
      'Custom kitchen',
      'Outdoor living space'
    ]
  },
  {
    id: 2,
    title: 'Corporate Office Building',
    category: 'commercial',
    location: 'Business District',
    year: '2023',
    duration: '18 months',
    description: 'A state-of-the-art office building designed for maximum efficiency and employee comfort.',
    image: new URL('@/assets/images/services/design.jpg', import.meta.url).href,
    features: [
      'LEED certification',
      'Flexible workspace design',
      'Advanced HVAC system',
      'Underground parking',
      'Rooftop garden'
    ]
  },
  {
    id: 3,
    title: 'Industrial Warehouse',
    category: 'industrial',
    location: 'Industrial Zone',
    year: '2022',
    duration: '10 months',
    description: 'A large-scale industrial warehouse with modern logistics capabilities.',
    image: new URL('@/assets/images/services/design.jpg', import.meta.url).href,
    features: [
      'High ceilings',
      'Loading docks',
      'Climate control',
      'Security systems',
      'Office space'
    ]
  },
  {
    id: 4,
    title: 'Historic Building Renovation',
    category: 'renovation',
    location: 'Historic District',
    year: '2023',
    duration: '14 months',
    description: 'Careful restoration and modernization of a historic building while preserving its character.',
    image: new URL('@/assets/images/services/design.jpg', import.meta.url).href,
    features: [
      'Original facade preservation',
      'Modern amenities',
      'Structural reinforcement',
      'Energy upgrades',
      'Accessibility improvements'
    ]
  }
])

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'all') {
    return projects.value
  }
  return projects.value.filter(project => project.category === selectedCategory.value)
})

const openProjectModal = (project) => {
  selectedProject.value = project
  document.body.style.overflow = 'hidden'
}

const closeProjectModal = () => {
  selectedProject.value = null
  document.body.style.overflow = ''
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';

.portfolio {
  background-color: $light-gray;
  .portfolio-header {
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

  .portfolio-filter {
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

  .portfolio-grid {
    padding: 5rem 0;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }

  .project-card {
    cursor: pointer;
    transition: $transition;

    &:hover {
      transform: translateY(-5px);
    }

    .project-image {
      position: relative;
      height: 300px;
      overflow: hidden;
      border-radius: 8px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: $transition;
      }

      .project-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: $transition;
        color: $white;
        text-align: center;
        padding: 2rem;

        h3 {
          margin-bottom: 0.5rem;
        }
      }

      &:hover {
        .project-overlay {
          opacity: 1;
        }

        img {
          transform: scale(1.1);
        }
      }
    }
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 2rem;

    &-content {
      background: $white;
      border-radius: 8px;
      max-width: 1000px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
    }

    &-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: $text-color;
      z-index: 1;
    }

    &-body {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      padding: 2rem;

      @include tablet {
        grid-template-columns: 1fr;
      }
    }
  }

  .modal-image {
    img {
      width: 100%;
      height: auto;
      border-radius: 4px;
    }
  }

  .modal-info {
    h2 {
      margin-bottom: 0.5rem;
    }

    .project-category {
      color: $primary-color;
      font-weight: 500;
      margin-bottom: 1rem;
    }

    .project-details {
      margin-bottom: 1.5rem;

      p {
        margin-bottom: 0.5rem;
      }
    }

    .project-description {
      margin-bottom: 2rem;
    }

    .project-features {
      h3 {
        margin-bottom: 1rem;
      }

      ul {
        list-style: none;

        li {
          margin-bottom: 0.5rem;
          padding-left: 1.5rem;
          position: relative;

          &:before {
            content: "•";
            color: $primary-color;
            position: absolute;
            left: 0;
          }
        }
      }
    }
  }
}
</style> 