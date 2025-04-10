<template>
  <div class="dashboard-container">
    <!-- 대시보드 박스 -->
    <div class="dashboard-box">
      <h1 class="title">이번달</h1>

      <!-- 정사각형 박스들이 들어갈 영역 -->
      <div class="box-container">
        <!-- 첫 번째 정사각형 박스 -->
        <div class="chart-box">
          <p class="chart-label">지출내역</p>
          <div class="square-box white-box">
            <ExpenseChart />
          </div>
        </div>

        <!-- 두 번째 정사각형 박스 -->
        <div class="chart-box">
          <p class="chart-label">수입내역</p>
          <div class="square-box white-box">
            <IncomeChart />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Chart 컴포넌트를 불러옵니다.
import ExpenseChart from '../components/charts/ExpenseChart.vue';
import IncomeChart from '../components/charts/IncomeChart.vue';

export default {
  name: 'DashboardView',
  components: {
    ExpenseChart,
    IncomeChart,
  },
};
</script>

<style scoped>
/* 대시보드 기본 스타일 */
.dashboard-container {
  display: flex;
  justify-content: center; /* 가로로 중앙 정렬 */
  align-items: center; /* 세로로 중앙 정렬 */
  height: 500px; /* 전체 화면 높이 */
  padding: 20px; /* 화면의 가장자리에 패딩을 추가하여 반응형 처리 */
  box-sizing: border-box; /* 패딩이 크기 계산에 포함되도록 설정 */
}

.dashboard-box {
  /* background-color: white; */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0); /* 이번달을 포함하는 박스 그림자 */
  border-radius: 8px;
  padding: 4% 5%; /* 패딩을 %로 설정하여 화면 크기에 비례하여 자동 조정 */
  width: 100%; /* 화면 크기에 맞게 가로 크기 설정 */
  max-width: 640px; /* 최대 가로 크기 설정 */
  min-width: 400px; /* 최소 가로 크기 설정 */
  box-sizing: border-box; /* 패딩을 포함하여 크기 계산 */
}

/* 타이틀 스타일 */
.title {
  font-size: 28px; /* 글씨 크기를 조금 더 키움 */
  font-weight: bold;
  margin-bottom: 8px;
  text-align: left; /* 왼쪽 정렬 */
  color: #a0a0a0; /* 연한 회색으로 색상 변경 */
}

/* 정사각형 박스 컨테이너 */
.box-container {
  display: flex;
  gap: 2%; /* 정사각형 박스 사이의 간격 */
  margin-top: 16px;
  flex-wrap: nowrap; /* 줄바꿈 없이 가로로 정렬 */
  justify-content: space-between; /* 박스 간의 간격을 일정하게 유지 */
}

/* 차트 박스 스타일 */
.chart-box {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  width: 320px; /* 화면 크기에 맞게 가로 크기 설정 */
  /* height: 300px; */
  max-width: 290%; /* 박스가 너무 커지지 않도록 최대 너비 설정 */
  max-height: 290%; /* 박스가 너무 커지지 않도록 최대 너비 설정 */
  min-width: 230px; /* 박스가 너무 작아지지 않도록 최소 너비 설정 */
}

/* 차트 레이블 스타일 */
.chart-label {
  font-size: 23px;
  font-weight: bold;
  color: #203870; /* 진한 남색으로 색상 변경 */
  margin-bottom: 4px;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6); /* 그림자 추가 (0.4로 강하게) */
}

/* 정사각형 박스 스타일 */
.square-box {
  flex: 1;
  aspect-ratio: 1 / 1; /* 정사각형 비율 유지 */
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333; /* 글씨 색상 조정 */
  font-weight: bold;
  font-size: 18px;
  background-color: white; /* 배경 색을 화이트로 설정 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4); /* 그림자 추가 */
}

/* 차트의 크기를 박스의 3/4로 설정 */
.square-box .chart-container {
  width: 75%;
  height: 75%;
}
</style>
