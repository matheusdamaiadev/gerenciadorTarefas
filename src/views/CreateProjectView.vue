<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AppHeader from '@/components/layout/AppHeader.vue';
import AppInput from '@/components/forms/AppInput.vue';
import AppButton from '@/components/forms/AppButton.vue';
import { useProjectsStore } from '@/stores/projects';
import { z } from 'zod';

const router = useRouter();
const projectsStore = useProjectsStore();

const form = ref({
  title: '',
  description: '',
});

const errors = ref({});
const loading = ref(false);

const schema = z.object({
  title: z.string().min(3, 'Mínimo 3 caracteres'),
  description: z.string().optional(),
});

async function handleSubmit() {
  errors.value = {};
  loading.value = true;

  try {
    const validatedData = schema.parse(form.value);

    const project = await projectsStore.addProject({
      title: validatedData.title,
      description: validatedData.description,
    });

    router.push({
      name: 'project-detail',
      params: { id: project.id },
    });

  } catch (err) {
    if (err.issues) {
      err.issues.forEach((e) => {
        errors.value[e.path[0]] = e.message;
      });
    } else {
      console.error(err);
      alert('Erro ao criar projeto.');
    }
  } finally {
    loading.value = false;
  }
}
</script>


<template>
  <div>
    <AppHeader
      title="Novo Projeto"
      show-back
      @back="router.back()"
    />

    <div class="page">
      <form @submit.prevent="handleSubmit" class="form">

        <AppInput
          v-model="form.title"
          label="Nome do Projeto"
          placeholder="Ex: Projeto Fitness 2026"
          required
        />
        <p v-if="errors.title" class="error">
          {{ errors.title }}
        </p>

        <div class="textarea-group">
          <label class="label">Descrição (opcional)</label>
          <textarea
            v-model="form.description"
            rows="4"
            class="textarea"
            placeholder="Descreva o objetivo do projeto..."
          ></textarea>
        </div>

        <AppButton type="submit" class="submit-btn">
          Criar Projeto
        </AppButton>

      </form>
    </div>
  </div>
</template>

<style scoped>
.page {
  max-width: 700px;
  margin: 24px auto;
  padding: 0 16px;
  font-family: 'Inter', sans-serif;
}

.form {
  margin-top: 80px;
  background: var(--card-bg);
  padding: 28px 24px;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: background 0.3s ease, border 0.3s ease, box-shadow 0.3s ease;
}

.textarea-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
  transition: color 0.3s ease;
}

.textarea {
  width: 100%;
  padding: 14px 16px;
  font-size: 16px;
  border: 2px solid var(--border-color);
  border-radius: 12px;
  font-family: inherit;
  resize: vertical;
  background: var(--input-bg);
  color: var(--text-color);
  transition: border-color 0.2s ease, background 0.3s ease, color 0.3s ease;
}

.textarea::placeholder {
  color: var(--muted-text);
}

.textarea:focus {
  outline: none;
  border-color: #0b5cff;
}

.error {
  color: #d93025;
  font-size: 14px;
  margin-top: -8px;
}

.submit-btn {
  background: #0b5cff;
  color: white;
  font-weight: 700;
  padding: 14px 0;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.2);
  transition: transform 0.1s ease, background 0.2s ease, box-shadow 0.3s ease;
}

.submit-btn:hover {
  background: #094ecf;
  transform: translateY(-2px);
}

.submit-btn:active {
  transform: scale(0.95);
}
</style>
