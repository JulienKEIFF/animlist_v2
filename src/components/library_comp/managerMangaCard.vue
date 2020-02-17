<template>
  <div class="anime-card">
    <h1>{{title}}</h1>
    <h2>{{tome}} Tomes</h2>
    <p>{{descr}} </p>
    <div class="button">
      <span @click="addFunction" class="mdi" :class="add ? 'mdi-playlist-remove' : 'mdi-playlist-plus'"></span>
    </div>
  </div>
</template>

<script>
import {db} from '../../firebaseConfig'
const fb = require('../../firebaseConfig')

  export default {
    name: 'ManagerMangaCard',

    props: {
      title: null,
      tome: null,
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
        let idItem = this.id
        db.runTransaction(function(transaction){
          return transaction.get(db.collection('users').doc(fb.auth.currentUser.uid))
          .then(function(doc){
            if(doc.data().mangaList.includes(idItem)){
              let index = doc.data().mangaList.indexOf(idItem)
              let newArray = doc.data().mangaList.slice()
              newArray.splice(index, 1)
              transaction.update(db.collection("users").doc(fb.auth.currentUser.uid), {mangaList: newArray})
            }else{
              let items = doc.data().mangaList.slice()
              items.push(idItem)
              transaction.update(db.collection("users").doc(fb.auth.currentUser.uid), {mangaList: items})
            }
          })
        })
      }
    },
    mounted: async function() {
      let inUserList = await db.collection('users').doc(fb.auth.currentUser.uid).get()
        .then(doc => {
          return doc.data().mangaList
        })
      if(inUserList.includes(this.id)){
        this.add = true
      }else{
        this.add = false
      }
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