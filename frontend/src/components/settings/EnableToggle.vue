<template>
  <div>
    <label class="ec-switch">
      <input type="checkbox" v-model="modelValue" />
      <span class="ec-switch__track"></span>
      Enable Recently Updated Products Widget
    </label>
  </div>
</template>

<script setup lang="ts">
const modelValue = defineModel<boolean>();
</script>
