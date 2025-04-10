<template>
  <header class="bg-white p-4 mb-4 text-center">
    <!-- router-link를 사용하여 가계부 클릭 시 /transaction-history 페이지로 이동 -->
    <router-link to="/transaction-history" class="block">
      <h1 class="text-2xl font-bold">가계부</h1>
    </router-link>
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>
