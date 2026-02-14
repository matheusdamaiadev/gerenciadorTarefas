<script setup>
import { RouterLink } from 'vue-router';
import AppHeader from '@/components/layout/AppHeader.vue';
import { useRecords } from '@/composables/useRecords';
import { useProjects } from '@/composables/useProjects';

const { totalRecords, totalDuration } = useRecords();
const { totalProjects } = useProjects();
</script>

<template>
  <div>
    <AppHeader title="Registro de Atividades" />

    <div class="page">
      <div class="hero">
        <h2>Bem-vindo!</h2>
        <p>Registre e acompanhe suas atividades e projetos</p>
      </div>

      <!-- STATS -->
      <div class="stats">
        <div class="stat-card">
          <div class="stat-value">{{ totalRecords }}</div>
          <div class="stat-label">Registros</div>
        </div>

        <div class="stat-card">
          <div class="stat-value">{{ totalDuration }}</div>
          <div class="stat-label">Minutos</div>
        </div>

        <div class="stat-card">
          <div class="stat-value">{{ totalProjects }}</div>
          <div class="stat-label">Projetos</div>
        </div>
      </div>

      <!-- MENU -->
      <nav class="menu">
        <RouterLink to="/records" class="menu-item">
          📋 Ver registros
        </RouterLink>

        <RouterLink to="/records/new/edit" class="menu-item">
          ➕ Novo registro
        </RouterLink>

        <RouterLink to="/projects" class="menu-item">
          📁 Ver projetos
        </RouterLink>

        <RouterLink to="/projects/create" class="menu-item">
          🚀 Criar projeto
        </RouterLink>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.hero {
  text-align: center;
  margin-bottom: 32px;
}

.hero h2 {
  font-size: 24px;
  margin-bottom: 8px;
  color: var(--text-color);
}

.hero p {
  color: var(--muted-text);
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 32px;
}

.stat-card {
  background: var(--card-bg);
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--border-color);
  transition: background 0.3s ease, border 0.3s ease;
}

.stat-value {
  font-size: 32px;
  font-weight: bold;
  color: #0b5cff;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: var(--muted-text);
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.menu-item {
  display: block;
  padding: 20px;
  background: var(--card-bg);
  border-radius: 12px;
  text-decoration: none;
  color: var(--text-color);
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--border-color);
  transition: 
    transform 0.1s ease,
    background 0.3s ease,
    border 0.3s ease;
}

.menu-item:active {
  transform: scale(0.98);
}
</style>
