<script setup lang="ts">
</script>

<template>
  <div class="app-wrapper">
    <Navbar />

    <main class="main-content">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  background: var(--bg-primary);
  font-family: 'Nexa', sans-serif;
}

.main-content {
  padding-top: 0;
}
</style>
