// src/stores/transactionStore.js
import { defineStore } from 'pinia';

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: [],
    visibleCount: 6,
  }),

  getters: {
    displayedTransactions(state) {
      return state.transactions
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, state.visibleCount);
    },
    totalAmount(state) {
      return state.transactions.reduce((sum, item) => sum + Number(item.amount), 0);
    },
    totalAmountFormatted(state) {
      return state.totalAmount.toLocaleString();
    },
  },

  actions: {
    loadMore() {
      this.visibleCount += 10;
    },
    setTransactions(data) {
      this.transactions = data;
    },
  },
});
