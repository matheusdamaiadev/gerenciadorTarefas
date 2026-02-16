<script setup>
import { RouterLink } from 'vue-router';
import { onMounted } from 'vue';
import AppHeader from '@/components/layout/AppHeader.vue';
import { useRecordsStore } from '@/stores/records';
import { useProjectsStore } from '@/stores/projects';

const recordsStore = useRecordsStore();
const projectsStore = useProjectsStore();

// Carregar dados ao montar a Home
onMounted(async () => {
  if (recordsStore.records.length === 0) {
    await recordsStore.loadRecords(); // garante que registros estão carregados
  }
  if (projectsStore.projects.length === 0) {
    await projectsStore.fetchProjects(); // garante que projetos estão carregados
  }
});
</script>

<template>
  <div>
    <AppHeader title="Registro de Atividades" />

    <div class="page">
      <!-- HERO -->
      <div class="hero">
        <h2>Bem-vindo!</h2>
        <p>Registre e acompanhe suas atividades e projetos</p>
      </div>

      <!-- STATS -->
      <div class="stats">
        <div class="stat-card">
          <div class="stat-value">{{ recordsStore.records.length }}</div>
          <div class="stat-label">Registros</div>
        </div>

        <div class="stat-card">
          <div class="stat-value">
            {{ recordsStore.records.reduce((sum, r) => sum + r.duration, 0) }}
          </div>
          <div class="stat-label">Minutos</div>
        </div>

        <div class="stat-card">
          <div class="stat-value">{{ projectsStore.projects.length }}</div>
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
.page { 
  max-width: 900px;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: 'Inter', sans-serif;
}

/* HERO */
.hero {
  margin-top: 80px;
  text-align: center;
}

.hero h2 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--text-color);
}

.hero p {
  font-size: 16px;
  color: var(--muted-text);
}

/* STATS */
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 20px;
}

.stat-card {
  background: var(--card-bg);
  padding: 24px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--border-color);
  transition: transform 0.15s ease, background 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.1);
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: #0b5cff;
  margin-bottom: 6px;
}

.stat-label {
  font-size: 14px;
  color: var(--muted-text);
}

/* MENU */
.menu {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  color: var(--text-color);
  border-radius: 16px;
  background: var(--card-bg);
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
  border: 1px solid var(--border-color);
  transition: 
    transform 0.15s ease,
    background 0.3s ease,
    box-shadow 0.3s ease;
}

.menu-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(0,0,0,0.1);
}

.menu-item:active {
  transform: scale(0.97);
}
</style>
