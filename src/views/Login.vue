<template>
  <div class="flex flex-col items-center justify-start min-h-screen bg-white px-6 pt-6 pb-10">
    <!-- 뒤로가기 -->
    <div class="flex items-center w-full mb-6">
      <button type="button" class="bg-blue-500 text-white p-2 rounded-full mr-3">←</button>
      <h2 class="text-lg font-semibold">프로필 설정</h2>
    </div>

    <!-- 프로필 이미지 + 수정 아이콘 -->
    <div class="relative mb-6">
      <img src="./img/Kirby.png" alt="Profile" class="w-24 h-24 rounded-full object-cover" />
      <button
        type="button"
        class="absolute bottom-0 right-0 bg-orange-300 p-1.5 rounded-full text-white text-xs hover:bg-orange-400"
      >
        ✎
      </button>
    </div>

    <!-- 프로필 정보 -->
    <div class="w-full max-w-xs mb-6">
      <h3 class="text-sm font-bold text-blue-600 mb-2">프로필 정보</h3>
      <div class="bg-gray-100 rounded-md px-4 py-2 text-sm mb-2 flex justify-between">
        <span class="text-gray-500">ID</span>
        <span class="text-gray-800">{{ currentUserId }}</span>
      </div>
      <div class="bg-gray-100 rounded-md px-4 py-2 text-sm flex justify-between">
        <span class="text-gray-500">name</span>
        <span class="text-gray-800">{{ userName }}</span>
      </div>
    </div>

    <!-- 보안 -->
    <div class="w-full max-w-xs mb-8">
      <h3 class="text-sm font-bold text-blue-600 mb-2">보안</h3>
      <button
        type="button"
        @click="showChangePasswordModal = true"
        class="w-full bg-gray-100 rounded-md px-4 py-2 text-sm text-left hover:bg-gray-200"
      >
        비밀번호 변경
      </button>
    </div>

    <!-- 로그아웃 버튼 -->
    <button
      type="button"
      @click="handlerLogOut"
      class="w-full max-w-xs py-2 bg-blue-500 text-white text-sm font-semibold rounded-md hover:bg-blue-600"
    >
      로그아웃
    </button>

    <!-- 비밀번호 변경 모달 -->
    <div
      v-if="showChangePasswordModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
    >
      <div class="bg-white p-6 rounded-xl shadow-lg w-80">
        <h3 class="text-lg font-bold mb-4">비밀번호 변경</h3>
        <input
          v-model="oldPassword"
          type="password"
          placeholder="현재 비밀번호"
          class="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          v-model="newPassword"
          type="password"
          placeholder="새로운 비밀번호"
          class="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          v-model="newPasswordCheck"
          type="password"
          placeholder="비밀번호 확인"
          class="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div class="flex justify-end gap-2">
          <button
            type="button"
            @click="closeModal"
            class="px-3 py-1 text-sm rounded-md border border-gray-300 hover:bg-gray-100"
          >
            취소
          </button>
          <button
            type="button"
            @click="handleChangePassword"
            class="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            변경
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import axios from 'axios'

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const userId = ref('')
    const password = ref('')
    const errorMessage = ref('')
    const router = useRouter()
    const userStore = useUserStore() // Pinia

    const handleLogin = async () => {
      if (!userId.value || !password.value) {
        errorMessage.value = '아이디 또는 비밀번호를 입력해주세요.'
        return
      }

      try {
        const { data } = await axios.get('http://localhost:3000/users') // axios 사용

        const user = data.find((u) => u.userId === userId.value && u.password === password.value)

        if (user) {
          userStore.setUser({ id: user.id, userId: user.userId, username: user.username })
          alert('로그인 성공')
          router.push('/main')
        } else {
          errorMessage.value = '아이디 또는 비밀번호가 잘못되었습니다.'
        }
      } catch (error) {
        errorMessage.value = '로그인 오류: 서버 문제'
        console.error(error)
      }
    }

    return { userId, password, errorMessage, handleLogin }
  },
})
</script>
