<template>
  <div class="flex flex-col items-center justify-center min-h-screen px-4">
    <form
      @submit.prevent="handleLogin"
      class="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg sm:max-w-md md:max-w-lg lg:max-w-1xl"
    >
      <div class="flex justify-center mb-6">
        <img class="h-50 w-auto rounded-lg" src="./img/logo.png" alt="logo" />
      </div>

      <!-- 로그인 텍스트 -->
      <h3 class="text-3xl font-semibold text-left mb-6">로그인</h3>

      <!-- 아이디 입력 -->
      <input
        v-model="userId"
        type="text"
        placeholder="아이디"
        class="mb-4 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <!-- 비밀번호 입력 -->
      <input
        v-model="password"
        type="password"
        placeholder="비밀번호"
        class="mb-5 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <!-- 로그인 버튼 -->
      <button
        type="submit"
        class="mb-3 w-full py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition duration-300"
      >
        로그인
      </button>

      <!-- 에러 메시지 -->
      <p v-if="errorMessage" class="mt-3 text-sm text-red-500 text-center">
        {{ errorMessage }}
      </p>

      <!-- 회원가입 안내 -->
      <div class="mt-6 text-center">
        <p class="text-sm">처음 오셨나요?</p>
        <router-link to="/signup" class="text-blue-600 hover:underline text-sm"
          >회원가입</router-link
        >
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const userId = ref('')
    const password = ref('')
    const errorMessage = ref('')
    const router = useRouter()
    const userStore = useUserStore() //Pinia

    const handleLogin = async () => {
      try {
        const response = await fetch('http://localhost:3000/users')
        if (!response.ok) throw new Error('서버 응답 오류')

        const data = await response.json()

        const user = data.find((u) => u.userId === userId.value && u.password === password.value)

        if (user) {
          // Pinia에 로그인한 유저 정보 저장
          userStore.setUser({ userId: user.userId, username: user.username })

          alert('로그인 성공')
          router.push('/main')
        } else if (!userId.value || !password.value) {
          errorMessage.value = '아이디 또는 비밀번호를 입력해주세요.'
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
