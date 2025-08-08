<template>
  <label class="checkbox big">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    />
    <div><div></div></div>
  </label>
</template>

<script setup lang="ts">
const modelValue = defineModel<boolean>();
</script>
