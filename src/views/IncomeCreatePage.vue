<script setup>
import PrimaryButton from '@/components/common/PrimaryButton.vue';
import RecordForm from '@/components/RecordForm.vue';
import { useRecordStore } from '@/stores/recordStore';
import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// 스토어 및 라우터 설정
const store = useRecordStore();
const userStore = useUserStore();
const router = useRouter();

// form 상태 초기화
const form = ref({ date: '', amount: '', categoryId: '', memo: '' });

// 자식 컴포넌트에서 emit('update:form') 하면 이 함수 호출됨
function updateForm(newForm) {
  form.value = { ...newForm };
}

// 저장 중인지 확인하기 위한 플래그
let isSaving = false;

async function save() {
  if (isSaving) return; // 중복 저장 방지
  isSaving = true;

  console.log('저장 실행됨', form.value);

  // 필수 값 확인
  if (!form.value.date || !form.value.amount || !form.value.categoryId) {
    alert('날짜, 금액, 카테고리는 필수입니다.');
    isSaving = false; // 저장 실패 시 플래그 초기화
    return;
  }

  // 수입 저장 후 이동
  await store.addIncome({
    ...form.value,
    userId: userStore.userId,
  });
  router.push('/transaction-history');
}
</script>

<template>
  <div class="IncomeCreatePage">
    <RecordForm :initialForm="form" type="income" @update:form="updateForm" />
    <PrimaryButton class="mt-6" @click="save">저장</PrimaryButton>
  </div>
</template>
