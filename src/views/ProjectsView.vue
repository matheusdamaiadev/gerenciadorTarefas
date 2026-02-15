<script setup>
import AppHeader from '@/components/layout/AppHeader.vue';
import AppButton from '@/components/forms/AppButton.vue';
import { useProjects } from '@/composables/useProjects';
import { useRouter } from 'vue-router';

const { projects, getProjectStats } = useProjects();
const router = useRouter();
</script>

<template>
  <div>
    <AppHeader 
      title="Projetos" 
      show-back 
      @back="router.back()" 
    />

    <div class="page">
      <!-- Botão criar projeto desktop -->
      <AppButton 
        class="new-project-btn desktop-btn"
        @click="router.push('/projects/create')"
      >
        Criar novo projeto
      </AppButton>

      <!-- Lista de projetos -->
      <div 
        v-for="project in projects" 
        :key="project.id" 
        class="project-card"
        @click="router.push(`/projects/${project.id}`)"
      >
        <div class="project-title">{{ project.title }}</div>
        <div class="project-meta">
          {{ getProjectStats(project.id).totalRecords ?? 0 }} registros •
          {{ getProjectStats(project.id).totalDuration ?? 0 }} min
        </div>
      </div>

      <!-- Botão flutuante mobile -->
      <AppButton 
        class="new-project-btn mobile-fab"
        @click="router.push('/projects/create')"
      >
        +
      </AppButton>
    </div>
  </div>
</template>
<style scoped>
.page {
  margin-top: 80px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  font-family: 'Inter', sans-serif;
}

/* Cards de projeto */
.project-card {
  background: var(--card-bg);
  padding: 20px 24px;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: 
    transform 0.2s ease,
    background 0.3s ease,
    box-shadow 0.3s ease;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.project-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 28px rgba(0,0,0,0.1);
}

.project-card:active {
  transform: scale(0.95);
}

/* Títulos e meta info */
.project-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-meta {
  font-size: 14px;
  color: var(--muted-text);
}

/* Botão criar projeto desktop */
.new-project-btn.desktop-btn {
  font-weight: 700;
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 14px 0;
  border-radius: 12px;
  background: #0b5cff;
  color: white;
  box-shadow: 0 6px 16px rgba(0,0,0,0.2);
  transition: transform 0.1s ease, background 0.2s ease;
}

.new-project-btn.desktop-btn:hover {
  background: #094ecf;
  transform: translateY(-2px);
}

.new-project-btn.desktop-btn:active {
  transform: scale(0.95);
}

/* Botão flutuante mobile (FAB) */
.new-project-btn.mobile-fab {
  display: none;
  position: fixed;
  bottom: 28px;
  right: 28px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 36px;
  padding: 0;
  justify-content: center;
  align-items: center;
  z-index: 100;
  box-shadow: 0 8px 20px rgba(0,0,0,0.25);
  background: #0b5cff;
  color: white;
  font-weight: bold;
  transition: transform 0.2s ease, background 0.3s ease, box-shadow 0.3s ease;
}

.new-project-btn.mobile-fab:hover {
  background: #094ecf;
  box-shadow: 0 10px 28px rgba(0,0,0,0.3);
  transform: translateY(-2px);
}

.new-project-btn.mobile-fab:active {
  transform: scale(0.9);
}

/* Responsividade: mostra a bolinha no mobile e esconde botão grande */
@media (max-width: 768px) {
  .desktop-btn {
    display: none !important;
  }
  .mobile-fab {
    display: flex !important;
  }
}
</style>
