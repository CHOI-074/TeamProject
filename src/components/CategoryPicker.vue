<script setup>
// 카테고리 버튼 목록
import { ref, computed, onMounted, watch } from 'vue';
import api from '@/api/api';

// 부모로부터 type을 props로 전달받음
// 카테고리 필터 기준이 됨
const props = defineProps({
  type: String,
  modelValue: String,
});

// 자식 컴포넌트인 CategoryPicker에서 부모로 이벤트 보낼 준비
// emit('select', 값) 호출 시 부모가 이를 감지할 수 있음
const emit = defineEmits(['select']);
// 서버에서 받아올 카테고리 전체 목록
const categories = ref([]);

// /category 엔드포인트에서 카테고리 목록을 불러와서 결과를 categories.value에 저장
async function fetchCategory() {
  const res = await api.get('/category');
  categories.value = res.data.filter((c) => c.type === props.type);
}

function handleClick(category) {
  emit('select', category.id);
}

onMounted(fetchCategory);
watch(() => props.type, fetchCategory);
</script>

<template>
  <div class="CategoryPicker">
    <button
      v-for="category in categories"
      :key="category.id"
      :class="{ selected: modelValue == category.id }"
      @click="handleClick(category)"
    >
      {{ category.name }}
    </button>
  </div>
</template>

<style scoped>
.CategoryPicker {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}
button {
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: #f8f8f8;
  cursor: pointer;
}
button.selected {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}
</style>
