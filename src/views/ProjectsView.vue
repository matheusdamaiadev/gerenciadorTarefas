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
      <!-- Tela vazia -->
      <div v-if="!projects.length" class="empty-state">
        <div class="empty-emoji">📁</div>
        <h2>Você ainda não tem projetos</h2>
        <p>Crie seu primeiro projeto para começar a registrar atividades!</p>
        <AppButton 
          class="new-project-btn empty-btn"
          @click="router.push('/projects/create')"
        >
          Criar Projeto
        </AppButton>
      </div>

      <!-- Lista de projetos -->
      <div v-else class="projects-list">
        <!-- Botão criar projeto desktop -->
        <AppButton 
          class="new-project-btn desktop-btn"
          @click="router.push('/projects/create')"
        >
          Criar Projeto
        </AppButton>

        <div class="cards-wrapper">
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
.cards-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px; /* gap entre os cards */
  margin-top: 16px; /* espaço entre botão e lista */
}

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

/* Botão criar projeto */
.new-project-btn {
  font-weight: 700;
  text-align: center;
  display: flex;
  justify-content: center;
  border-radius: 12px;
  background: #0b5cff;
  color: white;
  box-shadow: 0 6px 16px rgba(0,0,0,0.2);
  transition: transform 0.1s ease, background 0.2s ease, box-shadow 0.2s ease;
}

.new-project-btn:hover {
  background: #094ecf;
  transform: translateY(-2px);
}

.new-project-btn:active {
  transform: scale(0.95);
}

/* Desktop retangular */
.desktop-btn {
  width: 100%;
  padding: 14px 0;
}

/* Mobile FAB */
.mobile-fab {
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
}

/* Tela vazia */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 40px 20px;
  text-align: center;
  color: var(--muted-text);
}

.empty-state h2 {
  font-size: 22px;
  color: var(--text-color);
}

.empty-state p {
  font-size: 16px;
  max-width: 300px;
}

.empty-emoji {
  font-size: 60px;
  margin-bottom: 12px;
}

.empty-btn {
  width: 200px;
  padding: 14px 0;
}

/* Responsividade */
@media (max-width: 768px) {
  .desktop-btn {
    display: none !important;
  }
  .mobile-fab {
    display: flex !important;
  }
}
</style>
