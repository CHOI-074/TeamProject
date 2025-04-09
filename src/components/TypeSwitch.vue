<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

function switchType(type) {
  emit('update:modelValue', type);
}
</script>

<template>
  <div class="TypeSwitch">
    <button
      :class="{ active: modelValue === 'income' }"
      @click="switchType('income')"
    >
      수입
    </button>
    <button
      :class="{ active: modelValue === 'expense' }"
      @click="switchType('expense')"
    >
      지출
    </button>
  </div>
</template>

<style scoped>
.TypeSwitch {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  gap: 1rem;
}
button {
  padding: 8px 16px;
  border: 1px solid #ccc;
  background-color: white;
  border-radius: 1rem;
  cursor: pointer;
}
button.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}
</style>
