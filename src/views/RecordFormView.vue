<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import AppHeader from '@/components/layout/AppHeader.vue';
import RecordForm from '@/components/records/RecordForm.vue';
import { useRecords } from '@/composables/useRecords';

const router = useRouter();
const route = useRoute();

const { addRecord, getRecord, updateRecord, categories, loadRecords } = useRecords();

const isEditMode = computed(() => route.params.id !== 'new');

// Pega o projectId da query (pode ser null)
const parsedProjectId = Number(route.query.projectId);
const projectIdFromQuery = Number.isNaN(parsedProjectId) ? null : parsedProjectId;

const form = ref({
  title: '',
  duration: '',
  notes: '',
  category: '',
});

onMounted(async () => {
  if (isEditMode.value) {
    if (!getRecord(route.params.id)) {
      await loadRecords();
    }

    const record = getRecord(route.params.id);
    if (record) {
      form.value = {
        title: record.title,
        duration: record.duration,
        notes: record.notes || '',
        category: record.category || '',
      };
    } else {
      router.push('/records'); // registro não encontrado
    }
  }
});

async function handleSubmit(data) {
  const recordData = {
    ...data,
    projectId: projectIdFromQuery ?? null,
  };

  const result = isEditMode.value
    ? await updateRecord(route.params.id, recordData)
    : await addRecord(recordData);

  if (!result) return;

  // Redireciona para o projeto se existir, senão para registros
  if (projectIdFromQuery) {
    router.push(`/projects/${projectIdFromQuery}`);
  } else {
    router.push('/records');
  }
}

// Novo handleBack que respeita projectId
function handleBack() {
  if (projectIdFromQuery) {
    router.push(`/projects/${projectIdFromQuery}`);
  } else {
    router.push('/records');
  }
}
</script>

<template>
  <div>
    <AppHeader
      :title="isEditMode ? 'Editar Registro' : 'Novo Registro'"
      show-back
      @back="handleBack"
    />

    <div class="page">
      <RecordForm
        :model-value="form"
        :categories="categories"
        :submit-label="isEditMode ? 'Salvar alterações' : 'Criar registro'"
        @submit="handleSubmit"
      />
    </div>
  </div>
</template>

<style scoped>
.page {
  max-width: 700px;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-family: 'Inter', sans-serif;
}
.form {
  margin-top: 80px;
}
</style>
