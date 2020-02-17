<template>
  <div id="nav">
    <router-link to="/" tag="h1">ANIMLIST</router-link>
    <div class="end">
      <router-link v-if="isAdmin" to="/admin" tag="span" class="mdi mdi-cloud-braces"></router-link>
      <span @click="logout" class="mdi mdi-logout-variant"></span>
    </div>
  </div>
</template>

<script>
import {db} from '../firebaseConfig'
const fb = require('../firebaseConfig.js')

export default {
  name: 'navbar',
  data() {
    return {
      isAdmin: false,
    }
  },
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
  },
  mounted: async function(){
    await db.collection('users').doc(fb.auth.currentUser.uid).get()
    .then(doc =>{
      if(doc._document.proto.fields.isAdmin.booleanValue === true){
        this.isAdmin = true
      }
    })
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
    cursor: pointer;
  }
  .end{
    position: absolute;
    right: 20px;
    .mdi{
      font-size: 35px;
      color: rgba(255, 255, 255, 0.938);
      margin: 0 10px 0 10px;
      cursor: pointer;
    }
  }
}
</style>
