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
    <h3 class="title">{{ title }}</h3>

    <p class="category">
      {{ category }}
    </p>

    <div class="meta">
      <span class="duration">⏱️ {{ duration }} min</span>
      <span class="date">📅 {{ formattedDate }}</span>
    </div>
  </div>
</template>

<style scoped>
.record-card {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  transition: 
    transform 0.1s ease,
    background 0.3s ease,
    box-shadow 0.3s ease;
  cursor: pointer;
  border: 1px solid var(--border-color);
}

.record-card:active {
  transform: scale(0.98);
}

.title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-color);

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.meta {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: var(--muted-text);
}

.category {
  font-size: 12px;
  background-color: var(--category-bg);
  padding: 4px 8px;
  border-radius: 12px;
  display: inline-block;
  margin-bottom: 8px;
  color: var(--text-color);
  transition: background 0.3s ease;
}

.date,
.duration {
  color: var(--muted-text);
}
</style>
