<template>
    <div class="chart">
      <!-- chartData가 준비되었을 때만 차트를 렌더링 -->
      <PieChart v-if="chartData" :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script>
  // vue-chartjs에서 Pie 차트를 사용하기 위해 필요한 요소들 임포트
  import { Pie } from "vue-chartjs";
  import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
  // axios는 데이터를 받아오기 위해 사용
  import axios from "axios";
  
  // 차트 관련 요소들을 ChartJS에 등록
  ChartJS.register(ArcElement, Tooltip, Legend, Title);
  
  export default {
    name: "ExpenseChart",
    components: {
      PieChart: Pie, // vue-chartjs에서 제공하는 Pie 컴포넌트를 사용
    },
    data() {
      return {
        chartData: null, // 차트에 표시할 데이터를 저장할 변수
        chartOptions: {
          responsive: true, // 차트 크기 자동 조정
          maintainAspectRatio: false, // 비율 유지하지 않음
          plugins: {
            legend: {
              position: "top", // 레전드 위치 설정
              labels: {
                font: {
                  size: 12, // 레전드 글자 크기
                },
              },
            },
          },
          layout: {
            padding: 10, // 차트 내부 여백
          },
        },
      };
    },
    async mounted() {
      // 로그인한 사용자의 id를 설정 (여기서는 "id123"을 예시로 사용)
      const userId = "id123";
  
      try {
        // expense와 category 데이터를 비동기로 받아오기
        const [expenseRes, categoryRes] = await Promise.all([
          axios.get("http://localhost:3000/expense"), // expense 데이터
          axios.get("http://localhost:3000/category"), // category 데이터
        ]);
  
        // 로그인한 유저의 expense 데이터만 필터링
        const expenses = expenseRes.data.filter((item) => item.userId === userId);
  
        // "expense" 타입인 카테고리만 필터링
        const expenseCategories = categoryRes.data.filter((cat) => cat.type === "expense");
  
        // 카테고리 id와 이름을 매핑할 객체 생성
        const categoryMap = {};
        expenseCategories.forEach((cat) => {
          categoryMap[cat.id] = cat.name;
        });
  
        // 이번 달의 시작일과 종료일 구하기
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
        // 이번 달 데이터만 필터링
        const filteredExpenses = expenses.filter((expense) => {
          const expenseDate = new Date(expense.date);
          return expenseDate >= firstDayOfMonth && expenseDate <= lastDayOfMonth;
        });
  
        // 지출 데이터에서 카테고리별로 합산한 값 계산
        const aggregatedData = {};
        filteredExpenses.forEach((expense) => {
          // expense.categoryId로 카테고리 이름을 찾음
          const categoryName = categoryMap[expense.categoryId] || "기타"; // 없으면 "기타"로 설정
          if (!aggregatedData[categoryName]) {
            aggregatedData[categoryName] = 0;
          }
          // 해당 카테고리의 금액을 누적
          aggregatedData[categoryName] += expense.amount;
        });
  
        // 차트에 사용할 레이블과 데이터 배열 생성
        const labels = Object.keys(aggregatedData); // 카테고리 이름
        const data = Object.values(aggregatedData); // 해당 카테고리의 총합
  
        // chartData 객체에 레이블과 데이터를 설정
        this.chartData = {
          labels: labels,
          datasets: [
            {
              data: data, // 수집된 데이터
              backgroundColor: [
                "#4B5EAA",
                "#F4A261",
                "#60A5FA",
                "#2D3748",
                "#9333EA",
                "#84CC25",
                "#FBBF24",
                "#94A3B8",
              ], // 각 항목의 색상
            },
          ],
        };
      } catch (error) {
        console.error("차트 데이터 로드 오류:", error); // 데이터 로드 오류 시 콘솔에 출력
      }
    },
  };
  </script>
  
  <style scoped>
  .chart {
    @apply h-64; /* 차트 높이를 조정 */
    width: 100%; /* 부모 요소에 맞춰 너비를 조정 */
    height: 100%; /* 부모 요소에 맞춰 높이를 조정 */
    display: flex;
    justify-content: center; /* 차트를 수평 가운데 정렬 */
    align-items: center; /* 차트를 수직 가운데 정렬 */
  }
  </style>
  