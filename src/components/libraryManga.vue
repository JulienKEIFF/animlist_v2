<template>
  <div id="main">
    <div class="menu">
      <router-link to="/library/anime" tag="p">Anime</router-link>
      <router-link to="/library/manga" tag="p">Manga</router-link>
      <router-link to="/library/manage" tag="p">bibliotheque</router-link>
    </div>

    <div id="research">
      <input type="text" name="research" id="research-input" placeholder="Chercher un manga" v-model="mangaSearch">
    </div>
    <div class="item" v-for="manga in mangaFilter" :key="manga.title">
      <mangaCard :title="manga.title" :tome="manga.tome" :descr="manga.descr" :id="manga.id" />
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
        userList: [],
        mangaSearch: '',
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
            this.mangas.sort(function(a,b){
              let x = a.title.toLowerCase();
              let y = b.title.toLowerCase();
              return x < y ? -1 : x > y ? 1 : 0;
            });
          })
          .catch(err => {
            console.log(err)
          })
        }
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
    },
    computed: {
      mangaFilter() {
        return this.mangas.filter(post => {
          return post.title.toLowerCase().includes(this.mangaSearch.toLowerCase())
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