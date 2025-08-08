<template>
  <EcwidSelect
    id="defaultCount"
    label="Number of products shown by default"
    :options="[3, 5, 8, 10]"
    v-model="modelValue"
  />
</template>

<script setup lang="ts">
import EcwidSelect from "../ecwid/EcwidSelect.vue";

defineProps<{
  options: (number | 'all')[];
}>();

const modelValue = defineModel<number | 'all'>();
</script>
