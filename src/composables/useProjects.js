import { useProjectsStore } from '@/stores/projects';

export function useProjects() {
  return useProjectsStore();
}
