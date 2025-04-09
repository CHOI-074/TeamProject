import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const id = ref('')
    const username = ref('')

    function setUser(userData) {
      id.value = userData.id
      username.value = userData.username
    }

    function clearUser() {
      id.value = ''
      username.value = ''
    }

    return {
      id,
      username,
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
