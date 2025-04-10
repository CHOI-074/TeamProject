<script setup>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import TypeSwitch from '@/components/TypeSwitch.vue';
import IncomeEditPage from './IncomeEditPage.vue';
import ExpenseEditPage from './ExpenseEditPage.vue';
import incomeImg from '@/assets/incomeImg.png';
import expenseImg from '@/assets/expenseImg.png';

const route = useRoute();
const router = useRouter();

const currentType = ref(route.query.type || 'income');

watch(
  () => route.query.type,
  (val) => {
    currentType.value = val || 'income';
    console.log(currentType.value);
  },
  { immediate: true }
);

function toggleType(type) {
  if (currentType.value !== type) {
    currentType.value = type;
    router.replace({
      path: `/record/edit/${route.params.id}`,
      query: { type },
    });
  }
}
</script>

<template>
  <div class="EditWrapperPage w-full max-w-md md:max-w-2xl lg:max-w-4xl mx-auto px-4 md:px-8 lg:px-16 py-6">
    <img v-if="currentType === 'income'" :src="incomeImg" alt="수입 배너" class="mx-auto mb-4 w-64 h-auto" />
    <img v-else :src="expenseImg" alt="지출 배너" class="mx-auto mb-4 w-64 h-auto" />
    <TypeSwitch :modelValue="currentType" @update:modelValue="toggleType" />
    <component
      v-if="currentType"
      :is="currentType === 'income' ? IncomeEditPage : ExpenseEditPage"
      :key="currentType"
    />
  </div>
</template>
