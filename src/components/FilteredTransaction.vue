<template>
  <div>
    <!-- 조건에 맞는 데이터 없을 때 -->
    <div v-if="filtered.length === 0" class="text-gray-500">조건에 맞는 거래 내역이 없습니다.</div>

    <!-- 조건에 맞는 거래 내역 출력 -->
    <ul v-else>
      <li
        v-for="item in filtered"
        :key="item.id"
        class="flex justify-around py-2 border-b border-gray-200 last:border-0"
      >
        <span class="text-gray-600">{{ item.date }}</span>
        <span class="text-center font-medium">{{ item.categoryName }}</span>
        <span
          :class="{
            'text-[#34C759]': Number(item.amount) > 0,
            'text-[#FF3B30]': Number(item.amount) < 0,
          }"
          >{{ item.amount.toLocaleString() }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FilteredTransaction',
  data() {
    return {
      income: [], // 수입 데이터
      expense: [], // 지출 데이터
      categories: [], // 카테고리 정보
      filter: {
        // 필터 조건 (로컬스토리지 기반)
        type: [],
        startDate: '',
        endDate: '',
        minAmount: '',
        maxAmount: '',
        order: '',
      },
      currentUserId: 'id123', // 현재 로그인한 사용자 ID
      lastFilterData: '', // 마지막으로 불러온 필터 상태 (변경 감지용)
      filterCheckTimer: null, // 필터 감시 타이머 핸들
    };
  },
  computed: {
    // 조건에 맞게 필터링된 거래 내역 반환
    filtered() {
      const all = [
        ...this.income.map((item) => ({
          ...item,
          amount: Number(item.amount), // 수입은 + 그대로
        })),
        ...this.expense.map((item) => ({
          ...item,
          amount: -Math.abs(Number(item.amount)), // 지출은 - 붙여서 저장
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

      //  조건 없으면 전체 출력
      if (!hasCondition) {
        return all.sort((a, b) =>
          this.filter.order === 'oldest' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)
        );
      }

      //  조건 있을 때만 필터링
      return all
        .filter((item) => {
          const amount = Number(item.amount);
          const matchesUser = item.userId === this.currentUserId;
          const matchesType = this.filter.type.length === 0 || this.filter.type.includes(item.categoryName);
          const matchesMin = !this.filter.minAmount || amount >= this.filter.minAmount;
          const matchesMax = !this.filter.maxAmount || amount <= this.filter.maxAmount;
          const matchesDate =
            !this.filter.startDate ||
            !this.filter.endDate ||
            (item.date >= this.filter.startDate && item.date <= this.filter.endDate);

          return matchesUser && matchesType && matchesMin && matchesMax && matchesDate;
        })
        .sort((a, b) => {
          return this.filter.order === 'oldest' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date);
        });
    },
  },
  mounted() {
    this.loadFilter(); // 로컬스토리지에서 필터 불러오기
    this.loadData(); // 수입/지출/카테고리 데이터 불러오기
    this.startWatchingFilterChange(); // 필터 변경 감지 시작
  },
  beforeUnmount() {
    clearInterval(this.filterCheckTimer); // 컴포넌트 제거 시 타이머 제거
  },
  methods: {
    // 로컬스토리지에서 최신 필터 불러오기
    loadFilter() {
      const saved = localStorage.getItem('filterData');
      if (saved) {
        this.lastFilterData = saved;
        const parsed = JSON.parse(saved);
        this.filter = {
          ...this.filter,
          ...parsed,
          type: Array.isArray(parsed.type) ? parsed.type : [],
        };
      }
    },

    // json-server에서 데이터 3종 가져오기
    async loadData() {
      try {
        const [incomeRes, expenseRes, categoryRes] = await Promise.all([
          fetch('http://localhost:3000/income'),
          fetch('http://localhost:3000/expense'),
          fetch('http://localhost:3000/category'),
        ]);
        this.income = await incomeRes.json();
        this.expense = await expenseRes.json();
        this.categories = await categoryRes.json();
      } catch (e) {
        console.error('데이터 불러오기 실패:', e);
      }
    },

    // 로컬스토리지 변경 감지해서 필터 자동 업데이트
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
