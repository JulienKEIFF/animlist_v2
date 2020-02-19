<template>
  <div id="main">
    <div class="menu">
      <router-link to="/library/anime" tag="p">Anime</router-link>
      <router-link to="/library/manga" tag="p">Manga</router-link>
      <router-link to="/library/manage" tag="p">bibliotheque</router-link>
    </div>

    <div id="research">
      <input type="text" name="research" id="research-input" placeholder="Chercher un anime" v-model="animeSearch">
    </div>
    <div class="item" v-for="anime in animeFilter" :key="anime.title">
      <animeCard :title="anime.title" :episode="anime.episode" :descr="anime.descr" :id="anime.id" />
    </div>
  </div>
</template>

<script>
import animeCard from './library_comp/animeCard'
import {db} from '../firebaseConfig'

const fb = require('../firebaseConfig')


  export default {
    name: 'library',
    components: {
      animeCard,
    },
    data() {
      return{
        animes: [],
        userList: [],
        animeSearch: "",
      }
    },
    methods: {
      getAnim(){
        for (let i = 0; i < this.userList.length; i++) {
          const el = this.userList[i];
          db.collection('anime').doc(el).get()
          .then(doc => {
            let object = doc._document.proto.fields
            let animeGet = {
              title : object.title.stringValue,
              episode : object.episode.integerValue,
              descr : object.descr.stringValue,
              id: el
            }
            this.animes.push(animeGet)
            this.animes.sort(function(a,b){
              let x = a.title.toLowerCase();
              let y = b.title.toLowerCase();
              return x < y ? -1 : x > y ? 1 : 0;
            });
          })
          .catch(err => {
            console.log(err)
          })
        }
        this.animes.sort(function(a,b){
          let x = a.title.toLowerCase();
          let y = b.title.toLowerCase();
          return x < y ? -1 : x > y ? 1 : 0;
        });
      }
    },
    mounted: async function() {
      await db.collection('users').doc(fb.auth.currentUser.uid).get()
        .then(doc =>{
          this.userList = doc.data().animeList
        })
        .catch(err =>{
          console.log(err)
        })
      await this.getAnim()
    },
    computed: {
      animeFilter() {
        return this.animes.filter(post => {
          return post.title.toLowerCase().includes(this.animeSearch.toLowerCase())
        })
      }
    }
  }
</script>

<style scoped lang='scss'>
#main{
  margin: 100px 80px 80px 170px;
  .item{
    margin-bottom: 25px;
  }
}
.menu{
  position: absolute;
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
    top: 70px;
    p{
      float: left;
    }
  }
}
</style>