<template>
  <div id="app">
    <FilteringComponent />
    <router-view></router-view>
  </div>
</template>

<script>
import FilteringComponent from './views/FilteringComponent.vue'

export default {
  name: 'App',
  components: {
    FilteringComponent,
  },
}
</script>

<style></style>
