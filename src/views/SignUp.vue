<template>
  <div class="flex flex-col items-center justify-center min-h-screen px-4">
    <form
      @submit.prevent="handleSignup"
      class="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg sm:max-w-md md:max-w-lg lg:max-w-1xl"
    >
      <div class="flex items-center w-full mb-6">
        <button @click="router.push('/')" class="bg-blue-500 text-white p-2 rounded-full mr-3">
          ←
        </button>
      </div>

      <!-- 회원가입 텍스트 -->
      <h3 class="text-3xl font-semibold text-left mb-6">회원가입</h3>

      <!-- 이름 입력 -->
      <label class="block mb-1 text-sm font-medium text-gray-700">이름</label>
      <input
        v-model="username"
        type="text"
        placeholder="이름"
        class="mb-4 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <!-- 아이디 입력 -->
      <label class="text-sm font-medium text-gray-700">아이디</label>
      <button
        type="button"
        @click="handleCheckId"
        class="px-2 py-1 ml-3 text-xs border border-gray-300 font-medium rounded hover:bg-gray-200 transition duration-300"
      >
        중복 체크
      </button>
      <input
        v-model="id"
        type="text"
        placeholder="아이디"
        class="mt-3 mb-4 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <!-- 비밀번호 입력 -->
      <label class="block mb-1 text-sm font-medium text-gray-700">비밀번호</label>
      <input
        v-model="password"
        type="password"
        placeholder="비밀번호"
        class="mb-5 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <!-- 비밀번호 확인 입력 -->
      <label class="block mb-1 text-sm font-medium text-gray-700">비밀번호 확인</label>
      <input
        v-model="passwordCheck"
        type="password"
        placeholder="비밀번호 확인"
        class="mb-5 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <!-- 회원가입 버튼 -->
      <button
        type="submit"
        class="mb-3 w-full py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition duration-300"
      >
        회원가입 완료
      </button>

      <!-- 에러 메시지 -->
      <p v-if="errorMessage" class="mt-3 text-sm text-red-500 text-center">
        {{ errorMessage }}
      </p>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'SignUp',
  setup() {
    const username = ref('')
    const id = ref('')
    const password = ref('')
    const passwordCheck = ref('')
    const errorMessage = ref('')
    const idCheckPassed = ref(false)
    const router = useRouter()

    // 아이디가 바뀔 때 상태 초기화
    watch(id, () => {
      idCheckPassed.value = false
    })

    // 아이디 중복 체크
    const handleCheckId = async () => {
      if (!id.value.trim()) {
        errorMessage.value = '아이디를 입력해주세요.'
        return
      }

      try {
        // db.json에서 users 테이블의 id와 사용자가 쓴 id와 같은 것을 찾음
        const response = await fetch(`http://localhost:3000/users?id=${id.value}`)
        const existingUsers = await response.json()

        if (existingUsers.length > 0) {
          errorMessage.value = '이미 사용 중인 아이디입니다.'
          idCheckPassed.value = false
        } else {
          errorMessage.value = '사용 가능한 아이디입니다.'
          idCheckPassed.value = true
        }
      } catch (error) {
        errorMessage.value = '중복 체크 실패: 서버 오류'
        console.error(error)
      }
    }

    const handleSignup = async () => {
      // 빈 칸 체크
      if (
        !username.value.trim() ||
        !id.value.trim() ||
        !password.value.trim() ||
        !passwordCheck.value.trim()
      ) {
        errorMessage.value = '모든 항목을 입력해주세요.'
        return
      }

      // 비밀번호 일치 여부 확인
      if (password.value !== passwordCheck.value) {
        errorMessage.value = '비밀번호가 일치하지 않습니다.'
        return
      }

      // 중복체크 확인 여부
      if (idCheckPassed.value == false) {
        errorMessage.value = '아이디 중복 체크를 해주세요.'
        return
      }

      try {
        // newUser에 로그인 폼에 쓴 정보들을 담아와서 db.json에 저장
        const newUser = { id: id.value, username: username.value, password: password.value }
        const response = await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser),
        })

        if (response.ok) {
          alert('회원가입 완료. 로그인 페이지로 이동합니다.')
          router.push('/')
        } else {
          errorMessage.value = '회원가입 실패: 서버 오류'
        }
      } catch (error) {
        errorMessage.value = '서버 오류로 회원가입 실패'
        console.error(error)
      }
    }

    return {
      id,
      username,
      password,
      passwordCheck,
      errorMessage,
      handleSignup,
      handleCheckId,
      router,
    }
  },
})
</script>
