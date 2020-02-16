<template>
  <div id="main">
    <div class="menu">
      <router-link to="/library/anime" tag="p">Anime</router-link>
      <router-link to="/library/manga" tag="p">Manga</router-link>
      <router-link to="/library/manage" tag="p">bibliotheque</router-link>
    </div>
    <div class="item" v-for="manga in mangas" :key="manga.title">
      <mangaCard :title="manga.title" :episode="manga.tome" :descr="manga.descr" :id="manga.id" />
    </div>
  </div>
</template>

<script>
import mangaCard from './library_comp/mangaCard'
import {db} from '../firebaseConfig'

const fb = require('../firebaseConfig')


  export default {
    name: 'Manga',
    components: {
      mangaCard,
    },
    data() {
      return{
        mangas: [],
        userList: []
      }
    },
    methods: {
      getManga(){
        for (let i = 0; i < this.userList.length; i++) {
          const el = this.userList[i];
          db.collection('manga').doc(el).get()
          .then(doc => {
            let object = doc._document.proto.fields
            let mangaGet = {
              title : object.title.stringValue,
              tome : object.tome.integerValue,
              descr : object.descr.stringValue,
              id: el
            }
            this.mangas.push(mangaGet)
          })
          .catch(err => {
            console.log(err)
          })
        }
        this.mangas.sort(function(a,b){
          let x = a.title.toLowerCase();
          let y = b.title.toLowerCase();
          return x < y ? -1 : x > y ? 1 : 0;
        });
      }
    },
    mounted: async function() {
      await db.collection('users').doc(fb.auth.currentUser.uid).get()
        .then(doc =>{
          this.userList = doc.data().mangaList
        })
        .catch(err =>{
          console.log(err)
        })
      await this.getManga()
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
</style>