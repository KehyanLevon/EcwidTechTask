import { ref, watch } from "vue";
import { ENABLE_KEY, DEFAULT_COUNT_KEY } from "../constants/localStorageKeys";

export function useSettings() {
  const enabled = ref(localStorage.getItem(ENABLE_KEY) !== "false");
  const defaultCount = ref(
    Number(localStorage.getItem(DEFAULT_COUNT_KEY)) || 5
  );

  watch(enabled, (val) => {
    localStorage.setItem(ENABLE_KEY, String(val));
  });

  watch(defaultCount, (val) => {
    localStorage.setItem(DEFAULT_COUNT_KEY, String(val));
  });

  return { enabled, defaultCount };
}
