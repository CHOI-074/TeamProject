import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/index.css'; 
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia()

// 플러그인 등록
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router);

createApp(App).use(router).mount('#app');
