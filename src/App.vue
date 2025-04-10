<script setup></script>

<template>
  <div id="app">
    <Header />
    <Navigation />
    <router-view />
  </div>
</template>

<script>
import FilteredTransaction from './components/FilteredTransaction.vue';
import TransactionHistory from './views/TransactionHistory.vue';
import Header from './components/Header.vue';
import Navigation from './components/Navigation.vue';

export default {
  name: 'App',
  components: {
    TransactionHistory,
    FilteredTransaction,
    Header,
    Navigation,
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
