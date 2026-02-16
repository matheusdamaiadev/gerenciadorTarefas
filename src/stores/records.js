import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/auth';

const categories = ['Estudo', 'Trabalho', 'Exercício', 'Lazer'];

export const useRecordsStore = defineStore('records', () => {
  const records = ref([]);
  const loading = ref(false);

  // 🔹 Mapper (mantém seu frontend intacto)
  function mapRecord(r) {
    return {
      id: r.id,
      title: r.title,
      category: r.category,
      duration: r.duration,
      notes: r.notes,
      projectId: r.project_id,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    };
  }

  // 🔹 Carregar
  async function loadRecords() {
    loading.value = true;

    const { data, error } = await supabase
      .from('records')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao carregar registros:', error);
    } else {
      records.value = data.map(mapRecord);
    }

    loading.value = false;
  }

  const totalRecords = computed(() => records.value.length);

  const totalDuration = computed(() =>
    records.value.reduce((sum, r) => sum + r.duration, 0)
  );

  // 🔹 Criar
  async function addRecord(record) {
    const authStore = useAuthStore();

    if (!authStore.user) {
      await authStore.loadUser();
    }

    const user = authStore.user;

    if (!user) {
      console.error('Usuário não autenticado');
      return null;
    }

    const { data, error } = await supabase
      .from('records')
      .insert([{
        title: record.title,
        category: record.category,
        duration: record.duration,
        notes: record.notes ?? null,
        project_id: record.projectId ?? null,
        user_id: user.id
      }])
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar registro:', error);
      return null;
    }

    const newRecord = mapRecord(data);
    records.value.unshift(newRecord);
    return newRecord;
  }

  // 🔹 Buscar por ID (UUID → NÃO usar parseInt)
  function getRecord(id) {
    return records.value.find((r) => String(r.id) === String(id));
  }

  function getRecordsByProject(projectId) {
    return records.value.filter((r) => Number(r.projectId) === Number(projectId));
  }

  function getLooseRecords() {
    return records.value.filter(r => r.projectId === null);
  }

  // 🔹 Atualizar
  async function updateRecord(id, updates) {
    const { data, error } = await supabase
      .from('records')
      .update({
        title: updates.title,
        category: updates.category,
        duration: updates.duration,
        notes: updates.notes,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar:', error);
      return null;
    }

    const updated = mapRecord(data);
    const index = records.value.findIndex((r) => String(r.id) === String(id));

    if (index !== -1) {
      records.value[index] = updated;
    }

    return updated;
  }

  // 🔹 Deletar
  async function deleteRecord(id) {
    const { error } = await supabase
      .from('records')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao deletar:', error);
      return;
    }

    records.value = records.value.filter((r) => String(r.id) !== String(id));
  }

  async function deleteRecordsByProject(projectId) {
    const { error } = await supabase
      .from('records')
      .delete()
      .eq('project_id', projectId);

    if (error) {
      console.error('Erro ao deletar registros do projeto:', error);
      return;
    }

    records.value = records.value.filter(
      (r) => Number(r.projectId) !== Number(projectId)
    );
  }

  return {
    records,
    loading,
    loadRecords,
    totalRecords,
    totalDuration,
    addRecord,
    getRecord,
    getRecordsByProject,
    getLooseRecords,
    updateRecord,
    deleteRecord,
    deleteRecordsByProject,
    categories,
  };
});
