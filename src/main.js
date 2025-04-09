import { createApp } from 'vue';
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue';
import router from './router';

const app = createApp(App)
const pinia = createPinia()

createApp(App).use(router).mount('#app');


// 플러그인 등록
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.mount('#app')