<script setup>
import AppHeader from "../src/components/AppHeader.vue"
</script>

<template>
  <AppHeader />
  <main class="p-4">
    <RouterView />
  </main>
</template>

<style scoped lang="scss">
#app{
  display: flex;
  flex-direction: column;
}
</style>
