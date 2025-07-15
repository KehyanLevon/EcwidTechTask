<template>
  <header class="header">
    <nav class="nav">
      <router-link to="/" class="nav-link">🏠 Home</router-link>
      <router-link to="/cart" class="nav-link">🛒 Cart</router-link>
    </nav>
  </header>
</template>

<style scoped>
.header {
  background-color: #111;
  padding: 1rem;
  width: 100%;
}
.nav {
  display: flex;
  gap: 1rem;
  justify-content: center;
}
.nav-link {
  color: white;
  text-decoration: none;
  font-weight: bold;
}
.nav-link:hover {
  text-decoration: underline;
}
</style>
