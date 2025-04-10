<template>
  <nav class="bg-white p-4 mb-4 border-b border-gray-300 sticky top-0 z-50">
    <ul class="flex justify-around">
      <!-- My 탭 -->
      <router-link to="/mypage" custom v-slot="{ navigate, isActive }">
        <li
          class="py-2 px-4 cursor-pointer"
          :class="{ 'border-b-2 border-[#1814F3] font-bold text-[#1814F3]': isActive }"
          @click="navigate"
        >
          My
        </li>
      </router-link>

      <!-- 거래 내역 탭 (TransactionHistory.vue로 연결) -->
      <router-link to="/transaction-history" custom v-slot="{ navigate, isActive }">
        <li
          class="py-2 px-4 cursor-pointer"
          :class="{ 'border-b-2 border-[#1814F3] font-bold text-[#1814F3]': isActive }"
          @click="navigate"
        >
          거래 내역
        </li>
      </router-link>

      <!-- 분석 탭 -->
      <router-link to="/analyzeview" custom v-slot="{ navigate, isActive }">
        <li
          class="py-2 px-4 cursor-pointer"
          :class="{ 'border-b-2 border-[#1814F3] font-bold text-[#1814F3]': isActive }"
          @click="navigate"
        >
          분석
        </li>
      </router-link>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
};
</script>
