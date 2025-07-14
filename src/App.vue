<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header></header>
  <Suspense>
    <RouterView />
  </Suspense>
</template>

<style scoped></style>
