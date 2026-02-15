<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: String,
  duration: Number,
  date: String,
  category: String,
});

const formattedDate = computed(() => {
  return new Date(props.date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
});
</script>

<template>
  <div class="record-card">
    <div class="header">
      <h3 class="title">{{ title }}</h3>
      <span class="category">{{ category }}</span>
    </div>

    <div class="meta">
      <span class="duration">⏱️ {{ duration }} min</span>
      <span class="date">📅 {{ formattedDate }}</span>
    </div>
  </div>
</template>

<style scoped>
.record-card {
  background: var(--card-bg);
  border-radius: 16px;
  padding: 20px 18px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  transition: transform 0.15s ease, background 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.record-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.1);
}

.record-card:active {
  transform: scale(0.97);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.category {
  font-size: 12px;
  background-color: var(--category-bg);
  padding: 4px 10px;
  border-radius: 12px;
  color: var(--text-color);
  font-weight: 500;
  transition: background 0.3s ease;
  white-space: nowrap;
}

.meta {
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: var(--muted-text);
}
</style>
