<script setup>
defineProps({
  active: Boolean,
});
</script>

<template>
  <button
    :class="[
      'px-3 py-1 rounded-full border text-sm transition',
      active
        ? 'bg-blue-500 text-white border-blue-500'
        : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200',
    ]"
  >
    <slot />
  </button>
</template>
