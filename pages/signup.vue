<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-400 via-gray-600 to-blue-800">
    <div class="max-w-lg w-full bg-gray-300 p-8 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-center mb-6 mt-1">Signup</h2>
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
          <label for="password" class="block text-gray-700">Password (min 6 character)</label>
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
        <div v-if="errorMessage" class="mb-4 text-red-500 text-center">
          {{ errorMessage }}
        </div>
        <p class="text-center mb-4">Sudah punya akun? <a href="/" class="text-blue-500 hover:underline">Login</a></p>
        <button
          type="submit"
          class="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300 mt-3"
        >Create</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '~/plugins/firebase'

const email = ref<string>('')
const username = ref<string>('')
const password = ref<string>('')
const confirmPassword = ref<string>('')
const errorMessage = ref<string>('')

const router = useRouter()

const signup = async () => {
  if (password.value === confirmPassword.value) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
      console.log('Signup successful:', userCredential)
      // Redirect to login page after successful signup and reload the page
      router.push('/').then(() => {
        window.location.reload()
      })
    } catch (error) {
      alert('Signup error: ' + (error as Error).message)
    }
  } else {
    errorMessage.value = 'Passwords do not match'
  }
}
</script>

<style scoped>
</style>
