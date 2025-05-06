<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>Регион 24</h3>
        <p>Проектно-строительная компания мастерская</p>
      </div>
      <div class="footer-section">
        <h3>Контакты</h3>
        <p>Email: info@region24.com</p>
        <p>Phone: +1 234 567 890</p>
      </div>
    
    </div>
    <div class="footer-bottom">
      <p>&copy; {{ new Date().getFullYear() }} Регион 24. Все права защищены.</p>
    </div>
  </footer>
</template>

<script setup>
// Component logic can be added here if needed
</script>

<style lang="scss" scoped>
.footer {
  background: #7395AE;
  color: white;
  padding: 3rem 0 1rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  padding: 0 2rem;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

.footer-section {
  h3 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }

  p {
    margin-bottom: 0.5rem;
    opacity: 0.8;
  }

  &:nth-child(3) {
    grid-column: span 2;
    text-align: center;

    @media (max-width: 767px) {
      grid-column: span 1;
    }
  }
}

.social-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 767px) {
    justify-content: center;
  }

  a {
    color: white;
    text-decoration: none;
    opacity: 0.8;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 1;
    }
  }
}

.footer-bottom {
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
</style> 