<script setup></script>

<template>
  <div id="app">
    <!-- 라우터를 통해 페이지가 바뀌도록 설정 -->
     <Header />
    <Navigation />
    <!-- 네비게이션 추가 -->
    <!-- <TransactionHistory /> -->
    <router-view />
    <!-- 페이지 컴포넌트 출력 -->
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Navigation from './components/Navigation.vue'; // 경로는 실제 위치에 맞게 조정
// import TransactionHistory from './components/Transaction.vue';

export default {
  name: 'App',
  components: {
    Header,
    Navigation,
    // TransactionHistory,
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
}

#app {
  text-align: center;
}
</style>
