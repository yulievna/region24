<template>
  <div class="admin-dashboard">
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-project-diagram"></i>
        </div>
        <div class="stat-content">
          <h3>Проекты</h3>
          <p class="stat-number">{{ stats.projects }}</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-tools"></i>
        </div>
        <div class="stat-content">
          <h3>Услуги</h3>
          <p class="stat-number">{{ stats.services }}</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-envelope"></i>
        </div>
        <div class="stat-content">
          <h3>Заявки</h3>
          <p class="stat-number">{{ stats.applications }}</p>
        </div>
      </div>
    </div>

    <div class="recent-section">
      <h2>Последние заявки</h2>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Email</th>
              <th>Телефон</th>
              <th>Тема</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="application in recentApplications" :key="application.id">
              <td>{{ application.name }}</td>
              <td>{{ application.email }}</td>
              <td>{{ application.phone }}</td>
              <td>{{ application.subject }}</td>
              <td>
                <span :class="['status-badge', application.status]">
                  {{ getStatusText(application.status) }}
                </span>
              </td>
              <td>
                <button class="btn btn-sm btn-primary" @click="viewApplication(application)">
                  Просмотр
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const stats = ref({
  projects: 12,
  services: 4,
  applications: 25
})

const recentApplications = ref([
  {
    id: 1,
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    phone: '+7 (999) 123-45-67',
    subject: 'Кровельные работы',
    status: 'new'
  },
  {
    id: 2,
    name: 'Петр Петров',
    email: 'petr@example.com',
    phone: '+7 (999) 765-43-21',
    subject: 'Отделочные работы',
    status: 'in-progress'
  },
  {
    id: 3,
    name: 'Сергей Сергеев',
    email: 'sergey@example.com',
    phone: '+7 (999) 111-22-33',
    subject: 'Бетонные работы',
    status: 'completed'
  }
])

const getStatusText = (status) => {
  const statusMap = {
    'new': 'Новая',
    'in-progress': 'В работе',
    'completed': 'Завершена'
  }
  return statusMap[status] || status
}

const viewApplication = (application) => {
  // Implement view application logic
  console.log('View application:', application)
}
</script>

<style lang="scss" scoped>
.admin-dashboard {
  padding: 2rem;
  background-color: #f8f9fa;
  min-height: 100vh;

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .stat-card {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }
  }

  .stat-icon {
    width: 50px;
    height: 50px;
    background: rgba(115, 149, 174, 0.1);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;

    i {
      font-size: 1.5rem;
      color: #7395AE;
    }
  }

  .stat-content {
    h3 {
      margin: 0;
      font-size: 1rem;
      color: #666;
    }

    .stat-number {
      margin: 0.5rem 0 0;
      font-size: 1.5rem;
      font-weight: bold;
      color: #2c3e50;
    }
  }

  .recent-section {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h2 {
      margin-bottom: 1.5rem;
      color: #2c3e50;
    }
  }

  .table-container {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #eee;
    }

    th {
      font-weight: 600;
      color: #666;
      background-color: #f8f9fa;
    }

    tr:hover {
      background-color: #f8f9fa;
    }
  }

  .status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 500;

    &.new {
      background: rgba(115, 149, 174, 0.1);
      color: #7395AE;
    }

    &.in-progress {
      background: rgba(243, 156, 18, 0.1);
      color: #f39c12;
    }

    &.completed {
      background: rgba(39, 174, 96, 0.1);
      color: #27ae60;
    }
  }

  .btn-sm {
    padding: 0.25rem 0.75rem;
    font-size: 0.875rem;
  }
}
</style> 