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
import axios from 'axios'; // axios를 이용해 API 호출

export default {
  name: 'LastSum',

  // 부모 컴포넌트로부터 전달받는 userId
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      totalIncome: 0, // 실제 수입 총합
      totalExpense: 0, // 실제 지출 총합
      displayIncome: 0, // 애니메이션으로 표시할 수입
      displayExpense: 0, // 애니메이션으로 표시할 지출
    };
  },

  async mounted() {
    const { userId } = this;

    // 오늘 날짜 기준으로 저번달 연도와 월 계산
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const month = lastMonth.getMonth() + 1;
    const year = lastMonth.getFullYear();

    try {
      // [1] 저번달 수입 데이터 가져오기
      const incomeRes = await axios.get('http://localhost:3000/income');
      const filteredIncome = incomeRes.data.filter(
        (i) =>
          i.userId === userId &&
          new Date(i.date).getMonth() + 1 === month &&
          new Date(i.date).getFullYear() === year
      );
      this.totalIncome = filteredIncome.reduce(
        (sum, item) => sum + item.amount,
        0
      );

      // [2] 저번달 지출 데이터 가져오기
      const expenseRes = await axios.get('http://localhost:3000/expense');
      const filteredExpense = expenseRes.data.filter(
        (e) =>
          e.userId === userId &&
          new Date(e.date).getMonth() + 1 === month &&
          new Date(e.date).getFullYear() === year
      );
      this.totalExpense = filteredExpense.reduce(
        (sum, item) => sum + item.amount,
        0
      );

      // 수입과 지출에 대해 애니메이션 시작
      this.animateNumber('displayIncome', this.totalIncome);
      this.animateNumber('displayExpense', this.totalExpense);
    } catch (err) {
      console.error('저번달 데이터 로딩 오류:', err);
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
