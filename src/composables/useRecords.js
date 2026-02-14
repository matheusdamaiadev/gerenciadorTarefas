import { ref, computed } from 'vue';

// Estado global compartilhado entre componentes
const records = ref([]);

// Nome da chave para LocalStorage
const STORAGE_KEY = 'records';

const categories = ['Estudo', 'Trabalho', 'Exercício', 'Lazer'];

function loadFromStorage() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    records.value = JSON.parse(stored);
  }
}

function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records.value));
}

// Carrega dados ao importar o composable
loadFromStorage();

export function useRecords() {
  const totalRecords = computed(() => records.value.length);

  const totalDuration = computed(() => {
    return records.value.reduce((sum, r) => sum + r.duration, 0);
  });

  function addRecord(record) {
    const newRecord = {
      id: Date.now(),
      projectId: record.projectId ?? null, // 👈 agora suporta projeto
      ...record,
      createdAt: new Date().toISOString(),
    };

    records.value.unshift(newRecord);
    saveToStorage();
    return newRecord;
  }

  function getRecord(id) {
    return records.value.find((r) => r.id === parseInt(id));
  }

  function getRecordsByProject(projectId) {
    return records.value.filter(
      (r) => r.projectId === parseInt(projectId)
    );
  }

  function getLooseRecords() {
    return records.value.filter((r) => r.projectId === null);
  }

  function updateRecord(id, updates) {
    const index = records.value.findIndex(
      (r) => r.id === parseInt(id)
    );

    if (index !== -1) {
      records.value[index] = {
        ...records.value[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      saveToStorage();
      return records.value[index];
    }

    return null;
  }

  function deleteRecord(id) {
    records.value = records.value.filter(
      (r) => r.id !== parseInt(id)
    );

    saveToStorage();
  }

  // 🔥 Extra: deletar todos registros de um projeto
  function deleteRecordsByProject(projectId) {
    records.value = records.value.filter(
      (r) => r.projectId !== parseInt(projectId)
    );

    saveToStorage();
  }

  return {
    // Estado
    records,

    // Computed
    totalRecords,
    totalDuration,

    // Métodos
    addRecord,
    getRecord,
    getRecordsByProject, // 👈 novo
    getLooseRecords,     // 👈 novo
    updateRecord,
    deleteRecord,
    deleteRecordsByProject, // 👈 extra poderoso

    categories,
  };
}
