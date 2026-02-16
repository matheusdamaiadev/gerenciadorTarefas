<script setup>
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import AppHeader from '@/components/layout/AppHeader.vue';
import AppButton from '@/components/forms/AppButton.vue';
import { useRecordsStore } from '@/stores/records';

const route = useRoute();
const router = useRouter();
const recordsStore = useRecordsStore();

const recordId = computed(() => route.params.id);

onMounted(async () => {
  if (recordsStore.records.length === 0) {
    await recordsStore.loadRecords();
  }
});

const record = computed(() => recordsStore.getRecord(recordId.value));

function formatDate(date) {
  if (!date) {
    return '-';
  }

  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function handleEdit() {
  if (!record.value) {
    return;
  }

  router.push(`/records/${record.value.id}/edit`);
}

async function handleDelete() {
  if (!record.value) {
    return;
  }

  const shouldDelete = confirm('Tem certeza que deseja excluir este registro?');

  if (!shouldDelete) {
    return;
  }

  const projectId = record.value.projectId;

  await recordsStore.deleteRecord(record.value.id);

  if (projectId) {
    router.push(`/projects/${projectId}`);
    return;
  }

  router.push('/records');
}
</script>

<template>
  <div>
    <AppHeader title="Detalhes do registro" show-back @back="router.back()" />

    <div v-if="record" class="page">
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
            <span class="label">📅 Criado em:</span>
            <span class="value">{{ formatDate(record.createdAt) }}</span>
          </div>

          <div v-if="record.updatedAt" class="info-item">
            <span class="label">🛠️ Atualizado em:</span>
            <span class="value">{{ formatDate(record.updatedAt) }}</span>
          </div>
        </div>

        <div v-if="record.notes" class="notes">
          <h3>Observações</h3>
          <p>{{ record.notes }}</p>
        </div>

        <div class="actions">
          <AppButton @click="handleEdit">Editar</AppButton>
          <AppButton variant="danger" @click="handleDelete">Excluir</AppButton>
        </div>
      </div>
    </div>

    <div v-else class="not-found page">
      <div class="card">
        <h2>Registro não encontrado</h2>
        <p>
          O registro solicitado não existe ou você não tem permissão para visualizá-lo.
        </p>

        <AppButton @click="router.push('/records')">Voltar para registros</AppButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  margin-top: 80px;
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
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
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
  gap: 12px;
}

.label {
  font-weight: 600;
  color: var(--muted-text);
}

.value {
  color: var(--text-color);
  font-weight: 500;
  text-align: right;
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

.not-found h2 {
  margin-bottom: 12px;
}

.not-found p {
  margin-bottom: 20px;
  color: var(--muted-text);
}
</style>
