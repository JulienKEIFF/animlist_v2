<template>
  <div class="manga-card">
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
.manga-card{
  position: relative;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.911);
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.253);
  h1{
    margin: 0;
    text-transform: uppercase;
  }
  p{
    text-align: justify;
    text-justify: auto;
  }
  .button{
    display: inline-block;
    width: 80px;
    position: absolute;
    left: 93%;
    top: 20px;
    .mdi{
      font-size: 30px;
      transition-duration: 0.2s;
      width: 40px;
      margin-right: 25px;
      color: #696969;
    }
  }
}

@media (max-width : 770px) {
  .manga-card{
    padding: 20px 20px 35px 20px;
    h1{
      font-size: 20px;
    }
    h2{
      font-size: 17px;
    }
    p{
      font-size: 15px;
      text-align: justify;
      text-justify: auto;
    }
    .button{
      display: inline-block;
      width: 40px;
      position: absolute;
      left: 85%;
      top: calc(100% - 40px);
      .mdi{
        font-size: 25px;
        width: 40px;
        margin-right: 5px;
      }
    }
  }
}
</style>