import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/records',
    name: 'records',
    component: () => import('@/views/RecordsView.vue'),
  },
  {
    path: '/records/:id',
    name: 'record-detail',
    component: () => import('@/views/RecordDetailView.vue'),
  },
  {
    path: '/records/:id/edit',
    name: 'record-edit',
    component: () => import('@/views/RecordFormView.vue'),
  },
  // 🔹 PROJETOS
  {
    path: '/projects',
    name: 'projects',
    component: () => import('@/views/ProjectsView.vue'),
  },
  {
    path: '/projects/create',
    name: 'project-create',
    component: () => import('@/views/CreateProjectView.vue'),
  },
  {
    path: '/projects/:id',
    name: 'project-detail',
    component: () => import('@/views/ProjectDetailView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
