<template>
    <!-- 총합 보드 컨테이너 -->
    <div class="sumboard-box">
      <!-- 이번달 수입 항목 -->
      <div class="sum-item">
        <p class="sum-title">이번달 수입</p>
        <p class="sum-value">₩{{ totalIncome.toLocaleString() }}</p>
      </div>
  
      <!-- 수평 구분선 -->
      <div class="divider"></div>
  
      <!-- 이번달 지출 항목 -->
      <div class="sum-item">
        <p class="sum-title">이번달 지출</p>
        <p class="sum-value">₩{{ totalExpense.toLocaleString() }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios"; // HTTP 요청을 위해 axios 사용
  
  export default {
    name: "ThisSum",
  
    // 부모로부터 사용자 ID를 prop으로 전달받음
    props: {
      userId: {
        type: Number, // 또는 String 사용 가능
        required: true,
      },
    },
  
    // 컴포넌트 내에서 사용하는 데이터 정의
    data() {
      return {
        totalIncome: 0, // 이번달 수입 총합
        totalExpense: 0, // 이번달 지출 총합
      };
    },
  
    // 컴포넌트가 마운트되었을 때 실행되는 비동기 로직
    async mounted() {
      const { userId } = this;
  
      // 오늘 날짜 기준으로 이번달 월, 연도 계산
      const today = new Date();
      const month = today.getMonth() + 1; // JS는 0부터 시작하므로 +1
      const year = today.getFullYear();
  
      try {
        // [1] 이번달 수입 데이터 가져오기
        const incomeRes = await axios.get("http://localhost:3000/income");
        const filteredIncome = incomeRes.data.filter(
          (i) =>
            i.userId === userId && // 해당 유저의 수입
            new Date(i.date).getMonth() + 1 === month && // 이번달인지 확인
            new Date(i.date).getFullYear() === year // 연도 확인
        );
        // 수입 총합 계산
        this.totalIncome = filteredIncome.reduce((sum, item) => sum + item.amount, 0);
  
        // [2] 이번달 지출 데이터 가져오기
        const expenseRes = await axios.get("http://localhost:3000/expense");
        const filteredExpense = expenseRes.data.filter(
          (e) =>
            e.userId === userId && // 해당 유저의 지출
            new Date(e.date).getMonth() + 1 === month &&
            new Date(e.date).getFullYear() === year
        );
        // 지출 총합 계산
        this.totalExpense = filteredExpense.reduce((sum, item) => sum + item.amount, 0);
      } catch (err) {
        console.error("이번달 데이터 로딩 오류:", err); // 에러 발생 시 로그 출력
      }
    },
  };
  </script>
  