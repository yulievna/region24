<template>
  <div class="profile-page">
    <div class="container">
      <h1>Личный кабинет</h1>
      
      <!-- Информация о пользователе -->
      <div class="user-info">
        <h2>Информация о пользователе</h2>
        <p><strong>Email:</strong> {{ user.email }}</p>
      </div>

      <!-- Заявки пользователя -->
      <div class="applications-section">
        <h2>Мои заявки</h2>
        <div v-if="applications.length" class="applications-list">
          <div v-for="application in applications" :key="application.id" class="application-card">
            <div class="application-header">
              <h3>{{ application.title }}</h3>
              <span :class="['status', application.status]">{{ getStatusText(application.status) }}</span>
            </div>
            <p class="application-description">{{ application.description }}</p>
            <div class="application-meta">
              <span class="date">{{ application.date }}</span>
              <span class="type">{{ application.type }}</span>
            </div>
          </div>
        </div>
        <p v-else class="no-data">У вас пока нет заявок</p>
      </div>

      <!-- Реализованные проекты -->
      <div class="projects-section">
        <h2>Мои проекты</h2>
        <div v-if="projects.length" class="projects-grid">
          <div v-for="project in projects" :key="project.id" class="project-card">
            <img :src="project.image" :alt="project.title" class="project-image">
            <div class="project-info">
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
              <div class="project-meta">
                <span class="date">{{ project.date }}</span>
                <router-link :to="{ name: 'project-details', params: { id: project.id }}" class="btn btn-link">
                  Подробнее
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <p v-else class="no-data">У вас пока нет реализованных проектов</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      user: {},
      applications: [],
      projects: []
    }
  },
  created() {
    this.loadUserData()
    this.loadApplications()
    this.loadProjects()
  },
  methods: {
    loadUserData() {
      const userData = localStorage.getItem('user')
      if (userData) {
        this.user = JSON.parse(userData)
      }
    },
    async loadApplications() {
      // TODO: Заменить на реальный API-запрос
      this.applications = [
        {
          id: 1,
          title: 'Ремонт кровли',
          description: 'Необходим ремонт кровли частного дома',
          status: 'pending',
          date: '15.03.2024',
          type: 'Кровельные работы'
        },
        {
          id: 2,
          title: 'Установка водосточной системы',
          description: 'Требуется установка водосточной системы',
          status: 'completed',
          date: '01.03.2024',
          type: 'Водосточные системы'
        }
      ]
    },
    async loadProjects() {
      // TODO: Заменить на реальный API-запрос
      this.projects = [
        {
          id: 1,
          title: 'Ремонт кровли жилого дома',
          description: 'Комплексный ремонт кровли с заменой покрытия',
          image: '/path/to/image1.jpg',
          date: 'Январь 2024'
        },
        {
          id: 2,
          title: 'Монтаж водосточной системы',
          description: 'Установка современной водосточной системы',
          image: '/path/to/image2.jpg',
          date: 'Февраль 2024'
        }
      ]
    },
    getStatusText(status) {
      const statusMap = {
        pending: 'В обработке',
        in_progress: 'В работе',
        completed: 'Завершен',
        cancelled: 'Отменен'
      }
      return statusMap[status] || status
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.profile-page {
  padding: 4rem 0;
  background-color: $light-gray;
  min-height: calc(100vh - 60px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

h1 {
  margin-bottom: 2rem;
  color: $text-color;
}

h2 {
  margin-bottom: 1.5rem;
  color: $text-color;
}

.user-info {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.applications-section,
.projects-section {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.application-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.application-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h3 {
    margin: 0;
  }
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;

  &.pending {
    background-color: #fff3cd;
    color: #856404;
  }

  &.in_progress {
    background-color: #cce5ff;
    color: #004085;
  }

  &.completed {
    background-color: #d4edda;
    color: #155724;
  }

  &.cancelled {
    background-color: #f8d7da;
    color: #721c24;
  }
}

.application-description {
  color: $text-color;
  margin-bottom: 1rem;
}

.application-meta {
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 0.9rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.project-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
}

.project-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.project-info {
  padding: 1.5rem;

  h3 {
    margin-bottom: 0.5rem;
  }

  p {
    color: $text-color;
    margin-bottom: 1rem;
  }
}

.project-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
  font-size: 0.9rem;
}

.btn-link {
  color: $primary-color;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
}

.no-data {
  text-align: center;
  color: #666;
  padding: 2rem;
}

@media (max-width: 768px) {
  .profile-page {
    padding: 2rem 0;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .application-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style> 