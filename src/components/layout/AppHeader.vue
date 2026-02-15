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
const showMobileMenu = ref(false)

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

function toggleMobileMenu() {
  showMobileMenu.value = !showMobileMenu.value
}
</script>

<template>
  <header class="app-header">
    <!-- Botão voltar -->
    <button
      v-if="showBack"
      @click="$emit('back')"
      class="btn-back"
    >
      ←
    </button>

    <!-- Título -->
    <h1>{{ title }}</h1>

    <!-- Ações desktop -->
    <div class="header-actions desktop">
      <button @click="toggleDarkMode" class="theme-btn">
        {{ darkMode ? '☀️' : '🌙' }}
      </button>

      <RouterLink to="/" class="btn-home">
        🏠
      </RouterLink>
    </div>

    <!-- Hambúrguer mobile -->
    <button class="hamburger mobile" @click="toggleMobileMenu">
      ☰
    </button>

    <!-- Menu mobile full width -->
    <div v-if="showMobileMenu" class="mobile-menu">
      <button @click="toggleDarkMode" class="mobile-menu-item">
        {{ darkMode ? '☀️ Modo Claro' : '🌙 Modo Escuro' }}
      </button>
      <RouterLink to="/" class="mobile-menu-item" @click="showMobileMenu = false">
        🏠 Home
      </RouterLink>
    </div>
  </header>
</template>

<style scoped>
/* ===== HEADER ===== */
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #0b5cff;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  z-index: 100;
  justify-content: space-between;
  font-family: 'Inter', sans-serif;
}

/* Botão voltar */
.btn-back {
  background: none;
  border: none;
  color: white;
  font-size: 22px;
  cursor: pointer;
  padding: 8px;
  margin-right: 12px;
  transition: transform 0.15s ease, opacity 0.2s ease;
}
.btn-back:hover {
  transform: scale(1.1);
  opacity: 0.85;
}

/* Título alinhado à esquerda */
.app-header h1 {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  flex: 1;
  text-align: left;
}

/* Ações desktop */
.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Botões */
.theme-btn,
.btn-home {
  background: transparent;
  border: none;
  color: white;
  font-size: 22px;
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  transition: transform 0.15s ease, background 0.2s ease;
  text-decoration: none; /* remove sublinhado da home */
}

.theme-btn:hover,
.btn-home:hover {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 0.15);
}

/* ===== MOBILE ===== */
.hamburger {
  display: none;
  background: none;
  border: none;
  font-size: 28px;
  color: white;
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  transition: transform 0.15s ease, background 0.2s ease;
}
.hamburger:hover {
  transform: scale(1.1);
  background: rgba(255,255,255,0.15);
}

/* Menu mobile full width */
.mobile-menu {
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  background: var(--card-bg);
  border-top: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  z-index: 200;
}

.mobile-menu-item {
  padding: 16px;
  background: transparent;
  border: none;
  width: 100%;
  text-align: left;
  font-size: 18px;
  color: var(--text-color);
  cursor: pointer;
  transition: background 0.2s ease;
  text-decoration: none; /* remove sublinhado da home mobile */
}
.mobile-menu-item:hover {
  background: rgba(11,92,255,0.1);
}

/* RESPONSIVIDADE */
@media (max-width: 768px) {
  .desktop {
    display: none;
  }
  .mobile {
    display: block;
  }
}
</style>
