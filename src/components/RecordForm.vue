<script setup>
import { reactive, watch, computed, onMounted, ref } from 'vue';
import api from '@/api/api';
import CategoryPicker from './CategoryPicker.vue';

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
  <div class="RecordForm">
    <label>
      날짜
      <input type="date" v-model="form.date" :min="sixMonthsAgo" :max="today" />
    </label>

    <label>
      금액
      <input
        type="number"
        v-model.number="form.amount"
        placeholder="금액을 입력하세요"
      />
    </label>

    <label>
      카테고리
      <input :value="selectedCategoryName" readonly />
    </label>

    <CategoryPicker
      :type="props.type"
      :modelValue="form.categoryId"
      @select="handleCategorySelect"
    />

    <label>
      메모
      <input type="text" v-model="form.memo" placeholder="메모를 입력하세요" />
    </label>
  </div>
</template>

<style scoped>
.RecordForm {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}
label {
  display: flex;
  flex-direction: column;
  font-size: 14px;
}
input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}
input[readonly] {
  background-color: #f3f3f3;
  color: #666;
}
</style>
