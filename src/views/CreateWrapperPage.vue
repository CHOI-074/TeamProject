<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TypeSwitch from '@/components/TypeSwitch.vue';
import IncomeCreatePage from './IncomeCreatePage.vue';
import ExpenseCreatePage from './ExpenseCreatePage.vue';
import incomeImg from '@/assets/incomeImg.png';
import expenseImg from '@/assets/expenseImg.png';

const route = useRoute();
const router = useRouter();

// 쿼리로부터 type을 computed로 유지
const currentType = computed(() => route.query.type || 'income');

function toggleType(type) {
  router.replace({
    path: route.path,
    query: { type },
  });
}
</script>

<template>
  <div class="CreateWrapperPage max-w-md mx-auto px-4 py-6">
    <img
      v-if="currentType === 'income'"
      :src="incomeImg"
      alt="수입 배너"
      class="mx-auto mb-4 w-64 h-auto"
    />
    <img
      v-else
      :src="expenseImg"
      alt="지출 배너"
      class="mx-auto mb-4 w-64 h-auto"
    />

    <TypeSwitch :modelValue="currentType" @update:modelValue="toggleType" />

    <component
      :is="currentType === 'income' ? IncomeCreatePage : ExpenseCreatePage"
      :key="`${currentType}-${route.path}`"
    />
  </div>
</template>
