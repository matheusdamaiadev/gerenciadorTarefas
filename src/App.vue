<script setup>
import { onMounted } from 'vue';
import { useRecordsStore } from '@/stores/records';
import { useAuthStore } from '@/stores/auth';

const recordsStore = useRecordsStore();
const authStore = useAuthStore();

onMounted(async () => {
  await authStore.loadUser();

  if (authStore.user) {
    await recordsStore.loadRecords();
  }
});
</script>

<template>
  <RouterView />
</template>

<style>
@import './assets/css/global.css';
</style>
