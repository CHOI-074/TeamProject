<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <!-- 모달 헤더 -->
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">조회 조건 설정</h2>
        <button @click="$emit('close')" class="text-gray-500 text-2xl">✕</button>
      </div>

      <!-- 조회 기간 -->
      <div class="mb-4">
        <label class="block text-lg font-medium mb-2 text-left">조회기간</label>
        <div class="flex gap-2 mb-2">
          <button
            v-for="(label, index) in periodOptions"
            :key="index"
            @click="toggleSelection('period', label.value)"
            :class="[
              'flex-1 py-2 border rounded-lg',
              selectedPeriod === label.value ? 'bg-blue-100 text-blue-600 font-semibold' : 'text-gray-500',
            ]"
          >
            {{ label.text }}
          </button>
        </div>

        <!-- 기간 선택 버튼 -->
        <div class="grid grid-cols-4 gap-2 mb-3">
          <button
            v-for="(label, index) in rangeOptions"
            :key="index"
            @click="toggleSelection('range', label.value)"
            :class="[
              'py-2 border rounded-lg',
              selectedRange === label.value ? 'bg-blue-600 text-white' : 'text-gray-500',
            ]"
          >
            {{ label.text }}
          </button>
        </div>

        <!-- 날짜 입력 -->
        <div v-if="selectedPeriod === 'range'" class="flex gap-2 items-center mb-4">
          <input v-model="startDate" type="date" class="w-40 border rounded-lg px-2 py-1" />
          <span>~</span>
          <input v-model="endDate" type="date" class="w-40 border rounded-lg px-2 py-1" />
        </div>
      </div>

      <!-- 유형 선택 -->
      <div class="mb-4">
        <label class="block text-lg font-medium mb-2 text-left">유형</label>
        <div class="grid grid-cols-3 gap-2">
          <button
            v-for="(type, index) in types"
            :key="index"
            @click="toggleSelection('type', type)"
            :class="['py-2 border rounded-lg', selectedType.includes(type) ? 'bg-blue-600 text-white' : 'text-gray-500']"
          >
            {{ type }}
          </button>
        </div>
      </div>

      <!-- 정렬 조건 -->
      <div class="mb-4">
        <label class="block text-lg font-medium mb-2 text-left">정렬</label>
        <div class="flex gap-2">
          <button
            v-for="(label, index) in orderOptions"
            :key="index"
            @click="toggleSelection('order', label.value)"
            :class="[
              'flex-1 py-2 border rounded-lg',
              selectedOrder === label.value ? 'bg-blue-600 text-white font-semibold' : 'text-gray-500',
            ]"
          >
            {{ label.text }}
          </button>
        </div>
      </div>

      <!-- 금액 필터 -->
      <div class="mb-4">
        <label class="block text-lg font-medium mb-2 text-left">금액</label>
        <div class="flex gap-1">
          <input v-model="minAmount" type="number" placeholder="최소금액" class="w-40 border rounded-lg px-2 py-2" />
          <span>–</span>
          <input v-model="maxAmount" type="number" placeholder="최대금액" class="w-40 border rounded-lg px-2 py-2" />
        </div>
      </div>

      <!-- 하단 버튼 -->
      <div class="flex gap-2">
        <button @click="$emit('close')" class="flex-1 border border-gray-300 rounded-lg py-3 text-gray-600">
          취소
        </button>
        <button @click="saveFilter" class="flex-1 rounded-lg py-3 font-semibold bg-blue-600 text-white">조회</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Filter',
  data() {
    return {
      selectedPeriod: '',
      selectedRange: '',
      selectedType: [],
      selectedOrder: '',
      startDate: '',
      endDate: '',
      minAmount: '',
      maxAmount: '',
      periodOptions: [
        { text: '월별선택', value: 'monthly' },
        { text: '기간지정', value: 'range' },
      ],
      rangeOptions: [
        { text: '1주일', value: '1week' },
        { text: '1개월', value: '1month' },
        { text: '3개월', value: '3months' },
        { text: '6개월', value: '6months' },
      ],
      types: ['카페', '외식', '식비', '생필품', '공과금', '월급', '장학금', '기타'],
      orderOptions: [
        { text: '최신순', value: 'recent' },
        { text: '과거순', value: 'oldest' },
      ],
    };
  },

  mounted() {
    const saved = localStorage.getItem('filterData');
    if (saved) {
      const parsed = JSON.parse(saved);
      this.selectedPeriod = parsed.period || '';
      this.selectedRange = parsed.range || '';
      this.selectedType = Array.isArray(parsed.type) ? parsed.type : [];
      this.selectedOrder = parsed.order || '';
      this.startDate = parsed.startDate || '';
      this.endDate = parsed.endDate || '';
      this.minAmount = parsed.minAmount || '';
      this.maxAmount = parsed.maxAmount || '';
    }
  },
  methods: {
    toggleSelection(category, value) {
      if (category === 'period') {
        this.selectedPeriod = this.selectedPeriod === value ? '' : value;
      }
      if (category === 'range') {
        this.selectedRange = this.selectedRange === value ? '' : value;
      }
      if (category === 'type') {
        const index = this.selectedType.indexOf(value);
        if (index > -1) {
          this.selectedType.splice(index, 1);
        } else {
          this.selectedType.push(value);
        }
      }
      if (category === 'order') {
        this.selectedOrder = this.selectedOrder === value ? '' : value;
      }
    },
    saveFilter() {
      const filterData = {
        period: this.selectedPeriod,
        range: this.selectedRange,
        type: this.selectedType,
        order: this.selectedOrder,
        startDate: this.startDate,
        endDate: this.endDate,
        minAmount: this.minAmount,
        maxAmount: this.maxAmount,
      };
      localStorage.setItem('filterData', JSON.stringify(filterData));
      alert('필터 설정이 저장되었습니다.');
      this.$emit('close');
    },
  },
};
</script>

<style>
.modal-content label {
  margin-bottom: 4px;
  font-weight: 600;
}
</style>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
