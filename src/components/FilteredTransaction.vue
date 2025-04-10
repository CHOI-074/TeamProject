<template>
  <div>
    <div v-if="filtered.length === 0" class="text-gray-500">조건에 맞는 거래 내역이 없습니다.</div>

    <ul v-else class="w-full">
      <li
        v-for="item in filtered"
        :key="item.id + item.date"
        @click="goToWrite(item)"
        class="grid grid-cols-3 gap-2 text-sm py-2 border-b border-gray-200 last:border-0 px-4 cursor-pointer hover:bg-gray-50"
      >
        <span class="text-gray-600 text-left">{{ item.date }}</span>
        <span class="text-center font-medium">{{ item.categoryName }}</span>
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

    <div v-if="filtered.length > displayLimit" class="text-center py-4">
      <button
        @click="loadMore"
        class="px-6 py-2 text-blue-500 border border-blue-200 rounded-full hover:bg-blue-50 transition"
      >
        더보기 (+{{ filtered.length - displayLimit }})
      </button>
    </div>

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
      income: [],
      expense: [],
      categories: [],
      filter: {
        type: [],
        startDate: '',
        endDate: '',
        minAmount: '',
        maxAmount: '',
        order: 'latest',
      },
      currentUserId: '',
      lastFilterData: '',
      filterCheckTimer: null,
      displayLimit: 10,
      loadMoreIncrement: 10,
      initialItemCount: 10,
    };
  },
  created() {
    const userStore = useUserStore();
    this.currentUserId = userStore.userId;
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

            // ✅ endDate를 하루 더한 날짜로 계산해 오늘도 포함되도록 처리
            const matchesDate = (() => {
              if (!this.filter.startDate || !this.filter.endDate) return true;

              const itemDate = new Date(item.date);
              const startDate = new Date(this.filter.startDate);
              const endDate = new Date(this.filter.endDate);
              endDate.setDate(endDate.getDate() + 1); // 다음 날 0시 미만까지 포함

              return itemDate >= startDate && itemDate < endDate;
            })();

            return matchesUser && matchesType && matchesMin && matchesMax && matchesDate;
          })
        : all;

      return sorted(result);
    },
    displayedItems() {
      return this.filtered.slice(0, this.displayLimit);
    },
    totalAmount() {
      return this.filtered.reduce((sum, item) => sum + Number(item.amount), 0);
    },
  },
  mounted() {
    this.loadFilter();
    this.loadData();
    this.startWatchingFilterChange();
    this.resetPagination();
  },
  beforeUnmount() {
    clearInterval(this.filterCheckTimer);
  },
  watch: {
    filter: {
      handler() {
        this.resetPagination();
      },
      deep: true,
    },
  },
  methods: {
    goToWrite(item) {
      this.$router.push({ name: 'EditRecord', params: { id: item.id } });
    },
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
    loadMore() {
      this.displayLimit += this.loadMoreIncrement;
      if (this.displayLimit > this.filtered.length) {
        this.displayLimit = this.filtered.length;
      }
    },
    resetPagination() {
      this.displayLimit = this.initialItemCount;
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
