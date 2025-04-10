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
import axios from 'axios';

const store = useTransactionStore();

// db.json(JSON Server)로부터 거래 데이터를 불러오는 함수
const fetchTransactions = async () => {
  try {
    // URL은 프로젝트 설정에 따라 수정할 수 있음.
    const response = await axios.get('http://localhost:3000/transactions');
    store.setTransactions(response.data);
  } catch (error) {
    console.error('Error fetching transactions:', error);
  }
};

onMounted(() => {
  fetchTransactions();
});
</script>
