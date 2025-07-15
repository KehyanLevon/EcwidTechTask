<template>
  <Header />
  <main>
    <router-view />
  </main>
</template>

<script setup lang="ts">
import Header from "./components/Header.vue";
</script>

<style>
main {
  padding: 2rem;
  font-family: sans-serif;
}

body #app {
  padding: 0;
  margin: 0;
  height: 100vh;
  width: 100vw;
}
</style>
