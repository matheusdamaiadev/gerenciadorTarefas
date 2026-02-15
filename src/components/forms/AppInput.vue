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
  margin-bottom: 20px;
}

.label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
  transition: color 0.3s ease;
}

.required {
  color: #ff4444;
  margin-left: 2px;
}

.input {
  width: 100%;
  min-height: 50px;
  padding: 14px 16px;
  font-size: 16px;
  font-weight: 500;

  border: 2px solid var(--border-color);
  border-radius: 12px;

  background: var(--input-bg);
  color: var(--text-color);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);

  transition: 
    border-color 0.2s ease,
    background 0.3s ease,
    box-shadow 0.3s ease,
    color 0.3s ease;
}

.input::placeholder {
  color: var(--muted-text);
  opacity: 0.7;
}

.input:focus {
  outline: none;
  border-color: #0b5cff;
  box-shadow: 0 6px 20px rgba(11, 92, 255, 0.2);
}
</style>
