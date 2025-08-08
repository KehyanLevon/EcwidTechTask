<template>
  <div>
    <label>
      <EcwidCheckbox v-model="modelValue" />
      Enable Recently Updated Products Widget
    </label>
  </div>
</template>

<script setup lang="ts">
import EcwidCheckbox from "../ecwid/EcwidCheckbox.vue";

const modelValue = defineModel<boolean>();
</script>
