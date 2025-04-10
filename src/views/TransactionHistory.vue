<template>
  <div class="container mx-auto p-4 pb-32">
    <Header />
    <Navigation />
    <!-- 메인 section: 배경색 #F5F7FA, 상하 패딩 늘림 -->
    <section class="w-full min-h-screen bg-[#F5F7FA] p-8">
      <!-- 날짜 필터링 및 작성 버튼 영역 -->
      <div class="flex justify-between mb-4 space-x-2">
        <button
          @click="isModalOpen = true"
          class="flex items-center justify-between flex-1 bg-transparent border border-gray-300 rounded-full px-4 py-2 text-gray-600 shadow-sm"
        >
          <img src="@/assets/list.png" alt="list icon" class="w-4 h-4 mr-2 transform scale-110" />
          <span class="ml-auto">&nbsp;&nbsp;상세조건&nbsp;&nbsp;</span>
        </button>

        <button class="flex items-center bg-[#1B1F42] text-white py-2 px-3 rounded-full" @click="goToCreate">
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
        <FilteredTransaction :transactions="displayedTransactions" />
      </div>
    </section>

    <!-- 모달 -->
    <Filter v-if="isModalOpen" @close="isModalOpen = false" />

    <!-- 하단 고정 영역: '더보기' 버튼과 총액 표시, 상하 간격 늘림 -->
  </div>
</template>

<script>
import Filter from '@/components/Filter.vue';
import FilteredTransaction from '@/components/FilteredTransaction.vue';
import Navigation from '@/components/Navigation.vue';
import Header from '@/components/Header.vue';

export default {
  name: 'TransactionHistory',
  components: {
    Filter,
    FilteredTransaction,
    Navigation,
    Header,
  },
  data() {
    return {
      isModalOpen: false, // 모달 상태 관리
      transactions: [], // 거래 내역 데이터
      visibleCount: 6, // 처음 보이는 항목 개수
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
      return (this.totalAmount || 0).toLocaleString();
    },
  },
  methods: {
    loadMore() {
      this.visibleCount += 10;
    },
    goToCreate() {
      this.$router.push('/record/create');
    },
  },
};
</script>
