<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AppHeader from '@/components/layout/AppHeader.vue';
import AppInput from '@/components/forms/AppInput.vue';
import AppButton from '@/components/forms/AppButton.vue';
import { useProjects } from '@/composables/useProjects';
import { z } from 'zod';

const router = useRouter();
const { addProject } = useProjects();

const form = ref({
  title: '',
  description: '',
});

const schema = z.object({
  title: z.string().min(3, 'Mínimo 3 caracteres'),
  description: z.string().optional(),
});

const errors = ref({});

function handleSubmit() {
  errors.value = {};

  try {
    const validatedData = schema.parse(form.value);

    const project = addProject(validatedData);

    router.push({
      name: 'project-detail',
      params: { id: project.id },
    });
  } catch (err) {
    if (err.issues) {
      err.issues.forEach((e) => {
        errors.value[e.path[0]] = e.message;
      });
    }
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

        <AppButton type="submit">
          Criar Projeto
        </AppButton>

      </form>
    </div>
  </div>
</template>

<style scoped>
.form {
  background: var(--card-bg);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  transition: background 0.3s ease, border 0.3s ease;
}

.textarea-group {
  margin-bottom: 16px;
}

.label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color);
  transition: color 0.3s ease;
}

.textarea {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-family: inherit;
  resize: vertical;
  background: var(--input-bg);
  color: var(--text-color);
  transition: 
    border-color 0.2s ease,
    background 0.3s ease,
    color 0.3s ease;
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
  margin-top: 4px;
  margin-bottom: 12px;
}
</style>
