<template>
  <!-- 수입/지출 요약 보드를 감싸는 전체 wrapper -->
  <div class="sumboard-wrapper">
    <!-- 이번 달 수입/지출 요약 카드 -->
    <ThisSum :userId="currentUserId" />

    <!-- 지난 달 수입/지출 요약 카드 -->
    <LastSum :userId="currentUserId" class="box-margin" />
  </div>
</template>

<script>
import ThisSum from '../components/sums/ThisSum.vue';
import LastSum from '../components/sums/LastSum.vue';
import { useUserStore } from '@/stores/userStore';

export default {
  name: 'SumboardView',
  data() {
    return {
      currentUserId: '',
    };
  },
  created() {
    const userStore = useUserStore();
    this.currentUserId = userStore.userId;
  },
  components: {
    ThisSum,
    LastSum,
  },
};
</script>

<style>
/* Sumboard 전체를 감싸는 레이아웃 컨테이너 */
.sumboard-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
}

/* 각각의 수입/지출 박스를 카드처럼 보이게 하는 스타일 */
.sumboard-box {
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
  border-radius: 40px;
  width: 580px;
  height: 137px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
}

/* 호버 시 더 부드러운 그림자 효과 */
.sumboard-box:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

/* 위 아래 카드 간 여백 */
.box-margin {
  margin-top: 50px;
}

/* 수입/지출 각각을 나타내는 박스 안쪽 항목 */
.sum-item {
  flex: 1;
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* 타이틀 텍스트 */
.sum-title {
  font-size: 18px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

/* 수치 텍스트 */
.sum-value {
  font-size: 24px;
  font-weight: bold;
  color: #111827;
}

/* 수입/지출 사이 구분선 */
.divider {
  width: 2px;
  background-color: #d1d5db;
}
</style>
