<script setup>
import { useRouter } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import RecordsChart from '@/components/records/RecordsChart.vue'

const router = useRouter()
</script>

<template>
  <div>
    <AppHeader
      title="Dashboard"
      show-back
      @back="router.back()"

    />

    <div class="page">
      <RecordsChart />
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 80px 16px 16px; /* espaço para o header fixo */
}
</style>
