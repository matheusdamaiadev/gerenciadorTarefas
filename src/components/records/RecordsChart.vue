<script setup>
import { computed, watch } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

import { useRecords } from '@/composables/useRecords'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
)

const { records } = useRecords()

/* Detecta dark mode */
const isDark = computed(() =>
  document.body.classList.contains('dark-mode')
)

const chartData = computed(() => ({
  labels: records.value.map((r) => r.title),
  datasets: [
    {
      label: 'Duração (min)',
      data: records.value.map((r) => r.duration),
      backgroundColor: isDark.value ? '#3b82f6' : '#0b5cff',
      borderRadius: 8,
    },
  ],
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: isDark.value ? '#e2e8f0' : '#1e293b',
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: isDark.value ? '#cbd5e1' : '#334155',
      },
      grid: {
        color: isDark.value
          ? 'rgba(148,163,184,0.15)'
          : 'rgba(0,0,0,0.05)',
      },
    },
    y: {
      ticks: {
        color: isDark.value ? '#cbd5e1' : '#334155',
      },
      grid: {
        color: isDark.value
          ? 'rgba(148,163,184,0.15)'
          : 'rgba(0,0,0,0.05)',
      },
    },
  },
}))

/* Força reatividade ao alternar tema */
watch(isDark, () => {})
</script>

<template>
  <div class="chart-wrapper">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.chart-wrapper {
  height: 300px;
  background: var(--card-bg);
  padding: 16px;
  border-radius: 12px;
}
</style>
