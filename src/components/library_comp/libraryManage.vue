<template>
  <div id="main">
    <div class="menu">
      <router-link to="/library/anime" tag="p">Anime</router-link>
      <router-link to="/library/manga" tag="p">Manga</router-link>
    </div>

    <div class="selector">
      <select name="type" id="select" v-model="type" @change="change()">
        <option value="anime">Anime</option>
        <option value="manga">Manga</option>
      </select>
    </div>

    <div v-if="animeTab">
      <div id="research">
        <input type="text" name="research" id="research-input" placeholder="Chercher un anime" v-model="animeSearch">
      </div>
      <div v-for="anime in animeFilter" :key="anime.title">
        <managerAnimeCard class="item" :title="anime.title" :episode="anime.episode" :descr="anime.descr" :id="anime.id" />
      </div>
    </div>

    <div v-if="mangaTab">
      <div id="research">
        <input type="text" name="research" id="research-input" placeholder="Chercher un manga" v-model="mangaSearch">
      </div>
      <div v-for="manga in mangaFilter" :key="manga.title">
        <managerMangaCard class="item" :title="manga.title" :tome="manga.tome" :descr="manga.descr" :id="manga.id" />
      </div>
    </div>

  </div>
</template>

<script>
import {db} from '../../firebaseConfig'
import managerAnimeCard from './managerAnimeCard'
import managerMangaCard from './managerMangaCard'
const fb = require('../../firebaseConfig.js')

export default {
  name: 'manager',
  components: {
    managerAnimeCard,
    managerMangaCard
  },
  data() {
    return{
      animeTab: true,
      animeUserList: [],
      animeList: [],

      mangaTab: false,
      mangaUserList: [],
      mangaList: [],

      type: "anime",
      animeSearch: "",
      mangaSearch: "",
    }
  },
  methods: {
    getAll(){
      let animeList = []
      let mangaList = []
      db.collection('anime').get()
      .then(query => {
        query.forEach(function(doc){
          let object = doc._document.proto.fields
          let animeGet = {
            title : object.title.stringValue,
            episode : object.episode.integerValue,
            descr : object.descr.stringValue,
            id: doc.id
          }
          animeList.push(animeGet)
        })
        this.animeList = animeList
        this.animeList.sort(function(a,b){
          let x = a.title.toLowerCase();
          let y = b.title.toLowerCase();
          return x < y ? -1 : x > y ? 1 : 0;
        });
      })
      .catch(err => {
        console.log(err)
      })
      

      db.collection('manga').get()
      .then(query => {
        query.forEach(function(doc){
          let object = doc._document.proto.fields
          let mangaGet = {
            title : object.title.stringValue,
            tome : object.tome.integerValue,
            descr : object.descr.stringValue,
            id: doc.id
          }
          mangaList.push(mangaGet)
        })
        this.mangaList = mangaList
        this.mangaList.sort(function(a,b){
          let x = a.title.toLowerCase();
          let y = b.title.toLowerCase();
          return x < y ? -1 : x > y ? 1 : 0;
        });
      })
      .catch(err => {
        console.log(err)
      })
    },
    change(){
      if(this.type === "anime"){
        this.animeTab = true
        this.mangaTab = false
      }else if(this.type === "manga"){
        this.animeTab = false
        this.mangaTab = true
      }
    },
  },
  mounted: async function(){
    await db.collection('users').doc(fb.auth.currentUser.uid).get()
      .then(doc =>{
        this.userList = doc.data().mangaList
      })
      .catch(err =>{
        console.log(err)
      })
    await this.getAll()
  },
  computed: {
    animeFilter() {
      return this.animeList.filter(post => {
        return post.title.toLowerCase().includes(this.animeSearch.toLowerCase())
      })
    },
    mangaFilter() {
      return this.mangaList.filter(post => {
        return post.title.toLowerCase().includes(this.mangaSearch.toLowerCase())
      })
    }
  },
}
</script>

<style scoped lang="scss">
#main{
  margin: 100px 80px 80px 170px;
  .item{
    z-index: 1;
    margin-bottom: 25px;
  }
}
.menu{
  position: fixed;
  left: 20px;
  p{ 
    cursor: pointer;
    text-transform:  uppercase;
    font-weight: bold;
    font-size: 17px;
    margin: 20px 0 10px 0;
    width: 80px;
  }
}
.selector{
  position: fixed;
  left: 20px;
  top: 250px;
}
#research{
  #research-input{
    margin-bottom: 20px;
    width: calc(100% - 15px);
  }
}

@media (max-width : 770px) {
  #main{
    margin: 120px 15px 5px 15px;
  }
  .menu{
    position: absolute;
    top: 70px;
    p{
      float: left;
    }
  }
  .selector{
    position: absolute;
    top: 90px;
    left: calc(100% - 90px);
  }
}
</style>