<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-bl from-gray-400 via-gray-600 to-blue-800">
    <div class="max-w-lg w-full bg-gray-300 p-8 rounded-lg shadow-lg">
      <div class="flex items-center justify-center">
        <div lg:w-[500px] relative>
          <img
            src="@/assets/logo.png"
            alt="Fnote logo"
            class="relative w-full h-40"
          />
        </div>
      </div>
      <h1 class="text-3xl font-bold text-center mb-1">Selamat datang di Fnote</h1>
      <p class="text-base text-center">
        <span class="text-lg italic font-bold">Fnote adalah</span> Lorem ipsum dolor 
        sit, amet consectetur adipisicing elit. Error porro, distinctio vero quod
        optio mollitia, fugit commodi laborum illo, magnam
        aliquam praesentium possimus sint. Totam nostrum dolore odit illo odio.
      </p>
      <h2 class="text-2xl font-bold text-center mb-1">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div class="mb-1">
          <label for="password" class="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full mb-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <p class="text-center mb-1 mt-1">Belum punya akun? <a href="/signup" class="text-blue-500 hover:underline">Signup</a></p>
        <button
          type="submit"
          class="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300 mt-3"
        >Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const login = () => {
  console.log('Email:', email.value)
  console.log('Password:', password.value)
}
</script>

<style scoped>
</style>
