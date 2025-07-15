<template>
  <div class="landing">
    <div class="hero">
      <h1>🏬 Welcome to My Online Store</h1>
      <p>We offer fresh, unique products for all your needs.</p>
    </div>
    <LandingComponent />
    <div class="about">
      <h2>About Us</h2>
      <p>
        This is a demo Ecwid store. We deliver fast, we care about quality, and
        we love what we do!
      </p>
    </div>

    <div class="contact">Contact us: demo@example.com</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import LandingComponent from "../components/LandingComponent.vue";

onMounted(() => {
  const scriptId = "ecwid-store-script";
  if (!document.getElementById(scriptId)) {
    const script = document.createElement("script");
    script.src = "https://app.ecwid.com/script.js?101560752";
    script.async = true;
    script.id = scriptId;
    document.body.appendChild(script);
    script.onload = () => {
      (window as any).Ecwid?.OnAPILoaded?.add(() => {
        (window as any).Ecwid.init();
      });
    };
  } else {
    (window as any).Ecwid?.init?.();
  }
});
</script>

<style scoped>
.landing {
  font-family: sans-serif;
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem;
}
.hero {
  text-align: center;
  margin-bottom: 2rem;
}
.storefront {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 2rem;
}
.about {
  text-align: center;
}
.contact {
  text-align: center;
  margin-top: 3rem;
  font-size: 0.9rem;
  color: #888;
}
</style>
