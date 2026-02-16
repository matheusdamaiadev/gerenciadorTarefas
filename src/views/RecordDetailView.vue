<script setup>
import { computed, onMounted } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import AppHeader from '@/components/layout/AppHeader.vue';
import RecordList from '@/components/records/RecordList.vue';

import { useProjectsStore } from '@/stores/projects';
import { useRecordsStore } from '@/stores/records';

const route = useRoute();
const router = useRouter();

const projectId = Number(route.params.id);

const projectsStore = useProjectsStore();
const recordsStore = useRecordsStore();

onMounted(async () => {
  await projectsStore.fetchProjects();
  await recordsStore.fetchRecords();
});

const project = computed(() =>
  projectsStore.getProject(projectId)
);

const stats = computed(() =>
  projectsStore.getProjectStats(projectId)
);

const records = computed(() =>
  recordsStore.records.filter(
    (r) => r.project_id === projectId
  )
);

async function handleDelete() {
  if (confirm('Tem certeza que deseja excluir este projeto?')) {
    await recordsStore.deleteRecordsByProject(projectId);
    await projectsStore.deleteProject(projectId);
    router.push('/projects');
  }
}
</script>


<template>
  <div v-if="record">
    <AppHeader title="Detalhes" show-back @back="router.back()" />

    <div class="page">
      <div class="card">
        <h1 class="title">{{ record.title }}</h1>

        <div class="info">
          <div class="info-item">
            <span class="label">📂 Categoria:</span>
            <span class="value">{{ record.category }}</span>
          </div>

          <div class="info-item">
            <span class="label">⏱️ Duração:</span>
            <span class="value">{{ record.duration }} minutos</span>
          </div>

          <div class="info-item">
            <span class="label">📅 Data:</span>
            <span class="value">{{ formatDate(record.createdAt) }}</span>
          </div>
        </div>

        <div v-if="record.notes" class="notes">
          <h3>Observações</h3>
          <p>{{ record.notes }}</p>
        </div>

        <div class="actions">
          <AppButton @click="handleEdit">Editar</AppButton>
          <AppButton variant="danger" @click="handleDelete">
            Excluir
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  margin-top: 80px; /* espaço para header fixo */
  padding: 24px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-family: 'Inter', sans-serif;
}

.card {
  background: var(--card-bg);
  border-radius: 16px;
  padding: 28px 24px;
  border: 1px solid var(--border-color);
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
  transition: background 0.3s ease, border 0.3s ease, box-shadow 0.3s ease;
}

.title {
  font-size: 24px;
  margin-bottom: 24px;
  font-weight: 700;
  color: var(--text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.info {
  margin-bottom: 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-color);
}

.label {
  font-weight: 600;
  color: var(--muted-text);
}

.value {
  color: var(--text-color);
  font-weight: 500;
}

.notes {
  margin-bottom: 28px;
  padding-top: 16px;
  border-top: 2px solid var(--border-color);
}

.notes h3 {
  font-size: 16px;
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--muted-text);
}

.notes p {
  line-height: 1.6;
  color: var(--text-color);
}

.actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
