<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import TypeSwitch from '@/components/TypeSwitch.vue';
import IncomeCreatePage from './IncomeCreatePage.vue';
import ExpenseCreatePage from './ExpenseCreatePage.vue';

// 현재 URL 정보
const route = useRoute();
// 페이지 이동
const router = useRouter();
// 현재 수입/지출 상태를 담는 반응형 변수
const currentType = ref(route.query.type || 'income');

// 진입 시 URL에 쿼리가 없으면 기본값 설정
onMounted(() => {
  if (!route.query.type) {
    router.replace({ query: { type: 'income' } });
  }
});

// TypeSwitch에서 값이 바뀌면 실행되는 함수
function toggleType(type) {
  currentType.value = type;
  router.replace({ query: { type } });
}

// 쿼리 변경 감지해서 currentType 반영
watch(
  () => route.query.type,
  (val) => {
    currentType.value = val || 'income';
  }
);
</script>

<template>
  <div class="CreateWrapperPage">
    <TypeSwitch :modelValue="currentType" @update:modelValue="toggleType" />
    <component
      :is="currentType === 'income' ? IncomeCreatePage : ExpenseCreatePage"
    />
  </div>
</template>
