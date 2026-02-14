<script setup>
import { ref, watch } from 'vue';
import AppInput from '@/components/forms/AppInput.vue';
import AppButton from '@/components/forms/AppButton.vue';
import { z } from 'zod';

const props = defineProps({
  modelValue: Object,
  categories: Array,
  submitLabel: String,
});

const emit = defineEmits(['submit']);

const form = ref({ ...props.modelValue });
const errors = ref({});

watch(
  () => props.modelValue,
  (newVal) => {
    form.value = { ...newVal };
  }
);

const schema = z.object({
  title: z.string().min(3, 'Mínimo 3 caracteres'),
  duration: z
    .number({ invalid_type_error: 'Duração obrigatória' })
    .min(1, 'Duração deve ser maior que 0'),
  category: z.string().min(1, 'Selecione uma categoria'),
  notes: z.string().optional(),
});

function handleSubmit() {
  errors.value = {};

  try {
    const validatedData = schema.parse({
      ...form.value,
      duration: Number(form.value.duration),
    });

    emit('submit', validatedData);
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
  <form @submit.prevent="handleSubmit" class="form">
    <AppInput
      v-model="form.title"
      label="Título"
      placeholder="Ex: Estudar Vue.js"
      required
    />
    <p v-if="errors.title" class="error">
      {{ errors.title }}
    </p>

    <AppInput
      v-model.number="form.duration"
      label="Duração (minutos)"
      type="number"
      placeholder="Ex: 60"
      required
    />
    <p v-if="errors.duration" class="error">
      {{ errors.duration }}
    </p>

    <div class="textarea-group">
      <label class="label">Observações</label>
      <textarea
        v-model="form.notes"
        rows="4"
        class="textarea"
        placeholder="Adicione observações sobre a atividade..."
      ></textarea>
    </div>

    <select v-model="form.category" class="select">
      <option disabled value="">Selecione uma categoria</option>
      <option v-for="cat in categories" :key="cat" :value="cat">
        {{ cat }}
      </option>
    </select>
    <p v-if="errors.category" class="error">
      {{ errors.category }}
    </p>

    <AppButton type="submit">
      {{ submitLabel }}
    </AppButton>
  </form>
</template>

<style scoped>
/* MESMO CSS que você já tem */
.form {
  background: var(--card-bg);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
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
}

.select {
  width: 100%;
  min-height: 48px;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--input-bg);
  color: var(--text-color);
  margin-bottom: 16px;
}

.error {
  color: #d93025;
  font-size: 14px;
  margin-top: 4px;
  margin-bottom: 12px;
}
</style>
