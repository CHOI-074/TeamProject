<script setup>
defineProps({
  disabled: Boolean,
});
</script>

<template>
  <div class="DangerButton">
    <button
      :disabled="disabled"
      class="w-full px-4 py-2 bg-red-600 text-white rounded-lg text-sm shadow hover:bg-red-700 active:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
      @click="$emit('click')"
    >
      <slot />
    </button>
  </div>
</template>
