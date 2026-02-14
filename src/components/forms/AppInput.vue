<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: [String, Number],
  label: String,
  type: {
    type: String,
    default: 'text',
  },
  placeholder: String,
  required: Boolean,
});

const emit = defineEmits(['update:modelValue']);

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});
</script>

<template>
  <div class="app-input">
    <label v-if="label" class="label">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>

    <input
      v-model="value"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      class="input"
    />
  </div>
</template>

<style scoped>
.app-input {
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

.required {
  color: #ff4444;
}

.input {
  width: 100%;
  min-height: 48px;
  padding: 12px 16px;
  font-size: 16px;

  border: 2px solid var(--border-color);
  border-radius: 8px;

  background: var(--input-bg);
  color: var(--text-color);

  transition: 
    border-color 0.2s ease,
    background 0.3s ease,
    color 0.3s ease;
}

.input::placeholder {
  color: var(--muted-text);
}

.input:focus {
  outline: none;
  border-color: #0b5cff;
}
</style>
