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
  <div class="TypeSwitch flex justify-center my-4">
    <div class="inline-flex bg-gray-100 rounded-full shadow-inner p-1">
      <!-- 수입 탭 -->
      <button
        @click="switchType('income')"
        :class="[
          'px-4 py-2 rounded-full font-semibold transition-all duration-200',
          modelValue === 'income'
            ? 'bg-green-500 text-white scale-105 shadow-md'
            : 'text-gray-800 hover:text-black',
        ]"
      >
        수입
      </button>
      <!-- 지출 탭 -->
      <button
        @click="switchType('expense')"
        :class="[
          'px-4 py-2 rounded-full font-semibold transition-all duration-200',
          modelValue === 'expense'
            ? 'bg-red-500 text-white scale-105 shadow-md'
            : 'text-gray-800 hover:text-black',
        ]"
      >
        지출
      </button>
    </div>
  </div>
</template>
