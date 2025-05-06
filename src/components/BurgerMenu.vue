<template>
  <button 
    class="burger-menu" 
    @click="$emit('toggle')" 
    :class="{ 'active': isActive }"
    aria-label="Toggle menu"
  >
    <span class="burger-line"></span>
    <span class="burger-line"></span>
    <span class="burger-line"></span>
  </button>
</template>

<script setup>
defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle'])
</script>

<style lang="scss" scoped>
.burger-menu {
  display: none; // Hidden by default
  background: none;
  border: none;
  width: 30px;
  height: 30px;
  position: relative;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  z-index: 201;

  .burger-line {
    width: 100%;
    height: 2px;
    background-color: #fff;
    margin: 3px 0;
    transition: all 0.3s ease;
  }

  &.active {
    .burger-line {
      &:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
      }
      &:nth-child(2) {
        opacity: 0;
      }
      &:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
      }
    }
  }
}

@media (max-width: 767px) {
  .burger-menu {
    display: flex; // Show only on mobile
  }
}
</style> 