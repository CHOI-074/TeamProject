<template>
  <div>
    <!-- 네비게이션 바 -->
    <nav class="flex gap-4 p-4 bg-gray-200">
      <router-link to="/" class="hover:underline">대시보드</router-link>
      <router-link to="/sum" class="hover:underline">총합보드</router-link>
      <router-link to="/top5" class="hover:underline">Top 5 차트</router-link>
      <router-link to="/analyze" class="hover:underline"
        >애널라이즈뷰</router-link
      >
      <!-- AnalyzeView 링크 추가 -->
    </nav>

    <!-- 선택된 라우트 컴포넌트가 여기에 렌더링됨 -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* 필요하면 전역 스타일 추가 */
</style>
