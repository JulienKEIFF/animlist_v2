<template>
  <div class="anime-card">
    <h1>{{title}}</h1>
    <h2>{{episode}} épisode</h2>
    <p>{{descr}} </p>
    <div class="button">
      <span @click="addFunction" class="mdi" :class="add ? 'mdi-playlist-remove' : 'mdi-playlist-plus'"></span>
    </div>
  </div>
</template>

<script>
//import {db} from '../../firebaseConfig'
//const fb = require('../../firebaseConfig')

  export default {
    name: 'ManagerAnimeCard',

    props: {
      title: null,
      episode: null,
      descr: null,
      id: null,
    },
    data() {
      return {
        add: false,
      }
    },
    methods: {
      addFunction(){
        this.add = !this.add
        if(this.add === true){
          console.log("add :" + this.id)
        }else if(this.add === false){
          console.log("remove :" + this.id)
        }
      }
    },
    mounted: async function() {
      
    }
  }
</script>

<style scoped lang="scss">
.anime-card{
  position: relative;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.911);
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.253);
  h1{
    margin: 0;
    text-transform: uppercase;
  }
  .mdi{
    position: absolute;
    font-size: 30px;
    transition-duration: 0.2s;
  }
  .mdi.mdi-playlist-remove{
    right: 40px;
    top: 25px;
    color: #696969;
  }
  .mdi.mdi-playlist-plus{
    right: 40px;
    top: 25px;
    color: #696969;
  }
}
</style>
