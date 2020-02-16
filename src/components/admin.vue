<template>
  <div id="admin">
    <label for="title">Titre de l'anime</label>
    <input v-model.trim="anime.title" type="text" name="title" id="i-title">

    <label for="episode">Nombre d'épisode</label>
    <input v-model.trim="anime.episode" type="number" name="episode" id="i-episode">

    <label for="descr">Description de l'anime</label>
    <input v-model.trim="anime.descr" type="text" name="descr" id="i-descr">

    <button @click="addAnime">Valider</button>

    <br>

    <h1>Title: {{anime.title}}</h1>
    <h1>Episode: {{anime.episode}}</h1>
    <h1>Description: {{anime.descr}}</h1>

  </div>
</template>

<script>
//import {db} from '../firebaseConfig'

  export default {
    name: 'admin',
    data() {
      return{
        anime: {
          title: '',
          episode: null,
          descr: ''
        },
      }
    },
    methods: {
      addAnime(){
        let episode = this.anime.episode
        parseInt(episode)
        this.anime.episode = episode
        //db.collection('anime').add(this.anime)
        console.log(typeof episode)
        this.anime = {
          title: '',
          episode: null,
          descr: ''
        }
      }
    },
  }
</script>

<style scoped lang='scss'>
#admin{
  margin: 100px 80px 80px 80px;
}
</style>