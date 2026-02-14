<script setup>
import { RouterLink, useRouter } from 'vue-router';
import AppHeader from '@/components/layout/AppHeader.vue';
import RecordCard from '@/components/records/RecordCard.vue';
import { useRecords } from '@/composables/useRecords';
import { ref, computed } from 'vue';

const router = useRouter();
const { getLooseRecords } = useRecords(); // 👈 usa apenas registros sem projeto

const sortType = ref('date');
const searchQuery = ref('');

const finalRecords = computed(() => {
    // 1️⃣ Filtra
    let result = getLooseRecords().filter((r) =>
        r.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );

    // 2️⃣ Ordena
    if (sortType.value === 'duration') {
        result = result.sort((a, b) => b.duration - a.duration);
    } else {
        result = result.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
    }
    return result;
});
</script>

<template>
    <div>
        <AppHeader title="Meus Registros" show-back @back="router.push('/')" />

        <div class="page">
            <input v-model="searchQuery" placeholder="Buscar..." class="search" />

            <select v-model="sortType" class="select">
                <option value="date">Mais recentes</option>
                <option value="duration">Maior duração</option>
            </select>

            <TransitionGroup v-if="finalRecords.length > 0" name="list" tag="div" class="list">
                <RouterLink v-for="record in finalRecords" :key="record.id" :to="`/records/${record.id}`" class="link">
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
                <RouterLink to="/records/new/edit" class="btn">
                    Criar primeiro registro
                </RouterLink>
            </div>

            <RouterLink to="/records/new/edit" class="fab"> + </RouterLink>
        </div>
    </div>
</template>

<style scoped>
.list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.link {
    text-decoration: none;
}

.empty {
    text-align: center;
    padding: 60px 20px;
    color: var(--muted-text);
}

.empty p:first-child {
    font-size: 48px;
    margin-bottom: 16px;
}

.btn {
    display: inline-block;
    margin-top: 20px;
    padding: 12px 24px;
    background: #0b5cff;
    color: white;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
}

.fab {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 56px;
    height: 56px;
    border-radius: 50%; /* bolinha */
    background: #0b5cff; /* azul do site */
    color: white;
    font-weight: 600;
    font-size: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2); /* sombra suave */
    transition: transform 0.2s ease, background 0.3s ease;
    cursor: pointer;
}

/* efeito de clique igual aos outros botões */
.fab:active {
    transform: scale(0.95);
}


/* SELECT */
.select {
    width: 100%;
    min-height: 48px;
    padding: 12px 40px 12px 16px;
    font-size: 16px;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    background-color: var(--input-bg);
    color: var(--text-color);
    margin-bottom: 16px;
    font-family: inherit;
    transition: border-color 0.2s ease, background 0.3s ease, color 0.3s ease;
}

.select:focus {
    outline: none;
    border-color: #0b5cff;
}

/* SEARCH */
.search {
    width: 100%;
    min-height: 48px;
    padding: 12px 16px;
    font-size: 16px;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    margin-bottom: 12px;
    font-family: inherit;
    background: var(--input-bg);
    color: var(--text-color);
    transition: border-color 0.2s ease, background 0.3s ease, color 0.3s ease;
}

.search::placeholder {
    color: var(--muted-text);
}

.search:focus {
    outline: none;
    border-color: #0b5cff;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.list-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.list-move {
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.list-leave-active {
  position: absolute;
}
</style>
