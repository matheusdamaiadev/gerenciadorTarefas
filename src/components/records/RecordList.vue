<script setup>
import { RouterLink } from 'vue-router';
import RecordCard from '@/components/records/RecordCard.vue';

defineProps({
  records: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <TransitionGroup
    v-if="records.length > 0"
    name="list"
    tag="div"
    class="list"
  >
    <RouterLink
      v-for="record in records"
      :key="record.id"
      :to="`/records/${record.id}`"
      class="link"
    >
      <RecordCard
        :title="record.title"
        :duration="record.duration"
        :date="record.createdAt"
        :category="record.category"
      />
    </RouterLink>
  </TransitionGroup>

  <div v-else class="empty">
    <p>📭</p>
    <p>Nenhum registro ainda</p>
  </div>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 12px; /* espaço entre os registros */
}

.link {
  text-decoration: none; /* remove sublinhado */
  color: inherit;        /* mantém a cor do RecordCard */
  transition: transform 0.1s ease, box-shadow 0.2s ease;
}

.link:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.link:active {
  transform: scale(0.97);
}
</style>
