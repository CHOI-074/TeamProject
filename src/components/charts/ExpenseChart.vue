<template>
  <div class="chart">
    <!-- chartData가 준비되었을 때만 차트를 렌더링 -->
    <PieChart v-if="chartData" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import axios from 'axios';
import { useUserStore } from '@/stores/userStore'; // ✅ Pinia store import

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default {
  name: 'ExpenseChart',

  components: {
    PieChart: Pie,
  },

  data() {
    return {
      chartData: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: {
                size: 12,
              },
            },
          },
        },
        layout: {
          padding: 10,
        },
      },
    };
  },

  async mounted() {
    // ✅ 로그인한 유저 ID Pinia에서 직접 가져오기
    const userStore = useUserStore();
    const userId = userStore.userId;

    console.log('[ExpenseChart] userId:', userId); // 디버깅용

    try {
      const [expenseRes, categoryRes] = await Promise.all([
        axios.get('http://localhost:3000/expense'),
        axios.get('http://localhost:3000/category'),
      ]);

      const expenses = expenseRes.data.filter((item) => item.userId === userId);
      const expenseCategories = categoryRes.data.filter((cat) => cat.type === 'expense');

      const categoryMap = {};
      expenseCategories.forEach((cat) => {
        categoryMap[cat.id] = cat.name;
      });

      const currentDate = new Date();
      const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

      const filteredExpenses = expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= firstDayOfMonth && expenseDate <= lastDayOfMonth;
      });

      const aggregatedData = {};
      filteredExpenses.forEach((expense) => {
        const categoryName = categoryMap[expense.categoryId] || '기타';
        if (!aggregatedData[categoryName]) {
          aggregatedData[categoryName] = 0;
        }
        aggregatedData[categoryName] += expense.amount;
      });

      const labels = Object.keys(aggregatedData);
      const data = Object.values(aggregatedData);

      this.chartData = {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: ['#4B5EAA', '#F4A261', '#60A5FA', '#2D3748', '#9333EA', '#84CC25', '#FBBF24', '#94A3B8'],
          },
        ],
      };
    } catch (error) {
      console.error('차트 데이터 로드 오류:', error);
    }
  },
};
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
