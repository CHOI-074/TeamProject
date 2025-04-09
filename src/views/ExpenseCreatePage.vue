<script setup>
import RecordForm from '@/components/RecordForm.vue';
import { useRecordStore } from '@/stores/recordStore';
import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const store = useRecordStore();
// 로그인 유저 정보
const userStore = useUserStore();
const router = useRouter();
const form = ref({ date: '', amount: '', categoryId: '', memo: '' });

function updateForm(newForm) {
  form.value = { ...newForm };
}

async function save() {
  if (!form.value.date || !form.value.amount || !form.value.categoryId) {
    alert('날짜, 금액, 카테고리는 필수입니다.');
    return;
  }
  await store.addExpense({
    ...form.value,
    userId: userStore.userId,
  });
  router.push('/');
}
</script>

<template>
  <div class="ExpenseCreatePage">
    <RecordForm :initialForm="form" type="expense" @update:form="updateForm" />
    <button @click="save">저장</button>
  </div>
</template>

<style scoped>
button {
  border: 1px solid gray;
  width: 5rem;
  height: 2.5rem;
  margin-left: 2rem;
  border-radius: 1.25rem;
}
</style>
