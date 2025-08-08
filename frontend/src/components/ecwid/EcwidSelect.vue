<template>
  <div class="fieldset fieldset--select fieldset--no-label">
    <div class="fieldset__title">{{ label }}</div>
    <div>
      <div>
        <div class="field field--medium field--filled">
          <label class="field__label" :for="id"></label>
          <select
            :id="id"
            v-model="modelValue"
            class="field__select"
            tabindex="1"
          >
            <option
              v-for="option in options"
              :key="option"
              :value="option"
            >
              {{ formatOption(option) }}
            </option>
          </select>

          <div class="field__placeholder"></div>

          <span class="field__arrow">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" focusable="false">
              <path d="M7.85 10l5.02 4.9 5.27-4.9c.65-.66 1.71-.66 2.36 0 .65.67.65 1.74 0 2.4l-6.45 6.1c-.33.33-.76.5-1.18.5-.43 0-.86-.17-1.18-.5l-6.21-6.1c-.65-.66-.65-1.74 0-2.41.66-.65 1.72-.65 2.37.01z"/>
            </svg>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const modelValue = defineModel<number | 'all'>();

defineProps<{
  id: string;
  label: string;
  options: (number | 'all')[];
}>();

const formatOption = (value: number | 'all') =>
  value === 'all' ? 'All' : `Show ${value}`;
</script>
