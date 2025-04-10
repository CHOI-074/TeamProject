<template>
  <div>
    <!-- 조건에 맞는 거래 내역이 없는 경우 메시지 출력 -->
    <div v-if="filtered.length === 0" class="text-gray-500">조건에 맞는 거래 내역이 없습니다.</div>

    <!-- 거래 내역 리스트 출력 -->
    <ul v-else class="w-full">
      <li
        v-for="item in filtered"
        :key="item.id + item.date"
        @click="goToWrite(item)"
        class="grid grid-cols-3 gap-2 text-sm py-2 border-b border-gray-200 last:border-0 px-4 cursor-pointer hover:bg-gray-50"
      >
        <!-- 날짜 -->
        <span class="text-gray-600 text-left">{{ item.date }}</span>
        <!-- 카테고리 -->
        <span class="text-center font-medium">{{ item.categoryName }}</span>
        <!-- 금액 -->
        <span
          class="text-right font-semibold"
          :class="{
            'text-[#34C759]': Number(item.amount) > 0,
            'text-[#FF3B30]': Number(item.amount) < 0,
          }"
        >
          {{ item.amount.toLocaleString() }}
        </span>
      </li>
    </ul>

    <!-- 더보기 버튼 -->
    <div v-if="filtered.length > displayLimit" class="text-center py-4">
      <button
        @click="loadMore"
        class="px-6 py-2 text-blue-500 border border-blue-200 rounded-full hover:bg-blue-50 transition"
      >
        더보기 (+{{ filtered.length - displayLimit }})
      </button>
    </div>

    <!-- 총액 표시 -->
    <div class="total-amount-section py-4 border-t border-gray-300 mt-4">
      <div class="flex justify-between px-6">
        <span class="font-semibold">총액:</span>
        <span
          class="font-bold"
          :class="{
            'text-[#34C759]': totalAmount > 0,
            'text-[#FF3B30]': totalAmount < 0,
            'text-gray-700': totalAmount === 0,
          }"
        >
          {{ totalAmount.toLocaleString() }}원
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useUserStore } from '@/stores/userStore';

export default {
  name: 'FilteredTransaction',
  data() {
    return {
      income: [], // 수입 데이터
      expense: [], // 지출 데이터
      categories: [], // 카테고리 데이터
      filter: {
        // 필터 조건
        type: [],
        startDate: '',
        endDate: '',
        minAmount: '',
        maxAmount: '',
        order: 'latest',
      },
      currentUserId: '', // 현재 사용자 ID
      lastFilterData: '', // 마지막 필터 상태 저장
      filterCheckTimer: null, // 필터 변경 감지 타이머
      displayLimit: 10, // 화면에 보여줄 초기 항목 수
      loadMoreIncrement: 10, // 더보기 클릭 시 추가 로드 수
      initialItemCount: 10, // 초기 로드 수
    };
  },
  created() {
    // 사용자 정보 가져오기
    const userStore = useUserStore();
    this.currentUserId = userStore.userId;
  },
  computed: {
    // 필터링된 거래 내역 반환
    filtered() {
      const all = [
        ...this.income.map((item) => ({
          ...item,
          amount: Number(item.amount),
        })),
        ...this.expense.map((item) => ({
          ...item,
          amount: -Math.abs(Number(item.amount)),
        })),
      ].map((item) => {
        const category = this.categories.find((c) => Number(c.id) === Number(item.categoryId));
        return {
          ...item,
          categoryName: category?.name || '카테고리 없음',
          type: category?.type || '',
        };
      });

      const hasCondition =
        this.filter.type.length > 0 ||
        this.filter.startDate ||
        this.filter.endDate ||
        this.filter.minAmount ||
        this.filter.maxAmount;

      // 정렬 기준에 따라 정렬
      const sorted = (list) =>
        list.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);

          if (dateA.getTime() === dateB.getTime()) {
            return b.id - a.id;
          }

          return this.filter.order === 'oldest' ? dateA - dateB : dateB - dateA;
        });

      // 필터 조건에 따라 필터링
      const result = hasCondition
        ? all.filter((item) => {
            const amount = Number(item.amount);
            const matchesUser = item.userId === this.currentUserId;
            const matchesType = this.filter.type.length === 0 || this.filter.type.includes(item.categoryName);
            const matchesMin = !this.filter.minAmount || amount >= this.filter.minAmount;
            const matchesMax = !this.filter.maxAmount || amount <= this.filter.maxAmount;
            console.log('조건문 userid', matchesUser);
            console.log('조건문 type', matchesType);

            // 날짜 필터: 종료일 포함
            const matchesDate = (() => {
              if (!this.filter.startDate || !this.filter.endDate) return true;

              const itemDate = new Date(item.date);
              const startDate = new Date(this.filter.startDate);
              const endDate = new Date(this.filter.endDate);
              endDate.setDate(endDate.getDate() + 1); // 종료일 다음 날 0시 미만까지 포함

              return itemDate >= startDate && itemDate < endDate;
            })();

            return matchesUser && matchesType && matchesMin && matchesMax && matchesDate;
          })
        : all;

      return sorted(result);
    },
    // 화면에 보여질 항목들
    displayedItems() {
      return this.filtered.slice(0, this.displayLimit);
    },
    // 총 금액 계산
    totalAmount() {
      return this.filtered.reduce((sum, item) => sum + Number(item.amount), 0);
    },
  },
  mounted() {
    this.loadFilter(); // 필터 로드
    this.loadData(); // 데이터 로드
    this.startWatchingFilterChange(); // 필터 변경 감지 시작
    this.resetPagination(); // 페이지네이션 초기화
  },
  beforeUnmount() {
    clearInterval(this.filterCheckTimer); // 컴포넌트 언마운트 시 타이머 해제
  },
  watch: {
    // 필터 변경 시 페이지네이션 초기화
    filter: {
      handler() {
        this.resetPagination();
      },
      deep: true,
    },
  },
  methods: {
    // 클릭 시 편집 페이지로 이동
    goToWrite(item) {
      this.$router.push({ name: 'EditRecord', params: {id: item.id} );
    },
    // 로컬스토리지에서 필터 불러오기
    loadFilter() {
      const saved = localStorage.getItem('filterData');
      if (saved) {
        this.lastFilterData = saved;
        const parsed = JSON.parse(saved);
        this.filter = {
          ...this.filter,
          ...parsed,
          type: Array.isArray(parsed.type) ? parsed.type : [],
          order: parsed.order || 'latest',
        };
      }
    },
    // 더보기 버튼 클릭 시 항목 추가
    loadMore() {
      this.displayLimit += this.loadMoreIncrement;
      if (this.displayLimit > this.filtered.length) {
        this.displayLimit = this.filtered.length;
      }
    },
    // 페이지네이션 초기화
    resetPagination() {
      this.displayLimit = this.initialItemCount;
    },
    // axios로 데이터 불러오기
    async loadData() {
      try {
        const [incomeRes, expenseRes, categoryRes] = await Promise.all([
          axios.get(`http://localhost:3000/income?userId=${this.currentUserId}`), //params: { userId: currentlyUserId } -> 서버에서 먼저 필터링해옴
          axios.get('http://localhost:3000/expense'),
          axios.get('http://localhost:3000/category'),
        ]);
        this.income = incomeRes.data;
        this.expense = expenseRes.data;
        this.categories = categoryRes.data;
      } catch (e) {
        console.error('axios로 데이터 불러오기 실패:', e);
      }
    },
    // 로컬스토리지의 필터 데이터 변경 감지
    startWatchingFilterChange() {
      this.filterCheckTimer = setInterval(() => {
        const current = localStorage.getItem('filterData');
        if (current && current !== this.lastFilterData) {
          this.loadFilter();
        }
      }, 1000);
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
</style>
