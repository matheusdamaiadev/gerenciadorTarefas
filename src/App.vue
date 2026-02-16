<script setup>
import { onMounted } from 'vue';
import { useRecordsStore } from '@/stores/records';

const recordsStore = useRecordsStore();

onMounted(() => {
  recordsStore.loadRecords();
});
</script>

<template>
  <RouterView />
</template>

<style>
@import './assets/css/global.css';
</style>
