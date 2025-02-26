<template>
  <div class="container mx-auto">
    <HeaderTabs />
    <div class="p-4">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderTabs from '@/components/HeaderTabs.vue'
</script>
