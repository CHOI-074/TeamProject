<template>
  <div class="container mx-auto p-4 pb-32">
    <!-- 헤더: 흰색 배경 -->
    <header class="bg-white p-4 mb-4 text-center">
      <h1 class="text-2xl font-bold">가계부</h1>
    </header>

    <!-- 네비게이션: 흰색 배경 -->
    <nav class="bg-white p-4 mb-4 border-b border-gray-300 sticky top-0 z-50">
      <ul class="flex justify-around">
        <li class="py-2 px-4">My</li>
        <li class="py-2 px-4 border-b-2 border-[#1814F3] font-bold text-[#1814F3]">거래 내역</li>
        <li class="py-2 px-4">분석</li>
      </ul>
    </nav>

    <!-- 메인 section: 배경색 #F5F7FA, 상하 패딩 늘림 -->
    <section class="w-full min-h-screen bg-[#F5F7FA] p-8">
      <!-- 날짜 필터링 및 작성 버튼 영역 -->
      <div class="flex justify-between mb-4 space-x-2">
        <button
          class="flex items-center justify-between flex-1 bg-transparent border border-gray-300 rounded-full px-4 py-2 text-gray-600 shadow-sm"
        >
          <span>&nbsp;&nbsp;최근&nbsp;&nbsp;/&nbsp;&nbsp;전체&nbsp;&nbsp;/&nbsp;&nbsp;최신순</span>
          <img src="@/assets/list.png" alt="list icon" class="w-4 h-4 mr-2 transform scale-110" />
        </button>

        <button class="flex items-center bg-[#1B1F42] text-white py-2 px-3 rounded-full">
          <img src="@/assets/pen.png" alt="pen icon" class="w-4 h-4 mr-2" />
          작성
        </button>
      </div>

      <!-- 리스트 영역: 흰색 박스 -->
      <div class="bg-white p-4 rounded-3xl shadow-lg">
        <!-- 리스트 헤더 -->
        <ul class="flex justify-around font-bold border-b border-gray-300 py-4 mb-4 text-[#718EBF]">
          <li>날짜</li>
          <li>카테고리</li>
          <li>수입/지출</li>
        </ul>
        <!-- 리스트 바디 -->
        <ul class="space-y-4">
          <li
            v-for="item in displayedTransactions"
            :key="item.id"
            class="flex justify-around py-2 border-b border-gray-200 last:border-0"
          >
            <span>{{ item.date }}</span>
            <span>{{ item.category }}</span>
            <span
              :class="{
                'text-[#34C759]': Number(item.amount) > 0,
                'text-[#FF3B30]': Number(item.amount) < 0,
              }"
            >
              {{ item.amount }}
            </span>
          </li>
        </ul>
      </div>
    </section>

    <!-- 하단 고정 영역: '더보기' 버튼과 총액 표시, 상하 간격 늘림 -->
    <div class="fixed bottom-0 left-0 w-full">
      <div v-if="visibleCount < transactions.length" class="flex justify-center px-4 mb-4">
        <button
          @click="loadMore"
          class="bg-blue-500 text-white py-3 px-6 rounded-full text-xl transition duration-150 ease-in-out transform hover:bg-blue-600 active:scale-95"
        >
          더보기
        </button>
      </div>
      <div class="bg-white border-t border-gray-300 pt-6 pb-8 text-center font-bold text-2xl">
        총액: {{ totalAmountFormatted }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransactionHistory',
  data() {
    return {
      transactions: [
        { id: 1, date: '2025-04-01', category: '식비', amount: '-15000' },
        { id: 2, date: '2025-04-02', category: '월급', amount: '+2000000' },
        { id: 3, date: '2025-04-03', category: '교통', amount: '-4500' },
        { id: 4, date: '2025-04-04', category: '쇼핑', amount: '-75000' },
        { id: 5, date: '2025-04-05', category: '문화', amount: '-20000' },
        { id: 6, date: '2025-04-06', category: '기타', amount: '-3000' },
        { id: 7, date: '2025-04-07', category: '식비', amount: '-12000' },
        { id: 8, date: '2025-04-08', category: '월급', amount: '+2000000' },
        { id: 9, date: '2025-04-09', category: '교통', amount: '-5000' },
        { id: 10, date: '2025-04-10', category: '쇼핑', amount: '-55000' },
        { id: 11, date: '2025-04-11', category: '식비', amount: '-10000' },
        { id: 12, date: '2025-04-12', category: '문화', amount: '-30000' },
        { id: 13, date: '2025-04-13', category: '기타', amount: '-8000' },
        { id: 1, date: '2025-04-01', category: '식비', amount: '-15000' },
        { id: 2, date: '2025-04-02', category: '월급', amount: '+2000000' },
        { id: 3, date: '2025-04-03', category: '교통', amount: '-4500' },
        { id: 4, date: '2025-04-04', category: '쇼핑', amount: '-75000' },
        { id: 5, date: '2025-04-05', category: '문화', amount: '-20000' },
        { id: 6, date: '2025-04-06', category: '기타', amount: '-3000' },
        { id: 7, date: '2025-04-07', category: '식비', amount: '-12000' },
        { id: 8, date: '2025-04-08', category: '월급', amount: '+2000000' },
        { id: 9, date: '2025-04-09', category: '교통', amount: '-5000' },
        { id: 10, date: '2025-04-10', category: '쇼핑', amount: '-55000' },
        { id: 11, date: '2025-04-11', category: '식비', amount: '-10000' },
        { id: 12, date: '2025-04-12', category: '문화', amount: '-30000' },
        { id: 13, date: '2025-04-13', category: '기타', amount: '-8000' },
        { id: 1, date: '2025-04-01', category: '식비', amount: '-15000' },
        { id: 2, date: '2025-04-02', category: '월급', amount: '+2000000' },
        { id: 3, date: '2025-04-03', category: '교통', amount: '-4500' },
        { id: 4, date: '2025-04-04', category: '쇼핑', amount: '-75000' },
        { id: 5, date: '2025-04-05', category: '문화', amount: '-20000' },
        { id: 6, date: '2025-04-06', category: '기타', amount: '-3000' },
        { id: 7, date: '2025-04-07', category: '식비', amount: '-12000' },
        { id: 8, date: '2025-04-08', category: '월급', amount: '+2000000' },
        { id: 9, date: '2025-04-09', category: '교통', amount: '-5000' },
        { id: 10, date: '2025-04-10', category: '쇼핑', amount: '-55000' },
        { id: 11, date: '2025-04-11', category: '식비', amount: '-10000' },
        { id: 12, date: '2025-04-12', category: '문화', amount: '-30000' },
        { id: 13, date: '2025-04-13', category: '기타', amount: '-8000' },
      ],
      visibleCount: 6,
    };
  },
  computed: {
    displayedTransactions() {
      // 최근 날짜 순으로 내림차순 정렬 후 visibleCount 만큼 자르기
      return this.transactions
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, this.visibleCount);
    },
    totalAmount() {
      return this.transactions.reduce((sum, item) => {
        return sum + Number(item.amount);
      }, 0);
    },
    totalAmountFormatted() {
      return this.totalAmount.toLocaleString();
    },
  },
  methods: {
    loadMore() {
      this.visibleCount += 10;
    },
  },
};
</script>
