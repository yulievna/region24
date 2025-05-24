<template>
  <div class="contacts">
    <!-- Contacts Header -->
    <section class="contacts-header">
      <div class="container">
        <h1 class="text-center">Свяжитесь с нами</h1>
        <p class="text-center">Свяжитесь с нашей командой</p>
      </div>
    </section>

    <!-- Contact Information -->
    <section class="contact-info">
      <div class="container">
        <div class="info-grid">
          <div class="info-card">
            <div class="info-icon">
              <i class="fas fa-map-marker-alt"></i>
            </div>
            <h3>Адрес</h3>
            <p>Северное шоссе, д. 11д к. 1, офис 5</p>
            <p>Район Северный</p>
            <p>Город Красноярск</p>
          </div>
          <div class="info-card">
            <div class="info-icon">
              <i class="fas fa-phone"></i>
            </div>
            <h3>Телефон</h3>
            <p>+1 (234) 567-8900</p>
            <p>+1 (234) 567-8901</p>
          </div>
          <div class="info-card">
            <div class="info-icon">
              <i class="fas fa-envelope"></i>
            </div>
            <h3>Email</h3>
            <p>info@region24.com</p>
            <p>support@region24.com</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Form and Map -->
    <section class="contact-form-map">
      <div class="container">
        <div class="form-map-grid">
          <div class="contact-form">
            <h2>Отправьте нам заявку</h2>
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <label for="name">Имя</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="form.name" 
                  required
                  placeholder="Ваше имя"
                >
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email" 
                  required
                  placeholder="Ваш email"
                >
              </div>
              <div class="form-group">
                <label for="phone">Телефон</label>
                <input 
                  type="tel" 
                  id="phone" 
                  v-model="form.phone"
                  placeholder="Ваш номер телефона"
                >
              </div>
              <div class="form-group">
                <label for="message">Сообщение</label>
                <textarea 
                  id="message" 
                  v-model="form.message" 
                  required
                  rows="5"
                  placeholder="Ваше сообщение"
                ></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Отправить заявку</button>
            </form>
          </div>
          <div class="map-container">
            <img src="@/assets/images/map.jpg">
            <!-- <div id="map" ref="mapContainer" class="map" style="width: 600px; height: 400px"></div> -->
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const mapContainer = ref(null);

onMounted(async () => {
  await initMap();
});

async function initMap() {
  // Проверяем, что API загружено
  if (!window.ymaps3) {
    console.error('Yandex Maps API not loaded');
    return;
  }

  // Ждем загрузки API
  await window.ymaps3.ready;

  const { YMap, YMapDefaultSchemeLayer } = window.ymaps3;

  try {
    // Инициализируем карту
    const map = new YMap(
      // Используем ref контейнера
      mapContainer.value,
      {
        location: {
          center: [37.588144, 55.733842],
          zoom: 10
        }
      }
    );

    // Добавляем слой карты
    map.addChild(new YMapDefaultSchemeLayer());
    
    // Можно сохранить инстанс карты в ref если нужен доступ из других методов
    // mapInstance.value = map;

  } catch (error) {
    console.error('Error initializing map:', error);
  }
}
const form = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const handleSubmit = async () => {
  // Here you would typically send the form data to your backend
  console.log('Form submitted:', form.value)
  // Reset form
  form.value = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  }
}

onMounted(() => {
  // Initialize map (example using Google Maps)
  // const mapOptions = {
  //   center: { lat: 40.7128, lng: -74.0060 }, // Replace with your location
  //   zoom: 15,
  //   styles: [
  //     {
  //       featureType: 'all',
  //       elementType: 'geometry',
  //       stylers: [{ color: '#f5f5f5' }]
  //     },
  //     {
  //       featureType: 'water',
  //       elementType: 'geometry',
  //       stylers: [{ color: '#c9c9c9' }]
  //     }
  //   ]
  // }

  // Initialize map here
  // const map = new google.maps.Map(document.getElementById('map'), mapOptions)
  // const marker = new google.maps.Marker({
  //   position: mapOptions.center,
  //   map: map,
  //   title: 'Region 24'
  // })
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';

.contacts {
  background-color: $light-gray;
  .contacts-header {
    background-color: $light-gray;
    padding: 5rem 0 2rem;
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

  .contact-info {
    padding: 5rem 0;

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }
  }

  .info-card {
    text-align: center;
    padding: 2rem;
    background: $white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    .info-icon {
      font-size: 2.5rem;
      color: $primary-color;
      margin-bottom: 1rem;
    }

    h3 {
      margin-bottom: 1rem;
    }

    p {
      margin-bottom: 0.5rem;
      color: $text-color;
    }
  }

  .contact-form-map {
    padding: 5rem 0;
    background-color: $light-gray;

    .form-map-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;

      @include tablet {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
    }
  }
  .map-container img{
    object-fit: cover;
  }
  .contact-form {
    background: $white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    h2 {
      margin-bottom: 2rem;
    }
  }

  .form-group {
    margin-bottom: 1.5rem;

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    input,
    textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: $transition;

      &:focus {
        outline: none;
        border-color: $primary-color;
      }
    }
  }

  .map-container {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    .map {
      width: 100%;
      height: 100%;
    }
  }

  .social-networks {
    padding: 5rem 0;

    h2 {
      margin-bottom: 3rem;
    }

    .social-links {
      display: flex;
      justify-content: center;
      gap: 2rem;
      flex-wrap: wrap;
    }
  }

  .social-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: $text-color;
    transition: $transition;

    i {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    &:hover {
      color: $primary-color;
    }
  }
}
</style> 