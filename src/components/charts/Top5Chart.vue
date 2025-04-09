<template>
  <!-- 전체 차트 박스를 감싸는 컴포넌트 -->
  <div class="top5-box box-margin">
    <!-- 이번 달 가장 많이 소비한 카테고리 텍스트 -->
    <h2 class="top5-title">
      이번달에는
      <!-- 강조 텍스트: 카테고리명을 강조 -->
      <span class="highlight">{{ topCategoryName }}</span>
      를 가장 많이 소비했어요
    </h2>

    <!-- 차트 렌더링 영역 -->
    <div class="chart-box">
      <!-- chartData가 있을 경우에만 BarChart 컴포넌트를 렌더링 -->
      <BarChart v-if="chartData" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script>
// 차트 관련 모듈 및 컴포넌트
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
// axios는 비동기 API 호출을 위한 라이브러리
import axios from 'axios';

// Chart.js에 필요한 요소 등록
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

export default {
  name: 'Top5Chart', // 컴포넌트 이름
  components: {
    BarChart: Bar, // vue-chartjs에서 제공하는 Bar 차트 컴포넌트 사용
  },
  data() {
    return {
      chartData: null, // 차트에 표시될 데이터
      chartOptions: {
        // 차트 설정 옵션
        responsive: true, // 반응형 차트
        maintainAspectRatio: false, // 비율 고정하지 않음
        plugins: {
          legend: { display: false }, // 범례 숨김
          title: { display: false }, // 차트 제목 숨김
        },
        scales: {
          x: {
            ticks: { font: { size: 12 } }, // x축 글씨 크기 설정
          },
          y: {
            beginAtZero: true, // y축 0부터 시작
            ticks: { font: { size: 12 } }, // y축 글씨 크기 설정
          },
        },
      },
      topCategoryName: '', // 가장 많이 소비한 카테고리 이름
    };
  },
  async mounted() {
    const userId = 'id123'; // 사용자 ID (예시값)
    const now = new Date();
    const currentMonth = now.getMonth(); // 현재 월
    const currentYear = now.getFullYear(); // 현재 연도

    try {
      // expense와 category 데이터를 동시에 비동기 요청
      const [expenseRes, categoryRes] = await Promise.all([
        axios.get('http://localhost:3000/expense'), // 지출 데이터 요청
        axios.get('http://localhost:3000/category'), // 카테고리 데이터 요청
      ]);

      // 이번 달과 본인(userId)의 지출만 필터링
      const thisMonthExpenses = expenseRes.data.filter((item) => {
        const date = new Date(item.date); // 지출 날짜
        return (
          item.userId === userId && // 본인의 데이터만
          date.getMonth() === currentMonth && // 이번 달만
          date.getFullYear() === currentYear // 이번 연도만
        );
      });

      // 카테고리 데이터를 id를 기준으로 이름을 매핑
      const categoryMap = {};
      categoryRes.data.forEach((cat) => {
        categoryMap[cat.id] = cat.name; // 카테고리 ID -> 카테고리 이름
      });

      // 지출 금액을 카테고리별로 합산
      const aggregated = {};
      thisMonthExpenses.forEach((item) => {
        const name = categoryMap[item.categoryId] || '기타'; // 카테고리 이름
        aggregated[name] = (aggregated[name] || 0) + item.amount; // 금액 합산
      });

      // 금액 기준으로 내림차순 정렬 후 상위 5개 항목만 추출
      const sorted = Object.entries(aggregated)
        .sort((a, b) => b[1] - a[1]) // 금액 기준 내림차순 정렬
        .slice(0, 5); // 상위 5개 항목만

      // 차트에 사용할 레이블과 데이터 준비
      const labels = sorted.map(([name]) => name); // 카테고리 이름
      const data = sorted.map(([, value]) => value); // 금액 데이터

      // 가장 많이 소비한 카테고리 이름을 topCategoryName에 저장
      this.topCategoryName = labels[0] || '기타';

      // 차트에 필요한 데이터 설정
      this.chartData = {
        labels,
        datasets: [
          {
            label: '소비 금액', // 차트 레이블
            data,
            backgroundColor: '#60A5FA', // 바 색상
            borderRadius: 8, // 바의 둥근 모서리
            barThickness: 30, // 바 두께
          },
        ],
      };
    } catch (err) {
      // 데이터 로딩 오류 시 콘솔에 출력
      console.error('Top 5 chart 로딩 오류:', err);
    }
  },
};
</script>

<style scoped>
/* 전체 박스 스타일 */
.top5-box {
  background-color: #ffffff; /* 배경색 */
  border-radius: 1rem; /* 둥근 모서리 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4); /* 그림자 효과 */
  padding: 1rem; /* 내부 여백 */
  max-width: 600px; /* 최대 너비 */
  margin: 1rem auto; /* 상하 여백 및 가운데 정렬 */
}

/* 제목 텍스트 스타일 */
.top5-title {
  font-size: 1.125rem; /* 폰트 크기 */
  font-weight: 600; /* 폰트 두께 */
  text-align: center; /* 텍스트 중앙 정렬 */
  margin-bottom: 1rem; /* 하단 여백 */
}

/* 강조 텍스트 스타일 (글자 크기 키움) */
.highlight {
  color: #3b82f6; /* 강조 색상 */
  font-weight: bold; /* 볼드체 */
  font-size: 1.5rem; /* 글자 크기 키운 부분 */
}

/* 차트를 감싸는 박스 */
.chart-box {
  background-color: #f9fafb; /* 차트 영역 배경색 */
  padding: 1rem; /* 내부 여백 */
  height: 16rem; /* 높이 설정 */
  border-radius: 0.75rem; /* 둥근 모서리 */
}
</style>
