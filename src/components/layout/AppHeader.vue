<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

defineProps({
  title: {
    type: String,
    default: 'Meu App',
  },
  showBack: Boolean,
})

defineEmits(['back'])

const darkMode = ref(false)

onMounted(() => {
  const saved = localStorage.getItem('darkMode')
  if (saved === 'true') {
    darkMode.value = true
    document.body.classList.add('dark-mode')
  }
})

function toggleDarkMode() {
  darkMode.value = !darkMode.value
  document.body.classList.toggle('dark-mode')
  localStorage.setItem('darkMode', darkMode.value)
}
</script>

<template>
  <header class="app-header">
    <button
      v-if="showBack"
      @click="$emit('back')"
      class="btn-back"
    >
      ←
    </button>

    <h1>{{ title }}</h1>

    <div class="header-actions">
      <button @click="toggleDarkMode" class="theme-btn">
        {{ darkMode ? '☀️' : '🌙' }}
      </button>

      <RouterLink to="/dashboard" class="btn-dashboard">
        📊
      </RouterLink>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  background: #0b5cff;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

/* Botão voltar */
.btn-back {
  background: none;
  border: none;
  color: white;
  font-size: 22px;
  cursor: pointer;
  padding: 8px;
  margin-right: 8px;
}

/* Título */
.app-header h1 {
  font-size: 18px;
  font-weight: 600;
  flex: 1;
  margin: 0;
}

/* Container da direita */
.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Botões da direita */
.theme-btn,
.btn-dashboard {
  background: transparent;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s ease, opacity 0.2s ease;
}

.theme-btn:hover,
.btn-dashboard:hover {
  opacity: 0.85;
  transform: scale(1.05);
}

.btn-dashboard {
  text-decoration: none;
}
</style>
