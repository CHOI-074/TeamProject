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
        v-model="form.username"
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
        v-model="form.userId"
        type="text"
        placeholder="아이디"
        class="mt-3 mb-4 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <!-- 비밀번호 입력 -->
      <label class="block mb-1 text-sm font-medium text-gray-700">비밀번호</label>
      <input
        v-model="form.password"
        type="password"
        placeholder="비밀번호"
        class="mb-5 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <!-- 비밀번호 확인 입력 -->
      <label class="block mb-1 text-sm font-medium text-gray-700">비밀번호 확인</label>
      <input
        v-model="form.passwordCheck"
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

      <!-- 중복체크 통과 메시지 -->
      <p v-if="successMessage" class="mt-3 text-sm text-green-500 text-center">
        {{ successMessage }}
      </p>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref, watch, reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default defineComponent({
  name: 'SignUp',
  setup() {
    // 사용자 입력 값들 reactive 객체로 관리
    const form = reactive({
      username: '',
      userId: '',
      password: '',
      passwordCheck: '',
    })
    const errorMessage = ref('')    // 에러 메시지
    const successMessage = ref('')  // 성공 메시지
    const idCheckPassed = ref(false)// 아이디 중복 체크 여부
    const router = useRouter()      // // 페이지 이동용

    // 아이디 입력값이 바뀌면 중복 체크 초기화 되도록
    watch(
      () => form.userId,
      () => {
        idCheckPassed.value = false
        errorMessage.value = ''
        successMessage.value = ''
      },
    )

    // 아이디 중복 체크 함수
    const handleCheckId = async () => {
      if (!form.userId.trim()) {
        errorMessage.value = '아이디를 입력해주세요.'
        successMessage.value = ''
        return
      }

      try {
        // users테이블에 form.userId와 같은 아이디가 있는지
        const { data } = await axios.get(`http://localhost:3000/users?userId=${form.userId}`)

        if (data.length > 0) {
          // 이미 존재하는 경우
          errorMessage.value = '이미 사용 중인 아이디입니다.'
          successMessage.value = ''
          idCheckPassed.value = false
        } else {
          //// 사용 가능한 아이디
          errorMessage.value = ''
          successMessage.value = '사용 가능한 아이디입니다.'
          idCheckPassed.value = true
        }
      } catch (error) {
        errorMessage.value = '중복 체크 실패: 서버 오류'
        successMessage.value = ''
        console.error(error)
      }
    }

    // 회원가입 제출 처리 함수
    const handleSignup = async () => {
      if (
        !form.username.trim() ||
        !form.userId.trim() ||
        !form.password.trim() ||
        !form.passwordCheck.trim()
      ) {
        errorMessage.value = '모든 항목을 입력해주세요.'
        successMessage.value = ''
        return
      }

      // 비밀번호 길이 검사
      if (form.password.length < 8) {
        errorMessage.value = '비밀번호는 최소 8자 이상이어야 합니다.'
        successMessage.value = ''
        return
      }

      // 비밀번호 일치 검사
      if (form.password !== form.passwordCheck) {
        errorMessage.value = '비밀번호가 일치하지 않습니다.'
        successMessage.value = ''
        return
      }

      // 중복 체크 확인
      if (!idCheckPassed.value) {
        errorMessage.value = '아이디 중복 체크를 해주세요.'
        successMessage.value = ''
        return
      }

      try {
        const newUser = {
          userId: form.userId,
          username: form.username,
          password: form.password,
        }

        await axios.post('http://localhost:3000/users', newUser)

        errorMessage.value = ''
        successMessage.value = ''
        alert('회원가입 완료. 로그인 페이지로 이동합니다.')
        router.push('/')
      } catch (error) {
        errorMessage.value = '서버 오류로 회원가입 실패'
        console.error(error)
      }
    }

    return {
      form,
      errorMessage,
      successMessage,
      idCheckPassed,
      handleSignup,
      handleCheckId,
      router,
    }
  },
})
</script>
