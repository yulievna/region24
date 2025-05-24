<template>
  <section class="service-calculator">
    <h2 class="section-title">Калькулятор стоимости услуги</h2>
    <div class="calculator-container">
      <form @submit.prevent="calculateCost" class="calculator-form">
        <div class="form-group">
          <label for="serviceType">Тип услуги</label>
          <select id="serviceType" v-model="formData.serviceType" required>
            <option value="">Выберите тип услуги</option>
            <option v-for="type in serviceTypes" :key="type.id" :value="type.id">
              {{ type.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="area">Площадь (м²)</label>
          <input 
            type="number" 
            id="area" 
            v-model.number="formData.area" 
            min="1" 
            required
          >
        </div>

        <div class="form-group">
          <label for="complexity">Сложность работ</label>
          <select id="complexity" v-model="formData.complexity" required>
            <option value="">Выберите сложность</option>
            <option value="simple">Простая</option>
            <option value="medium">Средняя</option>
            <option value="complex">Сложная</option>
          </select>
        </div>

        <div class="form-group">
          <label for="deadline">Срок выполнения (дней)</label>
          <input 
            type="number" 
            id="deadline" 
            v-model.number="formData.deadline" 
            min="1" 
            required
          >
        </div>

        <button type="submit" class="calculate-btn">Рассчитать стоимость</button>
      </form>

      <div v-if="calculatedCost" class="calculation-result">
        <h3>Предварительная стоимость:</h3>
        <p class="cost">{{ calculatedCost }} ₽</p>
        <p class="note">*Цена является ориентировочной и может меняться в зависимости от конкретных требований</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ServiceCalculator',
  props: {
    serviceTypes: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      formData: {
        serviceType: '',
        area: null,
        complexity: '',
        deadline: null
      },
      calculatedCost: null
    }
  },
  methods: {
    calculateCost() {
      // Базовая стоимость за квадратный метр
      const baseCost = 1000;
      
      // Множители сложности
      const complexityMultipliers = {
        simple: 1,
        medium: 1.5,
        complex: 2
      };

      // Расчет стоимости
      let cost = this.formData.area * baseCost;
      cost *= complexityMultipliers[this.formData.complexity];
      
      // Учет срочности
      if (this.formData.deadline < 7) {
        cost *= 1.3; // Наценка 30% за срочность
      }

      this.calculatedCost = Math.round(cost);
    }
  }
}
</script>

<style scoped>
.service-calculator {
  padding: 4rem 0;
  background-color: #f9f9f9;
}

.section-title {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  color: #333;
}

.calculator-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.calculator-form {
  display: grid;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 500;
  color: #333;
}

input, select {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.calculate-btn {
  background-color: #4CAF50;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.calculate-btn:hover {
  background-color: #45a049;
}

.calculation-result {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #ddd;
  text-align: center;
}

.cost {
  font-size: 2rem;
  font-weight: bold;
  color: #4CAF50;
  margin: 1rem 0;
}

.note {
  color: #666;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .calculator-container {
    padding: 1rem;
  }
}
</style> 