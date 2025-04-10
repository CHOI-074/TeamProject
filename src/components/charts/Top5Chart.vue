<template>
  <div class="top5-box box-margin">
    <h2 class="top5-title">
      이번 달 가장 많은 지출은
      <span class="highlight">{{ topCategoryName }}</span>
      입니다!
    </h2>

    <div class="chart-box">
      <BarChart v-if="chartData" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from 'chart.js';
import axios from 'axios';
import { useUserStore } from '@/stores/userStore'; // ✅ Pinia store import

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

export default {
  name: 'Top5Chart',
  components: {
    BarChart: Bar,
  },
  data() {
    return {
      chartData: null,
      topCategoryName: '',
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: { display: false },
        },
        scales: {
          x: {
            ticks: { font: { size: 12 } },
          },
          y: {
            beginAtZero: true,
            ticks: { font: { size: 12 } },
          },
        },
      },
    };
  },
  async mounted() {
    // ✅ 로그인한 유저 ID를 Pinia에서 가져오기
    const userStore = useUserStore();
    const userId = userStore.userId;

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    try {
      const [expenseRes, categoryRes] = await Promise.all([
        axios.get('http://localhost:3000/expense'),
        axios.get('http://localhost:3000/category'),
      ]);

      const thisMonthExpenses = expenseRes.data.filter((item) => {
        const date = new Date(item.date);
        return item.userId === userId && date.getMonth() === currentMonth && date.getFullYear() === currentYear;
      });

      const categoryMap = {};
      categoryRes.data.forEach((cat) => {
        categoryMap[cat.id] = cat.name;
      });

      const aggregated = {};
      thisMonthExpenses.forEach((item) => {
        const name = categoryMap[item.categoryId] || '기타';
        aggregated[name] = (aggregated[name] || 0) + item.amount;
      });

      const sorted = Object.entries(aggregated)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

      const labels = sorted.map(([name]) => name);
      const data = sorted.map(([, value]) => value);

      this.topCategoryName = labels[0] || '기타';

      this.chartData = {
        labels,
        datasets: [
          {
            label: '소비 금액',
            data,
            backgroundColor: '#60A5FA',
            borderRadius: 8,
            barThickness: 30,
          },
        ],
      };
    } catch (err) {
      console.error('Top 5 chart 로딩 오류:', err);
    }
  },
};
</script>

<style scoped>
.top5-box {
  background-color: #ffffff;
  border-radius: 2.7rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  padding: 1rem;
  width: 570px;
  margin: 1rem auto;
}

.top5-title {
  font-size: 1.125rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1rem;
}

.highlight {
  color: #3b82f6;
  font-weight: bold;
  font-size: 1.5rem;
}

.chart-box {
  background-color: #f9fafb;
  padding: 1rem;
  height: 16rem;
  border-radius: 0.75rem;
}
</style>
