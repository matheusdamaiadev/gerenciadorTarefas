<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import AppHeader from '@/components/layout/AppHeader.vue';
import RecordForm from '@/components/records/RecordForm.vue';
import { useRecords } from '@/composables/useRecords';

const router = useRouter();
const route = useRoute();

const { addRecord, getRecord, updateRecord, categories } = useRecords();

const isEditMode = computed(() => route.params.id !== 'new');

const projectIdFromQuery = route.query.projectId
  ? Number(route.query.projectId)
  : null;

const form = ref({
  title: '',
  duration: '',
  notes: '',
  category: '',
});

onMounted(() => {
  if (isEditMode.value) {
    const record = getRecord(route.params.id);
    if (record) {
      form.value = {
        title: record.title,
        duration: record.duration,
        notes: record.notes || '',
        category: record.category || '',
      };
    } else {
      router.push('/records');
    }
  }
});

function handleSubmit(data) {
  const recordData = {
    ...data,
    projectId: projectIdFromQuery ?? null
  };

  if (isEditMode.value) {
    updateRecord(route.params.id, recordData);
  } else {
    addRecord(recordData);
  }

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
      @back="router.back()"
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
