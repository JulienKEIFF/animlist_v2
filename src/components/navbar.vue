<template>
  <div id="nav">
    <h1>AnimList</h1>
    <div class="end">
      <span @click="logout" class="mdi mdi-logout-variant"></span>
    </div>
  </div>
</template>

<script>
const fb = require('../firebaseConfig.js')

export default {
  name: 'navbar',
  methods: {
    logout() {
      fb.auth.signOut().then(() => {
        this.$store.dispatch('clearData')
        this.$router.push('/login')
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss">
#nav {
  margin: 0;
  padding: 0;
  height: 70px;
  background-color: #ff867c;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 3;
  h1{
    margin: 0;
    color: rgba(255, 255, 255, 0.938);
    font-size: 40px;
    text-transform: uppercase;
    font-weight: bolder;
    margin-left: 10px;
  }
  .end{
    position: absolute;
    right: 20px;
    .mdi{
      font-size: 35px;
      color: rgba(255, 255, 255, 0.938);
    }
  }
}
</style>
