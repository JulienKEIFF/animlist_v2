<template>
  <div class="manga-card">
    <h1>{{title}}</h1>
    <h2>{{tome}} Tomes</h2>
    <p>{{descr}} </p>
    <div class="button">
      <span @click="likeFunction" class="mdi mdi-heart" :class="like ? 'like' : 'no-like'"></span>
      <span @click="viewFunction" :class="view ? 'mdi mdi-eye' : 'mdi mdi-eye-off'"></span>
    </div>
  </div>
</template>

<script>
import {db} from '../../firebaseConfig'

const fb = require('../../firebaseConfig')

  export default {
    name: 'MangaCard',

    props: {
      title: null,
      tome: null,
      descr: null,
      id: null,
    },
    data() {
      return {
        like: false,
        view: false
      }
    },
    methods: {
      likeFunction(){
        this.like = !this.like
        let idItem = this.id
        db.runTransaction(function(transaction){
          
          return transaction.get(db.collection('users').doc(fb.auth.currentUser.uid))
          .then(function(likeDoc){
            if(likeDoc.data().mangaLike.includes(idItem)){
              let index = likeDoc.data().mangaLike.indexOf(idItem)
              let newArray = likeDoc.data().mangaLike.slice()
              newArray.splice(index, 1)
              transaction.update(db.collection("users").doc(fb.auth.currentUser.uid), {mangaLike: newArray})
            }else{
              let itemLike = likeDoc.data().mangaLike.slice()
              itemLike.push(idItem)
              transaction.update(db.collection("users").doc(fb.auth.currentUser.uid), {mangaLike: itemLike})
            }
          })
        })
      },
      viewFunction(){
        this.view = !this.view
        let idItem = this.id
        db.runTransaction(function(transaction){
          
          return transaction.get(db.collection('users').doc(fb.auth.currentUser.uid))
          .then(function(viewDoc){
            if(viewDoc.data().mangaView.includes(idItem)){
              let index = viewDoc.data().mangaView.indexOf(idItem)
              let newArray = viewDoc.data().mangaView.slice()
              newArray.splice(index, 1)
              transaction.update(db.collection("users").doc(fb.auth.currentUser.uid), {mangaView: newArray})
            }else{
              let itemView = viewDoc.data().mangaView.slice()
              itemView.push(idItem)
              transaction.update(db.collection("users").doc(fb.auth.currentUser.uid), {mangaView: itemView})
            }
          })
        })
      }
    },
    mounted: async function() {
      let likeUser = await db.collection('users').doc(fb.auth.currentUser.uid).get()
        .then(doc => {
          return doc.data().mangaLike
        })
      if(likeUser.includes(this.id)){
        this.like = true
      }else{
        this.like = false
      }
      let viewUser = await db.collection('users').doc(fb.auth.currentUser.uid).get()
        .then(doc => {
          return doc.data().mangaView
        })
      if(viewUser.includes(this.id)){
        this.view = true
      }else{
        this.view = false
      }
    }
  }
</script>

<style scoped lang="scss">
.manga-card{
  position: relative;
  padding: 20px;
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
    }
    .mdi.no-like{
      color: rgb(231, 231, 231);
    }
    .mdi.like{
      color: #ef534f;
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
      width: 80px;
      position: absolute;
      left: 80%;
      top: calc(100% - 40px);
      .mdi{
        font-size: 25px;
        transition-duration: 0.2s;
        width: 40px;
        margin-right: 5px;
      }
      .mdi.no-like{
        color: rgb(231, 231, 231);
      }
      .mdi.like{
        color: #ef534f;
      }
    }
  }
}
</style>
