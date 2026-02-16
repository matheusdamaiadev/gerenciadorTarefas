<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();
const authStore = useAuthStore();

async function handleLogin() {
  try {
    await authStore.login(email.value, password.value);
    router.push('/');
  } catch (error) {
    errorMessage.value = error.message;
  }
}

async function handleRegister() {
  try {
    await authStore.register(email.value, password.value);
    router.push('/');
  } catch (error) {
    errorMessage.value = error.message;
  }
}
</script>

<template>
  <div class="auth-container">
    <h1>Login</h1>

    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Senha" />

    <button @click="handleLogin">Entrar</button>
    <button @click="handleRegister">Cadastrar</button>

    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
