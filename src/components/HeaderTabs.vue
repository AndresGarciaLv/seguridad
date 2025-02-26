<template>
    <nav class="flex border-b border-gray-300">
      <RouterLink 
        :to="{ name: 'home' }"
        class="px-4 py-2 transition-colors duration-300"
        :class="isActiveRoute('home') ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600 hover:text-blue-500'"
      >
        DASHBOARD
      </RouterLink>
  
      <!-- Si NO está autenticado, se muestran los enlaces de login y register -->
      <template v-if="!authStore.isLoggedIn">
        <RouterLink 
          :to="{ name: 'login' }"
          class="px-4 py-2 transition-colors duration-300"
          :class="isActiveRoute('login') ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600 hover:text-blue-500'"
        >
          LOGIN
        </RouterLink>
        <RouterLink 
          :to="{ name: 'register' }"
          class="px-4 py-2 transition-colors duration-300"
          :class="isActiveRoute('register') ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600 hover:text-blue-500'"
        >
          REGISTER
        </RouterLink>
      </template>
  
      <!-- Si está autenticado, mostrar el botón para cerrar sesión -->
      <template v-else>
        <button 
          @click="handleLogout" 
          class="px-4 py-2 text-gray-600 hover:text-blue-500 transition-colors duration-300"
        >
          CERRAR SESIÓN
        </button>
      </template>
    </nav>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute, RouterLink } from 'vue-router'
  import { useAuthStore } from '@/stores/user' // Ajusta la ruta según tu estructura
  
  const route = useRoute()
  const authStore = useAuthStore()
  
  // Función para determinar la clase activa según la ruta
  const isActiveRoute = (name: string): boolean => route.name === name
  
  // Al presionar "Cerrar sesión", se invoca el logout del store, que llama a LogoutService
  const handleLogout = async () => {
    try {
        console.log("cerrado!!")
      await authStore.logout()
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }
  </script>
  