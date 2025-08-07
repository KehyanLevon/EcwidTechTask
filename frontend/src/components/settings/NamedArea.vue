<template>
  <div class="named-area">
    <div class="named-area__header">
      <div class="named-area__titles">
        <div class="named-area__title">{{ title }}</div>
      </div>
      <div class="named-area__description">{{ description }}</div>
    </div>
    <div v-if="$slots.default" class="named-area__body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
}>();
</script>

<style scoped>
.named-area__header {
  margin-top: 20px;
}
</style>
