<template>
  <div id="admin">

    <button @click="toggleDisplay" id="toggle-button">Toggle</button>

    <div id="anime" v-if="animeTab" class="add">
      <label for="title">Titre de l'anime</label>
      <input v-model.trim="anime.title" type="text" name="title" id="i-title"> <br>

      <label for="episode">Nombre d'épisode</label>
      <input v-model.number="anime.episode" type="number" name="episode" id="i-episode"> <br>

      <label for="descr">Description de l'anime</label>
      <input v-model.trim="anime.descr" type="text" name="descr" id="i-descr"> <br>

      <button @click="addAnime" class="validate">Valider</button>
    </div>

    <div id="manga" v-if="mangaTab" class="add">
      <label for="title">Titre du manga</label>
      <input v-model.trim="manga.title" type="text" name="title" id="i-title-manga"> <br>

      <label for="episode">Nombre de tome</label>
      <input v-model.number="manga.tome" type="number" name="tome" id="i-tome"> <br>

      <label for="descr">Description du manga</label>
      <input v-model.trim="manga.descr" type="text" name="descr" id="i-descr-manga"> <br>

      <button @click="addManga" class="validate">Valider</button>
    </div>

  </div>
</template>

<script>
import {db} from '../firebaseConfig'

  export default {
    name: 'admin',
    data() {
      return{
        anime: {
          title: '',
          episode: null,
          descr: ''
        },
        manga: {
          title: '',
          tome: null,
          descr: '',
        },

        animeTab: true,
        mangaTab: false
      }
    },
    methods: {
      addAnime(){
        db.collection('anime').add(this.anime)
        this.anime = {
          title: '',
          episode: null,
          descr: ''
        }
      },
      addManga(){
        db.collection('manga').add(this.manga)
        this.anime = {
          title: '',
          tome: null,
          descr: ''
        }
      },
      toggleDisplay(){
        this.animeTab = !this.animeTab
        this.mangaTab = !this.mangaTab
      }
    },
  }
</script>

<style scoped lang='scss'>
#admin{
  margin: 100px 80px 80px 80px;
  .add{
    background-color: white;
    height: 100px;
    padding: 15px;
    label{
      text-transform: uppercase;
      display: inline-block;
      margin-bottom: 10px;
      margin-right: 15px;
    }
    input{
      position: absolute;
      left: 320px;
      width: 250px;
    }
    .validate{
      position: absolute;
      top: 160px;
      left: 65%;
      height: 75px;
      width: 100px;
    }
  }
  #toggle-button{
    margin-bottom: 25px;
  }
}
</style>