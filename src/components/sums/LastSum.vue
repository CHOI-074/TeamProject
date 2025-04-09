<template>
    <!-- 총합 보드 컨테이너 -->
    <div class="sumboard-box box-margin">
      <!-- 저번달 수입 항목 -->
      <div class="sum-item">
        <p class="sum-title">저번달 수입</p>
        <p class="sum-value">₩{{ totalIncome.toLocaleString() }}</p>
      </div>
  
      <!-- 수평 구분선 -->
      <div class="divider"></div>
  
      <!-- 저번달 지출 항목 -->
      <div class="sum-item">
        <p class="sum-title">저번달 지출</p>
        <p class="sum-value">₩{{ totalExpense.toLocaleString() }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios"; // axios를 이용해 API 호출
  
  export default {
    name: "LastSum",
  
    // 부모 컴포넌트로부터 전달받는 userId
    props: {
      userId: {
        type: Number, // 또는 String으로 처리 가능
        required: true,
      },
    },
  
    data() {
      return {
        totalIncome: 0, // 저번달 총 수입
        totalExpense: 0, // 저번달 총 지출
      };
    },
  
    async mounted() {
      // 현재 사용자 ID
      const { userId } = this;
  
      // 오늘 날짜 기준으로 저번달 연도와 월 계산
      const today = new Date();
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const month = lastMonth.getMonth() + 1; // JS는 0~11월이므로 +1
      const year = lastMonth.getFullYear();
  
      try {
        // [1] 저번달 수입 데이터 가져오기
        const incomeRes = await axios.get("http://localhost:3000/income");
        const filteredIncome = incomeRes.data.filter(
          (i) =>
            i.userId === userId && // 해당 유저의 데이터
            new Date(i.date).getMonth() + 1 === month && // 월이 저번달인지 확인
            new Date(i.date).getFullYear() === year // 연도도 확인
        );
        // 수입 총합 계산
        this.totalIncome = filteredIncome.reduce((sum, item) => sum + item.amount, 0);
  
        //  [2] 저번달 지출 데이터 가져오기
        const expenseRes = await axios.get("http://localhost:3000/expense");
        const filteredExpense = expenseRes.data.filter(
          (e) =>
            e.userId === userId &&
            new Date(e.date).getMonth() + 1 === month &&
            new Date(e.date).getFullYear() === year
        );
        // 지출 총합 계산
        this.totalExpense = filteredExpense.reduce((sum, item) => sum + item.amount, 0);
      } catch (err) {
        console.error("저번달 데이터 로딩 오류:", err); // 오류 발생 시 출력
      }
    },
  };
  </script>
  