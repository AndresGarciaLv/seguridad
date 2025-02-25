<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { loginService } from '@/services/userService'
import registerImage from '@/assets/register.webp'  // Importa la imagen

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

onMounted(async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  await res.json()
  console.log(res)
})

const register = async () => {
  const validatePassword = computed(() => password.value.length > 6 && password.value)
  const validateEmail = computed(
    () => email.value.includes('@') && email.value.includes('.com') && password.value,
  )
  if (!validateEmail && !validatePassword) {
    return
  }
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await loginService(email.value, password.value)
    if (!response.ok) throw new Error('Credenciales incorrectas')
    const data = response
    console.log('Registro exitoso:', data)
    alert('¡Registro exitoso!')
  } catch (error) {
    errorMessage.value = 'Ocurrió un error'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex">
    <!-- Lado izquierdo con imagen (visible en pantallas grandes) -->
   
    
    <!-- Lado derecho con el formulario -->
    <div class="flex flex-col justify-center items-center w-full lg:w-1/2 bg-white">
      <div class="max-w-md w-full p-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">Crear cuenta</h2>
        <p class="text-gray-600 mb-8">Regístrate para acceder a todos nuestros servicios.</p>

        <form @submit.prevent="register" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Correo electrónico</label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="tucorreo@ejemplo.com"
              class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="********"
              class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div v-if="errorMessage" class="p-3 bg-red-100 text-red-600 rounded text-sm">
            {{ errorMessage }}
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition duration-200 disabled:opacity-50"
          >
            {{ loading ? 'Cargando...' : 'Registrarse' }}
          </button>
        </form>
      </div>
    </div>

    <div
      class="hidden lg:block lg:w-1/2 bg-cover bg-center h-[600px] mt-11"
      :style="{ backgroundImage: `url(${registerImage})` }"
    ></div>
  </div>
</template>
