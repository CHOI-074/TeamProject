<script setup>
import PrimaryButton from '@/components/common/PrimaryButton.vue';
import RecordForm from '@/components/RecordForm.vue';
import { useRecordStore } from '@/stores/recordStore';
import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const store = useRecordStore();
const userStore = useUserStore();
const router = useRouter();

// 입력 폼 데이터
const form = ref({ date: '', amount: '', categoryId: '', memo: '' });

// RecordForm에서 emit('update:form') 시 호출됨
function updateForm(newForm) {
  form.value = { ...newForm };
}

// 중복 저장 방지용
let isSaving = false;

async function save() {
  if (isSaving) return;
  isSaving = true;

  console.log('지출 저장 실행됨', form.value);

  // 유효성 검사
  if (!form.value.date || !form.value.amount || !form.value.categoryId) {
    alert('날짜, 금액, 카테고리는 필수입니다.');
    isSaving = false; // 실패 시 다시 저장 가능하도록 초기화
    return;
  }

  // 지출 저장 후 이동
  await store.addExpense({
    ...form.value,
    userId: userStore.userId,
  });

  router.push('/transaction-history');
}
</script>

<template>
  <div class="ExpenseCreatePage">
    <RecordForm :initialForm="form" type="expense" @update:form="updateForm" />
    <PrimaryButton class="mt-6" @click="save">저장</PrimaryButton>
  </div>
</template>
