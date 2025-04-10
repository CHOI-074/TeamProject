<template>
  <div class="fixed inset-0 bg-white flex items-center justify-center" v-if="isModalOpen">
    <div class="bg-white w-80 rounded-lg p-6 shadow-xl">
      <div class="flex justify-between items-center mb-5">
        <h2 class="text-xl font-semibold">조회 조건 설정</h2>
        <button @click="closeModal" class="text-gray-500 text-2xl">✕</button>
      </div>

      <div class="mb-4">
        <div class="flex gap-2 mb-3">
          <button
            v-for="(label, index) in periodOptions"
            :key="index"
            @click="toggleSelection('period', label.value)"
            :class="[
              'flex-1 py-2 border rounded-lg',
              selectedPeriod === label.value ? 'bg-blue-100 text-blue-600 font-semibold' : 'text-gray-500',
            ]"
          >
            {{ label.text }}
          </button>
        </div>

        <div class="grid grid-cols-4 gap-2 mb-3 text-sm">
          <button
            v-for="(label, index) in rangeOptions"
            :key="index"
            @click="toggleSelection('range', label.value)"
            :class="[
              'py-2 border rounded-lg',
              selectedRange === label.value ? 'bg-blue-600 text-white' : 'text-gray-500',
            ]"
          >
            {{ label.text }}
          </button>
        </div>
        <div v-if="selectedPeriod === 'range'" class="flex items-center gap-1 w-full mb-4">
          <input type="date" class="flex-1 min-w-0 border rounded-lg px-2 py-1" placeholder="시작 날짜" />
          <span>~</span>
          <input type="date" class="flex-1 min-w-0 border rounded-lg px-2 py-1" placeholder="종료 날짜" />
        </div>
      </div>
      <div class="mb-4">
        <div class="flex gap-2 mb-3">
          <button
            v-for="(label, index) in typeOptions"
            :key="index"
            @click="toggleSelection('type', label.value)"
            :class="[
              'flex-1 py-2 border rounded-lg',
              selectedType === label.value ? 'bg-blue-600 text-white' : 'text-gray-500',
            ]"
          >
            {{ label.text }}
          </button>
        </div>
      </div>
      <div class="mb-4">
        <div class="flex gap-2">
          <button
            v-for="(label, index) in orderOptions"
            :key="index"
            @click="toggleSelection('order', label.value)"
            :class="[
              'flex-1 py-2 border rounded-lg',
              selectedOrder === label.value ? 'bg-blue-600 text-white' : 'text-gray-500',
            ]"
          >
            {{ label.text }}
          </button>
        </div>
      </div>
      <div class="mb-6">
        <div class="flex items-center gap-1 w-full">
          <input type="number" placeholder="최소금액" class="flex-1 min-w-0 border rounded-lg px-2 py-2" />
          <span>–</span>
          <input type="number" placeholder="최대금액" class="flex-1 min-w-0 border rounded-lg px-2 py-2" />
        </div>
      </div>
      <div class="flex gap-2">
        <button @click="closeModal" class="flex-1 border border-gray-300 rounded-lg py-3 text-gray-600">취소</button>
        <button
          @click="toggleSelection('action', 'search')"
          :class="[
            'flex-1 rounded-lg py-3 font-semibold',
            selectedAction === 'search' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600',
          ]"
        >
          조회
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isModalOpen = ref(true);
const selectedPeriod = ref('');
const selectedRange = ref('');
const selectedType = ref('');
const selectedOrder = ref('');
const selectedAction = ref('');

const periodOptions = [
  { text: '월별선택', value: 'monthly' },
  { text: '기간지정', value: 'range' },
];

const rangeOptions = [
  { text: '1주일', value: '1week' },
  { text: '1개월', value: '1month' },
  { text: '3개월', value: '3months' },
  { text: '6개월', value: '6months' },
];

const typeOptions = [
  { text: '수입', value: 'income' },
  { text: '지출', value: 'expense' },
];

const orderOptions = [
  { text: '최신순', value: 'recent' },
  { text: '과거순', value: 'oldest' },
];

const closeModal = () => {
  isModalOpen.value = false;
};

const toggleSelection = (category, value) => {
  if (category === 'period') selectedPeriod.value = selectedPeriod.value === value ? '' : value;
  if (category === 'range') selectedRange.value = selectedRange.value === value ? '' : value;
  if (category === 'type') selectedType.value = selectedType.value === value ? '' : value;
  if (category === 'order') selectedOrder.value = selectedOrder.value === value ? '' : value;
  if (category === 'action') selectedAction.value = selectedAction.value === value ? '' : value;
};
</script>

<style>
body {
  font-family: 'Arial', sans-serif;
}
</style>
