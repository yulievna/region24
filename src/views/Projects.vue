<template>
  <div class="projects">
    <!-- Projects Header -->
    <section class="projects-header">
      <div class="container">
        <h1 class="text-center">Наши проекты</h1>
        <p class="text-center">Ознакомьтесь с нашими реализованными проектами</p>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="projects-grid">
      <div class="container">
        <div class="projects-filters">
          <button 
            v-for="category in categories" 
            :key="category"
            :class="['filter-btn', { active: selectedCategory === category }]"
            @click="selectedCategory = category"
          >
            {{ category }}
          </button>
        </div>
        <div class="projects-list">
          <div 
            v-for="project in filteredProjects" 
            :key="project.id" 
            class="project-card"
          >
            <div class="project-image">
              <img :src="project.image" :alt="project.title">
            </div>
            <div class="project-content">
              <h3>{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>
              <div class="project-meta">
                <span class="project-category">{{ project.category }}</span>
                <span class="project-date">{{ project.date }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const categories = [
  'Все',
  'Кровельные работы',
  'Отделочные работы',
  'Бетонные работы'
]

const selectedCategory = ref('Все')

const projects = ref([
  {
    id: 1,
    title: 'Кровельные работы в жилом доме',
    description: 'Комплексные кровельные работы с использованием современных материалов',
    category: 'Кровельные работы',
    date: '15 марта 2024',
    image: '/images/projects/project1.jpg'
  },
  {
    id: 2,
    title: 'Отделка квартиры',
    description: 'Полный цикл отделочных работ в современном стиле',
    category: 'Отделочные работы',
    date: '10 марта 2024',
    image: '/images/projects/project2.jpg'
  },
  {
    id: 3,
    title: 'Бетонные работы на объекте',
    description: 'Профессиональное бетонирование с использованием современной техники',
    category: 'Бетонные работы',
    date: '5 марта 2024',
    image: '/images/projects/project3.jpg'
  }
])

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'Все') {
    return projects.value
  }
  return projects.value.filter(project => project.category === selectedCategory.value)
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';

.projects {
  background-color: $light-gray;

  .projects-header {
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

  .projects-grid {
    padding: 5rem 0;
  }

  .projects-filters {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
  }

  .filter-btn {
    padding: 0.75rem 1.5rem;
    border: 1px solid $primary-color;
    border-radius: 4px;
    background: none;
    color: $primary-color;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: rgba($primary-color, 0.1);
    }

    &.active {
      background: $primary-color;
      color: white;
    }
  }

  .projects-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }

  .project-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .project-image {
      height: 200px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      &:hover img {
        transform: scale(1.05);
      }
    }

    .project-content {
      padding: 1.5rem;

      h3 {
        margin: 0 0 0.5rem;
      }

      .project-description {
        color: #666;
        margin-bottom: 1rem;
      }

      .project-meta {
        display: flex;
        justify-content: space-between;
        font-size: 0.875rem;
        color: #666;
      }
    }
  }
}
</style> 