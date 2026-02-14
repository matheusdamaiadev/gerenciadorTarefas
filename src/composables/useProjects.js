import { ref, computed } from 'vue';
import { useRecords } from '@/composables/useRecords'; // 🔑 importa os registros globais

const projects = ref([]);
const STORAGE_KEY = 'projects';

function loadFromStorage() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) projects.value = JSON.parse(stored);
}

function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects.value));
}

// Carrega os projetos ao importar
loadFromStorage();

export function useProjects() {
  const { records } = useRecords(); // pega todos os registros

  const totalProjects = computed(() => projects.value.length);

  function addProject(project) {
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
    return projects.value.find((p) => p.id === parseInt(id));
  }

  function getProjectStats(projectId) {
    // 🔹 pega apenas os registros do projeto
    const projectRecords = records.value.filter(r => r.projectId === parseInt(projectId));
    const totalRecords = projectRecords.length;
    const totalDuration = projectRecords.reduce((sum, r) => sum + r.duration, 0);
    return { totalRecords, totalDuration };
  }

  function deleteProject(id) {
    projects.value = projects.value.filter((p) => p.id !== parseInt(id));
    saveToStorage();
  }

  return {
    projects,
    totalProjects,
    addProject,
    getProject,
    getProjectStats, // ✅ agora funciona corretamente
    deleteProject,
  };
}
