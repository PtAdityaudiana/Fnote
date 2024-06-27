<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-400 via-gray-600 to-blue-800">
      <div class="max-w-lg w-full bg-gradient-to-r from-rose-100 to-teal-100 p-8 rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold text-center mb-6">Signup</h2>
        <form @submit.prevent="signup">
          
          <div class="mb-4">
            <label for="username" class="block text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              v-model="username"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div class="mb-6">
            <label for="confirm-password" class="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              v-model="confirmPassword"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <p class="text-center mb-4">Sudah punya akun? <a href="/" class="text-blue-500 hover:underline">Login</a></p>
          <button
            type="submit"
            class="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300 mt-3"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const email = ref('')
  const username = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  
  const signup = () => {
    if (password.value === confirmPassword.value) {
      console.log('Email:', email.value)
      console.log('Username:', username.value)
      console.log('Password:', password.value)
    } else {
      console.error('Passwords do not match')
    }
  }
  </script>
  
  <style scoped>
  </style>
  