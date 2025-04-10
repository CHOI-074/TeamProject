import { createApp } from 'vue';
import App from './App.vue';
<<<<<<< HEAD
import router from './router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import './assets/index.css';

const app = createApp(App);
const pinia = createPinia();

// 플러그인 등록
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
=======
import router from './router'; // Vue Router
import { createPinia } from 'pinia'; // Pinia
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './assets/main.css'; // tailwinds 관련 설정

const app = createApp(App);
const pinia = createPinia()

// 플러그인 등록
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router); // 라우팅

>>>>>>> ceb887c00ac7f64883523168a5129cac47cff2d9
app.mount('#app');
