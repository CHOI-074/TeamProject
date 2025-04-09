<script setup>
import RecordForm from '@/components/RecordForm.vue';
import api from '@/api/api';
import { useRecordStore } from '@/stores/recordStore';
import { useUserStore } from '@/stores/userStore';
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const store = useRecordStore();
const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const form = ref({});

function updateForm(newForm) {
  form.value = { ...newForm };
}

async function fetchData() {
  const { data } = await api.get(`/expense/${route.params.id}`);
  form.value = data;
}

async function update() {
  await store.updateExpense(route.params.id, {
    ...form.value,
    userId: userStore.userId,
  });
  router.push('/');
}

async function remove() {
  await store.deleteExpense(route.params.id);
  router.push('/');
}

onMounted(fetchData);
</script>

<template>
  <div class="ExpenseEditPage">
    <RecordForm :initialForm="form" type="expense" @update:form="updateForm" />
    <div class="button-row">
      <button @click="update">수정</button>
      <button @click="remove">삭제</button>
    </div>
  </div>
</template>

<style scoped>
.button-row {
  display: flex;
  gap: 1rem;
  margin-left: 2rem;
  margin-top: 1rem;
}

button {
  border: 1px solid gray;
  width: 5rem;
  height: 2.5rem;
  border-radius: 1.25rem;
  cursor: pointer;
}
</style>
