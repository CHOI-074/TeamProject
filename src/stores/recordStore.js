// 입력값 상태 pinia store

import { defineStore } from 'pinia';
import api from '../api/api';
import router from '../router';

export const useRecordStore = defineStore('record', {
  // 수입/지출 목록 중앙 상태값 정의
  state: () => ({
    incomeList: [],
    expenseList: [],
  }),

  actions: {
    // 목록 조회
    async fetchIncome() {
      try {
        const res = await api.get('/income');
        // this -> 스토어 인스턴스
        this.incomeList = res.data;
      } catch (error) {
        console.error('fetchIncome 오류:', error);
        router.push('/not-found');
      }
    },
    async fetchExpense() {
      try {
        const res = await api.get('/expense');
        this.expenseList = res.data;
      } catch (error) {
        console.error('fetchExpense 오류:', error);
        router.push('/not-found');
      }
    },
    // 수입 CRUD
    async addIncome(data) {
      try {
        await api.post('/income', data);
        // JSON server는 인메모리 저장소라서 post이후 내부 DB가 업데이트 됨
        // 최신 업데이트된 this.fetchIncome을 다시 불러옴
        await this.fetchIncome();
      } catch (error) {
        console.error('addIncome 오류:', error);
        router.push('/not-found');
      }
    },
    async updateIncome(id, data) {
      try {
        // id는 income에 있는 특정 리스트 항목을 의미(수정하고자 하는 리스트)
        await api.put(`/income/${id}`, data);
        await this.fetchIncome();
      } catch (error) {
        console.error('updateIncome 오류:', error);
        router.push('/not-found');
      }
    },
    async deleteIncome(id) {
      try {
        await api.delete(`/income/${id}`);
        await this.fetchIncome();
      } catch (error) {
        console.error('deleteIncome 오류:', error);
        router.push('/not-found');
      }
    },
    // 지출 CRUD
    async addExpense(data) {
      try {
        await api.post('/expense', data);
        await this.fetchExpense();
      } catch (error) {
        console.error('addExpense 오류:', error);
        router.push('/not-found');
      }
    },
    async updateExpense(id, data) {
      try {
        await api.put(`/expense/${id}`, data);
        await this.fetchExpense();
      } catch (error) {
        console.error('updateExpense 오류:', error);
        router.push('/not-found');
      }
    },

    async deleteExpense(id) {
      try {
        await api.delete(`/expense/${id}`);
        await this.fetchExpense();
      } catch (error) {
        console.error('deleteExpense 오류:', error);
        router.push('/not-found');
      }
    },
  },
});
