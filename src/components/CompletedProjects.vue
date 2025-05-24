<template>
  <section class="completed-projects">
    <h2 class="section-title">Реализованные проекты</h2>
    <div class="projects-grid">
      <div v-for="project in projects" :key="project.id" class="project-card">
        <router-link :to="{ name: 'project-details', params: { id: project.id }}" class="project-link">
          <img :src="project.image" :alt="project.title" class="project-image">
          <div class="project-info">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <div class="project-details">
              <span class="project-date">{{ project.date }}</span>
              <span class="project-location">{{ project.location }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CompletedProjects',
  props: {
    projects: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>

<style scoped>
.completed-projects {
  padding: 4rem 0;
}

.section-title {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  color: #333;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
}

.project-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
}

.project-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.project-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.project-info {
  padding: 1.5rem;
}

.project-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.project-description {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.project-details {
  display: flex;
  justify-content: space-between;
  color: #888;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }
}
</style> 