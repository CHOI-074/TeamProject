<script setup>
// 카테고리 버튼 목록
import { ref, computed, onMounted, watch } from 'vue';
import api from '@/api/api';
import CategoryButton from './common/CategoryButton.vue';

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
watch(
  () => props.type,
  async (val) => {
    if (!val) return;
    const res = await api.get('/category');
    categories.value = res.data.filter((c) => c.type === val);
  },
  { immediate: true }
);
</script>

<template>
  <div class="CategoryPicker flex flex-wrap gap-2 mt-2">
    <CategoryButton
      v-for="category in categories"
      :key="category.id"
      :active="modelValue == category.id"
      @click="handleClick(category)"
    >
      {{ category.name }}
    </CategoryButton>
  </div>
</template>
