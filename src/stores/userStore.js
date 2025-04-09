import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const userId = ref('')
    const username = ref('')
    // const profileimImages = ref('')

    function setUser(userData) {
      userId.value = userData.userId
      username.value = userData.username
      // profileimImages.value = userData.profileimImages || ''
    }

    function clearUser() {
      userId.value = ''
      username.value = ''
      // profileimImages.value = ''
    }

    return {
      userId,
      username,
      // profileimImages,
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
// userStore.userId 또는 userStore.username

