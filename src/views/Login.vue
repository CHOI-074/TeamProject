<template>
  <div class="flex flex-col items-center justify-center min-h-screen px-4 py-6 -mt-4 max-w-md mx-auto">
    <form @submit.prevent="handleLogin" class="w-full bg-white p-6 rounded-xl">
      <div class="flex flex-col items-center justify-center">
        <img class="h-40 w-auto rounded-lg" src="@/assets/logo.png" alt="logo" />
      </div>

      <div class="flex flex-col items-center justify-center -mt-12 -mb-3">
        <img class="h-60 w-auto rounded-lg" src="@/assets/login.png" alt="login" />
      </div>

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
        class="mb-3 w-full py-2 bg-blue-500 text-white font-medium rounded-md transition duration-300"
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
        <router-link to="/signup" class="text-[rgb(96,88,76)] hover:underline text-sm">회원가입</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import axios from 'axios';

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const userId = ref(''); // 사용자 아이디 입력값
    const password = ref(''); // 비밀번호 입력값
    const errorMessage = ref(''); // 에러 메시지
    const router = useRouter(); // 페이지 이동을 위한 라우터
    const userStore = useUserStore(); // Pinia store

    const handleLogin = async () => {
      if (!userId.value || !password.value) {
        errorMessage.value = '아이디 또는 비밀번호를 입력해주세요.';
        return;
      }

      try {
        // JSON 서버에서 사용자 데이터 가져오기
        const response = await axios.get('http://localhost:3000/users');
        const users = response.data;

        // 사용자 목록에서 입력값과 일치하는 사용자 찾기
        const user = users.find((u) => u.userId === userId.value && u.password === password.value);

        // 일치하는 사용자가 있을 경우 로그인 처리
        if (user) {
          userStore.setUser({
            id: user.id,
            userId: user.userId,
            username: user.username,
            profileImage: 'kirby1',
          });
          alert('로그인 성공');
          router.push('/transaction-history');
        } else {
          // 일치하는 사용자가 없는 경우 에러 메시지 표시
          errorMessage.value = '아이디 또는 비밀번호가 잘못되었습니다.';
        }
      } catch (error) {
        errorMessage.value = '로그인 오류: 서버 문제';
        console.error('로그인 오류:', error);
      }
    };

    return {
      userId,
      password,
      errorMessage,
      handleLogin,
    };
  },
});
</script>
