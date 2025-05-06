<template>
  <div class="about">
    <!-- About Header -->
    <section class="about-header">
      <div class="container">
        <h1 class="text-center">О нас</h1>
        <p class="text-center">Строительство высшего качества с 2015 года</p>
      </div>
    </section>

    <!-- Company Story -->
    <section class="company-story">
      <div class="container">
        <div class="story-content">
          <div class="story-text">
            <h2>Наша история</h2>
            <p>Основана в 2015 году, Region 24 выросла из небольшой местной строительной компании в ведущую компанию по проектированию и строительству. Наша миссия началась с простого: доставлять безупречное качество и инновационные решения в каждом проекте, который мы принимаем на себя.</p>
            <p>На протяжении многих лет мы построили свою репутацию на доверии, экспертизе и обязательстве достичь превосходного качества. Наша команда профессионалов собирает вместе десятилетия опыта в различных аспектах строительства и дизайна.</p>
          </div>
          <div class="story-image">
            <img src="@/assets/images/services/design.jpg" alt="Company History">
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="values">
      <div class="container">
        <h2 class="section-title text-center">Наши ценности</h2>
        <div class="values-grid">
          <div class="value-card" v-for="(value, index) in values" :key="index">
            <div class="value-icon">
              <i :class="value.icon"></i>
            </div>
            <h3>{{ value.title }}</h3>
            <p>{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>


    <!-- Certificates Section -->
    <!-- <section class="certificates">
      <div class="container">
        <h2 class="section-title text-center">Наши сертификаты</h2>
        <div class="certificates-grid">
          <div class="certificate-card" v-for="(cert, index) in certificates" :key="index">
            <div class="certificate-image">
              <img :src="cert.image" :alt="cert.title">
            </div>
            <div class="certificate-info">
              <h3>{{ cert.title }}</h3>
              <p>{{ cert.description }}</p>
              <p class="cert-date">Issued: {{ cert.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <!-- Stats Section -->
    <section class="stats">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item" v-for="(stat, index) in stats" :key="index">
            <div class="stat-number">{{ stat.number }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const values = ref([
  {
    icon: 'fas fa-star',
    title: 'Превосходство',
    description: 'Мы стремимся к превосходному качеству в каждом проекте, обеспечивая самые высокие стандарты качества.'
  },
  {
    icon: 'fas fa-handshake',
    title: 'Соблюдение принципов',
    description: 'Мы поддерживаем самый высокий уровень честности в наших деловых отношениях.'
  },
  {
    icon: 'fas fa-lightbulb',
    title: 'Инновации',
    description: 'Мы принимаем инновационные решения и используем современные технологии в наших проектах.'
  },
  {
    icon: 'fas fa-users',
    title: 'Сотрудничество',
    description: 'Мы верим в силу команды и сотрудничества с клиентами.'
  }
])


// const certificates = ref([
//   {
//     title: 'ISO 9001:2015',
//     description: 'Quality Management System Certification',
//     date: '2022',
//     image: '/images/certificates/iso9001.jpg'
//   },
//   {
//     title: 'LEED Accredited',
//     description: 'Leadership in Energy and Environmental Design',
//     date: '2023',
//     image: '/images/certificates/leed.jpg'
//   },
//   {
//     title: 'Safety Excellence',
//     description: 'Occupational Health and Safety Certification',
//     date: '2023',
//     image: '/images/certificates/safety.jpg'
//   }
// ])

const stats = ref([
  {
    number: '150+',
    label: 'Проектов завершено'
  },
  {
    number: '50+',
    label: 'Сотрудников'
  },
  {
    number: '10',
    label: 'Лет опыта'
  },
  {
    number: '98%',
    label: 'Удовлетворенность клиентов'
  }
])
</script>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';

.about {
  background-color: $light-gray;
  .about-header {
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

  .company-story {
    padding: 5rem 0;

    .story-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;

      @include tablet {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
    }

    .story-text {
      h2 {
        margin-bottom: 2rem;
      }

      p {
        margin-bottom: 1.5rem;
      }
    }

    .story-image {
      img {
        width: 100%;
        height: auto;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
    }
  }

  .values {
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

  .value-card {
    text-align: center;
    padding: 2rem;
    background: $white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    .value-icon {
      font-size: 2.5rem;
      color: $primary-color;
      margin-bottom: 1rem;
    }

    h3 {
      margin-bottom: 1rem;
    }
  }

  .team {
    padding: 5rem 0;

    .section-title {
      margin-bottom: 3rem;
    }

    &-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
  }

  .team-member {
    background: $white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    .member-image {
      height: 300px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .member-info {
      padding: 2rem;

      h3 {
        margin-bottom: 0.5rem;
      }

      .position {
        color: $primary-color;
        font-weight: 500;
        margin-bottom: 1rem;
      }

      .bio {
        margin-bottom: 1.5rem;
      }

      .social-links {
        display: flex;
        gap: 1rem;

        a {
          color: $text-color;
          font-size: 1.2rem;
          transition: $transition;

          &:hover {
            color: $primary-color;
          }
        }
      }
    }
  }

  .certificates {
    padding: 5rem 0;
    background-color: $light-gray;

    .section-title {
      margin-bottom: 3rem;
    }

    &-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
  }

  .certificate-card {
    background: $white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    .certificate-image {
      height: 200px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .certificate-info {
      padding: 2rem;

      h3 {
        margin-bottom: 0.5rem;
      }

      p {
        margin-bottom: 0.5rem;
      }

      .cert-date {
        color: $text-color;
        opacity: 0.7;
      }
    }
  }

  .stats {
    padding: 5rem 0;

    &-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      text-align: center;
    }
  }

  .stat-item {
    .stat-number {
      font-size: 3rem;
      font-weight: bold;
      color: $primary-color;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      font-size: 1.1rem;
      color: $text-color;
    }
  }
}
</style> 