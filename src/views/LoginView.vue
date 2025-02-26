<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { LoginService } from '@/services/userService'
import registerImage from '@/assets/register.webp'

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

// Ejemplo de llamada onMounted (puedes eliminarlo si no es necesario)
onMounted(async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  await res.json()
  console.log(res)
})

const login = async () => {
  // Validación básica del formato de email y longitud de contraseña
  if (!email.value.includes('@') || !email.value.includes('.com')) {
    errorMessage.value = 'El formato del email es inválido'
    return
  }
  if (password.value.length <= 6) {
    errorMessage.value = 'La contraseña debe tener más de 6 caracteres'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    // Llamada al servicio de login
    const response = await LoginService(email.value, password.value)
    // Se asume que el servicio devuelve un objeto con la propiedad token en caso de éxito
    if (!response || !response.token) {
      throw new Error('Credenciales incorrectas')
    }
    console.log('Login exitoso:', response)
    /* alert('¡Inicio de sesión exitoso!') */
    // Opcional: almacenar el token para futuras peticiones
    localStorage.setItem('token', response.token)
  } catch (error: any) {
    errorMessage.value = 'Ocurrió un error durante el inicio de sesión'
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex">
    <!-- Lado izquierdo con imagen (visible en pantallas grandes) -->
    <div
      class="hidden lg:flex lg:w-1/2 bg-cover bg-center h-[600px] mt-11"
      :style="{ backgroundImage: `url(${registerImage})` }"
    ></div>
    
    <!-- Lado derecho con el formulario, centrado -->
    <div class="flex flex-1 items-center justify-center bg-white">
      <div class="max-w-md w-full p-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">Bienvenido</h2>
        <p class="text-gray-600 mb-8">Ingresa tus datos para acceder a tu cuenta.</p>

        <form @submit.prevent="login" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Correo electrónico
            </label>
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
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
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
            {{ loading ? 'Cargando...' : 'Iniciar sesión' }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <a href="#" class="text-indigo-600 hover:underline text-sm">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
