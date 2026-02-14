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
  margin-top: 80px; /* espaço para o header fixo */
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Cards de projeto */
.project-card {
  background: var(--card-bg);
  padding: 16px 20px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: 
    transform 0.1s ease,
    background 0.3s ease,
    box-shadow 0.3s ease;
  text-decoration: none;
  color: inherit;
}

.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.project-card:active {
  transform: scale(0.95);
  transition: transform 0.1s ease;
}

/* Títulos e meta info */
.project-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-meta {
  font-size: 13px;
  color: var(--muted-text);
}

/* Botão criar projeto desktop */
.new-project-btn.desktop-btn {
  font-weight: 600;
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
}

.new-project-btn.desktop-btn:active {
  transform: scale(0.95);
  transition: transform 0.1s ease;
}

/* Botão flutuante mobile */
.new-project-btn.mobile-fab {
  display: none; /* escondido por padrão */
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  font-size: 32px;
  padding: 0;
  justify-content: center;
  align-items: center;
  z-index: 100;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  background: #0b5cff;
  color: white;
  font-weight: bold;
}

/* efeito de clique */
.new-project-btn.mobile-fab:active {
  transform: scale(0.9);
  transition: transform 0.1s ease;
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
