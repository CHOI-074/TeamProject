import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import './assets/main.css';
import './assets/index.css'; // Tailwind를 불러오는 부분

const app = createApp(App);
const pinia = createPinia();

// 플러그인 등록
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.mount('#app');
createApp(App).mount('#app');
