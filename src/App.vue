<!-- App.vue -->
<template>
  <div>
    <!-- 네비게이션 바 -->
    <nav class="flex gap-4 p-4 bg-gray-200">
      <router-link to="/" class="hover:underline">필터</router-link>
      <router-link to="/dash" class="hover:underline">대시보드</router-link>
      <router-link to="/sum" class="hover:underline">총합보드</router-link>
    </nav>

    <!-- 현재 라우터 경로에 맞는 컴포넌트를 여기에 렌더링 -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
body {
  font-family: 'Arial', sans-serif;
}
</style>
