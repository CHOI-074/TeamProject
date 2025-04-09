<template>
  <div class="analyze-container">
    <!-- 대시보드 컴포넌트 -->
    <DashboardView />

    <!-- 가장 많이 소비한 카테고리 차트 컴포넌트 -->
    <Top5Chart />

    <!-- 수입/지출 합산 컴포넌트 -->
    <SumboardView />
  </div>
</template>

<script>
// 각 컴포넌트들을 임포트합니다.
import DashboardView from '../views/DashboardView.vue';
import SumboardView from '../views/SumboardView.vue';
import Top5Chart from '../components/charts/Top5Chart.vue';

export default {
  name: 'AnalyzeView', // 컴포넌트 이름
  components: {
    DashboardView, // 대시보드 컴포넌트
    SumboardView, // 수입/지출 합산 컴포넌트
    Top5Chart, // 상위 5개 소비 카테고리 차트
  },
};
</script>

<style scoped>
/* AnalyzeView 기본 스타일 */
.analyze-container {
  display: flex;
  flex-direction: column; /* 세로로 컴포넌트들을 배치 */
  align-items: center; /* 중앙 정렬 */
  margin: 20px 0; /* 위아래 여백 */
}
</style>
