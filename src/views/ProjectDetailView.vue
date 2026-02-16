<script setup>
import { computed } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import AppHeader from '@/components/layout/AppHeader.vue';
import { useProjects } from '@/composables/useProjects';
import { useRecords } from '@/composables/useRecords';
import RecordList from '@/components/records/RecordList.vue';

const route = useRoute();
const router = useRouter();
const projectId = Number(route.params.id);

const { getProject, getProjectStats, deleteProject } = useProjects();
const { getRecordsByProject, deleteRecordsByProject } = useRecords();

const project = computed(() => getProject(projectId));
const stats = computed(() => getProjectStats(projectId));
const records = computed(() => getRecordsByProject(projectId) || []); // garante array

function handleDelete() {
  if (confirm('Tem certeza que deseja excluir este projeto?')) {
    deleteRecordsByProject(projectId); // remove registros
    deleteProject(projectId); // remove projeto
    router.back(); // volta para página anterior
  }
}
</script>

<template>
  <div v-if="project" class="page">
    <AppHeader 
      title="Projetos" 
      show-back 
      @back="router.back()" 
    />

    <div class="project-header">
      <h1 class="project-title">{{ project.title }}</h1>
      <p class="subtitle">{{ project.description }}</p>
    </div>

    <div class="stats">
      <div class="stat-card">
        <div class="stat-value">{{ stats.totalRecords }}</div>
        <div class="stat-label">Registros</div>
      </div>

      <div class="stat-card">
        <div class="stat-value">{{ stats.totalDuration }}</div>
        <div class="stat-label">Minutos</div>
      </div>
    </div>

    <!-- Lista de registros -->
    <div v-if="records.length > 0">
      <RecordList :records="records" />
    </div>
    <div v-else class="empty">
      <p>📭</p>
      <p>Nenhum registro ainda</p>
      <RouterLink 
        :to="{ path: '/records/new/edit', query: { projectId } }"
        class="btn"
      >
        Criar primeiro registro
      </RouterLink>
    </div>

    <div class="actions">
      <RouterLink
        :to="{ path: '/records/new/edit', query: { projectId } }"
        class="fab"
      >
        +
      </RouterLink>

      <button class="delete-btn" @click="handleDelete">
        Excluir Projeto
      </button>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 24px;
  margin-top: 64px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  font-family: 'Inter', sans-serif;
}

.project-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
}

.project-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-color);
}

.subtitle {
  color: var(--muted-text);
  font-size: 16px;
}

/* Stats */
.stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.stat-card {
  text-align: center;
  background: var(--card-bg);
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
}

.stat-label {
  font-size: 14px;
  color: var(--muted-text);
}

/* Mensagem vazio */
.empty {
  text-align: center;
  padding: 60px 20px;
  color: var(--muted-text);
  background: var(--card-bg);
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
}

.empty p:first-child {
  font-size: 48px;
  margin-bottom: 16px;
}

.btn {
  display: inline-block;
  margin-top: 20px;
  padding: 12px 24px;
  background: #0b5cff;
  color: white;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 700;
  transition: transform 0.1s ease, background 0.2s ease;
}

.btn:hover {
  background: #094ecf;
  transform: translateY(-2px);
}

/* FAB */
.fab {
  position: fixed;
  bottom: 28px;
  right: 28px;
  width: 60px;
  height: 60px;
  background: #0b5cff;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: bold;
  text-decoration: none;
  box-shadow: 0 8px 20px rgba(0,0,0,0.25);
  transition: transform 0.2s ease, background 0.3s ease, box-shadow 0.3s ease;
}

.fab:hover {
  background: #094ecf;
  box-shadow: 0 10px 28px rgba(0,0,0,0.3);
  transform: translateY(-2px);
}

.fab:active {
  transform: scale(0.9);
}

/* Botão de excluir projeto */
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 12px;
}

.delete-btn {
  background: #ff4d4f;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 700;
  transition: transform 0.1s ease, background 0.2s ease;
}

.delete-btn:hover {
  background: #e03e3f;
}

.delete-btn:active {
  transform: scale(0.95);
}
</style>
