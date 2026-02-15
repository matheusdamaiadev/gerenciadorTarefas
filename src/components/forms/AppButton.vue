<script setup>
defineProps({
  type: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'primary', // primary, secondary, danger
  },
  disabled: Boolean,
});
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="['app-button', `variant-${variant}`]"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.app-button {
  width: 100%;
  min-height: 50px;
  padding: 14px 24px;
  font-size: 16px;
  font-weight: 700;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 6px 16px rgba(0,0,0,0.12);
  transition:
    transform 0.1s ease,
    background 0.3s ease,
    box-shadow 0.3s ease,
    opacity 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.app-button:active {
  transform: scale(0.97);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.app-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  box-shadow: none;
}

.variant-primary {
  background: #0b5cff;
  color: white;
}

.variant-primary:hover:not(:disabled) {
  background: #094ecf;
  box-shadow: 0 8px 20px rgba(0,0,0,0.18);
}

.variant-secondary {
  background: #f0f0f0;
  color: #333;
}

.variant-secondary:hover:not(:disabled) {
  background: #e0e0e0;
}

.variant-danger {
  background: #ff4444;
  color: white;
}

.variant-danger:hover:not(:disabled) {
  background: #e03e3f;
}
</style>
