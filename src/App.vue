<template>
  <div id="app">
    <TransactionHistory />

  </div>
</template>

<script>
import FilteredTransaction from './components/FilteredTransaction.vue';
import TransactionHistory from './views/TransactionHistory.vue';

export default {
  name: 'App',
  components: {
    TransactionHistory,
    FilteredTransaction
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
