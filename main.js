// import { createApp } from 'vue';
// import App from './App.vue';
// import './assets/index.css'; // Tailwind를 불러오는 부분
// import { createPinia } from 'pinia' //  Pinia import

// createApp(App).mount('#app');

// const pinia = createPinia() //  Pinia 인스턴스 생성
// app.use(pinia)

import { createApp } from 'vue';
import App from './App.vue';
import './assets/index.css'; // Tailwind를 불러오는 부분
import { createPinia } from 'pinia'; // Pinia import

const app = createApp(App); // ← 여기에 app 변수 선언
const pinia = createPinia(); // Pinia 인스턴스 생성

app.use(pinia); // Pinia 등록
app.mount('#app'); // 앱 마운트
