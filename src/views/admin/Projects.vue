<template>
  <div class="admin-projects">
    <div class="header">
      <h2>Управление проектами</h2>
      <button class="btn btn-primary" @click="showAddModal = true">
        <i class="fas fa-plus"></i> Добавить проект
      </button>
    </div>

    <div class="projects-grid">
      <div v-for="project in projects" :key="project.id" class="project-card">
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
          <div class="project-actions">
            <button class="btn btn-sm btn-primary" @click="editProject(project)">
              <i class="fas fa-edit"></i> Редактировать
            </button>
            <button class="btn btn-sm btn-danger" @click="deleteProject(project)">
              <i class="fas fa-trash"></i> Удалить
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Project Modal -->
    <div v-if="showAddModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ editingProject ? 'Редактировать проект' : 'Добавить проект' }}</h3>
          <button class="close-btn" @click="showAddModal = false">&times;</button>
        </div>
        <form @submit.prevent="saveProject" class="project-form">
          <div class="form-group">
            <label>Название проекта</label>
            <input type="text" v-model="projectForm.title" required>
          </div>
          <div class="form-group">
            <label>Описание</label>
            <textarea v-model="projectForm.description" required></textarea>
          </div>
          <div class="form-group">
            <label>Категория</label>
            <select v-model="projectForm.category" required>
              <option value="Кровельные работы">Кровельные работы</option>
              <option value="Отделочные работы">Отделочные работы</option>
              <option value="Бетонные работы">Бетонные работы</option>
            </select>
          </div>
          <div class="form-group">
            <label>Изображение</label>
            <input type="file" @change="handleImageUpload" accept="image/*">
          </div>
          <div class="form-group">
            <label>Дата</label>
            <input type="date" v-model="projectForm.date" required>
          </div>
          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click="showAddModal = false">
              Отмена
            </button>
            <button type="submit" class="btn btn-primary">
              {{ editingProject ? 'Сохранить' : 'Добавить' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const projects = ref([
  {
    id: 1,
    title: 'Кровельные работы в жилом доме',
    description: 'Комплексные кровельные работы с использованием современных материалов',
    category: 'Кровельные работы',
    date: '2024-03-15',
    image: '/images/projects/project1.jpg'
  },
  {
    id: 2,
    title: 'Отделка квартиры',
    description: 'Полный цикл отделочных работ в современном стиле',
    category: 'Отделочные работы',
    date: '2024-03-10',
    image: '/images/projects/project2.jpg'
  }
])

const showAddModal = ref(false)
const editingProject = ref(null)
const projectForm = ref({
  title: '',
  description: '',
  category: '',
  date: '',
  image: null
})

const editProject = (project) => {
  editingProject.value = project
  projectForm.value = { ...project }
  showAddModal.value = true
}

const deleteProject = (project) => {
  if (confirm('Вы уверены, что хотите удалить этот проект?')) {
    projects.value = projects.value.filter(p => p.id !== project.id)
  }
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    projectForm.value.image = URL.createObjectURL(file)
  }
}

const saveProject = () => {
  if (editingProject.value) {
    const index = projects.value.findIndex(p => p.id === editingProject.value.id)
    if (index !== -1) {
      projects.value[index] = { ...projectForm.value }
    }
  } else {
    projects.value.push({
      id: projects.value.length + 1,
      ...projectForm.value
    })
  }
  showAddModal.value = false
  editingProject.value = null
  projectForm.value = {
    title: '',
    description: '',
    category: '',
    date: '',
    image: null
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';

.admin-projects {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .project-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    .project-image {
      height: 200px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
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
        margin-bottom: 1rem;
        font-size: 0.875rem;
        color: #666;
      }

      .project-actions {
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

    .project-form {
      padding: 1.5rem;

      .form-group {
        margin-bottom: 1rem;

        label {
          display: block;
          margin-bottom: 0.5rem;
          color: #666;
        }

        input[type="text"],
        input[type="date"],
        select,
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