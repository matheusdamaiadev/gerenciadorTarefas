import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase'
import { useRecordsStore } from '@/stores/records'

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref([])
  const loading = ref(false)

  // ==============================
  // 🔹 Buscar projetos do usuário
  // ==============================
  async function fetchProjects() {
    loading.value = true

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      projects.value = []
      loading.value = false
      return
    }

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar projetos:', error)
    } else {
      projects.value = data
    }

    loading.value = false
  }

  // ==============================
  // 🔹 Total de projetos
  // ==============================
  const totalProjects = computed(() => projects.value.length)

  // ==============================
  // 🔹 Criar projeto
  // ==============================
  async function addProject(project) {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      throw new Error('Usuário não autenticado')
    }

    const { data, error } = await supabase
      .from('projects')
      .insert([
        {
          ...project,
          user_id: user.id
        }
      ])
      .select()
      .single()

    if (error) {
      throw error
    }

    projects.value.unshift(data)
    return data
  }

  // ==============================
  // 🔹 Buscar projeto por ID
  // ==============================
  async function getProject(id) {
    const parsedId = parseInt(id)

    // Primeiro tenta no state
    let project = projects.value.find(p => p.id === parsedId)
    if (project) return project

    // Se não existir, busca no banco
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', parsedId)
      .single()

    if (error) {
      console.error('Erro ao buscar projeto:', error)
      return null
    }

    return data
  }

  // ==============================
  // 🔹 Estatísticas do projeto
  // ==============================
  function getProjectStats(projectId) {
    const recordsStore = useRecordsStore()

    const projectRecords = recordsStore.records.filter(
      r => r.project_id === parseInt(projectId)
    )

    const totalRecords = projectRecords.length
    const totalDuration = projectRecords.reduce(
      (sum, r) => sum + r.duration,
      0
    )

    return { totalRecords, totalDuration }
  }

  // ==============================
  // 🔹 Deletar projeto
  // ==============================
  async function deleteProject(id) {
    const parsedId = parseInt(id)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', parsedId)
      .eq('user_id', user.id)

    if (error) {
      console.error('Erro ao deletar projeto:', error)
      return
    }

    projects.value = projects.value.filter(p => p.id !== parsedId)
  }

  return {
    projects,
    loading,
    totalProjects,
    fetchProjects,
    addProject,
    getProject,
    getProjectStats,
    deleteProject
  }
})
