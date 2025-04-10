<script setup>
import { reactive, watch, computed, onMounted, ref } from 'vue';
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

const categoryList = ref([]);

watch(
  () => props.initialForm,
  (val) => {
    Object.assign(form, val);
  },
  { immediate: true }
);

watch(
  form,
  (val) => {
    emit('update:form', val);
  },
  { deep: true }
);

const selectedCategoryName = computed(() => {
  const cat = categoryList.value.find((c) => c.id == form.categoryId);
  return cat ? cat.name : '';
});

async function fetchCategories() {
  const res = await api.get('/category');
  categoryList.value = res.data.filter((c) => c.type === props.type);
}

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
