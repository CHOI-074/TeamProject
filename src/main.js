import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Vue Router
import { createPinia } from 'pinia'; // Pinia
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './assets/main.css'; // tailwinds 관련 설정
import './index.css';  // 이 줄 꼭 필요!

const app = createApp(App);
const pinia = createPinia()

// 플러그인 등록
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router); // 라우팅
app.mount('#app');





