<script setup>
import RecordForm from '@/components/RecordForm.vue';
import api from '@/api/api';
import { useRecordStore } from '@/stores/recordStore';
import { useUserStore } from '@/stores/userStore';
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import PrimaryButton from '@/components/common/PrimaryButton.vue';
import DangerButton from '@/components/common/DangerButton.vue';

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
    <div class="flex gap-4 mt-6">
      <PrimaryButton
        class="flex-1 py-3 text-base"
        type="button"
        @click="update"
      >
        수정
      </PrimaryButton>
      <DangerButton class="flex-1 py-3 text-base" type="button" @click="remove">
        삭제
      </DangerButton>
    </div>
  </div>
</template>
