<template>
  <div
    class="flex flex-col items-center justify-start min-h-screen bg-white px-6 md:px-12 lg:px-20 pt-6 pb-10 py-6 max-w-md mx-auto"
  >
    <!-- 뒤로가기 버튼과 프로필 설정 제목 -->
    <div class="w-full max-w-xs md:max-w-md lg:max-w-lg mb-6 mx-auto flex items-center">
      <button type="button" @click="goToMain" class="bg-blue-500 text-white p-2 rounded-full mr-3">←</button>
      <h2 class="text-lg font-semibold">마이페이지</h2>
    </div>

    <!-- 프로필 이미지 -->
    <div class="relative mb-6">
      <img :src="selectedImage" alt="Profile" class="w-24 h-24 rounded-full object-cover" />
      <!-- 이미지 선택 버튼 -->
      <button
        @click="openImageModal"
        class="absolute bottom-0 right-0 bg-orange-300 p-1.5 rounded-full text-white text-xs hover:bg-orange-400"
      >
        ✎
      </button>
    </div>

    <!-- 이미지 선택 팝업 -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-lg w-96">
        <h3 class="text-lg font-semibold mb-4">프로필 이미지 선택</h3>
        <div class="flex justify-around mb-4">
          <div v-for="imageName in imageOptions" :key="imageName" class="relative">
            <img
              :src="`/img/${imageName}.png`"
              alt="Option"
              class="w-20 h-20 object-cover rounded-full cursor-pointer"
              :class="{ 'border-4 border-blue-500': selectedImageName === imageName }"
              @click="selectImage(imageName)"
            />
          </div>
        </div>
        <button @click="applySelectedImage" class="w-full py-2 bg-blue-500 text-white rounded-md mt-4">변경하기</button>
        <button @click="closeImageModal" class="w-full py-2 bg-gray-300 text-black rounded-md mt-2">닫기</button>
      </div>
    </div>

    <!-- 프로필 정보 -->
    <div class="w-full max-w-xs md:max-w-md lg:max-w-lg mb-6 mx-auto">
      <h3 class="text-sm font-bold text-blue-600 mb-3">프로필 정보</h3>
      <div class="bg-gray-100 rounded-md px-4 py-2 text-sm mb-2 flex items-center gap-x-4">
        <label class="text-gray-800 font-medium w-24">ID</label>
        <span class="text-gray-800">{{ currentUserId }}</span>
      </div>
      <div class="bg-gray-100 rounded-md px-4 py-2 text-sm mb-2 flex items-center gap-x-4">
        <label class="text-gray-800 font-medium w-24">Name</label>
        <span class="text-gray-800">{{ userName }}</span>
      </div>
    </div>

    <!-- 보안 -->
    <div class="w-full max-w-xs md:max-w-md lg:max-w-lg mb-8 mx-auto">
      <h3 class="text-sm font-bold text-blue-500 mb-2">보안</h3>
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
      class="w-full max-w-xs md:max-w-md lg:max-w-lg py-2 bg-blue-500 text-white text-sm font-semibold rounded-md mx-auto"
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
            class="px-3 py-1 text-sm rounded-md border border-gray-300 hover:bg-gray-100 font-semibold"
          >
            취소
          </button>
          <button
            type="button"
            @click="handleChangePassword"
            class="px-3 py-1 text-sm bg-[rgb(255,204,0)] text-black rounded-md font-semibold"
          >
            변경
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useUserStore } from '@/stores/userStore';

export default defineComponent({
  name: 'MyPage',
  setup() {
    const userStore = useUserStore();
    const id = userStore.id;
    const currentUserId = userStore.userId;
    const userName = userStore.username;
    const profileImage = userStore.profileImage;

    const selectedImageName = ref(profileImage.value || 'kirby1');

    // 이미지 이름 목록
    const imageOptions = ref(['kirby1', 'kirby2', 'kirby3', 'kirby4']);

    // 이미지 경로로 변환 (computed)
    const selectedImage = computed(() => `/img/${selectedImageName.value}.png`);

    const isModalOpen = ref(false);

    // 모달 상태 및 입력값 관리
    const showChangePasswordModal = ref(false); // 비밀번호 변경 모달 표시 여부
    const oldPassword = ref(''); // 현재 비밀번호
    const newPassword = ref(''); // 새 비밀번호
    const newPasswordCheck = ref(''); // 새 비밀번호 확인
    const errorMessage = ref(''); // 오류 메시지

    const router = useRouter();

    // 메인 페이지로 이동
    const goToMain = () => {
      router.push('/transaction-history');
    };

    // 모달 닫기 및 입력값 초기화 함수
    const closeModal = () => {
      oldPassword.value = '';
      newPassword.value = '';
      newPasswordCheck.value = '';
      showChangePasswordModal.value = false;
    };

    // 마운트 시 유저 정보 불러오기
    onMounted(async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/users`, {
          params: { userId: currentUserId },
        });

        const user = data[0];

        if (user && user.profileImage) {
          selectedImageName.value = user.profileImage;
        }
      } catch (error) {
        console.error('사용자 정보 불러오기 실패:', error);
      }
    });

    // 팝업 열기/닫기
    const openImageModal = () => {
      isModalOpen.value = true;
    };

    const closeImageModal = () => {
      isModalOpen.value = false;
      selectedImageName.value = userStore.profileImage;
    };

    // 이미지 선택
    const selectImage = (imageName) => {
      selectedImageName.value = imageName;
    };

    // 이미지 저장
    const applySelectedImage = async () => {
      try {
        const { data } = await axios.patch(`http://localhost:3000/users/${id}`, {
          profileImage: selectedImageName.value,
        });

        userStore.profileImage = selectedImageName.value;

        console.log('이미지 업데이트 성공:', data);
        closeImageModal();
      } catch (error) {
        console.error('이미지 업데이트 중 오류 발생:', error);
      }
    };

    // 비밀번호 변경 처리 함수
    const handleChangePassword = async () => {
      try {
        // userId가 같은 사용자 정보 가져오기
        const { data } = await axios.get(`http://localhost:3000/users`, {
          params: { userId: currentUserId },
        });

        const user = data[0];

        if (!user) {
          alert('사용자를 찾을 수 없습니다.');
          return;
        }

        if (user.password !== oldPassword.value) {
          alert('현재 비밀번호가 일치하지 않습니다.');
          return;
        }

        if (newPassword.value.length < 8) {
          alert('비밀번호는 최소 8자 이상이어야 합니다.');
          return;
        }

        if (newPassword.value !== newPasswordCheck.value) {
          alert('새 비밀번호가 일치하지 않습니다.');
          return;
        }

        // 비밀번호 업데이트 요청
        await axios.patch(`http://localhost:3000/users/${user.id}`, {
          password: newPassword.value,
        });

        alert('비밀번호가 성공적으로 변경되었습니다.');
        closeModal();
      } catch (error) {
        errorMessage.value = '비밀번호 변경 중 오류가 발생했습니다.';
        console.error(error);
      }
    };

    // 로그아웃
    const handlerLogOut = () => {
      userStore.clearUser();
      router.push('/login');
    };

    return {
      goToMain,
      showChangePasswordModal,
      selectedImage,
      selectedImageName,
      imageOptions,
      isModalOpen,
      oldPassword,
      newPassword,
      newPasswordCheck,
      handleChangePassword,
      openImageModal,
      closeImageModal,
      selectImage,
      applySelectedImage,
      currentUserId,
      userName,
      handlerLogOut,
      closeModal,
    };
  },
});
</script>
