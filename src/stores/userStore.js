<<<<<<< HEAD
// src/stores/userStore.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: 'id123',
  }),
  actions: {
    setUserId(id) {
      this.userId = id;
    },
  },
});
=======
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const id = ref('')
    const userId = ref('')
    const username = ref('')
    const profileImage = ref('')

    function setUser(userData) {
      id.value = userData.id
      userId.value = userData.userId
      username.value = userData.username
      profileImage.value = userData.profileImage
    }

    function clearUser() {
      id.value = ''
      userId.value = ''
      username.value = ''
      profileImage.value = ''
    }

    return {
      id,
      userId,
      username,
      profileImage,
      setUser,
      clearUser,
    }
  },
  {
    persist: true,
  },
)

// 가져가서 쓸 때 사용법
// import { useUserStore } from '@/stores/userStore'
// const userStore = useUserStore()
// userStore.id 또는 userStore.username
>>>>>>> ceb887c00ac7f64883523168a5129cac47cff2d9
