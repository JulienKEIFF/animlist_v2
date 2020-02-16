<template>
  <div id="app">
    <navbar v-if="currentUser" />
    <router-view />
  </div>
</template>

<script>
import {mapState} from 'vuex'

import navbar from './components/navbar'

export default {
  name: 'App',
  components: {
    navbar,
  },
  computed: {
    ...mapState(['currentUser'])
  }
}
</script>

<style lang="scss">
html body{
  margin: 0 !important;
  padding: 0 !important;
  background-color: rgb(246, 246, 246);
  box-sizing: border-box !important;
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #494949;
    margin: 0;
    padding: 0;
  }
}

</style>
