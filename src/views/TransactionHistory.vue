<template class="bg-[#F5F7FA]">
  <div class="container mx-auto p-4 pb-32">
    <!-- 필터 버튼 (필터가 열리게 하는 버튼) -->
    <button @click="isModalOpen = true">필터 열기</button>

    <!-- 필터 모달 -->
    <Filter v-if="isModalOpen" @close="isModalOpen = false" />

    <!-- 메인 섹션 내용 -->
    <section class="w-full min-h-screen p-8">
      <!-- 날짜 필터링 및 작성 버튼 영역 -->
      <div class="flex justify-between mb-4 space-x-2">
        <button
          @click="showModal = true"
          class="flex items-center justify-between flex-1 bg-transparent border border-gray-300 rounded-full px-4 py-2 text-gray-600 shadow-sm"
        >
          <span
            >&nbsp;&nbsp;최근&nbsp;&nbsp;/&nbsp;&nbsp;전체&nbsp;&nbsp;/&nbsp;&nbsp;최신순</span
          >
          <img
            src="@/assets/list.png"
            alt="list icon"
            class="w-4 h-4 mr-2 transform scale-110"
          />
        </button>

        <button
          class="flex items-center bg-[#1B1F42] text-white py-2 px-3 rounded-full"
        >
          <img src="@/assets/pen.png" alt="pen icon" class="w-4 h-4 mr-2" />
          작성
        </button>
      </div>

      <!-- 리스트 영역 -->
      <div class="bg-white p-4 rounded-3xl shadow-lg">
        <!-- 리스트 헤더 -->
        <ul
          class="flex justify-around font-bold border-b border-gray-300 py-4 mb-4 text-[#718EBF]"
        >
          <li>날짜</li>
          <li>카테고리</li>
          <li>수입/지출</li>
        </ul>
        <Transaction />
      </div>
    </section>

    <!-- 하단 고정 영역: '더보기' 버튼과 총액 표시 -->
    <div class="fixed bottom-0 left-0 w-full">
      <div
        v-if="visibleCount < transactions.length"
        class="flex justify-center px-4 mb-4"
      >
        <button
          @click="loadMore"
          class="bg-blue-500 text-white py-3 px-6 rounded-full text-xl transition duration-150 ease-in-out transform hover:bg-blue-600 active:scale-95"
        >
          더보기
        </button>
      </div>
      <div
        class="bg-white border-t border-gray-300 pt-6 pb-8 text-center font-bold text-2xl"
      >
        총액: {{ totalAmountFormatted }}
      </div>
    </div>
  </div>
</template>

<script>
// 필터와 거래내역 컴포넌트 불러오기
import Filter from '@/components/Filter.vue';
import Transaction from '@/components/Transaction.vue';

export default {
  name: 'TransactionHistory',
  components: {
    Filter,
    Transaction,
  },
  data() {
    return {
      showModal: false,
      isModalOpen: false,
      transactions: [],
      visibleCount: 6,
    };
  },
  computed: {
    displayedTransactions() {
      return this.transactions
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, this.visibleCount);
    },
    totalAmount() {
      return this.transactions.reduce((sum, item) => sum + Number(item.amount), 0);
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
