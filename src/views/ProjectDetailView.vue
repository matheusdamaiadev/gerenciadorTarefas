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
const records = computed(() => getRecordsByProject(projectId));

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

    <RecordList :records="records" />

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
  padding: 20px;
  margin-top: 64px; /* espaço para o header fixo */
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.project-header {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 24px;
}

.project-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-color);
}

.subtitle {
  color: var(--muted-text);
}

/* Stats */
.stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.stat-card {
  text-align: center;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
}

.stat-label {
  font-size: 14px;
  color: var(--muted-text);
}

/* Record List */
a {
  text-decoration: none; /* remove sublinhado dos links */
  color: inherit;
}

/* FAB */
.fab {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  background: #0b5cff;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  text-decoration: none;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  transition: transform 0.2s;
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
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.1s ease, background 0.2s ease;
}

.delete-btn:hover {
  background: #e03e3f;
}

.delete-btn:active {
  transform: scale(0.95);
}
</style>
