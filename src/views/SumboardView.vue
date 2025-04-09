<template>
  <!-- 수입/지출 요약 보드를 감싸는 전체 wrapper -->
  <div class="sumboard-wrapper">
    <!--  이번 달 수입/지출 요약 카드 -->
    <ThisSum :userId="'id123'" />

    <!--  지난 달 수입/지출 요약 카드 -->
    <LastSum :userId="'id123'" class="box-margin" />
  </div>
</template>

<script>
// 수입/지출 요약 컴포넌트 import
import ThisSum from '../components/sums/ThisSum.vue';
import LastSum from '../components/sums/LastSum.vue';

export default {
  name: 'SumboardView',
  components: {
    ThisSum,
    LastSum,
  },
};
</script>

<style>
/*  Sumboard 전체를 감싸는 레이아웃 컨테이너 */
.sumboard-wrapper {
  display: flex;
  flex-direction: column; /* 위아래 정렬 */
  align-items: center; /* 수평 가운데 정렬 */
  margin-top: 40px;
}

/*  각각의 수입/지출 박스를 카드처럼 보이게 하는 스타일 */
.sumboard-box {
  display: flex;
  flex-direction: row; /* 수입/지출을 좌우 배치 */
  background-color: #ffffff;
  border-radius: 50px;
  width: 600px;
  height: 180px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
}

/*  호버 시 더 부드러운 그림자 효과 */
.sumboard-box:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

/*  위 아래 카드 간 여백 */
.box-margin {
  margin-top: 50px;
}

/*  수입/지출 각각을 나타내는 박스 안쪽 항목 */
.sum-item {
  flex: 1; /* 좌우 1:1 비율 */
  background-color: #f9fafb; /* 살짝 밝은 배경 */
  display: flex;
  flex-direction: column;
  justify-content: center; /* 세로 가운데 정렬 */
  align-items: center; /* 가로 가운데 정렬 */
}

/*  타이틀 텍스트 (ex. 이번달 수입) */
.sum-title {
  font-size: 18px;
  font-weight: 600;
  color: #374151; /* 다크 그레이 */
  margin-bottom: 8px;
}

/*  수치 텍스트 (ex. ₩2,800,000) */
.sum-value {
  font-size: 24px;
  font-weight: bold;
  color: #111827; /* 거의 검정색 */
}

/*  수입/지출 사이 구분선 */
.divider {
  width: 2px;
  background-color: #d1d5db; /* 연한 회색 */
}
</style>
