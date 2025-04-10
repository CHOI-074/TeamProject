<template>
  <div>
    <div v-if="filtered.length === 0" class="text-gray-500">조건에 맞는 거래 내역이 없습니다.</div>

    <ul v-else>
      <li
        v-for="item in filtered"
        :key="item.id + item.date"
        class="flex justify-around py-2 border-b border-gray-200 last:border-0"
      >
        <span class="text-gray-600">{{ item.date }}</span>
        <span class="text-center font-medium">{{ item.categoryName }}</span>
        <span
          :class="{
            'text-[#34C759]': Number(item.amount) > 0,
            'text-[#FF3B30]': Number(item.amount) < 0,
          }"
        >
          {{ item.amount.toLocaleString() }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FilteredTransaction',
  data() {
    return {
      income: [],
      expense: [],
      categories: [],
      filter: {
        type: [],
        startDate: '',
        endDate: '',
        minAmount: '',
        maxAmount: '',
        order: 'latest', // 기본값 설정
      },
      currentUserId: 'id123',
      lastFilterData: '',
      filterCheckTimer: null,
    };
  },
  computed: {
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

      const sorted = (list) =>
        list.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);

          if (dateA.getTime() === dateB.getTime()) {
            // 날짜 같을 때 보조 정렬: id 기준
            return b.id - a.id;
          }

          return this.filter.order === 'oldest' ? dateA - dateB : dateB - dateA;
        });

      const result = hasCondition
        ? all.filter((item) => {
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
        : all;

      console.log('정렬 기준:', this.filter.order);
      console.log(
        '정렬 전:',
        result.map((i) => i.date)
      );
      const sortedResult = sorted(result);
      console.log(
        '정렬 후:',
        sortedResult.map((i) => i.date)
      );

      return sortedResult;
    },
  },
  mounted() {
    this.loadFilter();
    this.loadData();
    this.startWatchingFilterChange();
  },
  beforeUnmount() {
    clearInterval(this.filterCheckTimer);
  },
  methods: {
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
    async loadData() {
      try {
        const [incomeRes, expenseRes, categoryRes] = await Promise.all([
          axios.get('http://localhost:3000/income'),
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
