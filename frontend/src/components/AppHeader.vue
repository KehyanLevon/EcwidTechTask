<template>
  <header class="app-header">
    <div><strong>Theta Store</strong></div>
    <nav>
      <a href="/">Home</a>
      <!-- <RouterLink to="/cart#!/~/cart">Cart</RouterLink>
      <RouterLink to="/settings">Settings</RouterLink> -->
      <a href="/cart#!/~/cart">Cart</a>
      <a href="/settings">Settings</a>
    </nav>
  </header>
</template>

<style scoped>
header,
footer {
  background: #000;
  color: #fff;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header nav a {
  color: #fff;
  margin-left: 1rem;
  text-decoration: none;
  font-weight: bold;
}

header nav a:hover {
  color: gray;
}

header {
  height: 7vh;
}

header div {
  cursor: default;
}
</style>
