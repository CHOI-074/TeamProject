// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Vue Router
import { createPinia } from 'pinia'; // Pinia
import './assets/main.css'; // tailwinds 관련 설정

const app = createApp(App);

app.use(createPinia()); // 상태 관리
app.use(router); // 라우팅

app.mount('#app');
