<script setup>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import TypeSwitch from '@/components/TypeSwitch.vue';
import IncomeEditPage from './IncomeEditPage.vue';
import ExpenseEditPage from './ExpenseEditPage.vue';

const route = useRoute();
const router = useRouter();
// 쿼리에서 type값을 읽어 income 또는 expense를 선택
// 쿼리 파라미터가 없으면 기본 값 income
const currentType = ref(route.query.type || 'income');

// TypeSwitch에서 토글될 때 호출되는 함수로, replace를 사용해서 히스토리 누적 없이 URL만 갱신
function toggleType(type) {
  currentType.value = type;
  router.replace({ path: `/record/edit/${route.params.id}`, query: { type } });
}

// URL 쿼리가 바뀌면(type=income, type=expense) 자동으로 currnetType도 바뀜
watch(
  () => route.query.type,
  (val) => {
    currentType.value = val || 'income';
  }
);
</script>

<template>
  <div class="EditWrapperPage">
    <TypeSwitch :modelValue="currentType" @update:modelValue="toggleType" />
    <component
      v-if="currentType"
      :is="currentType === 'income' ? IncomeEditPage : ExpenseEditPage"
    />
  </div>
</template>
