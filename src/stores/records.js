import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

const STORAGE_KEY = 'records';
const categories = ['Estudo', 'Trabalho', 'Exercício', 'Lazer'];

export const useRecordsStore = defineStore('records', () => {
  const records = ref([]);
  const hasLoaded = ref(false);

  function loadFromStorage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      records.value = JSON.parse(stored);
    }
    hasLoaded.value = true;
  }

  function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records.value));
  }

  function ensureLoaded() {
    if (!hasLoaded.value) {
      loadFromStorage();
    }
  }

  const totalRecords = computed(() => records.value.length);

  const totalDuration = computed(() => {
    ensureLoaded();
    return records.value.reduce((sum, r) => sum + r.duration, 0);
  });

  function addRecord(record) {
    ensureLoaded();
    const newRecord = {
      id: Date.now(),
      projectId: record.projectId ?? null,
      ...record,
      createdAt: new Date().toISOString(),
    };

    records.value.unshift(newRecord);
    saveToStorage();
    return newRecord;
  }

  function getRecord(id) {
    ensureLoaded();
    return records.value.find((r) => r.id === parseInt(id));
  }

  function getRecordsByProject(projectId) {
    ensureLoaded();
    return records.value.filter((r) => r.projectId === parseInt(projectId));
  }

  function getLooseRecords() {
    ensureLoaded();
    return records.value.filter((r) => r.projectId === null);
  }

  function updateRecord(id, updates) {
    ensureLoaded();
    const index = records.value.findIndex((r) => r.id === parseInt(id));

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
    ensureLoaded();
    records.value = records.value.filter((r) => r.id !== parseInt(id));
    saveToStorage();
  }

  function deleteRecordsByProject(projectId) {
    ensureLoaded();
    records.value = records.value.filter((r) => r.projectId !== parseInt(projectId));
    saveToStorage();
  }

  ensureLoaded();

  return {
    records,
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
