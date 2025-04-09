<template>
  <div>
    <!-- 데이터 출력 -->

    <ul class="space-y-4">
      <li
        v-for="item in store.displayedTransactions"
        :key="item.id"
        class="flex justify-around py-2 border-b border-gray-200 last:border-0"
      >
        <span>{{ item.date }}</span>
        <span>{{ item.category }}</span>
        <span
          :class="{
            'text-[#34C759]': Number(item.amount) > 0,
            'text-[#FF3B30]': Number(item.amount) < 0,
          }"
        >
          {{ item.amount }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useTransactionStore } from '@/stores/transactionStore';
import { onMounted } from 'vue';

const store = useTransactionStore();

onMounted(() => {
  store.setTransactions([
    { id: 1, date: '2025-04-01', category: '식비', amount: '-15000' },
    { id: 2, date: '2025-04-02', category: '월급', amount: '+2000000' },
    { id: 3, date: '2025-04-03', category: '교통', amount: '-4500' },
    { id: 4, date: '2025-04-04', category: '쇼핑', amount: '-75000' },
    { id: 5, date: '2025-04-05', category: '문화', amount: '-20000' },
    { id: 6, date: '2025-04-06', category: '기타', amount: '-3000' },
    { id: 7, date: '2025-04-07', category: '식비', amount: '-12000' },
    { id: 8, date: '2025-04-08', category: '월급', amount: '+2000000' },
    { id: 9, date: '2025-04-09', category: '교통', amount: '-5000' },
    { id: 10, date: '2025-04-10', category: '쇼핑', amount: '-55000' },
    { id: 11, date: '2025-04-11', category: '식비', amount: '-10000' },
    { id: 12, date: '2025-04-12', category: '문화', amount: '-30000' },
    { id: 13, date: '2025-04-13', category: '기타', amount: '-8000' },
    { id: 1, date: '2025-04-01', category: '식비', amount: '-15000' },
    { id: 2, date: '2025-04-02', category: '월급', amount: '+2000000' },
    { id: 3, date: '2025-04-03', category: '교통', amount: '-4500' },
    { id: 4, date: '2025-04-04', category: '쇼핑', amount: '-75000' },
    { id: 5, date: '2025-04-05', category: '문화', amount: '-20000' },
    { id: 6, date: '2025-04-06', category: '기타', amount: '-3000' },
    { id: 7, date: '2025-04-07', category: '식비', amount: '-12000' },
    { id: 8, date: '2025-04-08', category: '월급', amount: '+2000000' },
    { id: 9, date: '2025-04-09', category: '교통', amount: '-5000' },
    { id: 10, date: '2025-04-10', category: '쇼핑', amount: '-55000' },
    { id: 11, date: '2025-04-11', category: '식비', amount: '-10000' },
    { id: 12, date: '2025-04-12', category: '문화', amount: '-30000' },
    { id: 13, date: '2025-04-13', category: '기타', amount: '-8000' },
    { id: 1, date: '2025-04-01', category: '식비', amount: '-15000' },
    { id: 2, date: '2025-04-02', category: '월급', amount: '+2000000' },
    { id: 3, date: '2025-04-03', category: '교통', amount: '-4500' },
    { id: 4, date: '2025-04-04', category: '쇼핑', amount: '-75000' },
    { id: 5, date: '2025-04-05', category: '문화', amount: '-20000' },
    { id: 6, date: '2025-04-06', category: '기타', amount: '-3000' },
    { id: 7, date: '2025-04-07', category: '식비', amount: '-12000' },
    { id: 8, date: '2025-04-08', category: '월급', amount: '+2000000' },
    { id: 9, date: '2025-04-09', category: '교통', amount: '-5000' },
    { id: 10, date: '2025-04-10', category: '쇼핑', amount: '-55000' },
    { id: 11, date: '2025-04-11', category: '식비', amount: '-10000' },
    { id: 12, date: '2025-04-12', category: '문화', amount: '-30000' },
    { id: 13, date: '2025-04-13', category: '기타', amount: '-8000' },
    // ...
  ]);
});
</script>
