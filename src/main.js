import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css' // Tailwind를 불러오는 부분
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
