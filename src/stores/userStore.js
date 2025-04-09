import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const id = ref('')
    const userId = ref('')
    const username = ref('')
    // const profileimImages = ref('')

    function setUser(userData) {
      id.value = userData.id
      userId.value = userData.userId
      username.value = userData.username
      // profileimImages.value = userData.profileimImages || ''
    }

    function clearUser() {
      id.value = ''
      userId.value = ''
      username.value = ''
      // profileimImages.value = ''
    }

    return {
      id,
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
// userStore.id 또는 userStore.username
