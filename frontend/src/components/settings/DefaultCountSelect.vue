<template>
  <label for="defaultCount" class="ec-label">
    Number of products shown by default:
    <select id="defaultCount" v-model="modelValue" class="ec-select">
      <option v-for="n in options" :key="n" :value="n">{{ n }}</option>
    </select>
  </label>
</template>

<script setup lang="ts">
defineProps<{
  options: number[];
}>();

const modelValue = defineModel<number>();
</script>
