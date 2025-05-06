<template>
  <header class="header">
    <div class="header-top">
      <div class="container">
        <div class="header-top-content">
          <div class="contact-info">
            <a href="tel:+1234567890" class="contact-item">
              <i class="fas fa-phone"></i>
              <span>+1 (234) 567-890</span>
            </a>
            <a href="mailto:info@region24.com" class="contact-item">
              <i class="fas fa-envelope"></i>
              <span>info@region24.com</span>
            </a>
          </div>
          <div class="social-links">
            <a href="#" class="social-link" target="_blank">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="social-link" target="_blank">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#" class="social-link" target="_blank">
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a href="#" class="social-link" target="_blank">
              <i class="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
// Component logic here
</script>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';

.header {
  &-top {
    background-color: $primary-color;
    padding: 0.5rem 0;
    color: $white;

    &-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .contact-info {
    display: flex;
    gap: 1.5rem;

    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: $white;
      text-decoration: none;
      transition: $transition;

      &:hover {
        opacity: 0.8;
      }

      i {
        font-size: 1rem;
      }
    }
  }

  .social-links {
    display: flex;
    gap: 1rem;

    .social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: rgba($white, 0.1);
      color: $white;
      text-decoration: none;
      transition: $transition;

      &:hover {
        background-color: rgba($white, 0.2);
        transform: translateY(-2px);
      }

      i {
        font-size: 0.9rem;
      }
    }
  }

  @include mobile {
    .header-top-content {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }

    .contact-info {
      justify-content: center;
    }

    .social-links {
      justify-content: center;
    }
  }
}
</style> 