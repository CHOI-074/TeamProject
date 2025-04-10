import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import './assets/main.css';

const app = createApp(App);
const pinia = createPinia();

// 플러그인 등록
pinia.use(piniaPluginPersistedstate);
createApp(App).mount('#app');
app.use(pinia);
app.use(router);
app.mount('#app');
