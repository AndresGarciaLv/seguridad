<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <div class="container mx-auto">
    <nav class="flex border-b border-gray-300">
      <RouterLink 
        :to="{ name: 'home' }" 
        class="px-4 py-2 transition-colors duration-300"
        :class="{
          'border-b-2 border-blue-500 text-blue-500': route.name === 'home',
          'text-gray-600 hover:text-blue-500': route.name !== 'home'
        }"
      >
        DASHBOARD
      </RouterLink>
      <RouterLink 
        :to="{ name: 'login' }" 
        class="px-4 py-2 transition-colors duration-300"
        :class="{
          'border-b-2 border-blue-500 text-blue-500': route.name === 'login',
          'text-gray-600 hover:text-blue-500': route.name !== 'login'
        }"
      >
        LOGIN
      </RouterLink>
      <RouterLink 
        :to="{ name: 'register' }" 
        class="px-4 py-2 transition-colors duration-300"
        :class="{
          'border-b-2 border-blue-500 text-blue-500': route.name === 'register',
          'text-gray-600 hover:text-blue-500': route.name !== 'register'
        }"
      >
        REGISTER
      </RouterLink>
    </nav>
    <div class="p-4">
      <RouterView />
    </div>
  </div>
</template>
