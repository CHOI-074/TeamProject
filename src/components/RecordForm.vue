<script setup>
import { reactive, watch, computed, onMounted, ref, readonly } from 'vue';
import api from '@/api/api';
import CategoryPicker from './CategoryPicker.vue';
import FormGroup from './common/FormGroup.vue';
import BaseInput from './common/BaseInput.vue';

const today = new Date().toISOString().split('T')[0];
const sixMonthsAgoDate = new Date();
sixMonthsAgoDate.setMonth(sixMonthsAgoDate.getMonth() - 6);
const sixMonthsAgo = sixMonthsAgoDate.toISOString().split('T')[0];

const props = defineProps({
  initialForm: { type: Object, default: () => ({}) },
  type: { type: String, required: true },
});
const emit = defineEmits(['update:form']);

const form = reactive({
  date: '',
  amount: '',
  categoryId: '',
  memo: '',
});

// 카테고리 리스트 상태
const categoryList = ref([]);

// initialForm을 reactive form에 반영 (초기 데이터 설정용)
watch(
  () => props.initialForm,
  (val) => {
    Object.assign(form, val);
  },
  { immediate: true }
);

// 중복 emit 방지를 위한 상태 기록
let lastEmitted = JSON.stringify(form);

// form 상태가 변경될 때 부모로 emit - 중복 방지 로직 추가
watch(
  form,
  (val) => {
    const now = JSON.stringify(val);
    if (now !== lastEmitted) {
      emit('update:form', val); // 실제 상태 반영
      lastEmitted = now; // 이전 값 저장해서 비교
    }
  },
  { deep: true }
);

// 선택된 카테고리 이름 계산
const selectedCategoryName = computed(() => {
  const cat = categoryList.value.find((c) => c.id == form.categoryId);
  return cat ? cat.name : '';
});

// 카테고리 목록 로드드
async function fetchCategories() {
  const res = await api.get('/category');
  categoryList.value = res.data.filter((c) => c.type === props.type);
}

// 카테고리 선택 시 categoryId만 업데이트
function handleCategorySelect(id) {
  form.categoryId = id;
}

onMounted(fetchCategories);
</script>

<template>
  <div class="RecordForm flex flex-col gap-4">
    <FormGroup label="날짜">
      <BaseInput
        v-model="form.date"
        type="date"
        :min="sixMonthsAgo"
        :max="today"
      />
    </FormGroup>

    <FormGroup label="금액">
      <BaseInput
        type="number"
        v-model.number="form.amount"
        placeholder="금액을 입력하세요"
      />
    </FormGroup>

    <FormGroup label="카테고리">
      <input
        type="text"
        :value="selectedCategoryName"
        readonly
        placeholder="카테고리를 선택하세요"
        class="w-full border rounded px-3 py-2 bg-gray-100 text-gray-700"
      />
      <CategoryPicker
        :type="props.type"
        :modelValue="form.categoryId"
        @select="handleCategorySelect"
      />
    </FormGroup>

    <FormGroup label="메모">
      <BaseInput
        type="text"
        v-model="form.memo"
        placeholder="메모를 입력하세요"
      />
    </FormGroup>
  </div>
</template>
