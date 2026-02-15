import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { useRecordsStore } from '@/stores/records';

const STORAGE_KEY = 'projects';

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref([]);
  const hasLoaded = ref(false);

  function loadFromStorage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      projects.value = JSON.parse(stored);
    }
    hasLoaded.value = true;
  }

  function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects.value));
  }

  function ensureLoaded() {
    if (!hasLoaded.value) {
      loadFromStorage();
    }
  }

  const totalProjects = computed(() => {
    ensureLoaded();
    return projects.value.length;
  });

  function addProject(project) {
    ensureLoaded();
    const newProject = {
      id: Date.now(),
      ...project,
      createdAt: new Date().toISOString(),
    };

    projects.value.unshift(newProject);
    saveToStorage();
    return newProject;
  }

  function getProject(id) {
    ensureLoaded();
    return projects.value.find((p) => p.id === parseInt(id));
  }

  function getProjectStats(projectId) {
    const recordsStore = useRecordsStore();
    const projectRecords = recordsStore.records.filter((r) => r.projectId === parseInt(projectId));
    const totalRecords = projectRecords.length;
    const totalDuration = projectRecords.reduce((sum, r) => sum + r.duration, 0);
    return { totalRecords, totalDuration };
  }

  function deleteProject(id) {
    ensureLoaded();
    projects.value = projects.value.filter((p) => p.id !== parseInt(id));
    saveToStorage();
  }

  ensureLoaded();

  return {
    projects,
    totalProjects,
    addProject,
    getProject,
    getProjectStats,
    deleteProject,
  };
});
