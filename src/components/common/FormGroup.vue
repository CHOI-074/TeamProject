<script setup>
defineProps({
  label: String,
});
</script>

<template>
  <div class="FormGroup">
    <div class="flex flex-col gap-1 text-sm text-gray-700">
      <label class="font-medium">{{ label }}</label>
      <slot />
    </div>
  </div>
</template>
