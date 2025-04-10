<template>
  <!-- 총합 보드 컨테이너 -->
  <div class="sumboard-box">
    <!-- 이번달 수입 항목 -->
    <div class="sum-item">
      <p class="sum-title">이번달 수입</p>
      <p class="sum-value">₩{{ displayIncome.toLocaleString() }}</p>
    </div>

    <!-- 수평 구분선 -->
    <div class="divider"></div>

    <!-- 이번달 지출 항목 -->
    <div class="sum-item">
      <p class="sum-title">이번달 지출</p>
      <p class="sum-value">₩{{ displayExpense.toLocaleString() }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ThisSum',

  props: {
    userId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      totalIncome: 0, // 실제 수입
      totalExpense: 0, // 실제 지출
      displayIncome: 0, // 표시될 수입 (애니메이션용)
      displayExpense: 0, // 표시될 지출 (애니메이션용)
    };
  },

  async mounted() {
    const { userId } = this;
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    try {
      // [1] 이번달 수입
      const incomeRes = await axios.get('http://localhost:3000/income');
      const filteredIncome = incomeRes.data.filter(
        (i) =>
          i.userId === userId && new Date(i.date).getMonth() + 1 === month && new Date(i.date).getFullYear() === year
      );
      this.totalIncome = filteredIncome.reduce((sum, item) => sum + item.amount, 0);

      // [2] 이번달 지출
      const expenseRes = await axios.get('http://localhost:3000/expense');
      const filteredExpense = expenseRes.data.filter(
        (e) =>
          e.userId === userId && new Date(e.date).getMonth() + 1 === month && new Date(e.date).getFullYear() === year
      );
      this.totalExpense = filteredExpense.reduce((sum, item) => sum + item.amount, 0);

      // 애니메이션 시작
      this.animateNumber('displayIncome', this.totalIncome);
      this.animateNumber('displayExpense', this.totalExpense);
    } catch (err) {
      console.error('이번달 데이터 로딩 오류:', err);
    }
  },

  methods: {
    // 숫자 증가 애니메이션
    animateNumber(field, targetValue) {
      const duration = 1000; // ⏱ 느리게: 2초로 증가
      const startTime = performance.now();

      //  부드러운 가속/감속 곡선 함수
      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 7);

      const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress); // 부드러운 증가

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
