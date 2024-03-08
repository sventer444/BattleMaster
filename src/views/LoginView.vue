<!-- src/views/LoginView.vue -->

<template>
  <div class="flex items-center justify-center h-screen bg-pokemon-dark">
    <div class="bg-white p-8 rounded shadow-md max-w-md mx-auto my-8 space-y-4">
      <h1 class="text-2xl font-semibold mb-4 text-pokemon-red">Login Page</h1>
      <div class="mb-4">
        <label for="username" class="block text-gray-700">Username:</label>
        <input type="text" id="username" v-model="username" class="w-full border p-2 rounded focus:outline-none focus:border-blue-500" />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-gray-700">Password:</label>
        <input type="password" id="password" v-model="password" class="w-full border p-2 rounded focus:outline-none focus:border-blue-500" />
      </div>
      <button @click="login" class="w-full bg-pokemon-red text-white p-2 rounded hover:bg-pokemon-dark">Log In</button>
    </div>
  </div>
</template>

<script>
import { usePlayerInfoStore } from '@/store/playerInfo';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },

  methods: {
    login() {
      const isValidUser = this.validateUser(this.username, this.password);

      if (isValidUser) {
        usePlayerInfoStore().login(this.username, this.password);
        this.$router.push('/region/kanto'); // Update route to '/pc-window'
      } else {
        alert('Invalid username or password. Please try again.');
      }
    },

    validateUser(username, password) {
      return username.trim() !== '' && password.trim() !== '';
    },
  },
};
</script>
