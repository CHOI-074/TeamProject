<template>
  <div id="app">
    <h1 class="text-2xl font-bold text-center mb-4">필터링 기능</h1>
    <!-- Filter 컴포넌트 불러오기 -->
    <Filter />
  </div>
</template>

<script>
import Filter from './views/Filter.vue';

export default {
  name: 'App',
  components: {
    Filter,
  },
};
</script>

<style>
body {
  font-family: 'Arial', sans-serif;
}
</style>
