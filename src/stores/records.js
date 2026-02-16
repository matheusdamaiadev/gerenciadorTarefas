import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '@/lib/supabase';

const categories = ['Estudo', 'Trabalho', 'Exercício', 'Lazer'];

export const useRecordsStore = defineStore('records', () => {
  const records = ref([]);
  const loading = ref(false);

  // 🔹 Carregar do Supabase
  async function loadRecords() {
    loading.value = true;

    const { data, error } = await supabase
      .from('records')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao carregar registros:', error);
    } else {
      records.value = data.map(r => ({
        id: r.id,
        title: r.title,
        duration: r.duration,
        projectId: r.project_id,
        createdAt: r.created_at,
      }));
    }

    loading.value = false;
  }

  const totalRecords = computed(() => records.value.length);

  const totalDuration = computed(() =>
    records.value.reduce((sum, r) => sum + r.duration, 0)
  );

  // 🔹 Criar registro
  async function addRecord(record) {
    const { data, error } = await supabase
      .from('records')
      .insert([{
        title: record.title,
        duration: record.duration,
        project_id: record.projectId ?? null
      }])
      .select();

    if (error) {
      console.error('Erro ao criar registro:', error);
      return null;
    }

    const newRecord = {
      id: data[0].id,
      title: data[0].title,
      duration: data[0].duration,
      projectId: data[0].project_id,
      createdAt: data[0].created_at,
    };

    records.value.unshift(newRecord);
    return newRecord;
  }

  function getRecord(id) {
    return records.value.find(r => r.id === parseInt(id));
  }

  function getRecordsByProject(projectId) {
    return records.value.filter(
      r => r.projectId === parseInt(projectId)
    );
  }

  function getLooseRecords() {
    return records.value.filter(r => r.projectId === null);
  }

  // 🔹 Atualizar
  async function updateRecord(id, updates) {
    const { error } = await supabase
      .from('records')
      .update({
        title: updates.title,
        duration: updates.duration
      })
      .eq('id', id);

    if (error) {
      console.error('Erro ao atualizar:', error);
      return null;
    }

    const index = records.value.findIndex(r => r.id === parseInt(id));
    if (index !== -1) {
      records.value[index] = {
        ...records.value[index],
        ...updates
      };
      return records.value[index];
    }

    return null;
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

    records.value = records.value.filter(r => r.id !== parseInt(id));
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
      r => r.projectId !== parseInt(projectId)
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
  