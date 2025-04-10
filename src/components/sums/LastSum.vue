<template>
  <!-- 총합 보드 컨테이너 -->
  <div class="sumboard-box box-margin">
    <!-- 저번달 수입 항목 -->
    <div class="sum-item">
      <p class="sum-title">저번달 수입</p>
      <p class="sum-value">₩{{ displayIncome.toLocaleString() }}</p>
    </div>

    <!-- 수평 구분선 -->
    <div class="divider"></div>

    <!-- 저번달 지출 항목 -->
    <div class="sum-item">
      <p class="sum-title">저번달 지출</p>
      <p class="sum-value">₩{{ displayExpense.toLocaleString() }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useUserStore } from '@/stores/userStore'; // ✅ Pinia store import

export default {
  name: 'LastSum',

  data() {
    return {
      totalIncome: 0,
      totalExpense: 0,
      displayIncome: 0,
      displayExpense: 0,
    };
  },

  async mounted() {
    const userStore = useUserStore(); // ✅ userId 가져오기
    const userId = userStore.userId;

    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const month = lastMonth.getMonth() + 1;
    const year = lastMonth.getFullYear();

    try {
      const incomeRes = await axios.get('http://localhost:3000/income');
      const filteredIncome = incomeRes.data.filter(
        (i) =>
          i.userId === userId && new Date(i.date).getMonth() + 1 === month && new Date(i.date).getFullYear() === year
      );
      this.totalIncome = filteredIncome.reduce((sum, item) => sum + item.amount, 0);

      const expenseRes = await axios.get('http://localhost:3000/expense');
      const filteredExpense = expenseRes.data.filter(
        (e) =>
          e.userId === userId && new Date(e.date).getMonth() + 1 === month && new Date(e.date).getFullYear() === year
      );
      this.totalExpense = filteredExpense.reduce((sum, item) => sum + item.amount, 0);

      this.animateNumber('displayIncome', this.totalIncome);
      this.animateNumber('displayExpense', this.totalExpense);
    } catch (err) {
      console.error('저번달 데이터 로딩 오류:', err);
    }
  },

  methods: {
    animateNumber(field, targetValue) {
      const duration = 1000;
      const startTime = performance.now();

      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 7);

      const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);

        this[field] = Math.floor(easedProgress * targetValue);

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          this[field] = targetValue;
        }
      };

      requestAnimationFrame(update);
    },
  },
};
</script>
