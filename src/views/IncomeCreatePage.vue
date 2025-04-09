<script setup>
import RecordForm from '@/components/RecordForm.vue';
import { useRecordStore } from '@/stores/recordStore';
import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// addIncome() 호출용
const store = useRecordStore();
const userStore = useUserStore();
// 페이지 이동용
const router = useRouter();

const form = ref({ date: '', amount: '', categoryId: '', memo: '' });

// 자식인 RecordForm에서 emit('update:form',form)이 실행되면 이 함수가 호출됨
function updateForm(newForm) {
  // form.value를 새로운 객체로 덮어씌움
  form.value = { ...newForm };
}

// 수입 데이터를 추가하고, 저장 성공 시 메인으로 이동
async function save() {
  if (!form.value.date || !form.value.amount || !form.value.categoryId) {
    alert('날짜, 금액, 카테고리는 필수입니다.');
    return;
  }
  await store.addIncome({
    ...form.value,
    userId: userStore.userId,
  });
  router.push('/');
}
</script>

<template>
  <div class="IncomeCreatePage">
    <!-- form값을 initialForm으로 전달 -->
    <!-- 내부 입력값이 바뀔 때마다 update:form 이벤트가 발생하고,
    부모의 updateForm()이 실행됨 -->
    <RecordForm :initialForm="form" type="income" @update:form="updateForm" />
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
