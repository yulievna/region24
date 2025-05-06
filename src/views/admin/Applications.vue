<template>
  <div class="admin-applications">
    <div class="header">
      <h2>Управление заявками</h2>
      <div class="filters">
        <select v-model="statusFilter" class="filter-select">
          <option value="">Все статусы</option>
          <option value="new">Новые</option>
          <option value="in-progress">В работе</option>
          <option value="completed">Завершенные</option>
        </select>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Поиск по имени или email"
          class="search-input"
        >
      </div>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Email</th>
            <th>Телефон</th>
            <th>Тема</th>
            <th>Сообщение</th>
            <th>Статус</th>
            <th>Дата</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="application in filteredApplications" :key="application.id">
            <td>{{ application.id }}</td>
            <td>{{ application.name }}</td>
            <td>{{ application.email }}</td>
            <td>{{ application.phone }}</td>
            <td>{{ application.subject }}</td>
            <td>
              <button class="btn btn-sm btn-secondary" @click="viewMessage(application)">
                Просмотр
              </button>
            </td>
            <td>
              <select
                v-model="application.status"
                class="status-select"
                @change="updateStatus(application)"
              >
                <option value="new">Новая</option>
                <option value="in-progress">В работе</option>
                <option value="completed">Завершена</option>
              </select>
            </td>
            <td>{{ formatDate(application.date) }}</td>
            <td>
              <button class="btn btn-sm btn-danger" @click="deleteApplication(application)">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Message Modal -->
    <div v-if="showMessageModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Сообщение</h3>
          <button class="close-btn" @click="showMessageModal = false">&times;</button>
        </div>
        <div class="message-content">
          <p><strong>От:</strong> {{ selectedApplication?.name }}</p>
          <p><strong>Email:</strong> {{ selectedApplication?.email }}</p>
          <p><strong>Телефон:</strong> {{ selectedApplication?.phone }}</p>
          <p><strong>Тема:</strong> {{ selectedApplication?.subject }}</p>
          <div class="message-text">
            <strong>Сообщение:</strong>
            <p>{{ selectedApplication?.message }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const applications = ref([
  {
    id: 1,
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    phone: '+7 (999) 123-45-67',
    subject: 'Кровельные работы',
    message: 'Здравствуйте! Мне нужна консультация по кровельным работам. Какие материалы вы используете?',
    status: 'new',
    date: '2024-03-15T10:30:00'
  },
  {
    id: 2,
    name: 'Петр Петров',
    email: 'petr@example.com',
    phone: '+7 (999) 765-43-21',
    subject: 'Отделочные работы',
    message: 'Добрый день! Хочу узнать стоимость отделочных работ для квартиры 50м²',
    status: 'in-progress',
    date: '2024-03-14T15:45:00'
  }
])

const statusFilter = ref('')
const searchQuery = ref('')
const showMessageModal = ref(false)
const selectedApplication = ref(null)

const filteredApplications = computed(() => {
  return applications.value.filter(application => {
    const matchesStatus = !statusFilter.value || application.status === statusFilter.value
    const matchesSearch = !searchQuery.value || 
      application.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      application.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesStatus && matchesSearch
  })
})

const viewMessage = (application) => {
  selectedApplication.value = application
  showMessageModal.value = true
}

const updateStatus = (application) => {
  // Here you would typically make an API call to update the status
  console.log('Updating status:', application.id, application.status)
}

const deleteApplication = (application) => {
  if (confirm('Вы уверены, что хотите удалить эту заявку?')) {
    applications.value = applications.value.filter(a => a.id !== application.id)
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';

.admin-applications {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    .filters {
      display: flex;
      gap: 1rem;
    }
  }

  .filter-select,
  .search-input {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.875rem;
  }

  .search-input {
    min-width: 250px;
  }

  .table-container {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
      background: #f8f9fa;
    }

    tr:hover {
      background: #f8f9fa;
    }
  }

  .status-select {
    padding: 0.25rem 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.875rem;
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
      max-width: 600px;
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

    .message-content {
      padding: 1.5rem;

      p {
        margin: 0.5rem 0;
      }

      .message-text {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid #eee;

        p {
          margin-top: 0.5rem;
          white-space: pre-wrap;
        }
      }
    }
  }
}
</style> 