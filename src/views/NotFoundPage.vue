<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-white text-center relative overflow-hidden px-4 py-6 max-w-md mx-auto"
  >
    <div class="absolute top-24 left-1/3 w-3 h-3 bg-rose-300 rounded-full"></div>
    <div class="absolute bottom-40 left-1/4 w-2 h-2 bg-rose-200 rounded-full"></div>
    <div class="absolute bottom-36 right-1/3 w-2 h-2 bg-rose-200 rounded-full"></div>
    <div class="absolute top-40 right-1/4 w-3 h-3 bg-rose-300 rounded-full"></div>

    <div
      class="w-52 h-52 bg-rose-500 rounded-full flex items-center justify-center text-white text-[72px] font-bold z-10 shadow-md mb-8"
    >
      404
    </div>

    <p class="text-lg font-semibold text-gray-900">페이지를 찾을 수 없습니다.</p>
    <p class="text-sm text-gray-600 mt-1 mb-10">다시 시도해주세요.</p>

    <button
      class="bg-blue-600 hover:bg-blue-700 text-white text-base font-medium px-12 py-3 rounded-full shadow-md transition duration-300"
      @click="goHome"
    >
      확인
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goHome = () => {
  router.push('/') // 홈으로 이동
}
</script>
