<template>
  <div id="main">
    <div class="item" v-for="anime in animes" :key="anime.title">
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
        userList: []
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
          this.userList = doc.data().list
        })
        .catch(err =>{
          console.log(err)
        })
      this.anime = await this.getAnim()
    }
  }
</script>

<style scoped lang='scss'>
#main{
  margin: 100px 80px 80px 80px;
  .item{
    margin-bottom: 25px;
  }
}
</style>